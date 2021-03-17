import {useEffect, useState, useCallback} from 'react';

import PopupContainer from './PopupContainer';
import PopupOpenedContext from '../contexts/PopupOpenedContext';

function PopupWithForm({
   name,
   title,
   isOpen,
   onClose,
   onSubmit,
   isLoading,
   children,
   submitButtonText = 'Сохранить'
}) {
  const [form, setForm] = useState(null);
  const [formInputs, setFormInputs] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const setFormRef = useCallback(formElement=> {
    if (formElement) {
      setForm(formElement);
      setFormInputs(Array.from(formElement.elements).filter(formChild => formChild instanceof HTMLInputElement));
    }
  }, []);

  const submitButtonClassName = `edit-form__submit${isValid ? '' : ' edit-form__submit_disabled'}`;

  function checkFormValidity(formElement) {
    setIsValid(formElement.checkValidity());
  }

  useEffect(() => {
    if (form && isOpen) {
      checkFormValidity(form);
    }
  }, [form, isOpen]);

  useEffect(() => {
    function handleInputChange() {
      checkFormValidity(form);
    }

    if (form) {
      formInputs.forEach(formInput => {
        formInput.addEventListener('input', handleInputChange);
      });
    }

    return () => {
      formInputs.forEach(formInput => {
        formInput.removeEventListener('input', handleInputChange);
      });
    };
  }, [form, formInputs]);

  return (
    <PopupContainer
      isOpen={isOpen}
      popupName={`${name}-popup`}
      wrapperClassName="popup__container_form"
      onClose={onClose}
    >
      <form ref={setFormRef} onSubmit={onSubmit} name={name} className="edit-form" noValidate>
        <h2 className="edit-form__title">
          {title}
        </h2>
        <PopupOpenedContext.Provider value={isOpen}>
          {children}
        </PopupOpenedContext.Provider>
        <button className={submitButtonClassName} disabled={!isValid} type="submit">
          {isLoading ? 'Сохранение...' : submitButtonText}
        </button>
      </form>
    </PopupContainer>
  );
}

export default PopupWithForm;
