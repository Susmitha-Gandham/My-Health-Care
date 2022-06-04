import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';
import logo from '../../images/logo01.png';

const MainNavigation = () => {

  const authCtx = useContext(AuthContext);

  const isloggedIn = authCtx.isloggedIn;
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
  }

  const loginUserForn = () => {
    history.replace('/auth');
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>My Health Care</div>
      </Link>
      <nav>
        <ul>
          {!isloggedIn && 
            <li>
              <button onClick={loginUserForn} >Login</button>
            </li>
          }
          
          {/*isloggedIn && 
            <li>
              <Link to='/myForm'>My Form</Link>
            </li>
        */}

          {isloggedIn && 
             <li>
              <button onClick={logoutHandler} >Logout</button>
            </li>
          }
                
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
