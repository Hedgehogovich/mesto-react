import {useState, useEffect} from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import CurrentUserContext from '../contexts/CurrentUserContext';

import {api} from '../utils/api';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userData) {
    api.updateProfile(userData)
      .then(updatedUserData => {
        setCurrentUser(updatedUserData);
        setIsEditProfilePopupOpen(false);
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then(updatedUserData => {
        setCurrentUser(updatedUserData);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(console.error);
  }

  function handleAddPlace(cardData) {
    api.addCard(cardData)
      .then(newCardData => {
        setCards(state => [newCardData, ...state]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(console.error);
  }

  function handleCardLike(card) {
    const {_id: userId} = currentUser;
    const isLiked = currentUser && card.likes.some(item => item._id === userId);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(updatedCardData => {
        const {_id: cardId} = updatedCardData;

        setCards(state => {
          return state.map(stateCard => stateCard._id === cardId ? updatedCardData : stateCard);
        });
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    const {_id: cardId} = card;

    api.removeCard(cardId)
      .then(() => {
        setCards(state => {
          return state.filter(stateCard => stateCard._id !== cardId);
        });
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  useEffect(() => {
    api.getCards()
      .then(setCards)
      .catch(console.error);

    api.getAuthorizedUserInfo()
      .then(setCurrentUser)
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
          <Header />
          <Main
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            cards={cards}
          />
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          isOpen={isDeleteConfirmationPopupOpen}
          onClose={closeAllPopups}
          submitButtonText="Да"
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
