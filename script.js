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

        "https://script.google.com/macros/s/AKfycby77AIICF8r463EKMhvZmyg3dOZU3ffYZBYXtjLBNvHatsHS31P5qCsbivDzbOwpnY8/exec",

        {

          method:"POST",

          body:JSON.stringify(
            dados
          )

        }

      );

      const json =
      await resposta.json();

      if(json.sucesso){

        statusText.innerHTML =
        "✅ CHECK-IN REALIZADO";

      }

      else{

        statusText.innerHTML =
        "❌ ERRO";

      }

    }

  );

}
