import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import * as uuid from "uuid";
import API from '../utility/API';
import '../styling/NewCountdown.css';


const NewCountdown = () => {

    const history = useHistory();

    const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const [endTime, setEndTime] = useState(tomorrow / 1000); // use UNIX timestamp in seconds

    const [title, setTitle] = useState("");
    const [date, setDate] = useState(tomorrow);
    const [id, setId] = useState(uuid.v4());

    const [month, setMonth] = useState(tomorrow.getMonth());
    const [day, setDay] = useState(tomorrow.getDate());
    const [year, setYear] = useState(tomorrow.getFullYear());
    const [time, setTime] = useState(tomorrow.getHours() + `:` + (tomorrow.getMinutes() > 9 ? tomorrow.getMinutes() : '0'+tomorrow.getMinutes()));
    const [hr, setHr] = useState(time.split(":")[0]);
    const [min, setMin] = useState(time.split(":")[1]);

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    }
    const monthsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const [daysArray, setDaysArray] = useState(Array(daysInMonth(month, year)).fill(0).map((e,i)=>i+1));
    const yearsArray = Array(50).fill(today.getFullYear()).map((year, index) => year + index)

    const [remainingTime, setRemainingTime] = useState(endTime - startTime);
    let seconds = remainingTime;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    const [timer, setTimer] = useState();

    useEffect(() => {
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

    const handleCancel = () => {
        history.push('countdowns');
    };

    const handleTitleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setTitle(value);
    };

    const handleIdChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setId(value);
    };

    const handleMonthChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setMonth(value);
        setDaysArray(Array(daysInMonth(value, year)).fill(1).map((e, i) => i + 1));
        updateDate(year, value, day, hr, min, 0);
    };

    const handleDayChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setDay(value);
        updateDate(year, month, value, hr, min, 0);
    };

    const handleYearChange = (e) => {
        if(day < today.getDate()){
            setDay(today.getDate());
        }
        if(month < today.getMonth()){
            setMonth(today.getMonth());
        }
        e.preventDefault();
        let value = e.target.value;
        setYear(value);
        setDaysArray(Array(daysInMonth(month, value)).fill(1).map((e, i) => i + 1));
        updateDate(value, (month < today.getMonth() ? today.getMonth() : month), (day < today.getDate() ? tomorrow.getDate() : day), hr, min, 0);
    };

    const submitEvent = () => {
        API.addEvent(title, date, id);
        history.push('countdowns');
    };

    const updateDate = (year, month, day, hr, min, sec) =>{
        const d = new Date(year, month, day, hr, min, sec);
        setDate(d);
        setEndTime(d/1000);
        setRemainingTime(Math.floor(d / 1000 - startTime));
    };

    const handleTime = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setTime(value);
        setHr(value.split(":")[0]);
        setMin(value.split(":")[1]);
        updateDate(year, month, day, value.split(":")[0], value.split(":")[1], 0);
    };

    return (
        <div className="container">
            <div className="mt-3 d-flex justify-content-between">
                <CancelIcon fontSize="large" onClick={handleCancel} />
                <CheckCircleIcon fontSize="large" onClick={submitEvent} />
            </div>
            <div className="row my-5">
                <form className="pt-3 w-100">
                    <div className="form-group row">
                        <div className="col-12">
                            <input
                                required
                                className="w-100"
                                type="name"
                                placeholder="Event Title"
                                label="Title"
                                value={title}
                                onChange={(e) => handleTitleChange(e)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2 col-form-label">Time</label>
                        <div className="col-10">
                            <input type="time" className="w-100" min="00:00" max="23:59" value={time} onChange={handleTime}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2 col-form-label">Month</label>
                        <div className="col-10">
                            <select value={month} className="form-control" onChange={(e) => { handleMonthChange(e)}}>
                                {monthsArray.map(i => {
                                    return <option
                                        key={`month-`+i}
                                        disabled={year === today.getFullYear() && i < today.getMonth()}
                                        className='py-0 pb-1 my-0'
                                        value={i}>{monthDisplay(i)}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2 col-form-label">Day</label>
                        <div className="col-10">
                            <select value={day} className="form-control" onChange={(e) => { handleDayChange(e)}}>
                                {daysArray.map(i => {
                                    return <option
                                        key={`day-`+i}
                                        disabled={year === today.getFullYear() && month === today.getMonth() && i < today.getDate()}
                                        className='py-0 pb-1 my-0'
                                        value={i}>{i}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label  className="col-2 col-form-label">Year</label>
                        <div className="col-10">
                            <select value={year} className="form-control" onChange={(e) => { handleYearChange(e)}}>
                                {yearsArray.map(i => {
                                    return <option
                                        key={`year-`+i}
                                        className='py-0 pb-1 my-0'
                                        value={i}>{i}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div className="row my-5 border border-dark">
                <div className="col-3">
                    <div className="row">
                        <h2>{days}</h2>
                    </div>
                    <div className="row">days</div>
                </div>
                <div className="col-3">
                    <div className="row">
                        <h2>{hours}</h2>
                    </div>
                    <div className="row">hours</div>
                </div>
                <div className="col-3">
                    <div className="row">
                        <h2>{minutes}</h2>
                    </div>
                    <div className="row">minutes</div>
                </div>
                <div className="col-3">
                    <div className="row">
                        <h2>{seconds}</h2>
                    </div>
                    <div className="row">seconds</div>
                </div>
            </div>
            <div className="row my-5 d-flex justify-content-center align-items-center border border-dark">
                <p style={{ display: "inline" }} className="font-weight-bold"> Change the url: &nbsp;</p>
                <p style={{ display: "inline" }} >https://countdown.com/event/
                    <form style={{ display: "inline-block" }}>
                        <input
                            style={{ width: "350px" }}
                            className="mx-1 border-top-0 border-left-0 border-right-0 bg-transparent"
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
