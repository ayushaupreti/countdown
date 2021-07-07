import React, { useState } from 'react';
import { useHistory } from 'react-router';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import '../styling/NewCountdown.css';

const NewCountdown = () => {

    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [id, setId] = useState("");


    const minuteSeconds = 60;
    const hourSeconds = 3600;
    const daySeconds = 86400;

    const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = new Date(2021, 6, 24) / 1000; // use UNIX timestamp in seconds

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
        console.log(`${title} on ${date}`);
        history.push('countdowns');
    };


    return (
        <div className="new_countdown">
            <div className="new_countdown_container">
                <div className="new_countdown_action_buttons">
                    <CancelIcon fontSize="large" onClick={handleCancel}/>
                    <CheckCircleIcon fontSize="large" onClick={submitEvent}/>
                </div>
                {/* <div className="row d-flex justify-content-center">
                    <form>
                        <div className="form-group col-md-6">
                            <input 
                                type="name" 
                                placeholder="Title"
                                label="Title"
                                value={title}
                                onChange={(e) => handleTitleChange(e)}/>
                        </div>
                        <div className="form-group col-md-6">
                            <input
                                type="name"
                                placeholder="Month"
                                label="Title"
                                value={title}
                                onChange={(e) => handleTitleChange(e)} />
                            <input
                                type="name"
                                placeholder="Day"
                                label="Title"
                                value={title}
                                onChange={(e) => handleTitleChange(e)} />
                            <input
                                type="name"
                                placeholder="Year"
                                label="Title"
                                value={title}
                                onChange={(e) => handleTitleChange(e)} />
                        </div>
                    </form>
                </div> */}
                <div className="d-flex justify-content-around p-5">
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
                <div>
                    {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New Event</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add an event title and date.
                            </DialogContentText>
                            <form>
                                <input
                                    className="title-input"
                                    placeholder="Title"
                                    label="Title"
                                    value={title}
                                    onChange={(e) => handleTitleChange(e)}
                                    fullwidth="true"
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={submitEvent} color="primary">
                                Add Event
                            </Button>
                        </DialogActions>
                    </Dialog> */}
                </div>
            </div>
        </div>
    )
}

export default NewCountdown
