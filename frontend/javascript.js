let data1="";
let datasss = "";
let details="";
var map = new Map();
var test = [];
function fetchData(){
    fetch('https://gorest.co.in/public/v1/users/').then(data =>{
        return data.json();
    }).then(data2=>{
        console.log(data2.data)
        data2.data.map((values,index)=>{
            data1 +=`<div class="card">
            <input type="hidden" name ="userid" value="${values.id}"/>
            <h1 class="name">${values.name}</h1>
            <p class="id">@${values.name.split(" ").join("_")}</p>
            <p class="status">Status: ${values.status}</p>
            <button onclick="pass(${index});location.href='details.html'">Get Detail</button>
            </div>`
            map.set(data2.data[index],index);
            test.push(data2.data[index])
        });
        document.getElementById("cards").innerHTML= data1;  
    }).catch((err)=>{
        console.log(err);
    });
}

function showdata(){
    console.log(test);
    console.log(map);
    fetchData();
}

function pass(id){
    var id = id;
    localStorage.setItem("id",id);
    return false
}

function getuserbyid(){
    var id = localStorage.getItem("id");
    console.log(id)
    fetch('https://gorest.co.in/public/v1/users/').then(data =>{
        return data.json();
    }).then(data=>{
        console.log(data.data[id])
            details=`<div class="card2">
            <input type="hidden" name ="userid" value="${data.data[id].id}"/>
            <h1 class="name">Name: ${data.data[id].name}</h1>
            <p class="id">ID: @${data.data[id].name.split(" ").join("_")}</p>
            <p class="status">Status: ${data.data[id].status}</p>
            <p class="gender">gender: ${data.data[id].gender}</p>
            <p class="email">Email: ${data.data[id].email}</p>
            <button onclick="location.href='main.html'">Go back To Home</button>
            <button onclick="pass(${id});deleteuser()">Delete User</button>
            </div>`
            console.log(details)
        document.getElementById("details").innerHTML= details;
    })
}
function deleteuser(id){
    var id = localStorage.getItem("id"); 
    console.log(id)
    fetch('https://gorest.co.in/public/v1/users/').then(data =>{
        return data.json();
    }).then(data=>{
        data.delete(id);
        console.log(data.data);
    })
}