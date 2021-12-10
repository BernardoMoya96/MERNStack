import react from "react";
import {
    NavLink
} from "react-router-dom";
import Logout from "./Logout";
import './Header.css';
import 'antd/dist/antd.css';
import { Card } from 'antd';

export default function FirstHeader() {
    return (
        <div className='header'>        
                <h1>Welcome</h1>
        </div>
    );

}

