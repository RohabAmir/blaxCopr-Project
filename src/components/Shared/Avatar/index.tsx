import React, { FC } from 'react'
import style from "./style.module.scss"
interface IAvatar {
    name: string
}

const Avatar: FC<IAvatar> = ({ name }) => {
    const firstLetter = name?.split('')[0].toUpperCase()
    return (
        <div className={style.root}>{firstLetter}</div>
    )
}

export default Avatar