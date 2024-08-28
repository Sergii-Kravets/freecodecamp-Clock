import { useState, useEffect } from 'react'



function Clock(){
    const [breakLength, setBreakLength] = useState(5)
    const [sessionLength, setSessionLength] = useState(25)
    const [sessionLengthSet, setSessionLengthSet ] =  useState(false);
    const [timeLeft, setTime] = useState(sessionLength)
    const [play, setPlay] = useState(false)
    const [seconds, setSeconds ] =  useState(0);



    useEffect(()=>{
        if (!play) return;

        if (!timeLeft && !seconds) {
            const timerLabel = document.getElementById("timer-label")
            document.getElementById("beep").play();

            if (sessionLengthSet){
                timerLabel.innerText = "Session"
                setTime(sessionLength);
                setSessionLengthSet(!sessionLengthSet)
            } else {
                timerLabel.innerText = "Break"
                setTime(breakLength);
                setSessionLengthSet(!sessionLengthSet)
            }
        }

        let intervalId = setInterval(() => {

            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (timeLeft === 0) {
                    clearInterval(intervalId)
                } else {
                    setTime(timeLeft - 1);
                    setSeconds(59);
                }
            }
        }, 100)


        return () => clearInterval(intervalId);
    }, [play, seconds, timeLeft]);

    return (
        <div className="container">
            <p>25 + 5 Clock</p>
            <div className="control">
                <div className="length-control">
                    <p id="break-label">Break Length</p>
                    <div className="length-control-button">
                        <button id="break-increment" onClick={()=>{if (!play) {breakLength < 60? setBreakLength(breakLength + 1): setBreakLength(breakLength)}}}>+</button>
                        <p id="break-length">{breakLength}</p>
                        <button id="break-decrement" onClick={()=>{if (!play) {breakLength > 1? setBreakLength(breakLength-1): setBreakLength(breakLength)}}}>-</button>
                    </div>
                </div>
                <div className="length-control">
                    <p id="session-label">Session Length</p>
                    <div className="length-control-button">
                        <button id="session-increment" onClick={()=>{
                            if (!play) {
                                if (sessionLength < 60) {
                                    setSessionLength(sessionLength + 1)
                                    setTime(sessionLength + 1)
                                } else {
                                    setSessionLength(sessionLength)
                                    setTime(sessionLength)
                                }
                        }}}>+</button>
                        <p id="session-length">{sessionLength}</p>
                        <button id="session-decrement" onClick={()=>{
                            if (!play) {
                                sessionLength > 1? setSessionLength(sessionLength-1): setSessionLength(sessionLength)
                                sessionLength > 1? setTime(sessionLength-1): setTime(sessionLength)
                            }}
                        }>-</button>
                    </div>
                </div>
            </div>
            <div className="timer">
                <p id="timer-label">Session</p>
                <p id="time-left">{timeLeft >= 10? timeLeft: `0${timeLeft}`}:{seconds >= 10? seconds: `0${seconds}`}</p>
            </div>
            <div className="timer-control">
                <button id="start_stop" onClick={()=>setPlay(!play)}>Play/Stop</button>
                <button id="reset" onClick={()=>{
                    setBreakLength(5);
                    setSessionLength(25);
                    setSeconds(0);
                    setTime(25);
                    setPlay(false);
                    setSessionLengthSet(false);

                    const timerLabel = document.getElementById("timer-label")
                    timerLabel.innerText = "Session"

                    document.getElementById("beep").currentTime = 0;
                    document.getElementById("beep").pause();
                }}>Refresh</button>
            </div>
            <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
    )
}

export default Clock
