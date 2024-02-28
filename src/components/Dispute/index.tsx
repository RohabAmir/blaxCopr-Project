"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Channel,
  Chat,
  Message,
  MixedTextTypedElement,
  TimetokenUtils,
  User,
} from "@pubnub/chat";
import { receiveFiles } from "./pubnubConfig";
import styles from "./style.module.scss";
import Image from "next/image";
import UploadIcon from "../../../public/icons/Upload.svg";
import PlusIcon from "../../../public/icons/Plus.svg";
import { Button } from "../Shared";
import { Grid } from "antd";
import Pubnub from "pubnub";
import { ButtonType } from "@/types";
import { fileURLToPath } from "url";
import { useGetUserDetailsQuery } from "@/Store/services/authApi";

import Spinner from "@/utils/Spinner";
interface TextMessage {
  userId: string;
  timetoken: string;
  text: string;
}

interface FileMessage {
  userId: string;
  timetoken: string;
  fileUrl: string;
}

const userData = [
  {
    id: "1",
    data: {
      name: "Hamid Rafiq",
      custom: { initials: "HR", avatar: "#9fa7df" },
    },
  },
  {
    id: "2",
    data: {
      name: "Saad Waheed",
      custom: { initials: "SW", avatar: "#ffab91" },
    },
  },
];

const randomizedUsers = document.location.search.includes("agent")
  ? userData
  : userData.reverse();

export default function App() {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [chat, setChat] = useState<Chat>();
  const [text, setText] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [channel, setChannel] = useState<Channel>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [typers, setTypers] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [uploadedMessage, setUploadedMessage] = useState<any>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const messageListRef = useRef<HTMLElement>(null);
  const { data: userDetails, refetch: refetchUserDetails } =
    useGetUserDetailsQuery();
  console.log("user detials0---------------------------", userDetails);

  const pubnub = useMemo(
    () =>
      new Pubnub({
        publishKey: "pub-c-d55d262c-357a-44c3-9365-bf9086788fc3",
        subscribeKey: "sub-c-e7c4cb17-38b5-4dd3-89ee-4b04d84d254a",
        userId: userData[0].id,
      }),
    []
  );

  async function handleFileShare() {
    if (!selectedFile || !channel) return;
    if (selectedFileName) setSelectedFileName("");
    console.log("selected file-----------", selectedFile);

    try {
      const result = await pubnub.sendFile({
        channel: "SupportChannel",
        message: {
          text: "File sent",
        },
        file: {
          data: selectedFile,
          name: selectedFileName,
        },
        storeInHistory: true,
      });
      console.log("File sent successfully:", result);
      const res = pubnub.getFileUrl({
        channel: "SupportChannel",
        id: result.id,
        name: selectedFileName,
      });
      setUploadedMessage(res);
      console.log("res ----------", res);
    } catch (error) {
      console.error("Error sending file:", error);
    }
  }

  async function handleSend(event: React.SyntheticEvent) {
    event.preventDefault();
    if (!text || !channel) return;
    await channel.sendText(text);
    setText("");
  }

  async function handleMessage(message: any) {
    if (chat && !users.find((user) => user.id === message.userId)) {
      const user = await chat.getUser(message.userId);
      if (user) setUsers((users) => [...users, user]);
    }
    let newMessage: TextMessage | FileMessage;
    if (message.text) {
      newMessage = {
        userId: message.userId,
        timetoken: message.timetoken,
        text: message.text,
      };
    } else if (message.fileUrl) {
      newMessage = {
        userId: message.userId,
        timetoken: message.timetoken,
        fileUrl: message.fileUrl,
      };
    } else {
      return;
    }
    setMessages((messages: any) => [...messages, newMessage]);
  }

  useEffect(() => {
    let mounted = true;

    async function initializeChat() {
      const chat = await Chat.init({
        publishKey: "pub-c-d55d262c-357a-44c3-9365-bf9086788fc3",
        subscribeKey: "sub-c-e7c4cb17-38b5-4dd3-89ee-4b04d84d254a",
        userId: randomizedUsers[0].id,
        typingTimeout: 1000,
      });

      const currentUser = await chat.currentUser.update(
        randomizedUsers[0].data
      );
      const interlocutor =
        (await chat.getUser(randomizedUsers[1].id)) ||
        (await chat.createUser(randomizedUsers[1].id, randomizedUsers[1].data));
      const { channel } = await chat.createDirectConversation({
        user: interlocutor,
        channelData: { name: "SupportChannel" },
      });

      setChat(chat);
      setUsers([currentUser, interlocutor]);
      setChannel(channel);

      channel?.getTyping((data) => {
        if (data && data.length > 0 && data[0] !== currentUser.id) {
          setTypers("typing...");
        } else {
          setTypers("");
        }
      });
      const channelHistory = await channel.getHistory({ count: 10000 });

      channelHistory.messages.forEach(async (historicalMessage: any) => {
        await handleMessage(historicalMessage);
      });
    }
    if (mounted) {
      initializeChat();
    }

    return () => {
      mounted = false;
      // Cleanup logic
    };

    // initializeChat();
  }, []);

  useEffect(() => {
    if (!messageListRef.current) return;
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!channel) return;
    return channel.connect((message) =>
      setMessages((messages) => [...messages, message])
    );
  }, [channel]);

  useEffect(() => {
    pubnub.addListener({
      file: function (event) {
        const isMessagePresent = messages.some(
          (msg) =>
            msg.timetoken === event.timetoken && msg.userId === event.publisher
        );
        if (!isMessagePresent) {
          const fileUrl = pubnub.getFileUrl({
            channel: event.channel,
            id: event.file.id,
            name: event.file.name,
          });

          const fileMessage = {
            userId: event.publisher,
            timetoken: event.timetoken,
            fileUrl,
          };

          setMessages((messages: any) => [...messages, fileMessage]);
        }
      },
    });

    pubnub.subscribe({
      channels: ["SupportChannel"],
    });

    return () => {
      pubnub.unsubscribeAll();
    };
  }, [messages]); // Ensure to include messages in the dependency array

  const renderMessagePart = useCallback(
    (messagePart: MixedTextTypedElement) => {
      if (messagePart.type === "text") {
        return messagePart.content.text;
      }
      if (messagePart.type === "plainLink") {
        return (
          <a href={messagePart.content.link}>{messagePart.content.link}</a>
        );
      }
      if (messagePart.type === "textLink") {
        return (
          <a href={messagePart.content.link}>{messagePart.content.text}</a>
        );
      }
      if (messagePart.type === "mention") {
        return (
          <a href={`https://pubnub.com/${messagePart.content.id}`}>
            {messagePart.content.name}
          </a>
        );
      }

      return "";
    },
    []
  );

  const renderFileLink = (message: any) => {
    if (!message?.fileUrl) return null;

    if (message.fileUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
      return (
        <Image
          src={message.fileUrl}
          alt="Uploaded Image"
          className={styles.uploadedImage}
        />
      );
    }

    const fileName = message.fileUrl.split("/").pop();
    return (
      <a
        href={message.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        download
        className={styles.fileLink}
      >
        {fileName}
      </a>
    );
  };

  const fetchHistory = async () => {
    try {
      const response = await pubnub.history({
        channel: "SupportChannel",
        count: 100,
      });
      console.log(response);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };
  const handleTextChange = (e: any) => {
    const newText = e.target.value;
    setText(newText);
    if (newText.length % 5 === 0) {
      channel.startTyping();
    }
  };

  if (!chat || !channel) return <Spinner />;

  return (
    <>
      <div className={styles.chatBoxMain}>
        <div>
          <p className={styles.disputeHeading}>Open dispute</p>
        </div>
        <div className={styles.chatBox}>
          {/* empty div to contain some fkae text*/}
          <div> </div>
          <main className={styles.main}>
            <header className={styles.header}>
              <span
                style={{
                  display: "flex",
                  justifyContent: "flexStart",
                  alignItems: "center",
                }}
              >
                <aside
                  className={styles.aside}
                  style={{
                    background: String(chat.currentUser.custom?.avatar),
                  }}
                >
                  {chat.currentUser.custom?.initials}
                </aside>
                <h3>
                  {/* {userDetails?.firstName ? userDetails?.firstName : "user"} */}
                  {userDetails?.email}
                </h3>
              </span>
              <div className={styles.typers}>{typers}</div>
            </header>

            <section className={styles.section} ref={messageListRef}>
              <ol className={styles.ol}>
                {messages.map((message, index) => {
                  const user = users.find((user) => user.id === message.userId);
                  const isCurrentUser = user?.id === chat?.currentUser?.id;

                  return (
                    <li
                      className={`${styles.li} ${
                        isCurrentUser
                          ? styles.sentMessage
                          : styles.receivedMessage
                      }`}
                      key={message.timetoken}
                    >
                      <aside
                        className={styles.aside}
                        style={{ background: String(user?.custom?.avatar) }}
                      >
                        {user?.custom?.initials}
                      </aside>
                      <article className={styles.article}>
                        <h3 className={styles.h3}>
                          {/* {userDetails?.firstName
                            ? userDetails?.firstName
                            : "user1"} */}
                          {user?.name}
                          <time className={styles.time}>
                            {TimetokenUtils.timetokenToDate(
                              message.timetoken
                            ).toLocaleTimeString([], {
                              timeStyle: "short",
                            })}
                          </time>
                        </h3>
                        <p className={styles.p}>
                          {/* Render text message */}
                          {!message.fileUrl && (
                            <span className={styles.span}>{message.text}</span>
                          )}

                          {/* Render file link */}
                          {message.fileUrl && renderFileLink(message)}
                        </p>
                      </article>
                    </li>
                  );
                })}
              </ol>
            </section>

            <form className={styles.form} onSubmit={handleSend}>
              <div className={styles.chat}>
                <div className={styles.flexTextIcon}>
                  <label>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        console.log("file", e.target.files?.[0]);
                        if (file) {
                          setSelectedFile(file);
                          setSelectedFileName(file ? file.name : "");
                        }
                      }}
                    />
                    <Image
                      className={styles.icon}
                      src={UploadIcon}
                      alt="upload icon"
                    />
                  </label>
                  <p>{selectedFileName}</p>

                  <input
                    className={styles.input}
                    type="text"
                    value={text}
                    // onChange={(e) => {
                    //   channel.startTyping();
                    //   setText(e.target.value);
                    // }}
                    onChange={handleTextChange}
                    placeholder="Send message"
                  />
                </div>

                <button className={styles.plusBtn} onClick={handleFileShare}>
                  <Image src={PlusIcon} alt="plus icon" />
                </button>
              </div>
            </form>
          </main>
          {screens["md"] && (
            <div className={styles.rightBarNew}>
              <p className={styles.rightBarHeadingNew}>14 Days Left</p>
              <p className={styles.nameDesNew}>
                If the dispute remains unresolved for 14 days, it will be
                automatically escalated for arbitration.
              </p>
              <Button
                type={ButtonType.Primary}
                name="Contact Support"
                size={screens["md"] && "middle"}
              />
            </div>
          )}
        </div>
        {/* <button onClick={fetchHistory}>click</button> */}
      </div>
    </>
  );
}
