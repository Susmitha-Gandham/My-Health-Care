import { Switch, Route, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import ProfileForm from './components/Profile/ProfileForm';
import WelcomeAnimationPage from './components/StartingPage/WelcomeAnimationPage';
import MyForm from './components/Profile/MyForm';
import PhoneOtpAuth from './components/Auth/PhoneOtpAuth';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import { useContext } from 'react';

function App() {

  const authCtx = useContext(AuthContext);
  const isloggedIn = authCtx.isloggedIn;
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <WelcomeAnimationPage />
        </Route>
        {!isloggedIn &&
          <Route path='/auth'>
            <AuthPage />
          </Route>
        }

        <Route path='/profile'>
          {isloggedIn && <UserProfile />}
          {!isloggedIn && <Redirect to='/auth' />}
        </Route>

        <Route path='/myForm'>
          {isloggedIn && <MyForm />}
          {!isloggedIn && <Redirect to='/auth' />}
        </Route>

        <Route path='/otpPhoneAuth'>
          {isloggedIn && <PhoneOtpAuth />}
          {!isloggedIn && <Redirect to='/auth' />}
        </Route>
        

        <Route path='*'>
          <Redirect to='/' />
        </Route>

      </Switch>
    </Layout>
  );
}

export default App;
