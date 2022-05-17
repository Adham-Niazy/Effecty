async function init() {
  let rustApp = null;

  try {
    rustApp = await import("../pkg");
  } catch (err) {
    console.error(err);
    return;
  }
  const input = document.getElementById("upload");
  const error = document.getElementById("error");
  const loading = document.getElementById("loading");
  const fileReader = new FileReader();

  fileReader.onloadend = () => {
    error.classList.add("hidden");
    let base64 = fileReader.result.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ""
    );
    let img_data_url = rustApp.grayscale(base64);
    loading.classList.add("hidden");
    document.getElementById("new-img").setAttribute("src", img_data_url);
  };

  input.addEventListener("change", () => {
    error.classList.add("hidden");
    document.getElementById("new-img").setAttribute("src", "");
    if (input.files[0].type === "image/png") {
      loading.classList.remove("hidden");
      fileReader.readAsDataURL(input.files[0]);
    } else {
      error.classList.remove("hidden");
    }
  });
}

init();
