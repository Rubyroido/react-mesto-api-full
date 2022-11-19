// Токен: c420f8b9-4e35-438e-95eb-ba272c384828
// Идентификатор группы: cohort-42
class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  updateProfile({ name, about }) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this.handleResponse);
  }

  createNewCard({name, link}) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this.handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar })
    })
      .then(this.handleResponse);
  }
}

const api = new Api({
  url: 'https://api.rubyroido.mesto.nomoredomains.icu',
  headers: {
    authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json',
  }
});

export default api;