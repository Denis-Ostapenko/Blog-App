import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classes from './Sign-in-form.module.scss';

const SignInForm = ({ formSubmit, serverErrors }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form className={classes['sign-in']} onSubmit={handleSubmit((data) => formSubmit(data))}>
      <h2 className={classes['sign-in__header']}>Sign In</h2>
      <label htmlFor="email">Email address</label>
      <input
        className={
          errors.email || serverErrors['email or password']
            ? classes['sign-in__input-error']
            : classes['sign-in__input']
        }
        id="email"
        type="email"
        {...register('email', { required: 'Please input your email!' })}
        placeholder="Email address"
      />
      {errors.email ? <p>{errors.email.message}</p> : null}
      {serverErrors['email or password'] ? <p>email or password {serverErrors['email or password']}</p> : null}
      <label htmlFor="password">Password</label>
      <input
        className={
          errors.password || serverErrors['email or password']
            ? classes['sign-in__input-error']
            : classes['sign-in__input']
        }
        id="password"
        type="password"
        {...register('password', {
          required: 'Please input your password!',
          maxLength: {
            value: 40,
            message: 'Your password must be between 6 and 40 characters long.',
          },
          minLength: {
            value: 6,
            message: 'Your password must be between 6 and 40 characters long.',
          },
        })}
        placeholder="Password"
      />
      {errors.password ? <p>{errors.password.message}</p> : null}
      {serverErrors['email or password'] ? <p>email or password {serverErrors['email or password']}</p> : null}
      <input className={classes['sign-in__submit']} type="submit" value="Login" />
      <div className={classes['sign-in__account']}>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </div>
    </form>
  );
};

SignInForm.defaultProps = {
  formSubmit: () => {},
  serverErrors: {},
};

SignInForm.propTypes = {
  formSubmit: PropTypes.func,
  serverErrors: PropTypes.objectOf(PropTypes.string),
};

export default SignInForm;
