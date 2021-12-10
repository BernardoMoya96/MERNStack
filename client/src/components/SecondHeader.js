import react from "react";
import {
    NavLink
} from "react-router-dom";
import Logout from "./Logout";
import './Header.css';
import 'antd/dist/antd.css';
import { Card } from 'antd';

export default function SecondHeader() {
    return (
        <div className='header'>        
                <div><NavLink className="nav-link" exact activeClassName="active" to='/'>Home</NavLink></div>
                <div><NavLink className="nav-link" activeClassName="active" to='/records'>Records</NavLink></div>
                <div><Logout /></div>
        </div>
    );

}

