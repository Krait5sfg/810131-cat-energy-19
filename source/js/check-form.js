const requiredInputs = document.querySelectorAll(".check-form-js");
const btnForm = document.querySelector(".form__button");


//код чтобы в IE 11 работал forEach
if (typeof NodeList.prototype.forEach !== 'function') {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

btnForm.addEventListener("click", function (evt) {
  let flag = 0;
  requiredInputs.forEach(function (element) {
    if (element.value === '') {
      flag += 1;
    }
  });
  if (flag === 4) {
    evt.preventDefault();
    alert("Незаполнены обязательные поля формы");
  }
});
