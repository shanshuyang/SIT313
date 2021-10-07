import React from "react";
import './Navigation.css'
import { Link } from 'react-router'

function NavigationList(){
    return(
        <div>
            <ul className="NavigationRow">
                <li className="NavigationColumn"><Link to="/" activeClassName="active" onlyActiveOnIndex={true}>IService</Link></li>
                <li className="NavigationColumn"><Link to="/createtask" activeClassName="active" onlyActiveOnIndex={true}>Post a task</Link></li>
                <li className="NavigationColumn">Become a expert</li>
                <li className="NavigationColumn"><Link to="/findtask" activeClassName="active" onlyActiveOnIndex={true}>Find tasks</Link></li>
                <li className="NavigationColumn">How it works</li>
                <li className="NavigationColumn">Sign in</li>
            </ul>
        </div>
    )
}

export default NavigationList