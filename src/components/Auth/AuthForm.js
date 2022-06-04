import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';


import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const history = useHistory();

  const authCtx = useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword =  passwordInputRef.current.value;
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCj20CGr34T7zi-8bsyviQuv3we0Es8FeI';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCj20CGr34T7zi-8bsyviQuv3we0Es8FeI';
    }

    fetch(url, 
          {
            method: 'POST',
            body: JSON.stringify({
              email: enteredEmail,
              password:enteredPassword,
              returnSecureToken: true 
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }
      ).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(data => {
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      }).then((data) => {
        console.log(data);
        const expirationTime = new Date(
          new Date().getTime() + (+data.expiresIn * 1000)
        );
        if (data.registered) {
          authCtx.login(data.idToken/*, expirationTime.toISOString()*/);
          history.replace('/otpPhoneAuth');
        } else {
          setIsLogin((prevState) => !prevState);
        }
        
      }).catch((err) => {
        alert(err.message);
      })

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        {!isLogin &&
          <div className={classes.control}>
            <label>Mobile no</label>
            <input type='text' id='mobile' required />
          </div>
        }
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
