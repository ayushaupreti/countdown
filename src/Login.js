import React, { useState } from 'react';
import { Auth } from "aws-amplify";
import './Login.css';

const Login = () => {

    const [cognitoUser, setCognitoUser] = useState(undefined)
    const [count, setCount] = useState(180)
    const [countTimer, setCountTimer] = useState()
    const [tries, setTries] = useState(1)

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')

    const [email, setEmail] = useState('')
    const [emailInvalid, setEmailInvalid] = useState(false)
    const [emailFeedback, setEmailFeedback] = useState('')
    const [loading, setLoading] = useState(false)

    const showAlert = (message) => {
        setShow(false)
        setMessage(message)
        setShow(true)
    }

    const startCountDown = () => {
        const start = new Date().getTime()
        let lapse = 0
        const interval = setInterval(() => {
            lapse = Math.floor((new Date().getTime() - start) / 1000)
            setCount(parseInt(180 - lapse))
            if (lapse >= 180) {
                clearInterval(interval)
                setCountTimer()
                setCognitoUser(undefined)
                stopCountDown()
                setTries(1)
            }
        }, 1000)
        setCountTimer(interval)
    }

    const stopCountDown = () => {
        if (countTimer) {
            clearInterval(countTimer)
            setCountTimer()
        }
    }

    const handleEmailChange = (e) => {
        e.preventDefault()
        let value = e.target.value
        setEmail(value.toLowerCase())
        if (isEmailInvalid(value)) {
            setEmailInvalid(true)
            setEmailFeedback('Please enter valid email address')
        } else {
            setEmailInvalid(false)
            setEmailFeedback('')
        }
    }
    const isEmailInvalid = (value) => {
        // eslint-disable-next-line
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value === '') {
            return false
        } else {
            let valid = re.test(value)
            if (valid) {
                return false
            } else {
                return true
            }
        }
    }

    const login = (em) => {
        if (isEmailInvalid(em) || em === '') {
            setEmailInvalid(true)
            setEmailFeedback('Please enter valid email address')
        } else {
            setEmailInvalid(false)
            setEmailFeedback('')
            setLoading(true)
            console.log('ABOUT TO CALL AUTH SIGN IN')
            Auth.signIn(em.toLowerCase())
                .then(data => {
                    console.log('auth successful')
                    if (data.challengeName === 'CUSTOM_CHALLENGE') {
                        setCognitoUser(data)
                        startCountDown()
                    } else {
                        showAlert('OOPS we are having technical issue, please try again')
                    }
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div className="login">
            <div className="login_container">
                <div className="login_text">
                    <h1>Enter your email!</h1>
                    <p>You will recieve a one-time password in your email to login and get started.</p>
                </div>
                <form className="login_form">
                    <input 
                        className="email_input"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => handleEmailChange(e)}
                        invalid={emailInvalid}
                        valid={!emailInvalid && email !== ''} />
                    <button 
                        className="email_submit" 
                        type="submit"
                        disabled={emailInvalid}
                        onClick={() => { login(email) }}>{loading ? 'Fetching...' : 'Get OTP'}</button>
                    {emailInvalid ? <p>Invalid email</p> : <p></p>}
                </form>
            </div>
        </div>
    )
}

export default Login
