import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classes from './Sign-up-form.module.scss';

const SignUpForm = ({ formSubmit, serverErrors }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  return (
    <form className={classes['sign-up']} onSubmit={handleSubmit((data) => formSubmit(data))}>
      <h2 className={classes['sign-up__header']}>Create new account</h2>
      <label htmlFor="username">Username</label>
      <input
        className={
          errors.username || serverErrors.username ? classes['sign-up__input-error'] : classes['sign-up__input']
        }
        id="username"
        label="username"
        {...register('username', {
          required: 'Please input your username!',
          maxLength: {
            value: 20,
            message: 'Your username must be between 3 and 20 characters long.',
          },
          minLength: {
            value: 3,
            message: 'Your username must be between 3 and 20 characters long.',
          },
        })}
        placeholder="Username"
      />
      {errors.username ? <p>{errors.username.message}</p> : null}
      {serverErrors.username ? <p>{serverErrors.username}</p> : null}
      <label htmlFor="email">Email address</label>
      <input
        className={errors.email || serverErrors.email ? classes['sign-up__input-error'] : classes['sign-up__input']}
        id="email"
        type="email"
        {...register('email', { required: 'Please input your email!' })}
        placeholder="Email address"
      />
      {errors.email ? <p>{errors.email.message}</p> : null}
      {serverErrors.email ? <p>{serverErrors.email}</p> : null}
      <label htmlFor="password">Password</label>
      <input
        className={errors.password ? classes['sign-up__input-error'] : classes['sign-up__input']}
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
      <label htmlFor="passwordCheck">Repeat Password</label>
      <input
        className={errors.passwordCheck ? classes['sign-up__input-error'] : classes['sign-up__input']}
        id="passwordCheck"
        type="password"
        {...register('passwordCheck', {
          required: 'Please confirm password!',
          validate: {
            matchesPreviousPassword: (value) => {
              const { password } = getValues();
              return password === value || 'Passwords should match!';
            },
          },
        })}
        placeholder="Password"
      />
      {errors.passwordCheck ? <p>{errors.passwordCheck.message}</p> : null}
      <label className={classes['sign-up__checkbox']}>
        <input id="checkbox" type="checkbox" {...register('personalInformation', { required: true })} />I agree to the
        processing of my personal information
      </label>
      {errors.personalInformation ? <p>Should accept agreement</p> : null}
      <input className={classes['sign-up__submit']} type="submit" value="Create" />
      <div className={classes['sign-up__account']}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </div>
    </form>
  );
};

SignUpForm.defaultProps = {
  formSubmit: () => {},
  serverErrors: {},
};

SignUpForm.propTypes = {
  formSubmit: PropTypes.func,
  serverErrors: PropTypes.objectOf(PropTypes.string),
};

export default SignUpForm;
