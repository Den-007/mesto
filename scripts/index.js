const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = popup.querySelector('.popup__close-button');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.profile__title');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.profile__text');// Воспользуйтесь инструментом .querySelector()
let newTextName = document.querySelector('.popup__input_type_name');
let newTextJob = document.querySelector('.popup__input_type_job');

const formElementCard = document.querySelector('.popup__form_add_card');
const cardNameInput = document.querySelector('.popup__input_card_name');
const cardLinkInput = document.querySelector('.popup__input_card_image');

const popupAddCard = document.querySelector('.popup_add_card');
const addPopupButton = document.querySelector('.profile__button-add');
const closePopupButtonAdd = popupAddCard.querySelector('.popup__close-button_add_card');
const addForm = document.querySelector('.popup__form_add_card');
const list = document.querySelector(".elements");

const popupImage = document.querySelector('.popup_image_big');
const closePopupImage = popupImage.querySelector('.popup__close-button_image_big');
const imageTitle = popupImage.querySelector('.popup__card-name');
const imagePopup = popupImage.querySelector('.popup__big-image');

const togglePopup = () => {
    popup.classList.toggle('popup_opened');
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


openPopupButton.addEventListener('click', () => {
    togglePopup();
    newTextName.value = nameInput.textContent;
    newTextJob.value = jobInput.textContent;
})

closePopupButton.addEventListener('click', togglePopup);
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
function createCard(text) {
    const newHtmlElement = document.querySelector(".card-template").content.cloneNode(true); // клонируем ноду
    const card = newHtmlElement.querySelector('.element'); // теперь мы свободны от template и работаем именно с dom узлом
    const header = card.querySelector('.element__text');
    const image = card.querySelector('.element__image');
    header.textContent = text.name; // устанавливаем заголовок элемента
    image.src = text.link;
    image.alt = text.name;

    setListenersForItem(card);
    return card;
}

function renderInitialCards() {
    const itemslist = items.map(createCard);
    list.prepend(...itemslist);
}

function submitAddCardForm(evt) {
    evt.preventDefault();

    const userNewCard = {
        name: '',
        link: '',
    };
    userNewCard.name = cardNameInput.value;
    userNewCard.link = cardLinkInput.value;

    list.prepend(createCard(userNewCard));

    togglePopupAdd();
}

addForm.addEventListener('submit', submitAddCardForm);



function setListenersForItem(element) {
      const deleteButton = element.querySelector('.element__delete');
      deleteButton.addEventListener('click', handleDelete); // TODO передаем ссылку на функцию
    // 
    const likeButton = element.querySelector('.element__like');
    likeButton.addEventListener('click', handleLike);
    // 
     const cardImage = element.querySelector('.element__image-btn');
     cardImage.addEventListener('click', () => handleGenerateImagePopup(element));
}

function handleGenerateImagePopup(element) {
    const bigImageName = element.querySelector('.element__text').textContent;
    const bigImage = element.querySelector('.element__image');
  
    imagePopup.src = bigImage.src;
    imageTitle.textContent = bigImageName;
    imagePopup.alt = bigImageName;
  
    togglePopupBig();
  }
  
function handleLike(event) {
    const currentListItem = event.target.classList.toggle('element__like_active');
}
function handleDelete(event) {
    const currentListItem = event.target.closest('.element'); // получаем родителя кнопки
    currentListItem.remove();
  }
renderInitialCards();


function closePopupOverlay (e) {
    const target = e.target;
    const its_popupProfile = target == popup;
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

  closePopupButton.addEventListener('click', () => {
    closePopup(popup);
  });