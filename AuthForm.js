import React, { useState, useRef, useContext ,useEffect} from 'react';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx=useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
// const history=useHistory();
const [lastActiveTime, setLastActiveTime] = useState(new Date());

  useEffect(() => {
    const timeout = setTimeout(() => {
      authCtx.logout(); // Implement the logout function in your AuthContext
      alert('You have been logged out due to inactivity.');
    }, 5 * 60 * 1000); // 5 minutes in milliseconds
    // Clear the timeout if the user interacts
    const activityListener = () => {
      setLastActiveTime(new Date());
      clearTimeout(timeout);
    };
    window.addEventListener('mousemove', activityListener);
    window.addEventListener('keydown', activityListener);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', activityListener);
      window.removeEventListener('keydown', activityListener);
    };
  }, [authCtx]);


  const submitHandler = (event) => {
    event.preventDefault();
    console.log("yes you clicked submit");
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    


    
    setIsLoading(true);
    let url;

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBL5YYEGfPjKMuwmX7XseoJpDiFBh6mPYU';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBL5YYEGfPjKMuwmX7XseoJpDiFBh6mPYU';
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      setIsLoading(false);
      if(res.ok){
        return res.json();
      }
      else  {
        res.json().then((data) => {
          let errorMessage = "Authentication unsuccessful";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    }).then((data)=>{
      authCtx.login(data.idToken);
      // history.replace('/')
    }).catch((err)=>{
      alert(err.message)
    })
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

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
        <div className={classes.actions}>
          {!isLoading && <button type='submit'>{isLogin ? 'Login' : 'Sign up'}</button>}
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
