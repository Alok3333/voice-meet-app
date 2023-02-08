import React from 'react';
import Button from '../../../components/common/Button/Button';
import Card from '../../../components/common/Card/Card';
import styles from './StepAvatar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setAvatar } from '../../../store/activateSlice';

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.activate);
  const [image, setImage] = useState('/images/monkey-avatar.png');

  const captureImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    // used onloadend to read and loading fast the file images
    reader.onloadend = function () {
      // console.log(reader.result);
      setImage(reader.result);
      // image is not a change when will you go to the privious state or component
      dispatch(setAvatar(reader.result));
    };

    // console.log(e);
  };

  const submit = () => {};

  return (
    <>
      <Card title={`Okay, ${name}`} icon="monkey-emoji">
        <p className={styles.subHeading}>How's this photo?</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={image} alt="avatar" />
        </div>
        <div>
          <input
            type="file"
            onChange={captureImage}
            id="avatarInput"
            className={styles.avatarInput}
          />
          <label htmlFor="avatarInput" className={styles.avatarLabel}>
            Choose a different photo
          </label>
        </div>
        <div>
          <Button onClick={submit} text="Next" />
        </div>
      </Card>
    </>
  );
};

export default StepAvatar;
