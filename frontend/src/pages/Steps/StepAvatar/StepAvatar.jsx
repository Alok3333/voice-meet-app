import React, { useEffect } from 'react';
import Button from '../../../components/common/Button/Button';
import Card from '../../../components/common/Card/Card';
import styles from './StepAvatar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setAvatar } from '../../../store/activateSlice';
import { activate } from '../../../http';
import { setAuth } from '../../../store/authSlice';
import Loader from '../../../components/common/Loader/Loader';

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState('/images/monkey-avatar.png');
  const [loading, setLoading] = useState(false);
  const [unMounted, setUnMounted] = useState(false);

  const captureImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    // used onloadend to read and loading fast the file images
    reader.onloadend = function () {
      setImage(reader.result);
      // image is not a change when will you go to the privious state or component
      dispatch(setAvatar(reader.result));
    };

    // console.log(e);
  };

  const submit = async () => {
    if (!name || !avatar) return;

    setLoading(true);
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        if (!unMounted) {
          dispatch(setAuth(data));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      // If any cases it'll run
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setUnMounted(true);
    };
  }, []);

  if (loading) return <Loader message="Activation in progress..." />;
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
