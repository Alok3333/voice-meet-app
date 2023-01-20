import React from 'react';
import { useState } from 'react';
import Button from '../../../../components/common/Button/Button';
import Card from '../../../../components/common/Card/Card';
import TextInput from '../../../../components/common/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css';

const Phone = ({ onNext }) => {
  const [email, setEmail] = useState('');
  return (
    <Card title="Enter your phone number" icon="phone">
      <TextInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button onClick={onNext} text="Next" />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you're agreeing to our Terms of 
          Service and Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
