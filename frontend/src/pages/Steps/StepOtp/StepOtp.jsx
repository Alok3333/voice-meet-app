import React from 'react';
import { useState } from 'react';
import Button from '../../../components/common/Button/Button';
import Card from '../../../components/common/Card/Card';
import TextInput from '../../../components/common/TextInput/TextInput';
import styles from './StepOtp.module.css';

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState('')
  return (
    <>
     <div className={styles.cardWrapper}>
     <Card title="Enter the code we just texted you" icon="lock-emoji">
      <TextInput
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button onClick="" text="Next" />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you're agreeing to our Terms of 
          Service and Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
      </div>
    </>
  );
};

export default StepOtp;
