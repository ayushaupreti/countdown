import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import AddBoxIcon from '@material-ui/icons/AddBox'; 
// import ShareIcon from '@material-ui/icons/Share';
// import EditIcon from '@material-ui/icons/Edit';
import API from '../utility/API';
// import * as uuid from "uuid";
import '../styling/Countdown.css';

const Countdowns = () => {

    const history = useHistory();
    
    // const [title, setTitle] = useState("");
    // const [date, setDate] = useState("");
    const events = [{ eventTitle: "Bday", eventDate: "june 4, 2021" }, { eventTitle: "first day of school", eventDate: "sept 4, 2021" }, { eventTitle: "christmas", eventDate: "dec 25, 2021" }, { eventTitle: "party!!!", eventDate: "july 23, 2021" }, { eventTitle: "toronto", eventDate: "july 24, 2021" }];
    // const [events, setEvents] = useState([]);

    useEffect(() => {
        const userEvents = API.getAllEvents();
        // setEvents(userEvents);
    }, []);

    const handleNewEvent = () => {
        history.push("/newcountdown")
    };

    return (
            <div className="row d-flex align-items-center">
                {events.length > 0 ? events.map((event, index) =>
                    <div className="mb-4 col-12 col-md-3">
                        <div class="card">
                            <div class="card-body d-flex justify-content-between">
                                <div>
                                    <h5 class="card-title">{event.eventTitle}</h5>
                                    <p class="card-text">{event.eventDate}</p>
                                </div>
                                {/* <div className="col">
                                        <div className="row">
                                            <EditIcon color="dark" className="m-auto" />
                                        </div>
                                        <div className="row">
                                            <ShareIcon color="dark" className="m-auto" />
                                        </div>
                                    </div> */}
                            </div>
                        </div>
                    </div>
                )
                    :
                    <p></p>
                }
                <div className="mb-4 col-12 col-md-3">
                    <button className="btn btn-link btn-lg d-flex justify-content-around" type="button" onClick={handleNewEvent}>
                        <AddBoxIcon fontSize="large" color="dark" className="m-auto" />
                        <span className="ml-2 my-auto">Add New Event</span>
                    </button>
                </div>
            </div>
    )
}

export default Countdowns
