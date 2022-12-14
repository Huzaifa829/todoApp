
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { doc, addDoc, setDoc, getFirestore, collection, getDocs,deleteDoc} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
//  import { getDatabase} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-database.js";

// const database = getDatabase();


const firebaseConfig = {
    apiKey: "AIzaSyCR6X_A9GAnAMvYg0mxGVfx_J1bDqc_60w",
    authDomain: "todoapp-94302.firebaseapp.com",
    projectId: "todoapp-94302",
    storageBucket: "todoapp-94302.appspot.com",
    messagingSenderId: "768247164486",
    appId: "1:768247164486:web:2deb87ec33e8f41569a447",
    measurementId: "G-8YDX56J7B4"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();


let inputEle = document.querySelector(".input");
let submitEle = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks")
let containerDiv = document.querySelector(".container")
let deleteAll = document.querySelector(".delete-all");
let arrayOfTasks = [];
// console.log(inputEle)


// getTaskFromLocalStorage();
// var button = document.getElementById('hello')
// button.addEventListener('click', hello)




submitEle.onclick = async function () {

    if (inputEle.value !== "") {
        addTaskToArray(inputEle.value);
        inputEle.value = "";
    }
}
let uid;
async function addTaskToArray(taskText) {
    var ref = doc(collection(db, "ok"))
    uid = ref.id
    await setDoc(doc(db, "data", ref.id), {
        uid: taskText
    });
    getData()
}

window.onload = async function ()
{
    getData()
}

async function getData() {
    const querySnapshot = await getDocs(collection(db, "data"));
    tasksDiv.innerHTML = "";
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let div = document.createElement("div");
        let div1 = document.createElement("div");
        let  p = document.createElement("p");
        let input=document.createElement('input')
        div.className = "task";
        div1.className = "task1";
        input.type="text"
        input.style.display='none'
        // Check If Task is Done
        // if (task.completed) {
        //     div.className = "task done";
        // }
        div.setAttribute("id", doc.id);
        p.setAttribute("class", "para");
        div.appendChild(input)
        div.appendChild(p)
        p.appendChild(document.createTextNode(doc.data().uid));
        // Create Delete Button
        let span = document.createElement("span");
        let span1 = document.createElement("button");
        let span2 = document.createElement("button");
        span.className = "del";
        span1.className = "edit";
        span2.className = "edit";
        span2.style.display = "none";
        span.id= "deleting";
        span.setAttribute('onclick','deleted(this)')
        span.setAttribute('onclick','deleted(this)')
        span1.setAttribute('onclick','update(this)')
        span2.setAttribute('onclick','updated(this)')
        span1.id= "editing";
        span.appendChild(document.createTextNode("Delete"));
        span1.appendChild(document.createTextNode("Edited"));
        span2.appendChild(document.createTextNode("Update"));
        // Append Button To Main Div
        div.appendChild(div1)
        div1.appendChild(span);
        div1.appendChild(span1)
        div1.appendChild(span2)
        // Add Task Div To Tasks Container
        tasksDiv.appendChild(div);
    });
}
let getDa = document.getElementById("delete")
getDa.addEventListener("click",getData)



export async function deleted(a){
    var deleted_value=a.parentElement.parentElement.id
    await deleteDoc(doc(db, "data", deleted_value));
    getData()
}


export function update(a){
    var change=a.parentElement.parentElement.children[1]
    var change1=a.parentElement.parentElement.children[0]
    var change2=a.parentElement.parentElement.children[2].children[1]
    var change3=a.parentElement.parentElement.children[2].children[2]
    change.style.display='none'
    change1.style.display='block'
    change2.style.display='none'
    change3.style.display='block'
    change1.value=change.innerHTML

    
    
}
export async function updated(a){
  var input=a.parentElement.parentElement.children[0]
  var id=a.parentElement.parentElement.id

  await setDoc(doc(db, "data", id), {
    uid: input.value
});
getData()
}


export async function deleteall(){
    const querySnapshot = await getDocs(collection(db, "data"));
    querySnapshot.forEach(async(a) => {
        await deleteDoc(doc(db, "data", a.id));
    })
    getData()
}