import React from "react";
import Navigation from "./Navigation";
import './Navigation.css'
import navContentList from './navContentList'

function NavigationList(){
    return(
        <div className="NavigationRow">
            {navContentList.map((navigation)=>{
                return(<Navigation key={navigation.Key} text={navigation.text}/>)
            })}
        </div>
    )
}

export default NavigationList