import React, { useEffect, useState } from 'react';

const Timer = ({endTime}) => {

    const [timer, setTimer] = useState();
    const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const [remainingTime, setRemainingTime] = useState(endTime - startTime);
    let seconds = Math.floor(remainingTime);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    useEffect(() => {
        console.log("updating timer")
        if (timer) {
            clearInterval(timer);
        }
        const newTimer = setInterval(() => {
            setRemainingTime((remainingTime) => remainingTime - 1)
        }, 1000);

        setTimer(newTimer);
        return () => clearInterval(timer);
        // eslint-disable-next-line
    }, []);


    return (
        <div className="container">
            <div className="d-none d-md-flex justify-content-between my-5 border border-dark">
                <div className="col-3 text-center">
                    <h1>{days}</h1>
                    <div>days</div>
                </div>
                <div className="col-3 text-center">
                    <h1>{hours}</h1>
                    <div>hours</div>
                </div>
                <div className="col-3 text-center">
                    <h1>{minutes}</h1>
                    <div>minutes</div>
                </div>
                <div className="col-3 text-center">
                    <h1>{seconds}</h1>
                    <div>seconds</div>
                </div>
            </div>
            <div className="d-md-none d-flex my-5 border border-dark">
                <div className="col-3 text-center">
                    <h4>{days}</h4>
                    <div className="small">days</div>
                </div>
                <div className="col-3 text-center">
                    <h4>{hours}</h4>
                    <div className="small">hrs</div>
                </div>
                <div className="col-3 text-center">
                    <h4>{minutes}</h4>
                    <div className="small">mins</div>
                </div>
                <div className="col-3 text-center">
                    <h4>{seconds}</h4>
                    <div className="small">secs</div>
                </div>
            </div>
        </div>
    )
}

export default Timer
