import PopupWithForm from './PopupWithForm';

function CardDeleteConfirmationPopup({isOpen, onClose, onCardDeleteConfirmation}) {
  function handleSubmit(e) {
    e.preventDefault();

    onCardDeleteConfirmation();
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Да"
    />
  )
}

export default CardDeleteConfirmationPopup;
