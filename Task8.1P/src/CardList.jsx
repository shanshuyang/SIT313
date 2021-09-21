import React from "react";
import Card from "./Card";
import './Card.css';
import expertList from './expertList';

function CardList(){
    return(
        <div className="CardRow">
            {expertList.map((expert)=>{
                return(
                    <Card
                    key = {expert.Key} 
                    avatar = {expert.avatar}
                    name = {expert.name}
                    position = {expert.position} />
                )
            })}
        </div>
    )
}

export default CardList