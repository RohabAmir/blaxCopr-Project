
  <div align="center">
  <h1 align="center">Blaxcorp</h1>
  <h3>Codebase for the Blaxcorp platform</h3>
  <h3>◦ Developed with the software and tools below.</h3>
  <p align="center"><img src="https://img.shields.io/badge/-Next.js-004E89?logo=Next.js&style=flat-square" alt='Next.js\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-React-004E89?logo=React&style=flat-square" alt='React\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-TypeScript-004E89?logo=TypeScript&style=flat-square" alt='TypeScript\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Ant%20Design-004E89?logo=Ant%20Design&style=flat-square" alt='Ant Design\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-SCSS-004E89?logo=SCSS&style=flat-square" alt='SCSS\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-ESLint-004E89?logo=ESLint&style=flat-square" alt='ESLint"' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" />
  </p>
  </div>
  
  ---
  ## 📚 Table of Contents
  - [📚 Table of Contents](#-table-of-contents)
  - [🔍 Overview](#-overview)
  - [🌟 Features](#-features)
  - [📁 Repository Structure](#-repository-structure)
  - [💻 Code Summary](#-code-summary)
  - [🚀 Getting Started](#-getting-started)
  
  ---
  
  
  ## 🔍 Overview

 This project is a Next.js application with a TypeScript configuration. The main entry point is the `next.config.js` file, which sets up the project's configuration and defines the pages that will be served by the application. The `src` directory contains the source code for the application, including components, pages, and styles. The `components` directory contains reusable UI components, while the `pages` directory contains the application's pages. The `constants` directory contains constants used throughout the application, and the `contexts` directory contains React contexts used to manage state. The `lib` directory contains utility functions and libraries, and the `styles` directory contains global styles for the application. Finally, the `tsconfig.json` file defines the TypeScript configuration for the project.

---

## 🌟 Features

 The project features the following:<br>
* Next.js application with TypeScript configuration
* Main entry point is `next.config.js`
* Source code in `src` directory, including components, pages, and styles
* Reusable UI components in `components` directory
* Application's pages in `pages` directory
* Constants in `constants` directory
* React contexts in `contexts` directory
* Utility functions and libraries in `lib` directory
* Global styles in `styles` directory
* TypeScript configuration in `tsconfig.json` file

---

## 📁 Repository Structure

```sh
├── .eslintrc.json
├── .gitignore
├── README.md
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── src
│   ├── app
│   │   ├── (dashboard)
│   │   │   ├── (forms)
│   │   │   │   ├── account-details-form
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── contract-form
│   │   │   │   │   └── page.tsx
│   │   │   │   └── contract-processing-form
│   │   │   │       └── page.tsx
│   │   │   ├── dashboard
│   │   │   │   └── page.tsx
│   │   │   ├── dispute
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── modals
│   │   │       └── page.tsx
│   │   ├── auth
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   └── globals.scss
│   ├── components
│   │   ├── AccountDetailForm
│   │   │   ├── Password.tsx
│   │   │   ├── PersonalDetails.tsx
│   │   │   ├── Security.tsx
│   │   │   ├── index.tsx
│   │   │   └── style.module.scss
│   │   ├── Auth
│   │   │   ├── CardReview.tsx
│   │   │   ├── Default.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   ├── ResetPassword.tsx
│   │   │   ├── SignIn.tsx
│   │   │   ├── SignUp.tsx
│   │   │   ├── index.tsx
│   │   │   └── style.module.scss
│   │   ├── ContractForm
│   │   │   ├── SharedText.tsx
│   │   │   ├── StepCompliance.tsx
│   │   │   ├── StepCreate.tsx
│   │   │   ├── StepDetail.tsx
│   │   │   ├── Stepper.tsx
│   │   │   ├── StepperResponsive.tsx
│   │   │   ├── index.tsx
│   │   │   └── style.module.scss
│   │   ├── ContractProcessingForm
│   │   │   ├── BankDetails.tsx
│   │   │   ├── BankLocation.tsx
│   │   │   ├── ConfirmContractCancellation.tsx
│   │   │   ├── Deposit.tsx
│   │   │   ├── DisputOpened.tsx
│   │   │   ├── Inspection.tsx
│   │   │   ├── Invoice.tsx
│   │   │   ├── InvoiceMerchandise.tsx
│   │   │   ├── PendingDeposit.tsx
│   │   │   ├── StepAgreement.tsx
│   │   │   ├── Stepper.tsx
│   │   │   ├── SuccessfulDeposit.tsx
│   │   │   ├── TransferAmount.tsx
│   │   │   ├── index.tsx
│   │   │   ├── seller
│   │   │   │   ├── AddWithDrawl.tsx
│   │   │   │   ├── AddWithDrawlDisbursement.tsx
│   │   │   │   ├── DisputOpened.tsx
│   │   │   │   ├── FundsReleased.tsx
│   │   │   │   ├── InspectedPeriod.tsx
│   │   │   │   ├── Invoice.tsx
│   │   │   │   ├── SetupWithdrawl.tsx
│   │   │   │   ├── WithDrawlBuyerWaiting.tsx
│   │   │   │   ├── WithDrawlMethod.tsx
│   │   │   │   └── styles.module.scss
│   │   │   └── style.module.scss
│   │   ├── Dashboard
│   │   │   ├── Contracts
│   │   │   │   ├── Card.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── index.tsx
│   │   │   └── style.module.scss
│   │   ├── Dispute
│   │   │   ├── index.tsx
│   │   │   └── style.module.scss
│   │   └── Shared
│   │       ├── AppBar
│   │       │   ├── Modals
│   │       │   │   ├── ModalDetails.tsx
│   │       │   │   ├── ModalNotifications.tsx
│   │       │   │   └── styles.module.scss
│   │       │   ├── index.tsx
│   │       │   └── style.module.scss
│   │       ├── Avatar
│   │       │   ├── index.tsx
│   │       │   └── style.module.scss
│   │       ├── Button
│   │       │   ├── index.tsx
│   │       │   └── style.module.scss
│   │       ├── Inputs
│   │       │   ├── Dropdown.tsx
│   │       │   ├── Password.tsx
│   │       │   ├── Text.tsx
│   │       │   ├── Textarea.tsx
│   │       │   └── style.module.scss
│   │       ├── Layouts
│   │       │   ├── FromSection.tsx
│   │       │   └── style.module.scss
│   │       ├── Modals
│   │       │   ├── ConfirmApproval.tsx
│   │       │   ├── ConfirmContractReview.tsx
│   │       │   ├── ConfirmDisputeOpening.tsx
│   │       │   ├── InviteSeller.tsx
│   │       │   └── style.module.scss
│   │       ├── Navbar
│   │       │   ├── index.tsx
│   │       │   └── style.module.scss
│   │       ├── VerifyProfileBar
│   │       │   ├── index.tsx
│   │       │   └── style.module.scss
│   │       └── index.tsx
│   ├── constants
│   │   └── index.ts
│   ├── contexts
│   │   ├── App.tsx
│   │   └── Auth.tsx
│   ├── lib
│   │   └── Antd
│   │       ├── AntdRegistery.tsx
│   │       └── Config.tsx
│   ├── styles
│   │   └── base.scss
│   └── types
│       └── index.ts
└── tsconfig.json

```

---

## 💻 Code Summary

<details><summary>Root</summary>

| File | Summary |
| ---- | ------- |
| next-env.d.ts | The code defines a Next.js project with TypeScript support and imports the necessary types for the Image component from the `next/image-types` package. |
| next.config.js | The code defines a Next.js configuration object with an `output` property set to `'export'` and an `async redirects()` method that returns an array of redirect objects. |

</details>

---

<details><summary>account-details-form</summary>

| File | Summary |
| ---- | ------- |
| page.tsx | The code defines a React functional component named `AccountDetailForm` that renders the `AccountDetailForm_C` component. |

</details>

---

<details><summary>contract-form</summary>

| File | Summary |
| ---- | ------- |
| page.tsx | The code defines a React functional component named `ContractForm` that renders the `ContractForm_C` component. |

</details>

---

<details><summary>contract-processing-form</summary>

| File | Summary |
| ---- | ------- |
| page.tsx | The code defines a React component named ContractProcessingForm, which renders the ContractProcessingForm_C component. |

</details>

---

<details><summary>dashboard</summary>

| File | Summary |
| ---- | ------- |
| page.tsx | The code defines a React functional component named \Dashboard\ that renders the \Dashboard_C\ component. |

</details>

---

<details><summary>dispute</summary>

| File | Summary |
| ---- | ------- |
| page.tsx | The code defines a React functional component called \Dispute\ that renders the \Dispute_C\ component. |

</details>

---

<details><summary>(dashboard)</summary>

| File | Summary |
| ---- | ------- |
| layout.tsx | The code defines a React component called \RootLayout\ that wraps around the entire application, providing a consistent layout and configuration for the Antd design system. |

</details>

---

<details><summary>modals</summary>

| File | Summary |
| ---- | ------- |
| page.tsx | The code defines five React functional components, each of which renders a modal component from the `@/components/Shared/Modals` directory. |

</details>

---

<details><summary>auth</summary>

| File | Summary |
| ---- | ------- |
| layout.tsx | The code defines a React component called \RootLayout\ that wraps around the app's children, providing a basic layout for the app. It imports various dependencies such as Next.js metadata, Ant Design components, and custom context providers. |
| page.tsx | The code defines a React functional component named \Auth\ that renders the \Auth_C\ component. |

</details>

---

<details><summary>AccountDetailForm</summary>

| File | Summary |
| ---- | ------- |
| Password.tsx | The code defines a React functional component called \Password\ that renders a form with two password input fields and a save button. It uses the `useAppContext` hook to access the app's context, which contains information about the user's device. |
| PersonalDetails.tsx | The code defines a functional component named `PersonalDetails` that renders a form with personal details, including first name, last name, email, and phone number. It uses the `Grid` component from Ant Design to create a responsive layout for different screen sizes. |
| Security.tsx | The code defines a React component called `Security` that renders a two-step verification process for a user to enable multi-factor authentication. The component uses the `antd` library for its UI and state management, and it includes a QR code scanner and an input field for the user to enter a 6-digit code from their authenticator app. The component also includes a \Back\ button to allow the user to navigate back to the previous step of the verification process. |
| index.tsx | The code defines a React component called \CreateAccountDetails\ that renders a form for creating an account, with navigation between different sections using a navbar. |

</details>

---

<details><summary>Auth</summary>

| File | Summary |
| ---- | ------- |
| CardReview.tsx | The code defines a functional component called \CardReview\ that renders a card with an image, heading, subheading, and text. |
| Default.tsx | The code defines a functional component called \Default\ that renders a layout with a logo, a title, and a form for authentication. The component uses the Ant Design library for styling and the Next.js framework for routing. |
| ForgotPassword.tsx | The code defines a React component called \ForgotPassword\ that renders a form for resetting a password. It uses the \react-hook-form\ library to manage form state and validation, and the \antd\ library for styling. The component also imports various other components and utilities from the application's contexts and modules. |
| ResetPassword.tsx | The code defines a React component called \ResetPassword\ that renders a form for resetting a user's password. It uses the \react-hook-form\ library to manage form state and validation, and the \antd\ library for styling. The component also imports the \useAppContext\ hook from the \App\ context to check if the device is mobile. |
| SignIn.tsx | The code defines a React component called \SignIn\ that renders a form for logging in to a Blaxcorp application. It uses the `useForm` hook from `react-hook-form` to manage the form state, and includes input fields for email and password, as well as a button for submitting the form. The component also includes a link for resetting the user's password if they forget it. |
| SignUp.tsx | The code defines a React component called `SignUp` that renders a form for creating a new account. It uses the `useForm` hook from `react-hook-form` to manage form state and validation, and it includes input fields for email, password, and confirmation of password. The component also includes a button for creating an account and a link to log in if the user is on a mobile device. |
| index.tsx | The code defines a React functional component called \Auth\ that renders different UI components based on the current page in the authentication flow. It uses the `useAuthContext` hook to get the current page and the `useAppContext` hook to check if the app is running on a mobile device. The component returns a button for creating an account or logging in, depending on the current page, and a default UI component that contains these buttons. |

</details>

---

<details><summary>ContractForm</summary>

| File | Summary |
| ---- | ------- |
| SharedText.tsx | The SharedTextInput component is a React functional component that renders an Ant Design Flex container with a TextInput and additional input components, with the ability to customize the layout and styling. |
| StepCompliance.tsx | The code defines a functional component called `StepCompliance` that renders a form for uploading files and displaying uploaded files, with the ability to navigate between steps using buttons. |
| StepCreate.tsx | The code defines a React component named \Create\ that renders a form for creating a new contract. The form includes input fields for the contract name, role, currency, and inspection period, as well as a description of the encryption used to secure the contract. The component also includes a \Next\ button that triggers a callback function when clicked. |
| StepDetail.tsx | The code defines a functional component called \StepDetail\ that renders a form with various input fields and dropdown menus for creating a transaction. It uses the Ant Design library for layout and styling, and it imports several components from other files. The component's primary function is to allow users to input details about a transaction, including items being sold, shipping costs, and payment processing fees. |
| Stepper.tsx | The code defines a React functional component called \Stepper\ that renders a custom stepper with four steps, each represented by a dot. The active step is determined by the \activeStep\ prop, and the color of each step is determined by a CSS module. |
| StepperResponsive.tsx | The code defines a customized stepper component using Ant Design's Steps and Popover components. The component displays a series of steps with custom icons and tooltips, and allows the user to navigate between them by clicking on each step. The current step is highlighted and the user can click on any step to navigate to it. |
| index.tsx | The code defines a React component named `ContractForm` that uses the `useForm` hook from `react-hook-form` to manage form data and validation. It also imports several other components, including `Stepper`, `Create`, `StepDetail`, and `StepCompliance`. The component renders a form with multiple steps, each of which is represented by a separate component. The `handleStepChange` function is called when the user navigates between steps, and it updates the `activeStep` state variable to reflect the current step. |

</details>

---

<details><summary>ContractProcessingForm</summary>

| File | Summary |
| ---- | ------- |
| BankDetails.tsx | The code defines a React component called \BankDetails\ that renders a form for sending money from a bank account. It uses the Ant Design library for layout and styling, and includes information about the recipient's bank account, including the account number, SWIFT/BIC code, and address. The component also includes instructions on how to make the payment and some additional information about the transaction limits. |
| BankLocation.tsx | The code defines a React component called \BankLocation\ that renders a form for selecting a bank location and currency. It uses the `useForm` hook from `react-hook-form` to manage form state, and the `Dropdown` component from `antd` to render dropdown menus for selecting bank location and currency. The component also includes a button for continuing to the next step in the process. |
| ConfirmContractCancellation.tsx | The code defines a React functional component called \ConfirmContractCancellation\ that renders a modal window with a warning icon, a heading, and a description. The component also includes a button to cancel the contract and a cross button to close the modal. |
| Deposit.tsx | The code defines a React functional component named \Deposit\ that renders a deposit form with an image, text, and a button. |
| DisputOpened.tsx | The code defines a functional component called \DisputOpened\ that renders a React component with an Ant Design grid layout, displaying a warning icon and text content, and a button with the label \Go to messages\ |
| Inspection.tsx | The code defines a functional component called \Inspection\ that renders a section for reporting issues or approving a deposit. It uses the Ant Design Grid component to create a responsive layout and imports several icons from the Next.js public directory. |
| Invoice.tsx | The code defines a React component called \Invoice\ that displays an invoice with a download button and an image. |
| InvoiceMerchandise.tsx | The code defines a React functional component called \InvoiceMerchandise\ that renders an invoice with a heading and a row of merchandise items. |
| PendingDeposit.tsx | The code defines a React functional component called \PendingDeposit\ that renders an image and text elements, indicating a pending escrow deposit with an amount of $10.030.00. |
| StepAgreement.tsx | The code defines a React component called `StepAgreement` that renders a form with various sections, including an agreement summary, transaction details, and shipping information. |
| Stepper.tsx | The code defines a custom stepper component in React using the Ant Design library, which displays a series of steps with custom icons and tooltips. The component uses the `useState` hook to keep track of the current step and renders a `Steps` component from Ant Design, passing in a custom `progressDot` prop that displays a custom icon for each step based on its status (active, current, or inactive). The component also includes a `handleStepClick` function that updates the current step when a step is clicked. |
| SuccessfulDeposit.tsx | The code defines a React functional component called \SuccessfulDeposit\ that displays a successful deposit message with an icon and text, and includes a button to mark the transaction as received. |
| TransferAmount.tsx | The code defines a functional component called \TransferAmount\ that renders a form for transferring money. It uses the Ant Design Grid component to create a responsive layout, and it includes two buttons: one for back navigation and another for continuing with the transfer process. |
| index.tsx | The code defines a React component called `ContractProcessingForm` that renders a form for processing a contract. It uses the `antd` library for styling and layout, and includes several sub-components for different parts of the form, such as the agreement details, deposit information, and bank details. The component also includes a stepper to navigate through the different sections of the form. |

</details>

---

<details><summary>seller</summary>

| File | Summary |
| ---- | ------- |
| AddWithDrawl.tsx | The code defines a functional component called \AddWithDrawl\ that renders a form for adding a withdrawal method, including input fields for the bank's name, account number, and currency. It also includes a button to save the form data. |
| AddWithDrawlDisbursement.tsx | The code defines a React component called \AddWithDrawlDisbursement\ that renders a form for adding withdrawal methods, including a primary disbursement bank and additional disbursement banks. The form includes input fields for the withdrawal method, account holder's name, account number, SWIFT/BIC (if applicable), IBAN, bank name, and currency. The component also includes a button to add another bank and a save button. |
| DisputOpened.tsx | The code defines a React functional component called \DisputOpened\ that renders a UI element with a warning icon, a heading, and a button. The button is only displayed on small screens. |
| FundsReleased.tsx | The code defines a React component called \FundsReleased\ that displays a message indicating that funds have been released to the user's primary account, along with an icon and some text. |
| InspectedPeriod.tsx | The code defines a functional component called \InspectedPeriod\ that renders a section for displaying information about the inspection period and the withdrawal method. It uses Next.js' Image component to display icons, and Ant Design's Grid component to handle responsive layout. |
| Invoice.tsx | The code defines a React functional component called \Invoice\ that renders an invoice form with a download button. |
| SetupWithdrawl.tsx | The code defines a functional component called \SetupWithDrawl\ that renders a section for setting up a withdrawal method for the buyer upon contract completion. |
| WithDrawlBuyerWaiting.tsx | The code defines a React component called `WithDrawlBuyerWaiting` that displays a series of buttons and text elements related to the withdrawal process, including a \Waiting for the buyer\ button, a \Funds succesfully deposited in escrow\ message, and a \Withdrawal method\ button. |
| WithDrawlMethod.tsx | The code defines a React component called \WithDrawlMethod\ that displays a series of buttons and text elements, including an \Sent\ button and a withdrawal method. |

</details>

---

<details><summary>Contracts</summary>

| File | Summary |
| ---- | ------- |
| Card.tsx | The code defines a functional component called \Card\ that renders a card with various details such as status, type, price, company, and date. It uses the `useState` hook to manage the state of the card's active type and mouse over state, and it includes event handlers for handling mouse over and click events. |
| index.tsx | The code defines a functional component called `CardContainer` that renders a list of cards based on the `activeNav` prop. The component filters the card list based on the active nav item and maps over the filtered list to render each card using the `Card` component. |

</details>

---

<details><summary>Dashboard</summary>

| File | Summary |
| ---- | ------- |
| Layout.tsx | The code defines a React functional component called \Layout\ that renders an AppBar and its children within a container with a custom CSS class. |
| index.tsx | The code defines a React functional component named \Dashboard\ that renders a dashboard with a header, navigation bar, and a card container. The navigation bar is populated with four links, each representing a different contract status. The active link is determined by the \activeNav\ state variable, which is set to the first link by default. When a user clicks on a link, the avClickHandler\ function is called, which updates the \activeNav\ state variable to reflect the new link. |

</details>

---

<details><summary>Dispute</summary>

| File | Summary |
| ---- | ------- |
| index.tsx | The code defines a React component named \Dispute\ that displays a dispute resolution page with a chat interface. It uses the Ant Design Grid component to create a responsive layout and the Next.js Image component to load images. The component also imports styles from a CSS module file and uses the useBreakpoint hook from Ant Design to conditionally render elements based on screen size. |

</details>

---

<details><summary>Modals</summary>

| File | Summary |
| ---- | ------- |
| ModalDetails.tsx | The code defines a React functional component called \ModalDetails\ that renders a modal window with three links: Account Details, Help Center, and Log Out. The component uses the \useDetectClickOutside\ hook to close the modal when the user clicks outside of it. |
| ModalNotifications.tsx | The code defines a functional component called `ModalNotifications` that renders a modal window with notifications. It uses the `useDetectClickOutside` hook to close the modal when the user clicks outside of it. |

</details>

---

<details><summary>AppBar</summary>

| File | Summary |
| ---- | ------- |
| index.tsx | The code defines a functional component called `AppBar` that renders a header with various icons and buttons, including a menu icon, a bell icon for notifications, and a down arrow icon for displaying user details. The component also includes a modal for displaying user details and another modal for displaying notifications. |

</details>

---

<details><summary>Avatar</summary>

| File | Summary |
| ---- | ------- |
| index.tsx | The code defines a React functional component called Avatar, which takes in a name prop and returns a div element with the first letter of the name as its content, using a CSS module to style the element. |

</details>

---

<details><summary>Button</summary>

| File | Summary |
| ---- | ------- |
| index.tsx | The code defines a React component called \GeneralButton\ that renders an Ant Design Button with customizable properties such as name, type, size, and icon. |

</details>

---

<details><summary>Inputs</summary>

| File | Summary |
| ---- | ------- |
| Dropdown.tsx | The code defines a React component called \TextInput\ that renders an Ant Design Select input with a label and options, using the `react-hook-form` library for form management. |
| Password.tsx | The code defines a React component called `PasswordInput` that renders an input field for entering passwords, using the `react-hook-form` library to handle form validation and the `antd` library for styling. The component takes in a `name` prop and optionally accepts `placeholder` and `label` props, and uses these props to render a label and placeholder text for the input field. It also includes an icon button to toggle the visibility of the password, which is implemented using the `Image` component from the `next/image` library. |
| Text.tsx | The code defines a React component called \TextInput\ that renders an Ant Design input field with a label and validation using the \react-hook-form\ library. |
| Textarea.tsx | The code defines a React component called \Textarea\ that renders an Ant Design input field with a label and validation using the \react-hook-form\ library. |

</details>

---

<details><summary>Layouts</summary>

| File | Summary |
| ---- | ------- |
| FromSection.tsx | The code defines a React component called \FromSection\ that renders a form section with a title, button, and children elements. It uses the Antd library for layout and styling, and it has an interface for passing in props such as the title, button title, and button click handler. |

</details>

---

<details><summary>Modals</summary>

| File | Summary |
| ---- | ------- |
| ConfirmApproval.tsx | The code defines a React functional component called \ConfirmApproval\ that renders a modal with a heading, an icon, and two buttons. |
| ConfirmContractReview.tsx | The code defines a functional component called \ConfirmContractReview\ that renders a modal with a warning icon, a description of the contract terms, and two buttons for reviewing and signing the contract. |
| ConfirmDisputeOpening.tsx | The code defines a React functional component named \ConfirmDisputeOpening\ that renders a modal with a heading, warning icon, description, and two buttons. |
| InviteSeller.tsx | The code defines a functional component called \InviteSeller\ that renders a modal with a heading, input fields for email and message, and two buttons. |

</details>

---

<details><summary>Navbar</summary>

| File | Summary |
| ---- | ------- |
| index.tsx | The code defines a Navbar component in React that renders a list of tags (represented by the Tag component) and allows the user to navigate between them by clicking on each tag. |

</details>

---

<details><summary>VerifyProfileBar</summary>

| File | Summary |
| ---- | ------- |
| index.tsx | The code defines a functional component called \Header\ that renders a header section with an image, a heading, and a button. The button is only visible when the window width is less than or equal to 550 pixels. |

</details>

---

<details><summary>Shared</summary>

| File | Summary |
| ---- | ------- |
| index.tsx | The code exports various components from a React library, including an AppBar, TextInput, Dropdown, PasswordInput, Navbar, VerifyProfileBar, Avatar, Button, and FormSection. |

</details>

---

<details><summary>constants</summary>

| File | Summary |
| ---- | ------- |
| index.ts | The code defines a constant object named ROUTES that maps route names to their corresponding URLs. |

</details>

---

<details><summary>contexts</summary>

| File | Summary |
| ---- | ------- |
| App.tsx | The code defines a React context for an application, with a `useBreakpoint` hook to determine the screen size and a `useMemo` hook to memoize the `isMobile` value. It also exports a `useAppContext` hook to access the context values. |
| Auth.tsx | The code defines a React component called \AuthContainer\ that provides an authentication context for its children. It uses the \useContext\ hook to create and manage a context object that contains the current active page, a function to handle changing the active page, and a function to go back to the previous page. The component also defines a set of constants for the different authentication tabs and exports a \useAuthContext\ hook for accessing the context from outside the component. |

</details>

---

<details><summary>Antd</summary>

| File | Summary |
| ---- | ------- |
| AntdRegistery.tsx | The code defines a React component called \StyledComponentsRegistry\ that provides a cache for Ant Design CSS-in-JS styles and inserts them into the HTML document on the server. |
| Config.tsx | The code defines a theme object for a React application, with properties for token colors, component styles, and border radius. |

</details>

---

<details><summary>types</summary>

| File | Summary |
| ---- | ------- |
| index.ts | The code defines a set of types and enums for navigation, buttons, and icons. |

</details>

---

## 🚀 Getting Started

 To get started with this project, follow these steps:<br>
1. Install the dependencies by running `npm install` or `yarn install`.
2. Start the development server by running `npm run dev` or `yarn dev`. This will start the Next.js development server and open a new browser window with the application running on `http://localhost:3000`.
3. Open the `next.config.js` file and customize the configuration as needed.
4. Create a new page by creating a new file in the `pages` directory with the `.tsx` extension. For example, you can create a new page called `about.tsx` by creating a new file called `about.tsx` in the `pages` directory.
5. Write the code for your page in the new file. You can use the `NextPage` component to define the page layout and the `useRouter` hook to access the router.
6. Test your page by navigating to `http://localhost:3000/about` in the browser.
7. Once you are satisfied with your page, you can build the application for production by running `npm run build` or `yarn build`. This will create a production-ready version of the application in the `out` directory.
8. Deploy the application to a hosting platform such as Vercel, Netlify, or Heroku

---

Generated with ❤️ by [ReadMeAI](https://www.readmeai.co/).
