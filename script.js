const video =
document.getElementById("video");

const statusText =
document.getElementById("status");

let cameraPronta = false;

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

    cameraPronta = true;

    statusText.innerHTML =
    "✅ Câmera pronta";

  }

  catch(err){

    console.log(err);

    statusText.innerHTML =
    "❌ Permita câmera";

  }

}

window.onload = ()=>{

  iniciarCamera();

};

async function capturar(){

  if(!cameraPronta){

    alert(
      "Câmera não iniciou"
    );

    return;
  }

  const nome =
  document.getElementById("nome")
  .value;

  if(!nome){

    alert(
      "Digite seu nome"
    );

    return;
  }

  navigator.geolocation
  .getCurrentPosition(

    async(pos)=>{

      try{

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
          "image/png"
        );

        const dados = {

          nome:nome,

          latitude:
          pos.coords.latitude,

          longitude:
          pos.coords.longitude,

          imagem:imagem

        };

        statusText.innerHTML =
        "☁️ Enviando...";

        const resposta =
        await fetch(

"https://script.google.com/macros/s/AKfycbzjkakfg3BSdKFuxhdtCl297bk6Jb9tlrZyY5XHdf-Miny8725EK6H5Lk-iF0Lctevc/exec",

          {

            method:"POST",

            headers:{
              "Content-Type":
              "text/plain;charset=utf-8"
            },

            body:JSON.stringify(
              dados
            )

          }

        );

        const texto =
        await resposta.text();

        console.log(texto);

        statusText.innerHTML =
        "✅ CHECK-IN REALIZADO";

      }

      catch(erro){

        console.log(erro);

        statusText.innerHTML =
        "❌ Erro ao enviar";

      }

    },

    ()=>{

      alert(
        "Permita localização"
      );

    },

    {

      enableHighAccuracy:true

    }

  );

}
