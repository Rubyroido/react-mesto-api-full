import '../pages/index.css';
import React, { useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import { register, authorize, validate } from '../utils/Auth.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import InfoToolTip from './InfoToolTip.js';
import ProtectedRoute from './ProtectedRoute.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [message, setMessage] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('token') ? true : false);
  const [userEmail, setUserEmail] = React.useState('');
  const history = useHistory();
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([data, items]) => {
          setCurrentUser(data);
          setCards([...items]);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isLoggedIn])

  React.useEffect(() => {
    
    if (token) {
      validate(token)
        .then((res) => {
          setIsLoggedIn(true);
          history.push('/');
          setUserEmail(res.email);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          console.log(err);
        })
    }
  }, [token])

  function openEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function openAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function openEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipOpen(false);
    handleCardClick(null);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isInfoToolTipOpen;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])


  function setSelectedCard(card) {
    handleCardClick(card);
  }

  function handleUpdateUser(user) {
    api.updateProfile(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(card) {
    api.createNewCard(card)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      (console.log(err));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    }).catch((err) => {
      (console.log(err));
    });
  }

  function onRegister(password, email) {
    register(password, email)
      .then((res) => {
        setIsInfoToolTipOpen(true);
        if (res) {
          setMessage(true);
          history.push('/signin');
        }
      })
      .catch(() => {
        setMessage(false);
        setIsInfoToolTipOpen(true);
      })
  }

  function onLogin(password, email) {
    authorize(password, email)
      .then((data) => {
        history.push('/');
        setUserEmail(data.email);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setMessage(false);
        setIsInfoToolTipOpen(true);
      })
  }

  function onSignOut() {
    setIsLoggedIn(false);
    history.push('/signin');
    localStorage.removeItem('token');
  }

  return (
    <div className='body'>
      <div className='page'>
        <CurrentUserContext.Provider value={currentUser}>

          <Header onSignOut={onSignOut} email={userEmail} />
          <Switch>
            <Route path='/signup'>
              <Register onRegister={onRegister} />
            </Route>
            <Route path='/signin'>
              <Login onLogin={onLogin} />
            </Route>
            <ProtectedRoute
              exact path='/'
              loggedIn={isLoggedIn}
              component={Main}
              cards={cards}
              onEditProfile={openEditProfile}
              onAddPlace={openAddPlace}
              onEditAvatar={openEditAvatar}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Switch>
          <Route exact path='/'>
            <Footer />
          </Route>

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <InfoToolTip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} state={message} />

        </CurrentUserContext.Provider>

        <PopupWithForm
          name='delete'
          title='Вы уверены?'
          saveButton='Да' />

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard} />

      </div>
    </div>
  );
}

export default App;
