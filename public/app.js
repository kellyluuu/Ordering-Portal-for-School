


function loadImage(event){
    const image = document.getElementById('imgDisplayed')
    console.log(event.target.files[0])
    image.src = URL.createObjectURL(event.target.files[0])
  
  }
  


function loadUrl(){
  const newUrl = document.getElementById('new-url-img')
  newUrl.innerHTML = `<%=newUrl%>`

}





