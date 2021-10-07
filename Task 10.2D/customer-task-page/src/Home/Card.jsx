import React from "react";
import './Card.css';
import './Image.css'

function Card(props){
    return(
        <div className='CardColumn'>
            <img src={props.avatar} alt="expert" />
            <h3>{props.name}</h3>
            <p>Description: {props.position}</p>
            <div className='star_bar'>
                <h2><img src={require("../images/star.jpg").default} alt='iamges' className='image_star'/> 5 star</h2>                
            </div>
        </div>
    )
}

export default Card