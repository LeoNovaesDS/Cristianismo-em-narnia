const botaoSenha = document.getElementById("togglePassword");
const campoSenha = document.getElementById("senha");

botaoSenha.addEventListener("click", function () {

    if (campoSenha.type === "password") {

        campoSenha.type = "text";

        botaoSenha.textContent = "🙈";

    } else {

        campoSenha.type = "password";

        botaoSenha.textContent = "👁";

    }

});