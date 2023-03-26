import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profilePopup = document.querySelector('.popup_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');

const profilePopupForm = document.querySelector('.popup__form_profile');
const profilePopupName = profilePopupForm.querySelector('.popup__input_type_name');
const profilePopupJob = profilePopupForm.querySelector('.popup__input_type_job');

const profile = document.querySelector('.profile');   //выбор элементов для попапа"редактировать профиль"
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__text');

const cardsContainer = document.querySelector('.elements');
const popupAdd = document.querySelector('.popup_add_card');             //аргументы для попапа,
const buttonAdd = document.querySelector('.profile__button-add'); //который добавляет фото
const popupAddLink = document.querySelector('.popup__input_card_image');
const popupAddPlace = document.querySelector('.popup__input_card_name');
const popupAddForm = popupAdd.querySelector('.popup__form_add_card');

const options = ({
  inputSelector: 'popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  errorClassActive: 'popup__input-error_active',
  inputErrorClass: 'popup__input_type_error',
});
console.log(options.submitButtonSelector); 

//создание класса валидации для формы добавления новой карточки
const formValidatorPopupAdd = new FormValidator(options, popupAddForm);
//создание класса валидации для формы редактирования профиля
const formValidatorPopupProfile = new FormValidator(options, profilePopupForm);
formValidatorPopupProfile.enableValidation();


const initialCards = [    // исходный массив с ссылками на фото и названиями мест
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function keyEscHandler(evt) {  //функция закрытия попапа по клику на 'Escape'
  if (evt.key === 'Escape') {
    const popupSome = document.querySelector('.popup_opened')
    closePopup(popupSome);
  }
};
function closePopupOverlay(evt) {  //функция закрытия попапа по клику на оверлэй
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};
function closePopup(popup) {           //ф-ция закрытия попапа
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyEscHandler); //удаление слушателя события Закрытия попапа по клику на Esc
};
function openPopup(popup) {            //ф-ция открытия попапа
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyEscHandler);  //слушатель события Закрытия попапа по клику на Esc
};
buttonAdd.addEventListener('click', () => {    //слушатель события //открыть попап 'Новая карточка'
  openPopup(popupAdd);
  formValidatorPopupAdd.enableValidation();

});
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');  // находим 1 раз ближайший к крестику попап 
  button.addEventListener('click', () => closePopup(popup));  // устанавливаем обработчик закрытия на крестик
  popup.addEventListener('mousedown', closePopupOverlay);  //закрытие попапа по клику на оверлэй
});

function handleProfileFormSubmit(evt) {      //функция заполнения формы 
  evt.preventDefault();             //попапа редактирования профиля    

  profileName.textContent = profilePopupName.value;
  profileJob.textContent = profilePopupJob.value;

  closePopup(profilePopup)
};
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);

profileEditButton.addEventListener('click', () => {      //слушатель события //Добавить информацию 
  openPopup(profilePopup);
  profilePopupName.value = profileName.textContent;
  profilePopupJob.value = profileJob.textContent;
});

function handleCardFormSubmit(event) {    //заполнение формы и добавление новой карточки на страницу
  event.preventDefault();
     const obj = {
      name: popupAddPlace.value,
      link: popupAddLink.value
    }
    const cardNew = new Card(obj, '.card-template');
    const cardElement = cardNew.generateCard();
    document.querySelector('.elements').prepend(cardElement);

  event.target.reset();       //очистка формы от введённых значений
  closePopup(popupAdd);
};
popupAddForm.addEventListener('submit', handleCardFormSubmit);

//создание карточек
initialCards.forEach((item) => {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});

export { openPopup };