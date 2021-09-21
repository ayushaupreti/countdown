import React, { useState } from 'react';
import { Auth } from "aws-amplify";
import { useHistory } from 'react-router';
import { useAppContext } from "../libs/contextLib";
import '../styling/Login.css';

const Login = () => {

    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();

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

    const [code, setCode] = useState('')
    const [codeInvalid, setCodeInvalid] = useState(false)
    const [codeFeedback, setCodeFeedback] = useState('')

    const [readyToVerify, setReadyToVerify] = useState(false)

    const handleCodeChange = (e) => {
        e.preventDefault()
        let value = e.target.value
        setCode(value)
        if (!value || value === '') {
            setCodeInvalid(true)
            setCodeFeedback('Please enter valid code')
        } else {
            setCodeInvalid(false)
            setCodeFeedback('')
        }
    }
 
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

    const intToHex = (nr) => {
        return nr.toString(16).padStart(2, '0');
    }

    const getRandomString = (bytes) => {
        const randomValues = new Uint8Array(bytes);
        window.crypto.getRandomValues(randomValues);
        return '$A1a' + Array.from(randomValues).map(intToHex).join('');
    }

    const verify = (ans) => {
        setTries(parseInt(tries + 1))
        setLoading(true)
        Auth.sendCustomChallengeAnswer(cognitoUser, ans)
            .then(data => {
                if (data.challengeName === 'CUSTOM_CHALLENGE') {
                    setCodeInvalid(true)
                    setCodeFeedback(parseInt(3 - tries) + ' attempts remaining')
                } else {
                    stopCountDown()
                    userHasAuthenticated(true);
                    history.push("/countdowns")
                }
                setLoading(false)
            }).catch(err => {
                setCognitoUser(undefined)
                stopCountDown()
                setTries(1)
                setLoading(false)
            })
    }

    const register = (em) => {
        console.log('registering user')
        const pwd = getRandomString(30)
        Auth.signUp({
            username: em,
            password: pwd,
            attributes: {
                email: em
            },
        }).then(data => {
            showAlert('Welcome to Lagna360')
            login(em)
        }).catch(err => {
            showAlert(err)
        })
    }

    const login = (em) => {
        console.log('hitting login method at start')
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
                        setReadyToVerify(true)
                        startCountDown()
                    } else {
                        showAlert('OOPS we are having technical issue, please try again')
                    }
                    setLoading(false)
                })
                .catch(err => {
                    switch (err.code) {
                        case 'NetworkError':
                            console.log('network error')
                            showAlert(err.message)
                            break;
                        case 'UserNotFoundException':
                            console.log('user not found exception, registering')
                            register(em)
                            break;
                        default:
                            console.log('other type of error')
                            console.log(err)
                    }
                })
        }
    }

    return (
        <div class="container border border-dark rounded h-100 d-flex flex-column align-items-center">
            <div class="row pt-5">
                <div class="col-12">
                    <h3>Welcome!</h3>
                </div>
            </div>
            <div class="row py-3">
                <div class="col-12">
                    <p>Enter your email, and you will receive a one-time password in your email to login and get started.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <form className="">
                        {readyToVerify ?
                            <div className="">
                                <p className="mb-3 font-weight-bold">Seconds left <span className='px-2 ml-1 bg-dark text-white rounded-pill'>{count}</span></p>
                                <div className="row">
                                    <input
                                        className="col-12 my-3 border-top-0 border-left-0 border-right-0 bg-transparent"
                                        placeholder="Enter Code"
                                        value={code}
                                        onChange={(e) => handleCodeChange(e)}
                                        invalid={codeInvalid.toString()} />
                                    <button
                                        className="btn btn-light border border-dark col-12 my-1 bg-transparent"
                                        type="submit"
                                        disabled={loading}
                                        onClick={() => { verify(code) }}>{loading ? 'Verifying...' : 'Verify OTP'}
                                    </button>
                                </div>
                            </div>
                            : <div className="row">
                                <input
                                    className="col-12 my-3 border-top-0 border-left-0 border-right-0 bg-transparent"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => handleEmailChange(e)}
                                    invalid={emailInvalid.toString()}
                                    valid={(!emailInvalid && email !== '').toString()} />
                                <button
                                    className="btn btn-light border border-dark col-12 my-1 bg-transparent"
                                    type="submit"
                                    disabled={loading || emailInvalid}
                                    onClick={() => { login(email) }}>{loading ? 'Fetching...' : 'Get OTP'}
                                </button>
                            </div>
                        }
                        {codeInvalid ? <p>{codeFeedback}</p> : <p></p>}
                        {emailInvalid ? <p>{emailFeedback}</p> : <p></p>}
                    </form>
                </div>
            </div>
        </div>
        // <div className="container p-4 h-100 d-flex align-items-center">
        //     <div className="row login_text p-4">
        //         <h3 className="col-12">Welcome!</h3>
        //         <p className="col-12">Enter your email, and you will receive a one-time password in your email to login and get started.</p>
        //      </div>
        //     <form className="row px-5">
        //         {readyToVerify ?
        //             <div>
        //                 <p className="mb-3 font-weight-bold">Seconds left <span className='px-2 ml-1 bg-dark text-white rounded-pill'>{count}</span></p>
        //                 <div className="row">
        //                     <input
        //                         className="col-12 my-1 border-top-0 border-left-0 border-right-0 bg-transparent"
        //                         placeholder="Enter Code"
        //                         value={code}
        //                         onChange={(e) => handleCodeChange(e)}
        //                         invalid={codeInvalid.toString()} />
        //                     <button
        //                         className="btn btn-light border border-dark col-12 my-1 bg-transparent"
        //                         type="submit"
        //                         disabled={loading}
        //                         onClick={() => { verify(code) }}>{loading ? 'Verifying...' : 'Verify OTP'}
        //                     </button>
        //                 </div>
        //             </div>
        //             : <div className="row">
        //                 <input
        //                     className="col-12 my-1 border-top-0 border-left-0 border-right-0 bg-transparent"
        //                     placeholder="Enter Email"
        //                     value={email}
        //                     onChange={(e) => handleEmailChange(e)}
        //                     invalid={emailInvalid.toString()}
        //                     valid={(!emailInvalid && email !== '').toString()} />
        //                 <button
        //                     className="btn btn-light border border-dark col-12 my-1 bg-transparent"
        //                     type="submit"
        //                     disabled={loading || emailInvalid}
        //                     onClick={() => { login(email) }}>{loading ? 'Fetching...' : 'Get OTP'}
        //                 </button>
        //             </div>
        //         }
        //         {codeInvalid ? <p>{codeFeedback}</p> : <p></p>}
        //         {emailInvalid ? <p>{emailFeedback}</p> : <p></p>}
        //     </form>
        // </div>
    )
}

export default Login