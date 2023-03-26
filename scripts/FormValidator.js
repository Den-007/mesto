export default class FormValidator {
    constructor(options, form) {
      this._options = options;
      this._form = form;
      
    }
    _hiddenError(input) {  //метод скрывает ошибку 
      this._errorInput = this._form.querySelector(`.${input.id}-error`); //показ ошибки под инпутом
      input.classList.remove(this._options.inputErrorClass);
      this._errorInput.classList.remove(this._options.errorClassActive);
      this._errorInput.textContent = '';
    };
    _showError(input) {  //метод показывает ошибку    
      this._errorInput = this._form.querySelector(`.${input.id}-error`); //показ ошибки под инпутом
      input.classList.add(this._options.inputErrorClass);
      this._errorInput.classList.add(this._options.errorClassActive);
      this._errorInput.textContent = input.validationMessage;
    };
    _toggleErrorState(input) {   //проверка на валидность   
      if (input.validity.valid) {
        this._hiddenError(input);
      } else {
        this._showError(input);
      }
    };
    _disableButton = () => { //кнопка не активна 
        console.log(this._submitButton);   
      this._submitButton.setAttribute('disabled', 'true');
      this._submitButton.classList.add(this._options.inactiveButtonClass);
    };
    _enableButton = () => { //кнопка активна    
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove(this._options.inactiveButtonClass);
    };
    _togglePopupAddButton(input) {   //активна кнопка, если оба поля валидны    
      if (input.validity.valid) {
        this._enableButton();
      } else {
        this._disableButton();
      }
    };
    _setEventListeners = () => {
        console.log(this._form); 
      this._inputs = Array.from(this._form.querySelectorAll(this._options.inputSelector)); //массив всех инпутов 
      console.log(this._inputs);   
      this._submitButton = this._form.querySelector(this._options.submitButtonSelector); //кнопка сохранить 
      this._inputs.forEach(input => {    // обходим массив импутов    
        input.addEventListener('input', () => {
          this._toggleErrorState(input);
          this._togglePopupAddButton(input);
        });
        this._togglePopupAddButton(input);
      });
    };
    //метод, включающий валидацию формы
    enableValidation = () => {
      this._setEventListeners();
    };
    enableValidationAdd = () => {
      this._setEventListeners();
    };
  }