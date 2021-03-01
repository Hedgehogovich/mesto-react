function Card({card, onCardClick}) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="gallery__grid-item">
      <figure className="card">
        <img onClick={handleClick} src={card.link} alt={card.name} className="card__image" />
        <button className="card__delete" type="button" aria-label="Удалить фотографию" />
        <figcaption className="card__caption">
          <h2 className="card__name">
            {card.name}
          </h2>
          <div className="card__likes">
            <button
              className="card__like"
              type="button"
              aria-label="Поставить отметку нравится для фотографии"
            />
            <p className="card__likes-count">
              {card.likes.length}
            </p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;
