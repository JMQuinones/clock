import React, { useState, useEffect } from "react";
import { useRef } from "react";
function Clock() {
  const [breakLength, setBreakLength] = useState(300);
  const [sessionLength, setSessionLength] = useState(1500);
  const [mode, setMode] = useState("Session");
  const [running, setRunning] = useState(false);
  /* const [timer, setTimer] = useState({
    min: 25,
    sec: 0,
  });*/
  //const [mins, setMins] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [secs, setSecs] = useState(0);
  const intervalRef = useRef(null);
  const timeRef = useRef(1500);
  //let countDownInterval = null;
  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  const handleBreakIncrement = () => {
    if (breakLength < 3600) {
      setBreakLength(breakLength + 60);
      setRunning(false);
      setMode("Session");
    }
    resetInterval();
    //clearInterval(countDownInterval);
  };
  const handleBreakDecrement = () => {
    if (breakLength > 60) {
      setBreakLength(breakLength - 60);
      setRunning(false);
      setMode("Session");
    }
    resetInterval();
    //clearInterval(countDownInterval);
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 3600) {
      setSessionLength(sessionLength + 60);
      setTimeLeft(timeLeft + 60);
      timeRef.current = timeRef.current + 60;
      /*setTimer({
        min: sessionLength + 1,
        sec: 0,
      });*/
      setRunning(false);
      setMode("Session");
    }

    //clearInterval(countDownInterval);
    resetInterval();
  };
  const handleSessionDecrement = () => {
    if (sessionLength > 60) {
      setSessionLength(sessionLength - 60);
      setTimeLeft(sessionLength - 60);
      timeRef.current = sessionLength - 60;
      /*setTimer({
        min: sessionLength - 1,
        sec: 0,
      });*/
      setRunning(false);
      setMode("Session");
    }

    //clearInterval(countDownInterval);
    resetInterval();
  };

  const getFormattedTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return {
      mins,
      secs,
    };
  };
  const handleReset = () => {
    const audio_element = document.getElementById("beep");
    audio_element.pause();
    audio_element.currentTime = 0;
    setBreakLength(300);
    setSessionLength(1500);
    setTimeLeft(1500);
    timeRef.current = 1500;
    /*setTimer({
      min: 25,
      sec: 0,
    });*/
    setRunning(false);
    setMode("Session");
    //console.log("countDownInterval", countDownInterval);
    //clearInterval(countDownInterval);
    resetInterval();
  };
  /*const changeMode = (mode) => {
    setMode(mode);
  };*/

  const runTimer = () => {
    const timerState = running;
    console.log(timerState);
    if (timerState) {
      //clearInterval(countDownInterval);
      resetInterval();
      setRunning(false);
    } else {
      //countDownInterval = setInterval(countDown, 1000);
      intervalRef.current = setInterval(countDown, 1000);

      setRunning(true);
    }
  };

  const countDown = () => {
    console.log(timeLeft);
    if (breakLength == 0 && sessionLength == 0) {
      resetInterval();
      setRunning(false);
    }
    if (timeRef.current === 0) {
      if (mode == "Session") {
        const audio_element = document.getElementById("beep");
        audio_element.play();
        setMode("Break");
        setTimeLeft(breakLength);
        timeRef.current = breakLength;
      } else if (mode == "Break") {
        const audio_element = document.getElementById("beep");
        audio_element.play();
        setMode("Session");
        setTimeLeft(sessionLength);
        timeRef.current = sessionLength;
      }
    } else {
      setTimeLeft((timeLeft) => timeLeft - 1);
      timeRef.current = timeRef.current - 1;
    }
  };

  return (
    <div>
      <div>
        {timeLeft}
        {timeRef.current}
        <h1 id="time-left">
          {("" + getFormattedTime(timeLeft).mins).length == 1
            ? "0" + getFormattedTime(timeLeft).mins
            : getFormattedTime(timeLeft).mins}
          :
          {("" + getFormattedTime(timeLeft).secs).length == 1
            ? "0" + getFormattedTime(timeLeft).secs
            : getFormattedTime(timeLeft).secs}
        </h1>
        <div className="text-center timer">
          <h3 id="timer-label">{mode}</h3>
          <button
            className={!running ? "btn btn-primary" : "btn btn-danger"}
            onClick={runTimer}
            id="start_stop"
          >
            {!running ? "play" : "pause"}
          </button>
          <button
            className="btn btn-secondary"
            id="reset"
            onClick={handleReset}
          >
            reset
          </button>
          <audio
            id="beep"
            preload="auto"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          />
        </div>

        <div className="row length text-center m-5">
          <div className="col">
            <h4 id="break-label">Break Length</h4>
            <div className="buttons-flex">
              <button
                className="btn btn-success"
                id="break-increment"
                onClick={handleBreakIncrement}
              >
                +
              </button>
              <h5 id="break-length">{getFormattedTime(breakLength).mins}</h5>
              <button
                className="btn btn-danger"
                id="break-decrement"
                onClick={handleBreakDecrement}
              >
                -
              </button>
            </div>
          </div>
          <div className="col">
            <div>
              <h4 id="session-label">Session Length</h4>
              <div className="buttons-flex">
                <button
                  className="btn btn-success"
                  id="session-increment"
                  onClick={handleSessionIncrement}
                >
                  +
                </button>
                <h5 id="session-length">
                  {getFormattedTime(sessionLength).mins}
                </h5>
                <button
                  className="btn btn-danger"
                  id="session-decrement"
                  onClick={handleSessionDecrement}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
