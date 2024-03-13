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
import { debounce } from "lodash"; // Import debounce function from lodash
import Spinner from "@/utils/Spinner";
import { getLocalData } from "@/utils";
import { useFetchContractDetailsQuery } from "@/Store/services/contractApi";
import { current } from "@reduxjs/toolkit";
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
  const contractId = getLocalData("contract_id");
  const { data: contractDetails } = useFetchContractDetailsQuery(contractId);
  const { data: userDetails } = useGetUserDetailsQuery();

  const userData = [
    {
      id: JSON.stringify(contractDetails?.seller?.id),
      data: {
        name: contractDetails?.seller?.firstName,
        // ...generateAvatarData(contractDetails?.seller?.firstName),
        custom: { avatar: "#9fa7df" },
      },
    },
    {
      id: JSON.stringify(contractDetails?.buyer?.id),
      data: {
        name: contractDetails?.buyer?.firstName,
        custom: { avatar: "#ffab91" },
      },
    },
  ];
  const currentUserId = localStorage.getItem("user_id");

  const randomizedUsers = document.location.search.includes("agent")
    ? userData.reverse()
    : userData

  const pubnub = new Pubnub({
    // publishKey: "pub-c-d55d262c-357a-44c3-9365-bf9086788fc3",
    // subscribeKey: "sub-c-e7c4cb17-38b5-4dd3-89ee-4b04d84d254a",
    publishKey: "pub-c-1323ff80-b300-4110-88f5-ccbab1237fb7",
    subscribeKey: "sub-c-f15279f3-c298-4359-964f-8210538e8dfe",
    userId: `${localStorage.getItem("user_id")}`,
  });
  const generateAvatar = (name: any) => {
    const initials = name ? name.charAt(0).toUpperCase() : "";
    const colors = [, "#9fa7df", "#ffab91"];
    const colorIndex = initials.charCodeAt(0) % colors.length;
    const backgroundColor = colors[colorIndex];
    return {
      backgroundColor: backgroundColor,
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      fontSize: "20px",
    };
  };
  const senderColor = "#ffab91";
  const receiverColor = "#9fa7df";
  const [fileMessages, setFileMessages] = useState<FileMessage[]>([]);
  async function handleFileShare() {
    if (!selectedFile || !channel) return;
    if (selectedFileName) setSelectedFileName("");
    const isAgent = document.location.search.includes("agent");
    console.log("Sending file as:", isAgent ? "Agent" : "Non-Agent");
    console.log("selected file-----------", selectedFile);

    try {
      const result = await pubnub.sendFile({
        // channel: "SupportChannel",
        channel: "Chat",
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
        channel: "Chat",
        id: result.id,
        name: selectedFileName,
      });

      setUploadedMessage(res);
      // console.log("res ----------", res);
      setFileMessages((fileMessages) => [
        ...fileMessages,
        { userId: result.id, timetoken: result.timetoken, fileUrl: res },
      ]);
      console.log("file message------------------===-", fileMessages);
    } catch (error) {
      console.error("Error sending file:", error);
    }
  }

  async function handleSend(event: React.SyntheticEvent) {
    console.log("in handle send function-------------");
    event.preventDefault();
    if (!text || !channel) return;
    await channel.sendText(text);
    setText("");
  }

  async function handleMessage(message: any) {
    console.log("message----------", message.content);
    if (chat && !users.find((user) => user.id === message.userId)) {
      const user = await chat.getUser(message.userId);
      if (user) setUsers((users) => [...users, user]);
    }

    let newMessage: TextMessage | FileMessage;
    if (message.text) {
      console.log("text messages-------------->>>", message.text);
      newMessage = {
        userId: message.userId,
        timetoken: message.timetoken,
        text: message.text,
      };
    }
    if (!message.text) {
      console.log("file messages>>>>>>", message.file);
      const fileUrl =
        message.fileUrl || "Extract file URL here based on actual structure";
      newMessage = {
        userId: message.userId,
        timetoken: message.timetoken,
        fileUrl: message.fileUrl,
      };
    }
    setMessages((messages: any) => [...messages, newMessage]);
    // updateLocalStorage([...messages, newMessage]);
  }

  //

  useEffect(() => {
    async function initializeChat() {
      const chat = await Chat.init({
        publishKey: "pub-c-1323ff80-b300-4110-88f5-ccbab1237fb7",
        subscribeKey: "sub-c-f15279f3-c298-4359-964f-8210538e8dfe",
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
        channelData: { name: "Chat" },
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

    if (contractDetails) {
      initializeChat();
    }
  }, [contractDetails]);

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
      file: function (event: any) {
        const isMessagePresent = messages.some(
          (msg) =>
            msg.timetoken === event.timetoken && msg.userId === event.publisher
        );
        if (!isMessagePresent) {
          console.log("file messages are here--");
          const fileUrl: any = pubnub.getFileUrl({
            channel: event.channel,
            id: event.file.id,
            name: event.file.name,
          });

          const fileMessage = {
            userId: event.publisher,
            timetoken: event.timetoken,
            fileUrl,
            text: null,
          };

          setMessages((messages: any) => [...messages, fileMessage]);
        }
      },
    });

    pubnub.subscribe({
      channels: ["Chat"],
    });

    return () => {
      pubnub.unsubscribeAll();
    };
  }, [messages]);

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
  const handleTextChange = (e: any) => {
    const newText = e.target.value;
    if (newText !== text) {
      setText(newText);
    }
  };

  const sellerFirstName = userDetails?.firstName?.toUpperCase();
  const buyerFirstName = contractDetails?.buyer?.firstName?.toUpperCase();
  const avatarCurrentUser = userDetails?.firstName?.toUpperCase();
  const avatarStyle = generateAvatar(avatarCurrentUser);
  const avatar = generateAvatar(avatarCurrentUser);

  // const handleHistoryMessage = (message: any) => {
  //   // Check if message contains file metadata
  //   if (message.entry.file) {
  //     console.log("filessssssss", message.entry.file);
  //     const fileUrl = pubnub.getFileUrl({
  //       channel: "Chat",
  //       id: message.entry.file.id,
  //       name: message.entry.file.name,
  //     });

  //     return {
  //       userId: message.entry.file.id,
  //       timetoken: message.timetoken,
  //       fileUrl,
  //     };
  //   }

  //   console.log("Messagessssss", message);
  //   // For text messages
  //   return {
  //     userId: message.entry.uuid,
  //     timetoken: message.timetoken,
  //     text: message.entry.message.text,
  //   };
  // };
  // useEffect(() => {
  //   const fetchHistory = async () => {
  //     try {
  //       console.log("Fetching history...");
  //       const response = await pubnub.history({
  //         channel: "Chat",
  //         count: 100,
  //       });

  //       const historyMessages: any =
  //         response.messages.map(handleHistoryMessage);
  //       // setMessages((msg) => [...msg, historyMessages]);
  //       setMessages(historyMessages);
  //       console.log("History Messages:", response.messages);
  //     } catch (error) {
  //       console.error("Error fetching history:", error);
  //     }
  //   };

  //   if (channel) {
  //     fetchHistory();
  //   }
  // }, [channel]);

  if (!chat || !channel) return <Spinner />;

  return (
    <>
      <div className={styles.chatBoxMain}>
        <div>
          <p className={styles.disputeHeading}>Open dispute</p>
        </div>
        <div className={styles.chatBox}>
          {/* empty div to contain some fake text*/}
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
                <aside className={styles.aside} style={avatarStyle}>
                  {avatarCurrentUser?.charAt(0).toUpperCase()}
                </aside>
                {/* <aside
                  className={styles.aside}
                  style={
                    userDetails?.firstName
                      ? avatarStyle
                      : { background: userDetails?.custom?.avatar }
                  }
                > */}
                <h3>
                  {userDetails?.firstName?.toUpperCase() ||
                    userDetails?.email.split("@")[0]}
                </h3>
              </span>
              <div className={styles.typers}>{typers}</div>
            </header>

            <section className={styles.section} ref={messageListRef}>
              <ol className={styles.ol}>
                {messages.map((message, index) => {
                  const user: any = users.find(
                    (user) => user.id === message.userId
                  );
                  const isCurrentUser = user?.id === chat?.currentUser?.id;
                  const isAgent = document.location.search.includes("agent");

                  return (
                    <li
                      className={`${styles.li} ${
                        isCurrentUser
                          ? styles.sentMessage
                          : styles.receivedMessage
                      }`}
                      key={`${message.timetoken}-${index}`}
                    >
                      <aside
                        className={styles.aside}
                        style={{
                          backgroundColor: isCurrentUser
                            ? senderColor
                            : receiverColor,
                        }}
                      >
                        {user?.data?.name
                          ? user.data.name.charAt(0).toUpperCase()
                          : user?.name?.charAt(0).toUpperCase() || ""}{" "}
                      </aside>

                      <article className={styles.article}>
                        <h3 className={styles.h3}>
                          {user?.name?.toUpperCase() ||
                            user?.email?.split("@")[0] ||
                            userDetails?.firstName?.toUpperCase()}
                          <time className={styles.time}>
                            {TimetokenUtils.timetokenToDate(
                              message.timetoken
                            ).toLocaleTimeString([], {
                              timeStyle: "short",
                            })}
                          </time>
                        </h3>
                        <p className={styles.p}>
                          {!message.fileUrl && (
                            <span className={styles.span}>{message.text}</span>
                          )}

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

// const [fileList, setFileList] = useState<File[]>([]);

//   // function listFiles(channel: any, limit: any) {
//   //   pubnub
//   //     .listFiles({ channel: channel, limit: limit })
//   //     .then((result) => {
//   //       console.log("Files status: ", result.status);
//   //       console.log("Next page token: ", result.next);
//   //       console.log("File count: ", result.count);
//   //       // setFileList(result.data);

//   //       result.data.forEach((file) => {
//   //         // console.log("File ID: ", file.id);
//   //         console.log("File Name: ", file.name);
//   //         // console.log("File Size: ", file.size);
//   //         // console.log("File Created: ", file.created);
//   //       });
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error listing files: ", error);
//   //     });
//   // }
//   // useEffect(() => {
//   //   listFiles("Chat", 4);
//   // }, []);
