import React from 'react'

export default function Attributes() {
    const today = new Date;
    function myName() {
        return "Boris";
    }
    const CurrCourse = () =>{
        return <h3 style={{fontSize:"40px", color:"green"}}>Pemograman Web Lanjut</h3>;
    }
    const bgBlue = {
        backgroundColor:"blue",
        color:"white"
    }
    const bgRed = {
        backgroundColor:"white",
        color:"red"
    }
    return (
        <div>
            <h1 style={bgBlue}>Today is {today.toTimeString()}</h1>
            <h2 style={bgRed}>My name is {myName()}</h2>
            {CurrCourse()}
        </div>
    )
}