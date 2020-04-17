//скрипт нужен для корректной смены цвета в svg иконках в ie 11
const input_mail = document.querySelector(".form-owner__input--email");
const icon_mail = document.querySelector(".form-owner__icon--mail");

const input_phone = document.querySelector(".form-owner__input--phone");
const icon_phone = document.querySelector(".form-owner__icon--phone");

//для иконки с почтой
input_mail.addEventListener("focus", function () {
  check_valid(input_mail, icon_mail);

  input_mail.addEventListener("input", function () {
    check_valid(input_mail, icon_mail);
  });

  input_mail.addEventListener("blur", function () {
    if (input_mail.validity.valid) {
      icon_mail.style.fill = "#444444";
    } else if (!input_mail.validity.valid) {
      icon_mail.style.fill = "#ff8282";
    }
  });
});

//для иконки с телефоном
input_phone.addEventListener("focus", function () {
  check_valid(input_phone, icon_phone);

  input_phone.addEventListener("input", function () {
    check_valid(input_phone, icon_phone);
  });

  input_phone.addEventListener("blur", function () {
    if (input_phone.validity.valid) {
      icon_phone.style.fill = "#444444";
    } else if (!input_phone.validity.valid) {
      icon_phone.style.fill = "#ff8282";
    }
  });
});

function check_valid(input, icon) {
  if (input.validity.valid) {
    icon.style.fill = "#68b738";
  } else if (!input.validity.valid) {
    icon.style.fill = "#ff8282";
  }
}
