import React, { useState, useEffect } from 'react';

const Form = ({timerEvent, setTimerEvent, error}) => {

    // timerEvent = {
    //     title: "",
    //     endTime: ""
    // }

    // const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const today = new Date()
    const [endDate, setEndDate] = useState()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const [month, setMonth] = useState();
    const [day, setDay] = useState();
    const [year, setYear] = useState();
    const [time, setTime] = useState();
    const [hr, setHr] = useState();
    const [min, setMin] = useState();

    const daysInMonth = (month, year) => {
        // console.log(month, year)
        return new Date(year, month + 1, 0).getDate();
    }

    const monthsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    // const [monthsMap, setMonthsMap] = useState({ 0: "false", 1: "false", 2: "false", 3: "false", 4: "false", 5: "false", 6: "false", 7: "false", 8: "false", 9: "false", 10: "false", 11: "false"})
    const [daysArray, setDaysArray] = useState();
    const yearsArray = Array(50).fill(today.getFullYear()).map((year, index) => year + index)

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(error)

    useEffect(() => {
        let eDate;
        if (!timerEvent) {
            setEndDate(tomorrow)
            let e = {
                title: "",
                endTime: tomorrow / 1000
            }
            setTimerEvent(e)
            eDate = tomorrow
        } else{
            setEndDate(new Date(timerEvent.endTime*1000))
            eDate = new Date(timerEvent.endTime * 1000)
        }
        console.log(eDate)
        setMonth(eDate.getMonth())
        setDay(eDate.getDate())
        setYear(eDate.getFullYear())
        setTime(eDate.getHours() + `:` + (eDate.getMinutes() > 9 ? eDate.getMinutes() : '0' + eDate.getMinutes()))
        setHr(eDate.getHours())
        setMin((eDate.getMinutes() > 9 ? eDate.getMinutes() : '0' + eDate.getMinutes()))
        setDaysArray(Array(daysInMonth(eDate.getMonth(), eDate.getFullYear())).fill(0).map((e, i) => i + 1))
        // eslint-disable-next-line
    }, [])


    // const [date, setDate] = useState(endDate);


    // useEffect(() => {
    //     setDaysArray(Array(daysInMonth(month, year)).fill(1).map((e, i) => i + 1));
    //     console.log(Object.keys(monthsMap))
    //     let newMonthsMap = {}
    //     if (year === today.getFullYear()) {
    //         for (const [m] of Object.keys(monthsMap)) {
    //             if(m >= today.getMonth()){
    //                 newMonthsMap[m] = true
    //             } else if (m >= today.getMonth()){
    //                 console.log('false')
    //                 newMonthsMap[m] = false
    //             }
    //         }
    //     }
    //     console.log(newMonthsMap)
    //     updateDate(year, month, day, hr, min, 0);
    // }, [month, day, year])


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

    const handleTitleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setTitle(value);
        if(!title || title===""){
            setTitleError("Please set a title")
        } else{
            setTitleError("")
        }
        let newEvent = timerEvent
        newEvent.title = title
        setTimerEvent(newEvent)
        console.log('setting event in Form' + newEvent)
    };

    const handleMonthChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setMonth(value);
        // setDaysArray(Array(daysInMonth(value, year)).fill(1).map((e, i) => i + 1));
        updateDate(year, value, day, hr, min, 0);
    };

    const handleDayChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setDay(value);
        updateDate(year, month, value, hr, min, 0);
    };

    const handleYearChange = (e) => {
        if (day < today.getDate()) {
            setDay(today.getDate());
        }
        if (month < today.getMonth()) {
            setMonth(today.getMonth());
        }
        e.preventDefault();
        let value = e.target.value;
        setYear(value);
        setDaysArray(Array(daysInMonth(month, value)).fill(1).map((e, i) => i + 1));
        updateDate(value, (month < today.getMonth() ? today.getMonth() : month), (day < today.getDate() ? tomorrow.getDate() : day), hr, min, 0);
    };

    const updateDate = (year, month, day, hr, min, sec) => {
        const d = new Date(year, month, day, hr, min, sec);
        let newEvent = timerEvent
        newEvent.endTime = d/1000
        setTimerEvent(newEvent)
        setEndDate(d)
        console.log('setting event in Form' + JSON.stringify(newEvent))
        // setRemainingTime(Math.floor(d / 1000 - startTime));
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
            <div className="my-2">
                {endDate && <form className="w-100">
                    <div className="form-group row pb-3">
                        <div className="col-12">
                            <input
                                className="w-100 px-2"
                                type="name"
                                placeholder="Event Title"
                                label="Title"
                                value={title}
                                onChange={(e) => handleTitleChange(e)} />
                            {titleError && <div className="text-danger">{titleError}</div>}
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-2 col-form-label">Time</label>
                        <div className="col-10">
                            <input type="time" className="w-100 px-2" min="00:00" max="23:59" value={time} onChange={handleTime} />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-2 col-form-label">Month</label>
                        <div className="col-10">
                            <select value={month} className="form-control" onChange={(e) => { handleMonthChange(e) }}>
                                {monthsArray.map(i => {
                                    return <option
                                        key={`month-` + i}
                                        disabled={year === today.getFullYear() && i < today.getMonth()}
                                        className='py-0 pb-1 my-0'
                                        value={i}>{monthDisplay(i)}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-2 col-form-label">Day</label>
                        <div className="col-10">
                            <select value={day} className="form-control" onChange={(e) => { handleDayChange(e) }}>
                                {daysArray.map(i => {
                                    return <option
                                        key={`day-` + i}
                                        disabled={year === today.getFullYear() && month === today.getMonth() && i < today.getDate()}
                                        className='py-0 pb-1 my-0'
                                        value={i}>{i}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-2 col-form-label">Year</label>
                        <div className="col-10">
                            <select value={year} className="form-control" onChange={(e) => { handleYearChange(e) }}>
                                {yearsArray.map(i => {
                                    return <option
                                        key={`year-` + i}
                                        className='py-0 pb-1 my-0'
                                        value={i}>{i}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </form>}
            </div>
        </div>
    )
}

export default Form
