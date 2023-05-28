import React from 'react';
import { useState } from 'react';
import Button from '../../../../components/common/Button/Button';
import Card from '../../../../components/common/Card/Card';
import TextInput from '../../../../components/common/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css';
import { sendOtp } from '../../../../http';
import { setOtp } from '../../../../store/authSlice';
import { useDispatch } from 'react-redux';

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();

  async function submit() {
    // server request
    if (!phoneNumber) return;

    const { data } = await sendOtp({ phone: phoneNumber });
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  }
  return (
    <Card title="Enter your phone number" icon="phone">
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button onClick={submit} text="Next" />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you're agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
