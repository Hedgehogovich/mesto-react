import {useRef, useEffect} from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(inputRef.current.value);
  }

  useEffect(() => {
    if (inputRef.current && !isOpen) {
      inputRef.current.value = '';
    }
  }, [inputRef, isOpen])

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
