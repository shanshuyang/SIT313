import React from "react";
import './Footer.css'
import './Image.css'

function FooterRight(){
    return(
        <div className="footer-right-div">
            <p className="p2">CONNECT US </p>
            <img src={require("../images/share.png").default} alt='iamges' className='image_share' />
        </div>
    )
}

export default FooterRight