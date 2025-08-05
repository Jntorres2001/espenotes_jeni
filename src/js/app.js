// Declaración de variables globales
let MAIN;
let MODAL_POST;
let BTN_SHOW_POST;
let BTN_CANCEL_POST;
let deferredPrompt;
let BTN_INSTALL_APP;

// Funciones
const showPostModal = () => {
  MAIN.style.display = "none";
  MODAL_POST.style.display = "block";
  setTimeout(() => {
    MODAL_POST.style.transform = "translateY(0)";
  }, 1);
};

const closePostModal = () => {
  MAIN.style.display = "block";
  MODAL_POST.style.transform = "translateY(100vh)";
};

// Evento para manejar la instalación de la PWA
window.addEventListener("beforeinstallprompt", (e) => {
  console.log("Evento por defecto anulado");
  e.preventDefault();
  deferredPrompt = e;
});

// Cuando se carga el DOM (ahora como función async)
window.addEventListener("load", async () => {
  MAIN = document.querySelector("#main");
  MODAL_POST = document.querySelector("#modal-post-section");
  BTN_SHOW_POST = document.querySelector("#btn-upload-post");
  BTN_SHOW_POST.addEventListener("click", showPostModal);
  BTN_CANCEL_POST = document.querySelector("#btn-post-cancel");
  BTN_CANCEL_POST.addEventListener("click", closePostModal);

  // Registro del Service Worker
  if ("serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registrado correctamente");
    } catch (err) {
      console.log("Error al registrar Service Worker:");
    }
  }
});

window.addEventListener('load', async () =>{
    const bannerInstall = document.querySelector("#banner-install")
    bannerInstall.addEventListener('click', async ()=>{
        if(deferredPrompt){
            deferredPrompt.prompt();
            const res = await deferredPrompt.userChoice;
            if(res.outcome =='accepted'){
                console.log("Usuario acepto la instalacion del promt")
            }else{
                console.log('Rechazo la instalacion')
            }
        }
    })
})
