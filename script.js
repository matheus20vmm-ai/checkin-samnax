import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  addDoc,
  collection
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

  apiKey:
  "AIzaSyBLtXwO_TRZkQY4hsTEUlLINK_htwtaDUE",

  authDomain:
  "checkin-samnax.firebaseapp.com",

  projectId:
  "checkin-samnax",

  storageBucket:
  "checkin-samnax.firebasestorage.app",

  messagingSenderId:
  "927671247908",

  appId:
  "1:927671247908:web:bbfb641f7299f6e5cfe4b1"

};

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

const video =
document.getElementById("video");

const statusText =
document.getElementById("status");

async function iniciarCamera(){

  try{

    const stream =
    await navigator.mediaDevices
    .getUserMedia({

      video:{
        facingMode:"user"
      },

      audio:false

    });

    video.srcObject = stream;

    await video.play();

    statusText.innerHTML =
    "✅ Câmera pronta";

  }

  catch(erro){

    console.log(erro);

    statusText.innerHTML =
    "❌ Erro câmera";

  }

}

window.onload = ()=>{

  iniciarCamera();

};

window.capturar = async()=>{

  try{

    const nome =
    document.getElementById("nome")
    .value;

    if(!nome){

      alert(
        "Digite seu nome"
      );

      return;
    }

    const canvas =
    document.getElementById(
      "canvas"
    );

    canvas.width =
    video.videoWidth;

    canvas.height =
    video.videoHeight;

    const ctx =
    canvas.getContext("2d");

    ctx.drawImage(
      video,
      0,
      0
    );

    const imagem =
    canvas.toDataURL(
      "image/jpeg",
      0.5
    );

    statusText.innerHTML =
    "☁️ Salvando...";

    navigator.geolocation
    .getCurrentPosition(

      async(pos)=>{

        await addDoc(

          collection(
            db,
            "checkins"
          ),

          {

            nome:nome,

            latitude:
            pos.coords.latitude,

            longitude:
            pos.coords.longitude,

            selfie:imagem,

            data:
            new Date()

          }

        );

        statusText.innerHTML =
        "✅ CHECK-IN SALVO";

      }

    );

  }

  catch(erro){

    console.log(erro);

    statusText.innerHTML =
    "❌ ERRO";

  }

};
