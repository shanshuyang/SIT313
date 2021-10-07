import React from "react";
import './Footer.css';

function FooterLeft(){
    return(
    <div className='footer-left-div'>
        <p className="p1">NEWSLETTER SIGN</p>
        <input className="footer-email-input" type='email' name='email' placeholder="Enter your email" size="30" />
        <button type="submit" className="submit-btn">Subscribe</button>
    </div>
    )
}

export default FooterLeft