import React, { useState, useContext, useEffect } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import UserContext from '../../context';
import apiBlog from '../../servises';
import iconLikeOff from '../../images/iconBlack.png';
import iconLikeOn from '../../images/iconRed.png';
import avatar from '../../images/avatar.jpg';
import classes from './Articles-collection.module.scss';

function ArticlesСollection({ newArticle, fullArticle, onDeleteArticle }) {
  const { user } = useContext(UserContext);
  const { body, favorited, description, slug, favoritesCount, tagList, title, author, createdAt } = newArticle;
  const [buttonModals, SetButtonModals] = useState(false);
  const [like, setLike] = useState();
  useEffect(() => {
    setLike(favorited)
  }, [favorited])
  const [likeCount, setLikeCount] = useState(favoritesCount);
  const logUser = user ? { username: user.username, token: user.token } : { username: '', token: '' };
  const OnButtonYes = () => {
    onDeleteArticle(slug);
  };
  const OnButtonNo = () => {
    SetButtonModals(false);
  };
  const clickLike = () => {
    if (like && logUser.token !== '') {
      apiBlog.deliteLike(slug, logUser.token).then(() => {
        setLikeCount(likeCount - 1);
        setLike(false);
      });
    }
    if (!like && logUser.token !== '') {
      apiBlog.addLike(slug, logUser.token).then(() => {
        setLikeCount(likeCount + 1);
        setLike(true);
      });
    }
  };
  const { image, username } = author;
  const createDate = (dateStr) => format(new Date(dateStr), 'LLLL d, y');
  const avatarImg = image === 'null' ? avatar : image;
  const liceIcon = !like ? iconLikeOff : iconLikeOn;
  const fullBody =
    fullArticle === true ? (
      <ReactMarkdown className={classes['articles-collection__body']} remarkPlugins={[remarkGfm]}>
        {body}
      </ReactMarkdown>
    ) : null;
  const className = fullArticle === true ? 'articles-collection__description-off' : 'articles-collection__description';
  return (
    <>
      <div className={classes['articles-collection__header']}>
        <div>
          <div className={classes['articles-collection__details']}>
            <Link to={`/article/${slug}`}>
              <h3>{title}</h3>
            </Link>
            <button className={classes['articles-collection__like']} type="button" onClick={() => clickLike()}>
              <img src={liceIcon} alt="like" />
            </button>
            {likeCount}
          </div>
          <div className={classes['articles-collection__tabs']}>
            {tagList?.map((tag) => {
              if (tag !== '') {
                return <div key={tag + Math.random() * (1000 - 1) + 1000}>{tag}</div>;
              }
              return null;
            })}
          </div>
        </div>
        <div className={classes['articles-collection__author']}>
          <div>
            <h4 className={classes['articles-collection__name']}>{username}</h4>
            <div className={classes['articles-collection__date']}>{createDate(createdAt)}</div>
          </div>
          <img className={classes['articles-collection__img']} src={avatarImg} alt="author" />
        </div>
      </div>
      <div
        className={fullArticle === true && logUser.username === username ? classes['articles-collection__buttons'] : ''}
      >
        <p className={classes[className]}>{description}</p>
        {fullArticle === true && logUser.username === username ? (
          <div>
            <input
              className={classes['articles-collection__delete']}
              type="button"
              value="Delete"
              onClick={() => SetButtonModals(true)}
            />
            <Link to={`/article/${slug}/edit`}>
              <input className={classes['articles-collection__edit']} type="button" value="Edit" />
            </Link>
            {buttonModals ? (
              <div className={classes['articles-collection__modals']}>
                <div className={classes['articles-collection__modals-text']}>Are you sure to delete this article?</div>
                <div>
                  <input
                    className={classes['articles-collection__modals-no']}
                    type="button"
                    value="No"
                    onClick={() => OnButtonNo()}
                  />
                  <input
                    className={classes['articles-collection__modals-yes']}
                    type="button"
                    value="Yes"
                    onClick={() => OnButtonYes()}
                  />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {fullBody}
    </>
  );
}

ArticlesСollection.defaultProps = {
  newArticle: {},
  onDeleteArticle: () => { },
  fullArticle: false
};

ArticlesСollection.propTypes = {
  newArticle: PropTypes.exact({
    body: PropTypes.string,
    favorited: PropTypes.bool,
    description: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    author: PropTypes.exact({
      image: PropTypes.string,
      username: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    slug: PropTypes.string,
    favoritesCount: PropTypes.number
  }),
  fullArticle: PropTypes.bool,
  onDeleteArticle: PropTypes.func,
};

export default ArticlesСollection;
