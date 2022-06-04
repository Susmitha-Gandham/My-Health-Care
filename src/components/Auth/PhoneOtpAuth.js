import classes from './PhoneOtpAuth.module.css';
import React, { useState } from 'react';
import { useCallback } from 'react/cjs/react.production.min';
import { firebase, auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const PhoneOtpAuth = () => {

    const [mynumber, setnumber] = useState("");
    const [otp, setotp] = useState('');
    const [confirmObj, setConfirmobj] = useState('');
    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();

    const setUpRecaptch = (number) => {
        const recaptchaVerifer = new RecaptchaVerifier(
            'recaptcha-container',
            {},
            auth
        );
        recaptchaVerifer.render();
        number = "+91" + number;
        return signInWithPhoneNumber(auth, number, recaptchaVerifer);
    }

    const sendOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (mynumber === '' || mynumber === undefined) return setError("enter valid number")

        try {
            const response = await setUpRecaptch(mynumber);
            console.log(response);
            setConfirmobj(response);
            setToggle(true);
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    }

    const verifyOtp = async (e) => {
        e.preventDefault();
        console.log(otp);
        if (otp === '' || otp === undefined) return
        try {
            await confirmObj.confirm(otp);
            history.replace('/myForm');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form className={classes.form} style={{ display: !toggle ? 'block' : 'none'}}>
                <div className={classes.control}>
                    <label htmlFor='email'>Enter Phone Number</label>
                </div>
                <div className={classes.control}>  
                    <input onChange={(e) => { 
                        setnumber(e.target.value) }}
                            placeholder="phone number" />
                </div>
                <div className={classes.action}>
                    <div id="recaptcha-container" />
                </div>
                <div className={classes.action}>
                    <button onClick={sendOtp}>Send OTP</button>
                </div>
            </form>

            <form className={classes.form} style={{ display: toggle ? 'block' : 'none'}}>
                <div className={classes.control}>
                    <label htmlFor='email'>Enter OTP</label>
                </div>
                <div className={classes.control}>  
                    <input onChange={(e) => { 
                        setotp(e.target.value) }}
                            placeholder="enter otp" />
                </div>
                <div className={classes.action}>
                    <div id="recaptcha-container" />
                </div>
                <div className={classes.action}>
                    <button onClick={verifyOtp}>Verify OTP</button>
                </div>
            </form>
        </div>

        
    )
}

export default PhoneOtpAuth;