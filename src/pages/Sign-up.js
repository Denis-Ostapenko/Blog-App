/* eslint-disable  spaced-comment */
/* eslint-disable  react/prop-types */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context';
import SignUpForm from '../components/Sign-up-form';
import apiBlog from '../servises';

const SignUp = () => {
  const { setUser, setToken } = useContext(UserContext);
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();
  const formSubmit = (data) => {
    const newUser = {
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
    };
    apiBlog.userRegistration(newUser).then((res) => {
      if (res.errors) {
        setServerErrors(res.errors);
      } else {
        setToken(res.user.token);
        localStorage.setItem('token', JSON.stringify(res.user.token));
        setUser({ ...res.user });
        setServerErrors({});
        navigate(`/articles`);
      }
    });
  };
  return <SignUpForm formSubmit={formSubmit} serverErrors={serverErrors} />;
};

export default SignUp;
