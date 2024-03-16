"use client"
import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US");

  return (
    <div className="clock">
      <h1>Time:</h1>
      <p>{formattedTime}</p>
    </div>
  );
};

export default Clock;
