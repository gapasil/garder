import React, { useEffect } from 'react'
import style from "./categories.module.css"
import store from '../../../../stores';
import { HashLink, NavHashLink } from 'react-router-hash-link';

const Categories = ({props,img,url}) => {

  if(img == ""){
    return(
      <HashLink
        to={`/catalog/${url}#top`}
      >
        <div className={style.block}>
          <p>{props}</p>
        </div>
      </HashLink>

    )
  }
  return (
    <HashLink
      to={`/catalog/${url}#top`}
    >
      <div className={style.block}>
        <p>{props}</p>
        <img src={img} height="150px" width="100%"/>
      </div>
    </HashLink>
  )
}
export default Categories
