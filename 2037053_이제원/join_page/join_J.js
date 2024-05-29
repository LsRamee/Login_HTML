document.addEventListener("DOMContentLoaded", function () {
  let name = document.getElementById("name");
  let id = document.getElementById("id");
  let pw = document.getElementById("pw");
  let btn = document.getElementById("btn");

  btn.addEventListener("click", function () {
    if (name.value === "") {
      name.nextElementSibling.classList.add("warning");
      setTimeout(function () {
        var labels = document.querySelectorAll("label");
        labels.forEach(function (label) {
          label.classList.remove("warning");
        });
      }, 1500);
    } else if (id.value === "") {
      id.nextElementSibling.classList.add("warning");
      setTimeout(function () {
        var labels = document.querySelectorAll("label");
        labels.forEach(function (label) {
          label.classList.remove("warning");
        });
      }, 1500);
    } else if (pw.value === "") {
      pw.nextElementSibling.classList.add("warning");
      setTimeout(function () {
        var labels = document.querySelectorAll("label");
        labels.forEach(function (label) {
          label.classList.remove("warning");
        });
      }, 1500);
    } else if (name.value !== "" && id.value !== "" && pw.value !== "") {
      alert("회원가입이 완료되었습니다.\n새 창에서 로그인을 해주세요.");
      window.open("../login_page/login.html", "");
    }
  });
});
