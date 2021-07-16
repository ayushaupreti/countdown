import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import validator from 'validator'
import * as uuid from "uuid";
import API from '../utility/API';
import '../styling/NewCountdown.css';

const NewCountdown = () => {

    const history = useHistory();

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");
    const [id, setId] = useState(uuid.v4());
    const [errorMessage, setErrorMessage] = useState("");

    const minuteSeconds = 60;
    const hourSeconds = 3600;
    const daySeconds = 86400;

    const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const endTime = tomorrow / 1000; // use UNIX timestamp in seconds

    const remainingTime = endTime - startTime;
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;
    const timerProps = {
        isPlaying: true,
        size: 120,
        strokeWidth: 6
    };

    const renderTime = (dimension, time) => {
        return (
            <div className="time-wrapper">
                <div className="time">{time}</div>
                <div>{dimension}</div>
            </div>
        );
    };
    const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
    const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
    const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
    const getTimeDays = (time) => (time / daySeconds) | 0;


    const handleCancel = () => {
        history.push('countdowns');
    };

    const handleTitleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setTitle(value);
    };

    const handleMonthChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setMonth(value);
    };

    const handleDayChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setDay(value);
    };

    const handleYearChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setYear(value);
    };

    const handleDateChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setDate(value);
    };

    const handleIdChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setId(value);
    };

    const submitEvent = () => {
        API.addEvent(title, date, id);
        history.push('countdowns');
    };

    useEffect(() => {
        if(month !== "" && day !== "" && year !== ""){
            const eventDate = new Date(`{Month}`)
            if (validator.isDate(eventDate)) {
                setErrorMessage('Valid Date')
            } else {
                setErrorMessage('Enter Valid Date!')
            }
        }
    }, [month, day, year]);


    return (
        <div className="new_countdown">
            <div className="new_countdown_container">
                <div className="new_countdown_action_buttons">
                    <CancelIcon fontSize="large" onClick={handleCancel}/>
                    <CheckCircleIcon fontSize="large" onClick={submitEvent}/>
                </div>
                <div className="row my-5 d-flex justify-content-center">
                    <form>
                        <div className="form-row mb-4">
                            <div class="col">
                                <input
                                    className="w-100"
                                    type="name"
                                    placeholder="Title"
                                    label="Title"
                                    value={title}
                                    onChange={(e) => handleTitleChange(e)} />
                            </div>
                        </div>
                        <div className="form-row">
                                <div class="col">
                                    <input
                                        type="name"
                                        placeholder="Month"
                                        label="Title"
                                        value={month}
                                        onChange={(e) => handleMonthChange(e)} />
                                </div>
                                <div class="col">
                                    <input
                                        type="name"
                                        placeholder="Day"
                                        label="Title"
                                        value={day}
                                        onChange={(e) => handleDayChange(e)} />
                                </div>
                                <div class="col">
                                    <input
                                        type="name"
                                        placeholder="Year"
                                        label="Title"
                                        value={year}
                                        onChange={(e) => handleYearChange(e)} />
                                </div>
                            </div>
                    </form>
                </div>
                <div className="d-flex justify-content-around p-5 m-5">
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[["#7E2E84"]]}
                        duration={daysDuration}
                        size="160"
                        strokeWidth="12"
                        initialRemainingTime={remainingTime}
                    >
                        {({ elapsedTime }) =>
                            renderTime("days", getTimeDays(daysDuration - elapsedTime))
                        }
                    </CountdownCircleTimer>
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[["#D14081"]]}
                        duration={daySeconds}
                        size="160"
                        strokeWidth="12"
                        initialRemainingTime={remainingTime % daySeconds}
                        onComplete={(totalElapsedTime) => [
                            remainingTime - totalElapsedTime > hourSeconds
                        ]}
                    >
                        {({ elapsedTime }) =>
                            renderTime("hours", getTimeHours(daySeconds - elapsedTime))
                        }
                    </CountdownCircleTimer>
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[["#EF798A"]]}
                        duration={hourSeconds}
                        size="160"
                        strokeWidth="12"
                        initialRemainingTime={remainingTime % hourSeconds}
                        onComplete={(totalElapsedTime) => [
                            remainingTime - totalElapsedTime > minuteSeconds
                        ]}
                    >
                        {({ elapsedTime }) =>
                            renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
                        }
                    </CountdownCircleTimer>
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[["#218380"]]}
                        duration={minuteSeconds}
                        size="160"
                        strokeWidth="12"
                        initialRemainingTime={remainingTime % minuteSeconds}
                        onComplete={(totalElapsedTime) => [
                            remainingTime - totalElapsedTime > 0
                        ]}
                    >
                        {({ elapsedTime }) =>
                            renderTime("seconds", getTimeSeconds(elapsedTime))
                        }
                    </CountdownCircleTimer>
                </div>
                <div className="row my-5 d-flex justify-content-center align-items-center">
                    <p style={{ display: "inline" }} className="font-weight-bold"> Change the url: &nbsp;</p>
                    <p style={{ display: "inline" }} >https://countdown.com/event/
                        <form style={{display: "inline-block"}}>
                            <input
                                style={{ width: "350px" }}
                                className="mx-1"
                                type="name"
                                placeholder={id}
                                label="event id"
                                value={id}
                                onChange={(e) => handleIdChange(e)} />
                        </form> 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NewCountdown
