import React from 'react';
import { Context } from '../../context/Context';
import { useContext } from 'react';


export default function HeaderHome(){
    const {user} = useContext(Context)
    
    return(
        <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
            backgroundColor: "red",
          }}
        >
            <h1>HeaderHome</h1>
            <h1>{user}</h1>
        </div>
    )
}