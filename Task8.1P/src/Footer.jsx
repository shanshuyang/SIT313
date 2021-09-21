import React from "react";
import './Footer.css';
import FooterLeft from "./FooterLeft";
import FooterRight from "./FooterRight";

function Footer(){
    return(
        <div className='footer-div'>
            <FooterLeft />
            <FooterRight />
        </div>
    )
}


export default Footer