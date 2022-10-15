const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.profile__title');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.profile__text');// Воспользуйтесь инструментом .querySelector()
const newTextName = document.querySelector('.popup__input_type_name');
const newTextJob = document.querySelector('.popup__input_type_job');

const formElementCard = document.querySelector('.popup__form_add_card');
const cardNameInput = document.querySelector('.popup__input_card_name');
const cardLinkInput = document.querySelector('.popup__input_card_image');

const popupAddCard = document.querySelector('.popup_add_card');
const addPopupButton = document.querySelector('.profile__button-add');
const closePopupButtonAdd = popupAddCard.querySelector('.popup__close-button_add_card');
const addForm = document.querySelector('.popup__form_add_card');
const cardList = document.querySelector(".elements");

const popupImage = document.querySelector('.popup_image_big');
const closePopupImage = popupImage.querySelector('.popup__close-button_image_big');
const imageTitle = popupImage.querySelector('.popup__card-name');
const imagePopup = popupImage.querySelector('.popup__big-image');

const cardTemplate = document.querySelector(".card-template");

const togglePopup = () => {
  popupEditProfile.classList.toggle('popup_opened');
}

const togglePopupAdd = () => {
  popupAddCard.classList.toggle('popup_opened');
}

const togglePopupBig = () => {
  popupImage.classList.toggle('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  nameInput.textContent = newTextName.value;
  jobInput.textContent = newTextJob.value;
  togglePopup();
}

popupOpenButton.addEventListener('click', () => {
  togglePopup();
  newTextName.value = nameInput.textContent;
  newTextJob.value = jobInput.textContent;
})

popupCloseButton.addEventListener('click', togglePopup);
closePopupButtonAdd.addEventListener('click', togglePopupAdd);

addPopupButton.addEventListener('click', () => {
  togglePopupAdd();
  newTextName.value = nameInput.textContent;
  newTextJob.value = jobInput.textContent;
})

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// основная функция рендеринга
function createCard(cardData) {
  const newHtmlElement = cardTemplate.content.cloneNode(true); // клонируем ноду
  const card = newHtmlElement.querySelector('.element'); // теперь мы свободны от template и работаем именно с dom узлом
  const header = card.querySelector('.element__text');
  const image = card.querySelector('.element__image');
  header.textContent = cardData.name; // устанавливаем заголовок элемента
  image.src = cardData.link;
  image.alt = cardData.name;

  setListenersForItem(card, image);
  return card;
}

function renderInitialCards() {
  const itemslist = items.map(createCard);
  cardList.prepend(...itemslist);
}

function submitAddCardForm(evt) {
  evt.preventDefault();

  const userNewCard = {
    name: '',
    link: '',
  };
  userNewCard.name = cardNameInput.value;
  userNewCard.link = cardLinkInput.value;

  cardList.prepend(createCard(userNewCard));

  togglePopupAdd();
}

addForm.addEventListener('submit', submitAddCardForm);

function setListenersForItem(element, image) {
  const deleteButton = element.querySelector('.element__delete');
  deleteButton.addEventListener('click', handleDelete); // TODO передаем ссылку на функцию
  // 
  const likeButton = element.querySelector('.element__like');
  likeButton.addEventListener('click', handleLike);
  // 
  const cardImage = element.querySelector('.element__image-btn');
  cardImage.addEventListener('click', () => handleGenerateImagePopup(element, image));
}

function handleGenerateImagePopup(element, image) {
  const bigImageName = element.querySelector('.element__text').textContent;

  imagePopup.src = image.src;
  imageTitle.textContent = bigImageName;
  imagePopup.alt = bigImageName;

  togglePopupBig();
}

function handleLike(event) {
  event.target.classList.toggle('element__like_active');
}
function handleDelete(event) {
  const currentListItem = event.target.closest('.element'); // получаем родителя кнопки
  currentListItem.remove();
}
renderInitialCards();

function closePopupOverlay(e) {
  const target = e.target;
  const its_popupProfile = target == popupEditProfile;
  const its_popupCard = target == popupAddCard;
  const its_popupImage = target == popupImage;

  if (its_popupProfile) {
    closePopup(popupEditProfile);
  }
  if (its_popupCard) {
    closePopup(popupAddCard);
  }
  if (its_popupImage) {
    closePopup(popupImage);
  }
}

document.addEventListener("click", closePopupOverlay);

closePopupButtonAdd.addEventListener('click', () => {
  closePopup(popupAddCard);
});

closePopupImage.addEventListener('click', () => {
  closePopup(popupImage);
});

popupCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});