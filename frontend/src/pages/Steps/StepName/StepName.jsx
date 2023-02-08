import React from 'react';
import Card from '../../../components/common/Card/Card';
import TextInput from '../../../components/common/TextInput/TextInput';
import Button from '../../../components/common/Button/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';
import styles from './StepName.module.css';

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const dispatch = useDispatch();

  const [fullname, setFullname] = useState(name);

  const nextStep = () => {
    if (!fullname) {
      return;
    }
    dispatch(setName(fullname));
    onNext();
  };
  return (
    <>
      <Card title="What's your full name?" icon="goggle-emoji">
        <TextInput
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <div>
          <p className={styles.paragraph}>
            Don't use fake names at voice-meet :)!
          </p>
          <div>
            <Button onClick={nextStep} text="Next" />
          </div>
        </div>
      </Card>
    </>
  );
};

export default StepName;
