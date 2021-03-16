import {useState, useContext, useEffect} from 'react';

import PopupWithForm from './PopupWithForm';

import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({name, about});
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser])

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="edit-form__field">
        <input
          id="name"
          value={name}
          onChange={handleNameChange}
          type="text"
          name="name"
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
          value={about}
          onChange={handleAboutChange}
          type="text"
          name="about"
          className="edit-form__input"
          required
          minLength="2"
          maxLength="200"
          aria-describedby="about-error"
        />
        <span id="about-error" className="edit-form__error" />
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
