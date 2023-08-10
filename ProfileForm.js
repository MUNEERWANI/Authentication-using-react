import classes from './ProfileForm.module.css';

import { useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const ProfileForm = () => {
  // const history=useHistory();
  const authCtx=useContext(AuthContext);
  const newPasswordInputRef=useRef();
  const submitHandler=(event)=>{
    event.preventDefault();
    console.log('passwordchange')
    const enteredNewPassword=newPasswordInputRef.current.value;
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBL5YYEGfPjKMuwmX7XseoJpDiFBh6mPYU",{
      method:'POST',
      body:JSON.stringify({
        idToken:authCtx.token,
        password:enteredNewPassword,
        returnSecureToken:true,
      }),
      headers:{
        'Content-Type': 'application/json' 

      }
    }).then((data)=>{
      // history.replace('/');
    })

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
