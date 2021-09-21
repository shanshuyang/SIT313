import React from "react";
import './Navigation.css'

function Navigation(props){
    return(
        <div className='NavigationColumn'>
            <a href="www.baidu.com">{props.text}</a>
        </div>
    )
}

export default Navigation