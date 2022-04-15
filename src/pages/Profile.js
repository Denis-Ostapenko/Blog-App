import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context';
import ProfileForm from '../components/Profile-form';
import apiBlog from '../servises';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [serverErrors, setServerErrors] = useState({});
  const [completed, setCompleted] = useState(false);
  const formSubmit = (data, dirtyFields, token, reset) => {
    if (Object.keys(dirtyFields).length !== 0) {
      const editProfile = {};
      Object.keys(dirtyFields).forEach((el) => {
        editProfile[el] = data[el];
      });
      apiBlog.updateUser(editProfile, token).then((res) => {
        if (res.errors) {
          setServerErrors(res.errors);
          setCompleted(false);
        } else {
          setUser({ ...res.user });
          setCompleted(true);
          setServerErrors({});
          reset(data);
        }
      });
    }
    setCompleted(false);
  };
  if (!user) {
    return <Navigate to="/sign-up" replace />;
  }
  return <ProfileForm formSubmit={formSubmit} serverErrors={serverErrors} user={user} completed={completed} />;
};

export default Profile;
