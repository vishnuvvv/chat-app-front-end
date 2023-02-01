const uploadImage = ()=>{
    const data =  new FormData();
    data.append("file", formInputs.image);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "dd8z3memp");
    fetch("https://api.cloudinary.com/v1_1/dd8z3memp/image/upload", {
      method: "post",
      body: data,
    })
}

export default uploadImage;


/* 

write then after calling the functiom

.then((res) => res.json())
      .then((data) => {
        setPhotoUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });

      */

/*

    if (!isSignUp) {
      sendRequest("signup")
        .then(() => navigate("/chats"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then(() => navigate("/chats"))
        .then((data) => console.log(data));
    }
*/