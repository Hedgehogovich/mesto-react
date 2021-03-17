import {useState, useEffect, useRef, useContext} from 'react';

import PopupOpenedContext from '../contexts/PopupOpenedContext';

function PopupWithFormInput({
  id,
  value,
  onChange,
  className = '',
  ...restAttributes
}) {
  const inputRef = useRef();
  const popupOpened = useContext(PopupOpenedContext);

  const [validationMessage, setValidationMessage] = useState('');
  const [touched, setTouched] = useState(false);

  const inputClass = `edit-form__input${className ? ` ${className}` : ''}`
  const errorBlockClass = `edit-form__error${validationMessage && touched ? ' edit-form__error_visible' : ''}`;

  function handleInputChange(evt) {
    onChange(evt);
    if (!touched) {
      setTouched(true);
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      setValidationMessage(inputRef.current.validationMessage || '');
    }
  }, [inputRef, value]);

  useEffect(() => {
    if (!popupOpened) {
      setTouched(false);
    }
  }, [popupOpened]);

  return (
    <label htmlFor={id} className="edit-form__field">
      <input
        ref={inputRef}
        id={id}
        value={value}
        onChange={handleInputChange}
        className={inputClass}
        {...restAttributes}
        aria-describedby={`${id}-error`}
      />
      <span id={`${id}-error`} className={errorBlockClass}>
        {validationMessage}
      </span>
    </label>
  );
}

export default PopupWithFormInput;
