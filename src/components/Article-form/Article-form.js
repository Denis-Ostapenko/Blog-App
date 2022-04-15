import React from 'react';
import PropTypes from 'prop-types';
import { useForm, useFieldArray } from 'react-hook-form';
import classes from './Article-form.module.scss';

const ArticleForm = ({ formSubmit, userArticle }) => {
  let defaultValues = {
    title: '',
    description: '',
    text: '',
    tags: [],
  };
  if (userArticle) {
    const { article } = userArticle;
    defaultValues = {
      title: article.title,
      description: article.description,
      text: article.body,
      tags: article.tagList,
    };
  }
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues,
  });
  const { fields, remove, append } = useFieldArray({
    name: 'tags',
    control,
  });
  return (
    <form className={classes['article-form']} onSubmit={handleSubmit((data) => formSubmit(data, dirtyFields))}>
      <h2 className={classes['article-form__header']}>Create new article</h2>
      <label htmlFor="username">Title</label>
      <input
        className={errors.title ? classes['article-form__input-error'] : classes['article-form__input']}
        id="title"
        {...register('title', { required: 'Please input your title!' })}
        placeholder="Title"
      />
      {errors.title ? <p>{errors.title.message}</p> : null}

      <label htmlFor="description">Short description</label>
      <input
        className={errors.description ? classes['article-form__input-error'] : classes['article-form__input']}
        id="description"
        {...register('description', { required: 'Please input your short description!' })}
        placeholder="Title"
      />
      {errors.description ? <p>{errors.description.message}</p> : null}

      <label htmlFor="text">Text</label>
      <textarea
        className={errors.description ? classes['article-form__textarea-error'] : classes['article-form__textarea']}
        id="text"
        {...register('text', { required: 'Please input your text' })}
        placeholder="Text"
      />
      {errors.text ? <p>{errors.text.message}</p> : null}
      <label htmlFor="tags">Tags</label>
      <div className={classes['article-form__list-tags']}>
        <div className={classes['article-form__tags']}>
          {fields.map((item, index) => (
            <div key={item.id}>
              <input
                placeholder="Tag"
                className={classes['article-form__input']}
                defaultValue={getValues(`tags.${index}`)}
                {...register(`tags.${index}`)}
              />
              <button className={classes['article-form__delete']} type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </div>
          ))}
        </div>
        <button className={classes['article-form__add']} type="button" onClick={() => append('')}>
          Add tag
        </button>
      </div>
      <input className={classes['article-form__submit']} type="submit" value="Send" />
    </form>
  );
};

ArticleForm.defaultProps = {
  userArticle: null,
  formSubmit: () => {},
};

ArticleForm.propTypes = {
  userArticle: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      body: PropTypes.string,
      tagList: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  formSubmit: PropTypes.func,
};

export default ArticleForm;
