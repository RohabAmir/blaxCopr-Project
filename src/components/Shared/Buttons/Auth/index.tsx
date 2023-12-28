import { Button } from 'antd'
import React, { FC } from 'react'
import styles from "../style.module.scss"
interface IButton {
    name: string;
    buttonHandler?: () => void;
    width?:string
}
const AuthButton: FC<IButton> = ({ name, buttonHandler,width="fit-content" }) => {
    return (
        <Button
        onClick={buttonHandler}
            type="primary"
            htmlType="submit"
            className={styles[`${width==='fit-content'?'root':'rootFullWidth'}`]}
        >
            {name}
        </Button>
    )
}

export default AuthButton