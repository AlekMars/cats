const container = document.querySelector("main");
const popupBlock = document.querySelector(".popup-wrapper");
const modalInfo = document.querySelector(".modal-wrapper");
let oneCat;
const formCat = document.querySelector("#show_data");
let editButton = document.querySelector(".edit")


let user = localStorage.getItem("catUser");
if (!user) {
    user = prompt("Представьтесь пожалуйста")
    localStorage.setItem('catUser', user);
}


popupBlock.querySelector(".popup_close").addEventListener("click", function(){
   popupBlock.classList.remove("active");
});
modalInfo.querySelector('.modal_close').addEventListener("click", function(){
    modalInfo.classList.remove("active");
    document.getElementById("show_data").reset();
});

document.querySelector("#add").addEventListener("click",
function(e) {
   e.preventDefault();
   popupBlock.classList.add("active");
});

const addForm = document.forms.addForm;

const createCard = function(cat, parent) {
    const card = document.createElement("div");
    card.className = "card";
    
    const img = document.createElement("div");
    img.className= "card-pic";
    card.id = cat.id;
    if(cat.img_link) {
    img.style.backgroundImage = `url(${cat.img_link})`;
    } else {
        img.style.backgroundImage = `url(img/cat.png)`;
        img.style.backgroundSize = "contain";
    };

    
    const name= document.createElement("h3");
    name.innerHTML= cat.name;
    
    let like = "";
    like.onclick = () => {
        
    }
    const del = document.createElement("button");
    del.innerText = 'delete';
    del.id = cat.id;
    del.addEventListener("click", function(e) {
       let id = e.target.id;
       deleteCat(id, card);
    });
    card.append(img, name, del);
    parent.append(card);
    card.addEventListener("click", function(e) {
        modalInfo.classList.add("active");
        const id = this.id;
         fetchCardbyID(id);

        })

}
const fetchCardbyID = function (catId) {
    fetch(`https://sb-cats.herokuapp.com/api/2/AlekMars/show/${catId}`)
    .then(res => res.json())
     
    .then(result => {       
       if(result.message === "ok") {
           oneCat = result.data;
         //let stringCat = JSON.stringify(oneCat)
        //  formCat.innerText = `Кличка: ${oneCat.name}
        //  Возраст: ${oneCat.age}
        //  id: ${oneCat.id}
        //  Рейтинг: ${oneCat.rate}`;
    const nameCat = document.querySelector("#catName") ;
    nameCat.setAttribute("value",oneCat.name);
    const catId = document.querySelector("#catId");
    catId.setAttribute("value", oneCat.id);
    const imgCat = document.querySelector("#imgCat");
    imgCat.setAttribute("value", oneCat.img_link);
    const ageCat = document.querySelector("#ageCat");
    ageCat.setAttribute("value", oneCat.age);
    const rateCat = document.querySelector("#rateCat");
    rateCat.setAttribute("value", oneCat.rate);
    // const favouriteCat = document.querySelector("#favouriteCat");
    // if (favouriteCat.checked){
    // favouriteCat.setAttribute("value", oneCat.favourite);
    // if (el.name) {
    //     body[el.name] = el.name === "favourite" ? el.checked : el
    //     .value ;
    // }



        
      
        
         
        
           

     } else {
        alert("Такого котика нет");
     }
    })
}

// createCard({name: "Boris",img_link: "https://mobimg.b-cdn.net/v3/fetch/4d/4d671cfe78cbb63a617875e1f6023157.jpeg"}, container);

fetch(`https://sb-cats.herokuapp.com/api/2/${user}/show`) //запрос на сервер
 .then(res => res.json()) // ответ что данные существуют
 
 .then(result => {       
    if(result.message === "ok") {
        console.log(result.data);
        result.data.forEach(function(el) {
            createCard(el, container);
            })
            
        
           
    }
 })


 const addCat = function(cat) {

    fetch(`https://sb-cats.herokuapp.com/api/2/${user}/add`, {
        method: "POST",
        headers:  {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat)
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        if(data.message === "ok") {
            createCard(cat, container);
            addForm.reset();
            popupBlock.classList.remove("active");
        }
    })
 }
 const deleteCat = async function(id, tag) {
    let res = await fetch(`https://sb-cats.herokuapp.com/api/2/${user}/delete/${id}`, {
        method: "DELETE"
     })
     let data = await res.json()
     if(data.message === "ok") {
                tag.remove();
        }
        //     method: "DELETE"
    // fetch(`https://sb-cats.herokuapp.com/api/2/AlekMars/delete/${id}`, {
    //     method: "DELETE"
    // })
    // .then(res => res.json())
    // .then(data =>{
    //     if(data.message === "ok") {
    //         tag.remove();
    //     }
    // })
 }


 addForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let body = {};
    for (let i = 0; i < addForm.elements.length; i++) {
        let el = addForm.elements[i];
        console.log(el);
        if (el.name) {
            body[el.name] = el.name === "favourite" ? el.checked : el
            .value ;
        }
    }
    console.log(body);
    addCat(body);
 });


document.querySelector("#edit").addEventListener("click", function() {
    alert("ddd")
})

