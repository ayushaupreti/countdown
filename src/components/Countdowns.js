import React, { useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import AddBoxIcon from '@material-ui/icons/AddBox'; 
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import API from '../utility/API';
import moment from 'moment';
import Form from './Form'
// import * as uuid from "uuid";

const Countdowns = () => {

    const history = useHistory();
    
    // const [title, setTitle] = useState("");
    // const [date, setDate] = useState("");
    // const events = [{ eventTitle: "Bday", eventDate: "june 4, 2021" }, { eventTitle: "first day of school", eventDate: "sept 4, 2021" }, { eventTitle: "christmas", eventDate: "dec 25, 2021" }, { eventTitle: "party!!!", eventDate: "july 23, 2021" }, { eventTitle: "toronto", eventDate: "july 24, 2021" }];
    const [events, setEvents] = useState();
    const [timerEvent, setTimerEvent] = useState({})

    useEffect(() => {
        return API.getAllEvents().then((res) => setEvents(res))
    }, []);

    const handleNewEvent = () => {
        history.push("/newcountdown")
    };

    const convertToSeconds = (date) => {
        const d = new Date(date)
        return d.getTime()/1000
    }

    return (
        <div className="container" >
            <div className="row d-flex align-items-center mt-5">
                {events && events.map((userEvent, index) =>
                    <div key={userEvent.eventTitle + index} className="mb-4 col-12 col-md-4">
                        <div className="card" id={`heading${index}`}>
                            <div className="card-body d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">{userEvent.eventTitle}</h5>
                                    <p className="card-text">{moment(userEvent.eventDate).format('MMM DD YYYY')}</p>
                                </div>
                                <div className="d-flex flex-column justify-content-between">
                                    <EditIcon data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}/>
                                    <ShareIcon />
                                </div>
                            </div>
                            <div id={`collapse${index}`} className="collapse" aria-labelledby={`heading${index}`} data-parent="#accordion">
                                <div className="card-body">
                                    <Form timerEvent={{"title": userEvent.title, "endTime": convertToSeconds(userEvent.eventDate)}} setTimerEvent={setTimerEvent}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="mb-4 col-12 col-md-3">
                    <button className="btn btn-link btn-lg d-flex justify-content-around" type="button" onClick={handleNewEvent}>
                        <AddBoxIcon fontSize="large" className="m-auto" />
                        <span className="ml-2 my-auto">Add New Event</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Countdowns
