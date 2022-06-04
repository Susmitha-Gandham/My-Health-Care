import classes from './MyForm.module.css';
import { useState, useRef } from 'react';

const MyForm = () => {

  const [toggleFlag, setToggleFlag] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const submitHandler = (e) => {
    e.preventDefault();
    setToggleFlag(true);
  }

  const onMyFormClick = (e) => {
    e.preventDefault();
    setToggleFlag(false);
  }

  const onChangeName = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  }

  const onChangeLastName = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  }
  const onChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }
  const onChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }



  return (
    <div className="App">
      {!toggleFlag && <form className={classes.form} onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'><h2>My Details</h2></label>
        </div>
        <div className={classes.control}>
          <label htmlFor='email'>First Name</label>
          <input type='text' required onChange={onChangeName} />
        </div>
        <div className={classes.control}>
          <label htmlFor='email'>Last Name</label>
          <input type='text' required  onChange={onChangeLastName} />
        </div>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='text' required onChange={onChangeEmail}  />
        </div>
        <div className={classes.control}>
          <label htmlFor='email'>Password</label>
          <input type='text' required onChange={onChangePassword} />
        </div>
        <div className={classes.action}>
          <button>Submit</button>
        </div>
      </form>}
      {toggleFlag && <div className={classes.formtable}>
        <table>
          <tbody>
            <tr>
              <th style={{"borderRight" : "2px solid #38015c"}}  >FirstName</th>
              <th style={{"borderRight" : "2px solid #38015c"}} >LastName</th>
              <th>Email</th>
            </tr>
            <tr >
              <td style={{"borderRight" : "2px solid #38015c"}}>{firstName}</td>
              <td style={{"borderRight" : "2px solid #38015c"}}>{lastName}</td>
              <td>{email}</td>
            </tr> 
          </tbody>
        </table>
        <button onClick={onMyFormClick} >My Form</button>
      </div>}
    </div>
  );
}

export default MyForm;
