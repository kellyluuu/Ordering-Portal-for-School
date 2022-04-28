
const preview = document.getElementById("preview")
const matchLista = document.getElementById("match-list-a")
const search = document.getElementById("search-name")

preview.addEventListener("click", prev)

function prev(){
  const name = document.getElementById("name")
  const type = document.getElementById("type")
  const title = document.getElementById("title")
  const dept = document.getElementById("dept")
  const num = document.getElementById("num")
  const numBar = document.getElementById('numBar')
  const inName = document.getElementById("inName").value
  const inType = document.getElementById("inType").value
  const inTitle = document.getElementById("inTitle").value
  const inDept = document.getElementById("inDept").value
  const inNum = document.getElementById("inNum").value


  name.innerText = inName;
  title.innerText = inTitle;
  dept.innerText = inDept
  num.innerText = inNum
  numBar.innerText = inNum
  type.innerText = inType
}






function loadImage(event){
  const image = document.getElementById('imgDisplayed')
  console.log(event.target.files[0])
  image.src = URL.createObjectURL(event.target.files[0])

}




window.onload = function () {
  document.getElementById("down")
      .addEventListener("click", () => {
          const result = this.document.getElementById("result");
          console.log(result);
          console.log(window);
          var opt = {
              margin: 1,
              filename: 'myfile.pdf',
              image: { type: 'jpeg', quality: 1 },
              html2canvas: { scale: 2 },
              jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
          };
          html2pdf().from(result).set(opt).save();
      })
}

const filterDataA = async searchText => {
  const res = await fetch ("./output.json")
  const idData = await res.json();
  let matches = idData.filter(idname =>{
      const regex = new RegExp(`^${searchText}`, 'gi')
      return idname.name.match(regex) || idname.idNum.match(regex);
  })
  if (searchText.length === 0) {
      matches = [];
      matchLista.innerHTML = ""
  }
  outputHtmlA (matches);
}

const outputHtmlA = matches => {
  if(matches.length>0){
      const html = matches.map(match =>`
      <div class="match"id=${match.name}><h5>${match.idNum}</h5> <p>${match.name}</p></div>
      `)
      .join('')
      matchLista.innerHTML = html
  }
}

