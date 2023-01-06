/**
 * @jest-environment jsdom
 */

import modalInputValidation from '../js/modalInputValidation';

document.body.innerHTML = `<div class="modal__wrapper">
<p class="modal__text">Нам не удалось определить Ваши координаты, пожалуйста укажите их вручную</p>
<span class="modal__hint">Широта и долгота через запятую</span>
<span class="modal__hint">Пример: 59.9060595, 30.4600735</span>
<form class="modal__form" novalidate>
  <input class="modal__input" type="text" required pattern="^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?),\\s[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$">
  <div class="modal__btn-container">
    <button class="btn modal__submit-btn">Ok</button>
    <button class="btn modal_denied-btn" type="button">Отмена</button>
  </div>
</form>
</div>`;

const modalInput = document.querySelector('.modal__input');

test('Check modal input coords validity, when value is empty', () => {
  modalInput.value = '';
  modalInputValidation(modalInput);
  expect(modalInput.validationMessage).toBe('Введите координаты в поле');
});

test('Check modal input coords validity, when value is not in pattern', () => {
  modalInput.value = '123';
  modalInputValidation(modalInput);
  expect(modalInput.validationMessage).toBe('Координаты не соответствуют шаблону');
});
