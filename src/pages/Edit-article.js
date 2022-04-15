import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import UserContext from '../context';
import apiBlog from '../servises';
import ArticleForm from '../components/Article-form';

const EditArticle = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams({});
  const [userArticle, setUserArticle] = useState({});
  useEffect(() => {
    if (user) {
      apiBlog.getArticle(params.slug).then((res) => setUserArticle(res));
    }
  }, [user, params.slug]);
  if (!user) {
    return <Navigate to="/sign-up" replace />;
  }
  const formSubmit = (data, dirtyFields) => {
    const { description, text, title, tags } = data;
    const article = {
      title,
      description,
      body: text,
      tagList: tags,
    };
    if (Object.keys(dirtyFields).length !== 0) {
      const { token } = user;
      const {
        article: { slug },
      } = userArticle;
      apiBlog.updateArticle(article, slug, token).then((res) => {
        navigate(`/article/${res.article.slug}`);
      });
    }
  };
  const content =
    Object.keys(userArticle).length !== 0 ? (
      <ArticleForm formSubmit={formSubmit} userArticle={userArticle} />
    ) : (
      <Spin tip="Loading..." />
    );
  return content;
};

export default EditArticle;
