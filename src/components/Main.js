import {useState, useEffect} from 'react';

import {api} from '../utils/api';

import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    function setUserData({name, about, avatar}) {
      setUserName(name);
      setUserDescription(about);
      setUserAvatar(avatar);
    }

    api.getAuthorizedUserInfo()
      .then(setUserData)
      .catch(console.error);

    api.getCards()
      .then(setCards)
      .catch(console.error);
  }, []);

  return (
    <main className="content page__section page__main">
      <section className="profile page__profile">
        <div className="profile__user">
          <div className="profile__avatar">
            <img src={userAvatar} alt={userName} className="profile__avatar-image" />
            <div onClick={onEditAvatar} className="profile__avatar-overlay" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">
              {userName}
            </h1>
            <button onClick={onEditProfile} type="button" className="profile__edit" aria-label="Редактировать профиль" />
            <p className="profile__about">
              {userDescription}
            </p>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add" aria-label="Добавить изображение" />
      </section>
      <section className="gallery">
        <ul className="gallery__grid">
          {cards.map((card) => (
            <Card
              key={card._id}
              onCardClick={onCardClick}
              card={card}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
