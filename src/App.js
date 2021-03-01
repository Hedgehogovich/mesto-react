import {useState} from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label htmlFor="name" className="edit-form__field">
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Название"
            className="edit-form__input"
            required
            minLength="2"
            maxLength="40"
            aria-describedby="name-error"
          />
          <span id="name-error" className="edit-form__error" />
        </label>
        <label htmlFor="about" className="edit-form__field">
          <input
            id="about"
            type="text"
            name="about"
            placeholder="Ссылка на картинку"
            className="edit-form__input"
            required
            minLength="2"
            maxLength="200"
            aria-describedby="about-error"
          />
          <span id="about-error" className="edit-form__error" />
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="place"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <label htmlFor="place-name" className="edit-form__field">
          <input
            id="place-name"
            type="text"
            name="name"
            placeholder="Название"
            className="edit-form__input"
            required
            minLength="2"
            maxLength="30"
            aria-describedby="place-name-error"
          />
          <span id="place-name-error" className="edit-form__error" />
        </label>
        <label htmlFor="picture" className="edit-form__field">
          <input
            id="picture"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            className="edit-form__input"
            required
            aria-describedby="picture-error"
          />
          <span id="picture-error" className="edit-form__error" />
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label htmlFor="avatar" className="edit-form__field">
          <input
            id="avatar"
            type="url"
            name="avatar"
            placeholder="Ссылка на аватар"
            className="edit-form__input"
            required
            aria-describedby="avatar-error"
          />
          <span id="avatar-error" className="edit-form__error" />
        </label>
      </PopupWithForm>
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
    </div>
  );
}

export default App;
