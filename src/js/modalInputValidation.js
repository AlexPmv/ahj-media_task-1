export default function modalInputValidation(input) {
  if (!input.checkValidity()) {
    input.setCustomValidity('Координаты не соответствуют шаблону');
  }

  if (input.validity.valueMissing) {
    input.setCustomValidity('Введите координаты в поле');
  }

  input.reportValidity();
}
