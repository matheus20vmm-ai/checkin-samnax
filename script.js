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

    video.onloadedmetadata = async()=>{

      await video.play();

      cameraPronta = true;

      statusText.innerHTML =
      "✅ Câmera frontal ativa";

    };

  }

  catch(err){

    console.log(err);

    statusText.innerHTML =
    "❌ Permita câmera";

    alert(
      "Permita acesso à câmera"
    );

  }

}

window.onload = ()=>{

  iniciarCamera();

};

function capturar(){

  if(!cameraPronta){

    alert(
      "A câmera ainda não iniciou"
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

  const canvas =
  document.getElementById("canvas");

  canvas.width =
  video.videoWidth;

  canvas.height =
  video.videoHeight;

  const ctx =
  canvas.getContext("2d");

  ctx.drawImage(
    video,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const imagem =
  canvas.toDataURL("image/png");

  console.log(imagem);

  statusText.innerHTML =
  "✅ Selfie capturada";
}
