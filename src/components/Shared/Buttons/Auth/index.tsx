import { Button } from 'antd'
import React, { FC } from 'react'
interface IButton {
    name: string;
    buttonHandler?: () => void
}
const AuthButton: FC<IButton> = ({ name, buttonHandler }) => {
    return (
        <Button
        onClick={buttonHandler}
            type="primary"
            htmlType="submit"
            style={{
                width: "100%",
                background: "#9FE870",
                borderRadius: "20px",
                color: "black",
                padding: "10px",
                height: "48px",
                fontWeight: "600",
                fontSize: "16px",
            }}
        >
            {name}
        </Button>
    )
}

export default AuthButton