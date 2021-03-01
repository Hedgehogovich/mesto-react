function ImagePopup({card, onClose}) {
  const className = `popup popup_background_black zoom-preview${card ? ' popup_opened' : ''}`;

  return (
    <div className={className}>
      <div className="popup__container">
        <figure className="zoom-preview__wrapper">
          <img src={card?.link} alt={card?.name} className="zoom-preview__image" />
          <figcaption className="zoom-preview__caption">
            {card?.name}
          </figcaption>
        </figure>
        <button onClick={onClose} type="button" className="popup__close" aria-label="Закрыть всплывающее окно" />
      </div>
    </div>
  );
}

export default ImagePopup;
