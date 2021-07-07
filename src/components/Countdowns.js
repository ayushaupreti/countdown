import React, { useState} from 'react';
import { useHistory } from 'react-router';
import AddBoxIcon from '@material-ui/icons/AddBox'; 
import * as uuid from "uuid";
import '../styling/Countdown.css';

const Countdowns = () => {

    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const events = [{ eventTitle: "Bday", eventDate: "june 4, 2021" }, { eventTitle: "school", eventDate: "sept 4, 2021" }, { eventTitle: "christmas", eventDate: "dec 25, 2021" }];

    const handleNewEvent = () => {
        history.push("/newcountdown")
    };

    const CountdownCard = () => {
        return (
            <div className="countdown_card" key={uuid.v1()}>
                <h1 className='mb-3 d-none d-sm-block'>My Birthday</h1>
                <h4 className='mb-3 d-none d-sm-block'>January 5, 1999</h4>
            </div>
        )
    }

    return (
        <div className="countdown">
            <div className="countdown_container">
                <div>
                    <AddBoxIcon fontSize="large" type="button" onClick={handleNewEvent}/>
                    <CountdownCard />
                </div>
            </div>
        </div>
    )
}

export default Countdowns
