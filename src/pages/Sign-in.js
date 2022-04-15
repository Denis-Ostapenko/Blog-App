import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context';
import SignInForm from '../components/Sign-in-form';
import apiBlog from '../servises/servises';

const SignIn = () => {
  const {setUser, setToken} = useContext(UserContext);
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();
  const formSubmit = (data) => {
    const user = {
      email: data.email.trim(),
      password: data.password.trim(),
    };

    apiBlog.userSignIn(user).then((res) => {
      if (res.errors) {
        setServerErrors(res.errors);
      } else {
        setToken(res.user.token);
        localStorage.setItem('token', res.user.token);
        setUser({ ...res.user });
        setServerErrors({});
        navigate(`/articles`);
      }
    });
  };
  return <SignInForm formSubmit={formSubmit} serverErrors={serverErrors} />;
};

export default SignIn;
