import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context';
import avatar from '../../images/avatar.jpg';
import classes from './Header-component.module.scss';

const HeaderComponent = () => {
  const { user, setUser, setToken } = useContext(UserContext)
  let avatarImg = '';
  if (user) {
    avatarImg = !user.image ? avatar : user.image;
  }
  return (
    <header className={classes.header}>
      <Link to="/articles">
        <h2 className={classes.header__title}>Realworld Blog</h2>
      </Link>
      {!user ? (
        <div className={classes.header__buttons}>
          <Link to="/sign-in">
            <button type="button" className={classes.header__signIn}>
              Sign In
            </button>
          </Link>
          <Link to="/sign-up">
            <button type="button" className={classes.header__signUp}>
              Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <div className={classes['header__profile-buttons']}>
          <Link to="/new-article">
            <button type="button" className={classes.header__create}>
              Create article
            </button>
          </Link>
          <Link to="/profile">
            <div className={classes.header__author}>
              <div className={classes.header__name}>{user.username}</div>
              <img className={classes.header__img} src={avatarImg} alt="avatar" />
            </div>
          </Link>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('token');
              setUser();
              setToken();
            }}
            className={classes.header__logOut}
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
