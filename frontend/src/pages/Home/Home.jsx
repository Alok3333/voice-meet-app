import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  
  function startRegister() {
    // console.log("Registred!");
    navigate('/authenticate');
  }
  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to voicemeet!" icon="logo">
        <p className={styles.text}>
          We are working hard to get Voicemeet ready for everyone! While we
          wrap up the finishing youches, we are adding people gradually to make
          sure nothing breaks
        </p>
        <div>
          <Button onClick={startRegister} text="Let's Go"/>
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
