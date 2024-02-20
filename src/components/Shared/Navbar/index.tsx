import React, { FC } from 'react'
import style from "./style.module.scss"
type Tag = {
    title: string,
    link: string[]
}
interface ITag {
    data: Tag;
    isActive: boolean;
    navClickHandler: (title: string[]) => void
}
interface Nav {
    title: string;
    link: string[];
}
interface INavbar {
    navs: Array<Nav>;
    activeNav: string[];
    navClickHandler: (nav: string[]) => void
}

const Tag: FC<ITag> = ({ data, isActive, navClickHandler }) => {
    const { title, link } = data
    return (
        <span className={isActive ? style.outlinedTag : style.tag} onClick={() => navClickHandler(link)} >
            {title}
        </span>
    )
}

const Navbar: FC<INavbar> = ({ navs, activeNav, navClickHandler }) => {
    return (
        <div className={style.root}>
            {
                navs.map((tag, idx) => <Tag key={idx} data={tag} isActive={tag.link === activeNav} navClickHandler={navClickHandler} />)
            } 
        </div>
    )
}

export default Navbar