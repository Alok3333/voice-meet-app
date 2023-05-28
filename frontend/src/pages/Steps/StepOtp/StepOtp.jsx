import React from 'react';
import { useState } from 'react';
import Button from '../../../components/common/Button/Button';
import Card from '../../../components/common/Card/Card';
import TextInput from '../../../components/common/TextInput/TextInput';
import styles from './StepOtp.module.css';
import { verifyOtp } from '../../../http';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../../store/authSlice';

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const { phone, hash } = useSelector((state) => state.auth.otp);

  async function submit() {
    if (!otp || !phone || !hash) return;

    try {
      const { data } = await verifyOtp({ otp, phone, hash });
      console.log(data);
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon="lock-emoji">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div>
            <div className={styles.actionButtonWrap}>
              <Button onClick={submit} text="Next" />
            </div>
            <p className={styles.bottomParagraph}>
              By entering your number, you're agreeing to our Terms of Service
              and Privacy Policy. Thanks!
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
