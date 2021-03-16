import {createRef} from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputRef = createRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="avatar" className="edit-form__field">
        <input
          ref={inputRef}
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
  );
}

export default EditAvatarPopup;
