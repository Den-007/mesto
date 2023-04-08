import { openPopup } from './index.js';
const _popupPhoto = document.querySelector('.popup_image_big');
console.log(_popupPhoto);
const _popupPhotoLink = _popupPhoto.querySelector('.popup__big-image');
const _popupPhotoTitle = _popupPhoto.querySelector('.popup__card-name');
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  };


  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardImage.src = this._link;
    this._element.querySelector('.element__text').textContent = this._name;
    this._cardImage.alt = this._name;
    this._setEventListener();
    // Вернём элемент наружу
    return this._element;
  }
  _setEventListener() {

    this._buttonLike = this._element.querySelector('.element__like'); //кнопка лайк
    this._buttonDelete = this._element.querySelector('.element__delete'); //кнопка корзина
    //выбор элементов для попапа"большое фото"
    this._setButtonLikeListener();  //вызов метода //лайк фото
    this._setButtonDeleteListener();  //вызов метода //удаление карточки
    this._setOpenPopupPhotoListener();  //вызов метода //открыть попап 'Большое фото'
  }
  _setButtonDeleteListener() {     // слушатель события удалить карточку
    this._buttonDelete.addEventListener('click', () => {
      this._handleDelete();
    });
  }
  _handleDelete() {    //метод удалить карточку
    this._buttonDelete.closest('.element').remove();
  }
  _setButtonLikeListener() {     // слушатель события поставить лайк
    this._buttonLike.addEventListener('click', () => {
      this._handleLike();
    });
  }
  _handleLike() {             //метод поставить лайк
    this._buttonLike.classList.toggle('element__like_active');
  };
  _setOpenPopupPhotoListener() {  // стушатель попапа Большое фото
    this._cardImage.addEventListener('click', () => {
      this._openPopupPhoto();
    });
  }
  _openPopupPhoto() {  // открытие попапа Большое фото
    openPopup(_popupPhoto);
    _popupPhotoLink.src = this._link;
    _popupPhotoTitle.textContent = this._name;
    _popupPhotoLink.alt = this._name;
  }
}