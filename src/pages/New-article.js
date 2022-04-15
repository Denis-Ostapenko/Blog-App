import React, { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import UserContext from '../context';
import apiBlog from '../servises';
import ArticleForm from '../components/Article-form';

const NewArticle = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const formSubmit = (data) => {
    const { description, text, title, tags } = data;
    const article = {
      title,
      description,
      body: text,
      tagList: tags,
    };
    const { token } = user;
    apiBlog.newArticle(article, token).then((res) => {
      navigate(`/article/${res.article.slug}`);
    });
  };
  if (!user) {
    return <Navigate to="/sign-up" replace />;
  }
  return <ArticleForm formSubmit={formSubmit} />;
};

export default NewArticle;
