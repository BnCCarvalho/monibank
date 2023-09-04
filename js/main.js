import CPFValido from "./validaCPF.js";
import maiorDeIdade from "./validaIdade.js";

const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const listaResposta = {
    nome: e.target.elements["nome"].value,
    email: e.target.elements["email"].value,
    rg: e.target.elements["rg"].value,
    cpf: e.target.elements["cpf"].value,
    aniversario: e.target.elements["aniversario"].value,
  };

  localStorage.setItem("cadastro", JSON.stringify(listaResposta));

  window.location.href = "./abrir-conta-form-2.html";
});

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo));
  campo.addEventListener("invalid", (e) => e.preventDefault());
});

const tiposDeErro = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "customError",
];

const mensagens = {
  nome: {
    valueMissing: "O campo 'Nome' não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "O campo 'Nome' não tem caractéres suficientes.",
  },

  email: {
    valueMissing: "O campo 'E-mail' não pode estar vazio.",
    typeMismatch: "Por favor, preencha um e-mail válido.",
    tooShort: "O campo 'E-mail' não tem caractéres suficientes.",
  },

  rg: {
    valueMissing: "O campo 'RG' não pode estar vazio.",
    patternMismatch: "Por favor, preencha um RG válido.",
    tooShort: "O campo 'RG' não tem caractéres suficientes.",
  },

  cpf: {
    valueMissing: "O campo 'CPF' não pode estar vazio.",
    patternMismatch: "Por favor, preencha um CPF válido.",
    customError: "O CPF digitado não existe.",
    tooShort: "O campo 'CPF' não tem caractéres suficientes.",
  },

  aniversario: {
    valueMissing: "O campo 'Data de nascimento' não pode estar vazio.",
    customError: "Você deve ser maior que 18 anos para se cadastrar.",
  },

  termos: {
    valueMissing: "Você deve aceitar nossos termos antes de continuar.",
  },
};

function verificaCampo(campo) {
  let mensagem = "";
  campo.setCustomValidity("");

  campo.name == "cpf" && campo.value.length >= 11 ? CPFValido(campo) : "";
  campo.name == "aniversario" && campo.value != "" ? maiorDeIdade(campo) : "";

  tiposDeErro.forEach((erro) => {
    campo.validity[erro] ? (mensagem = mensagens[campo.name][erro]) : "";
  });

  const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
  const validadorDeInput = campo.checkValidity();

  !validadorDeInput
    ? (mensagemErro.textContent = mensagem)
    : (mensagemErro.textContent = "");

  campo.style.border = "2px solid red";
}
