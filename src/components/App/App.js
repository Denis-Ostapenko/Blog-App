import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserContext from '../../context';
import apiBlog from '../../servises';
import Header from '../../pages/Header';
import Articles from '../../pages/Articles';
import Article from '../../pages/Article';
import SignUp from '../../pages/Sign-up';
import SignIn from '../../pages/Sign-in';
import Profile from '../../pages/Profile';
import NewArticle from '../../pages/New-article';
import EditArticle from '../../pages/Edit-article';
import classes from './App.module.scss';

const App = () => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(() => {
    if (token) {
      apiBlog.getUser(token).then((res) => setUser(res.user));
    }
  }, [token]);
  return (
    <UserContext.Provider value={{ token, setToken, user, setUser }}>
      <div className={classes.App}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="articles" element={<Articles />}>
              <Route path=":page" element={<Articles />} />
            </Route>
            <Route path="article/:slug" element={<Article />} />
            <Route path="article/:slug/edit" element={<EditArticle />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="profile" element={<Profile />} />
            <Route path="new-article" element={<NewArticle />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
