import React from 'react';
import { useState } from 'react';
import Email from './Email/Email';
import Phone from './Phone/Phone';
import styles from './StepPhoneEmail.module.css';

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};
const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState('phone');
  const LoginComponent = phoneEmailMap[type];
  
  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrap}>
            <button className={`${styles.tabButton} ${type === 'phone' ? styles.active : ''}`} onClick={() => setType('phone')}>
              <img src="/images/phone-white.png" alt="phone"/>
            </button>
            <button className={`${styles.tabButton} ${type === 'email' ? styles.active : ''}`} onClick={() => setType('email')}>
              <img src="/images/mail-white.png" alt="email"/>
            </button>
          </div>
          <LoginComponent onNext={onNext} />
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
