import React, { useState } from 'react';
import { useHistory } from 'react-router';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import * as uuid from "uuid";
import API from '../utility/API';
import Form from './Form'
import Timer from './Timer'

const NewCountdown = () => {

    const history = useHistory();

    const [timerEvent, setTimerEvent] = useState()
    const [id, setId] = useState(uuid.v4())

    // const [titleError, setTitleError] = useState()

    const handleCancel = () => {
        history.push('countdowns');
    };

    const handleIdChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setId(value);
    };

    const submitEvent = () => {
        let title = timerEvent.title
        let date = new Date(timerEvent.endTime*1000)
        if(title){
            API.addEvent(title, date, id);
            history.push('countdowns');
        } else{
            alert("add title")
        }
    };

    return (
        <div className="container">
            <div className="my-5 d-flex justify-content-between">
                <CancelIcon fontSize="large" onClick={handleCancel} />
                <CheckCircleIcon fontSize="large" onClick={submitEvent} />
            </div>
            <Form timerEvent={timerEvent} setTimerEvent={setTimerEvent}/>
            {timerEvent && <Timer key={timerEvent.endTime} endTime={timerEvent.endTime}/> }
            <div className="my-5">
                <div className="font-weight-bold mb-2"> Change the url: &nbsp;</div>
                <div className="d-flex flex-wrap mb-2">
                    <div className="">
                        https://countdown.com/event/
                    </div>
                    <div className="w-75">
                        <input
                            className="w-75 border-top-0 border-left-0 border-right-0 bg-transparent"
                            type="name"
                            placeholder={id}
                            label="event id"
                            value={id}
                            onChange={(e) => handleIdChange(e)} />
                    </div>
                </div>
                <div><small>Please note: this URL cannot be changed once saved</small></div>
            </div>
        </div>
    )
}

export default NewCountdown
