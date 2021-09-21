import React from "react";
import './Footer.css';

function FooterLeft(){
    return(
    <div className='footer-left-div'>
        <p className="p1">NEWSLETTER SIGN</p>
        <input type='email' name='email' placeholder="Enter your email" size="30" />
        <button type="submit">Subscribe</button>
    </div>
    )
}

export default FooterLeft