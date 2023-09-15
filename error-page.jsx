"use client";

import  { MdSentimentVeryDissatisfied } from "react-icons/md";


import React from 'react'

const ErrorPage = () => {
  return (
    <div className="error">
        <MdSentimentVeryDissatisfied />
        <div className="text">
            <h1>Error! Page not found</h1>
            <p>Unable to get the page you are looking for </p>
        </div> 
      
    </div>
  )
}

export default ErrorPage;
