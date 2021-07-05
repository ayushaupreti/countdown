import React, {useState} from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from "react-datepicker";
import '../styling/Countdown.css';

const Countdown = () => {

    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitEvent = (title, date) => {
        console.log(`${title} on ${date}`);
    };

    return (
        <div className="countdown">
            <div className="countdown_container">
                <div>
                    <AddBoxIcon fontSize="large" type="button" onClick={handleOpen}/>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New Event</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add an event title and date.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Title"
                                type="name"
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Date"
                                type="name"
                                fullWidth
                            />
                            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={submitEvent} color="primary">
                                Add Event
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default Countdown
