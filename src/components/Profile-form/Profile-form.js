import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import classes from './Profile-form.module.scss';

const ProfileForm = ({ formSubmit, user, completed }) => {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
    reset,
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
    },
    mode: 'onChange',
  });
  return (
    <>
      {completed ? <div className={classes.profile__completed}>Profile edit successfully!</div> : null}
      <form
        className={classes.profile}
        onSubmit={handleSubmit((data) => formSubmit(data, dirtyFields, user.token, reset))}
      >
        <h2 className={classes.profile__header}>Edit Profile</h2>
        <label htmlFor="username">Username</label>
        <input
          className={errors.username ? classes['profile__input-error'] : classes.profile__input}
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
        <label htmlFor="email">Email address</label>
        <input
          className={errors.email ? classes['profile__input-error'] : classes.profile__input}
          id="email"
          type="email"
          {...register('email', { required: 'Please input your email!' })}
          placeholder="Email address"
        />
        {errors.email ? <p>{errors.email.message}</p> : null}
        <label htmlFor="password">New password</label>
        <input
          className={errors.password ? classes['profile__input-error'] : classes.profile__input}
          id="password"
          type="password"
          {...register('password', {
            required: false,
            maxLength: {
              value: 40,
              message: 'Your password must be between 6 and 40 characters long.',
            },
            minLength: {
              value: 6,
              message: 'Your password must be between 6 and 40 characters long.',
            },
          })}
          placeholder="New password"
        />
        {errors.password ? <p>{errors.password.message}</p> : null}
        <label htmlFor="image">Avatar image (url)</label>
        <input
          className={errors.image ? classes['profile__input-error'] : classes.profile__input}
          id="image"
          type="url"
          {...register('image', { required: false })}
          placeholder="Avatar image"
        />
        {errors.passwordCheck ? <p>{errors.passwordCheck.message}</p> : null}
        <input className={classes.profile__submit} type="submit" value="Save" />
      </form>
    </>
  );
};

ProfileForm.defaultProps = {
  formSubmit: () => { },
  completed: false,
  user: {},
};

ProfileForm.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  completed: PropTypes.bool,
  formSubmit: PropTypes.func,
};

export default ProfileForm;
