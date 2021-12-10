import React, { useState } from "react";
import {Button } from "antd";
import "antd/dist/antd.css";


export default function Logout() {              
    const [loading, setLoading] = useState(false);

    const logout = async e => {        
        localStorage.clear();                        
        window.location.reload(false);
    }

    const onClick = () => {        
        setLoading(true);    
        setTimeout(() => {
          setLoading(false);
        }, 6000);
        logout();
    };
    return (      
        <div>
            <Button type="primary" loading={loading} onClick={onClick}>      
                Logout
            </Button>
        </div>                    
    );
}