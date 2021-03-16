function PopupWithForm({
   name,
   title,
   children,
   isOpen,
   onClose,
   onSubmit,
   submitButtonText = 'Сохранить'
}) {
  const rootClassName = `popup popup_background_dark ${name}-popup${isOpen ? ' popup_opened' : null}`;

  return (
    <div className={rootClassName}>
      <div className="popup__container popup__container_form">
        <form onSubmit={onSubmit} name={name} className="edit-form" noValidate>
          <h2 className="edit-form__title">
            {title}
          </h2>
          {children}
          <button className="edit-form__submit" type="submit">
            {submitButtonText}
          </button>
        </form>
        <button onClick={onClose} type="button" className="popup__close" aria-label="Закрыть всплывающее окно" />
      </div>
    </div>
  );
}

export default PopupWithForm;
