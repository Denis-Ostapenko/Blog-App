/* eslint-disable arrow-body-style */
class ApiBlog {
  async getArticles(offset = 0, token) {
    const api = await fetch(`https://kata.academy:8021/api/articles?limit=5&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`error fetch URL`);
      }
      return res.json();
    });
    return api;
  }

  async getArticle(slug, token) {
    const api = await fetch(`https://kata.academy:8021/api/articles/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`error fetch URL`);
      }
      return res.json();
    });
    return api;
  }

  async userRegistration(newUser) {
    try {
      const body = {
        user: newUser,
      };
      const registration = await fetch(`https://kata.academy:8021/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      });
      return registration.json();
    } catch (error) {
      return error.message;
    }
  }

  async userSignIn(user) {
    try {
      const body = {
        user,
      };
      const userIn = await fetch(`https://kata.academy:8021/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      });
      return userIn.json();
    } catch (error) {
      return error.message;
    }
  }

  async getUser(token) {
    try {
      const user = await fetch(`https://kata.academy:8021/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        }
      });
      return user.json();
    } catch (error) {
      return error.message;
    }
  }

  async updateUser(user, token) {
    try {
      const body = {
        user,
      };
      const api = await fetch(`https://kata.academy:8021/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(body),
      });
      return api.json();
    } catch (error) {
      return error.message;
    }
  }

  async newArticle(article, token) {
    try {
      const body = {
        article,
      };
      const api = await fetch(`https://kata.academy:8021/api/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(body),
      });
      return api.json();
    } catch (error) {
      return error.message;
    }
  }

  async updateArticle(article, slug, token) {
    try {
      const body = {
        article,
      };
      const api = await fetch(`https://kata.academy:8021/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(body),
      });
      return api.json();
    } catch (error) {
      return error.message;
    }
  }

  async deliteArticle(slug, token) {
    try {
      const api = await fetch(`https://kata.academy:8021/api/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      return api.ok;
    } catch (error) {
      return error.message;
    }
  }

  async addLike(slug, token) {
    try {
      const api = await fetch(`https://kata.academy:8021/api/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      return api;
    } catch (error) {
      return error.message;
    }
  }

  async deliteLike(slug, token) {
    try {
      const api = await fetch(`https://kata.academy:8021/api/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      return api;
    } catch (error) {
      return error.message;
    }
  }
}

const apiBlog = new ApiBlog();

export default apiBlog;
