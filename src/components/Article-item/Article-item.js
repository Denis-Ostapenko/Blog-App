import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import UserContext from '../../context';
import apiBlog from '../../servises';
import ArticlesItem from '../Articles-collection';
import classes from './Article-item.module.scss';

const ArticleItem = () => {
  const { user } = useContext(UserContext);
  const [objArticle, setObjArticle] = useState();
  const token = user ? user.token : undefined;
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    apiBlog.getArticle(params.slug, token).then((res) => setObjArticle(res.article));
  }, [params.slug, token]);
  const onDeleteArticle = (slug) => {
    apiBlog.deliteArticle(slug, token).then((res) => {
      if (res) {
        navigate(`/articles`);
      }
    });
  };
  let newArticle = {};
  if (objArticle !== undefined) {
    const { body, favorited, description, slug, favoritesCount, tagList, title, author: { image, username }, createdAt } = objArticle;
    newArticle = { body, favorited, description, slug, favoritesCount, tagList, title, author: { image, username }, createdAt };
  }
  const fullArticle = true;
  const content =
    objArticle !== undefined ? (
      <ArticlesItem newArticle={newArticle} fullArticle={fullArticle} onDeleteArticle={onDeleteArticle} />
    ) : (
      <Spin className={classes['article-item__spin']} tip="Loading..." />
    );
  return (
    <article className={classes['article-item']}>
      <div className={classes['article-item__element']}>{content}</div>
    </article>
  );
};
export default ArticleItem;
