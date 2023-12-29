"use client";
import { FC } from "react";
import Image from "next/image";
// import FrameImage from "../../../public/images/Frame.webp";
import styles from "./style.module.scss";
import TextInput from "../Shared/Inputs/Text";
import { FormProvider, useForm } from "react-hook-form";

const ContractForm: FC = () => {
  const methods = useForm();

  return (
    <>
      <FormProvider {...methods}>
        <div className={styles.mainContainer}>
          <div className={styles.content}>
            <div className={styles.inputs}>
              <div className={styles.inputField}>
                <label>Contract Name</label>
                <input type="text" />
              </div>
              <div className={styles.inputField}>
                <TextInput name="name" label="contract name" />
              </div>
              <div className={styles.inputField}>
                <label>Contract Name</label>
                <input type="text" />
              </div>
            </div>
            <div className={styles.iconDetails}>
              {/* <Image className={styles.img} src={FrameImage} alt="frame image" /> */}
              <div className={styles.text}>
                <h2 className={styles.heading}>ASE</h2>
                <p className={styles.description}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                  assumenda optio debitis non porro dolore temporibus voluptatem
                  eaque unde. Eveniet aspernatur minima eligendi veritatis earum
                  pariatur quia deleniti mollitia neque?
                </p>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
};
export default ContractForm;

// // // import { FC } from "react";
// // // import Image from "next/image";
// // // import FrameImage from "../../../public/images/Frame.png";
// // // import styles from "./style.module.css";
// // // import SharedTextInput from "../ContractForm/SharedText";
// // // import { FormProvider, useForm } from "react-hook-form";

// // // // const ContractForm: FC = () => {
// // // //   const methods = useForm();

// // // //   return (
// // // //     <>
// // // //       <div className={styles.mainContainer}>
// // // //         <div className={styles.content}>
// // // //           <div className={styles.inputs}>
// // // //             <div className={styles.inputField}>
// // // //               <label>Contract Name</label>
// // // //               <input type="text" />
// // // //             </div>
// // // //             {/* Use SharedTextInput for reusable input */}
// // // //             <SharedTextInput name="name" label="Contract Name" />
// // // //             {/* Add more SharedTextInput components as needed */}
// // // //             <SharedTextInput name="anotherField" label="Another Field" />
// // // //             <div className={styles.inputField}>
// // // //               <label>Contract Name</label>
// // // //               <input type="text" />
// // // //             </div>
// // // //           </div>
// // // //           <div className={styles.iconDetails}>
// // // //             <Image className={styles.img} src={FrameImage} alt="frame image" />
// // // //             <div className={styles.text}>
// // // //               <h2 className={styles.heading}>ASE</h2>
// // // //               <p className={styles.description}>
// // // //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
// // // //                 assumenda optio debitis non porro dolore temporibus voluptatem
// // // //                 eaque unde. Eveniet aspernatur minima eligendi veritatis earum
// // // //                 pariatur quia deleniti mollitia neque?
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </>
// // // //   );
// // // // };
// // // // ... (imports)

// // // const ContractForm: FC = () => {
// // //   const methods = useForm();

// // //   return (
// // //     <FormProvider {...methods}>
// // //       <div className={styles.mainContainer}>
// // //         <div className={styles.content}>
// // //           <div className={styles.inputs}>
// // //             <div className={styles.inputField}>
// // //               <label>Contract Name</label>
// // //               <input type="text" {...methods.register("contractName")} />
// // //             </div>
// // //             {/* Use SharedTextInput for reusable input */}
// // //             <SharedTextInput name="name" label="Contract Name" />
// // //             {/* Add more SharedTextInput components as needed */}
// // //             <SharedTextInput name="anotherField" label="Another Field" />
// // //             <div className={styles.inputField}>
// // //               <label>Contract Name</label>
// // //               <input type="text" {...methods.register("anotherContractName")} />
// // //             </div>
// // //           </div>
// // //           <div className={styles.iconDetails}>
// // //             <Image className={styles.img} src={FrameImage} alt="frame image" />
// // //             <div className={styles.text}>
// // //               <h2 className={styles.heading}>ASE</h2>
// // //               <p className={styles.description}>{/* Your text content */}</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </FormProvider>
// // //   );
// // // };

// // // export default ContractForm;
// // // import React, { FC } from "react";
// // // import Image from "next/image";
// // // import FrameImage from "../../../public/images/Frame.png";
// // // import styles from "./style.module.css";
// // // import { FormProvider, useForm } from "react-hook-form";
// // // import SharedTextInput from "../ContractForm/SharedText"; // Assuming you have a SharedTextInput component

// // // const ContractForm: FC = () => {
// // //   const methods = useForm();

// // //   return (
// // //     <FormProvider {...methods}>
// // //       <div className={styles.mainContainer}>
// // //         <div className={styles.content}>
// // //           <div className={styles.inputs}>
// // //             <div className={styles.inputField}>
// // //               <label>Contract Name</label>
// // //               {/* <input type="text" {...methods.register("contractName")} /> */}
// // //             </div>
// // //             {/* <SharedTextInput name="anotherField" label="Another Field" /> */}
// // //             <div className={styles.inputField}></div>
// // //           </div>
// // //           <div className={styles.iconDetails}>
// // //             <Image className={styles.img} src={FrameImage} alt="frame image" />
// // //             <div className={styles.text}>
// // //               <h2 className={styles.heading}>ASE</h2>
// // //               <p className={styles.description}>{/* Your text content */}</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </FormProvider>
// // //   );
// // // };

// // // export default ContractForm;
