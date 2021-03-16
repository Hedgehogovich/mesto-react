import {useState} from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({name, link});
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="place-name" className="edit-form__field">
        <input
          id="place-name"
          value={name}
          onChange={handleNameChange}
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
          value={link}
          onChange={handleLinkChange}
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
  );
}

export default AddPlacePopup;
