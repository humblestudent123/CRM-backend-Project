const url = "http://localhost:3000"

const addBtn = document.getElementById("addBtn")
const modal = document.getElementById('modal')
const addClientForm = document.getElementById("addClientForm")
const closeModal = document.getElementById("closeModal")
const tbody = document.getElementById("tbody")
const serach = document.getElementById("search")

getData()
serach.addEventListener('input', () => {
      setTimeout(()=>{
        getSearchData(serach.value)
      }, 300)
})


function getSearchData(string){
    fetch(url+`/api/clients?search=${string}`)
    .then((response) => { return response.json() })
    .then((body) => {console.log(body); renderData(body)  })


}


closeModal.addEventListener("click", ()=>{
  modal.classList.add("hiden")
})

addBtn.addEventListener('click', () => {
  modal.classList.remove("hiden")
})


addClientForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        const formData = new FormData(addClientForm); // создаём объект FormData, передаём в него элемент формы
  // теперь можно извлечь данные
      const name = formData.get('name'); // 'John'
      const surname = formData.get('surname'); // 'Smith'
      const lastName = formData.get("lastName")


      const user = { 
        'name': name,
        'surname': surname,
        'lastName': lastName,
        'contacts': []
       }
       console.log(user)
       modal.classList.add("hiden")
       postData(user)
})


function postData(user) {
  fetch(url+"/api/clients", {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
              'content-type': 'application/json'
          }
      })
      .then((response) => { return response.json() })
      .then((body) => {console.log(body); getData()})
}


function getData(){
  fetch(url+"/api/clients")
.then((response) => { return response.json() })
.then((body) => {console.log(body); renderData(body)})
}


function renderData (users){
  tbody.innerHTML = '';
  users.forEach((user)=>{
     tbody.innerHTML += 
          `<tr class="main__row">
                 <td class="main__hcol">${user.id}</td>
                 <td class="main__hcol">${user.name} ${user.lastName} ${user.surname} </td>
                 <td class="main__hcol">${user.createdAt}</td>
                 <td class="main__hcol">${user.updatedAt}</td>
                 <td class="main__hcol">Контакты</td>
                 <td class="main__hcol">
                 
                  <button  data-id = "${user.id}">Изменить</button>
                  <button data-id = "${user.id}">Удалить</button>
                
                 
                 </td>
                 
             </tr>`

  })

}