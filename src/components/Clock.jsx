import React, { useState, useEffect } from "react";

function Clock() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [mode, setMode] = useState("Session");
  const [running, setRunning] = useState(false);
  const [timer, setTimer] = useState({
    min: 25,
    sec: 0,
  });
  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
      setRunning(false);
      setMode("Session");
    }

    //clearInterval(this.timer);
  };
  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
      setRunning(false);
      setMode("Session");
    }

    //clearInterval(this.timer);
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimer({
        min: sessionLength + 1,
        sec: 0,
      });
      setRunning(false);
      setMode("Session");
    }

    //clearInterval(this.timer);
  };
  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimer({
        min: sessionLength - 1,
        sec: 0,
      });
      setRunning(false);
      setMode("Session");
    }

    //clearInterval(this.timer);
  };

  const handleReset = () => {
    const audio_element = document.getElementById("beep");
    audio_element.pause();
    audio_element.currentTime = 0;
    setBreakLength(5);
    setSessionLength(25);
    setTimer({
      min: 25,
      sec: 0,
    });
    setRunning(false);
    setMode("Session");

    //clearInterval(this.timer);
  };
  const changeMode = (mode) => {
    setMode(mode);
  };

  return (
    <div>
      <div>
        <h1 id="time-left">
          {("" + timer.min).length == 1 ? "0" + timer.min : timer.min}:
          {("" + timer.sec).length == 1 ? "0" + timer.sec : timer.sec}
        </h1>
        <div className="text-center timer">
          <h3 id="timer-label">{mode}</h3>
          <button
            className={!running ? "btn btn-primary" : "btn btn-danger"}
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
              <h5 id="break-length">{breakLength}</h5>
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
                <h5 id="session-length">{sessionLength}</h5>
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
