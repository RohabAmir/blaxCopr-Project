import { FC } from "react";
import styles from "./style.module.scss";
import CardPic from "../../../public/images/Cardpic.svg";
import Image from "next/image";
import Star from "../../../public/icons/Star.svg";

const CardReview: FC = () => {
  return (
    <>
      <div className={styles.flexCard}>
        <div className={styles.card}>
          <div className={styles.fleximgCont}>
            <Image src={CardPic} alt="card pic" />
            <div className={styles.flexCol}>
              <p className={styles.cardHeading}>Samantha Payne</p>
              <p className={styles.cardSubHeading}>@Sam.Payne90</p>
              <div className={styles.star}>
                <Image src={Star} alt="star" />
                <Image src={Star} alt="star" />
                <Image src={Star} alt="star" />
                <Image src={Star} alt="star" />
                <Image src={Star} alt="star" />
              </div>
            </div>
          </div>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor purus non enim praesent elementum facilisis
            leo, vel
          </p>
        </div>
      </div>
    </>
  );
};
export default CardReview;
