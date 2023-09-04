const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");

const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
let imagemUrl = "";

const botaoEnviar = document.querySelector("[data-enviar]");

botaoIniciarCamera.addEventListener("click", async function () {
  const iniciarVideo = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  botaoIniciarCamera.style.display = "none";
  campoCamera.style.display = "block";

  video.srcObject = iniciarVideo;
});

botaoTirarFoto.addEventListener("click", function () {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

  imagemUrl = canvas.toDataURL("image/jpeg");

  campoCamera.style.display = "none";
  mensagem.style.display = "block";
});

botaoEnviar.addEventListener("click", () => {
  const receberDados = localStorage.getItem("cadastro");
  const converteRetorno = JSON.parse(receberDados);

  converteRetorno.imagem = imagemUrl;

  localStorage.setItem("cadastro", JSON.stringify(converteRetorno));

  window.location.href = "./abrir-conta-form-3.html";
});
