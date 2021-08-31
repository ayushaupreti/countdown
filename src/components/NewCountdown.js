import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import validator from 'validator'
import * as uuid from "uuid";
import API from '../utility/API';
import '../styling/NewCountdown.css';
import $ from 'jquery';


const NewCountdown = () => {

    const history = useHistory();

    const [title, setTitle] = useState("My Event");
    const [date, setDate] = useState("");
    const [id, setId] = useState(uuid.v4());
    const [errorMessage, setErrorMessage] = useState("");

    const [screenWidth, setScreenWidth] = useState("");

    const minuteSeconds = 60;
    const hourSeconds = 3600;
    const daySeconds = 86400;

    const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const endTime = tomorrow / 1000; // use UNIX timestamp in seconds

    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");

    const [monthsArray, setMonthsArray] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

    const remainingTime = endTime - startTime;
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;
    const timerProps = {
        isPlaying: true,
        size: 120,
        strokeWidth: 6
    };

    const monthDisplay = (code) => {
        switch (code) {
            case 0:
                return 'January'
            case 1:
                return 'Febuary'
            case 2:
                return 'March'
            case 3:
                return 'April'
            case 4:
                return 'May'
            case 5:
                return 'June'
            case 6:
                return 'July'
            case 7:
                return 'August'
            case 8:
                return 'September'
            case 9:
                return 'October'
            case 10:
                return 'November'
            case 11:
                return 'December'
            default:
                return 'Month'
        }
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
        if(value === today.getFullYear()){
            console.log('SAME YEAR')
            setMonth(monthDisplay(tomorrow.getMonth()))
            let monthArr = [];
            for (let i = tomorrow.getMonth(); i <= 11; i++) {
                monthArr.push(i)
            }
            setMonthsArray(monthArr);
            setDay(tomorrow.getDate())
        } else{
            setMonthsArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        }
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
        if (month !== "" && day !== "" && year !== "") {
            const eventDate = new Date(`{Month}`)
            if (validator.isDate(eventDate)) {
                setErrorMessage('Valid Date')
            } else {
                setErrorMessage('Enter Valid Date!')
            }
        }
    }, [month, day, year]);

    useEffect(() => {
        setScreenWidth($(window).width())
        // eslint-disable-next-line
    }, []);


    return (
        <div class="container">
            <div className="mt-3 d-flex justify-content-between">
                <CancelIcon fontSize="large" onClick={handleCancel} />
                <CheckCircleIcon fontSize="large" onClick={submitEvent} />
            </div>
            <div className="row my-5 d-flex justify-content-center">
                <form>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <input
                                className="w-100"
                                type="name"
                                placeholder="Title"
                                label="Title"
                                value={title}
                                onChange={(e) => handleTitleChange(e)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Month</label>
                        <div className="col-sm-10">
                            {/* <input
                                type="name"
                                placeholder="Month"
                                label="Title"
                                value={monthDisplay(month)}
                                onChange={(e) => handleMonthChange(e)} /> */}
                            <select className="form-control">
                                {monthsArray.map(i => {
                                    return <option
                                        key={uuid.v4()}
                                        className='py-0 pb-1 my-0'
                                        value={month===i}
                                        onClick={() => handleMonthChange(i)}>{monthDisplay(i)}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Day</label>
                        <div className="col-sm-10">
                            <input
                                type="name"
                                placeholder="Day"
                                label="Title"
                                value={day}
                                onChange={(e) => handleDayChange(e)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label  className="col-sm-2 col-form-label">Year</label>
                        <div className="col-sm-10">
                            {/* <input
                                type="name"
                                placeholder="Year"
                                label="Title"
                                value={year}
                                onChange={(e) => handleYearChange(e)} /> */}
                            <select className="form-control">
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50].map(i => {
                                    return <option
                                        key={uuid.v4()}
                                        className='py-0 pb-1 my-0'
                                        value={i === 0}
                                        onClick={() => handleYearChange(tomorrow.getFullYear() + i)}>{tomorrow.getFullYear() + i}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    {/* <div className="form-row">
                        <div class="form-group col-12 col-md-4">
                            <label>Month</label>
                            <input
                                type="name"
                                placeholder="Month"
                                label="Title"
                                value={monthDisplay(month)}
                                onChange={(e) => handleMonthChange(e)} />
                        </div>
                        <div class="form-group col-12 col-md-4">
                            <label>Day</label>
                            <input
                                type="name"
                                placeholder="Day"
                                label="Title"
                                value={day}
                                onChange={(e) => handleDayChange(e)} />
                        </div>
                        <div class="form-group col-12 col-md-4">
                            <label>Year</label>
                            <input
                                type="name"
                                placeholder="Year"
                                label="Title"
                                value={year}
                                onChange={(e) => handleYearChange(e)} />
                        </div>
                    </div> */}
                </form>
            </div>
            <div className="d-flex justify-content-around m-5">
                <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#7E2E84"]]}
                    duration={daysDuration}
                    size={screenWidth / 4}
                    strokeWidth="11"
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
                    size={screenWidth / 4}
                    strokeWidth="11"
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
                    size={screenWidth / 4}
                    strokeWidth="11"
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
                    size={screenWidth / 4}
                    strokeWidth="11"
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
                    <form style={{ display: "inline-block" }}>
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
    )
}

export default NewCountdown
