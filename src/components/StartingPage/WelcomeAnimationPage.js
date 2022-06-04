import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import classes from './WelcomeAnimationPage.module.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Bounce = styled.div`animation: 2s ${keyframes`${bounce}`} infinite`;

const WelcomeAnimationPage = () => {
    const history = useHistory();
    useEffect(()=> {
        const timer = setTimeout(() => {
            history.replace('/auth')
          }, 2000);
          return () => clearTimeout(timer);
    }, []);
    return (
        <Bounce>
            <section className={classes.starting}>
                <h1 className={classes.displaymessage}>My Health Care</h1>
            </section>
        </Bounce>
    )
}

export default WelcomeAnimationPage;