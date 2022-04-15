import React, { useState, useEffect, useContext } from 'react';
import { Pagination, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../../context';
import apiBlog from '../../servises';
import ArticlesСollection from '../Articles-collection';
import classes from './Article-list.module.scss';
import 'antd/dist/antd.css';

const ArticleList = () => {
  const params = useParams();
  const { token } = useContext(UserContext);
  const [arrArticle, setArrArticle] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  useEffect(() => {
    const page = params.page ? Number(params.page?.split('=')[1]) : 1;
    setNumberPage(page);
    apiBlog.getArticles(page * 5 - 5, token).then((res) => {setArrArticle(res)});
  }, [token, params.page]);
  const navigate = useNavigate();
  const paginationChange = (page) => {
    setArrArticle([]);
    navigate(`/articles/page=${page}`);
  };
  const { articles, articlesCount } = arrArticle;
  const fullArticle = false;
  return (
    <div className={classes.articles}>
      {arrArticle.length === 0 ? (
        <Spin className={classes.articles__spin} tip="Loading..." />
      ) : (
        <>
          <ul className={classes.articles__list}>
            {articles?.map((article) => {
              const { body, favorited, description, slug, favoritesCount, tagList, title, author: { image, username }, createdAt } = article;
              const newArticle = { body, favorited, description, slug, favoritesCount, tagList, title, author: { image, username }, createdAt }
              return (
                <li className={classes['articles__list-item']} key={article.slug}>
                  <ArticlesСollection newArticle={newArticle} fullArticle={fullArticle} />
                </li>
              )
            })}
          </ul>
          <Pagination
            current={numberPage}
            total={articlesCount}
            defaultPageSize={5}
            showSizeChanger={false}
            onChange={paginationChange}
          />
        </>
      )}
    </div>
  );
};

export default ArticleList;
