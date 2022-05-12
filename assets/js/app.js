let cl = console.log;

//CRUD
//create >> success
//Read >> success
//Update>> success
//Delete

const stdInfoForm = document.getElementById("stdInfoForm");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const stdData = document.getElementById("stdData");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");
let stdArray = [];
if(localStorage.getItem('setStdInfo')){
   stdArray = JSON.parse(localStorage.getItem('setStdInfo'));
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function templating(arr){
    let result = '';
    arr.forEach((ele, i) =>{
        result +=`
        <tr>
            <td>${i + 1}</td>
            <td>${ele.getFname}</td>
            <td>${ele.getLname}</td>
            <td>${ele.getEmail}</td> 
            <td>${ele.getContact}</td>
            <td>
            <button class="btn btn-success" data-id="${ele.id}" onclick="onEditHandler(this)">Edit</button>
            
            </td> 
            <td>
            <button class="btn btn-danger" data-id="${ele.id}" onclick="onDeleteHandler(this)">Delete</button>
            
            </td>
        </tr>
        `
    });
    stdData.innerHTML = result;
}
templating(stdArray);
const onStudentSubmit = (eve) =>{
    eve.preventDefault();
    // cl(eve);
    let obj ={
        getFname : fname.value,
        getLname : lname.value,
        getEmail : email.value,
        getContact : contact.value,
        id :  uuid()
    }
    cl(obj);
    stdArray.push(obj);
    localStorage.setItem('setStdInfo',JSON.stringify(stdArray));
    stdInfoForm.reset();
    templating(stdArray);
}
const onEditHandler =(ele)=>{
    // cl(ele.getAttribute('data-id'));
    updateBtn.classList.remove('d-none');
    submitBtn.classList.add('d-none');
    let getId = ele.getAttribute('data-id');
    localStorage.setItem("setId",getId);
    let getData = JSON.parse(localStorage.getItem('setStdInfo'));
    cl(getData);
    let getObj = getData.filter(item => {
        return item.id === getId
    })
    cl(getObj);
    fname.value = getObj[0].getFname;
    lname.value = getObj[0].getLname;
    email.value = getObj[0].getEmail;
    contact.value = getObj[0].getContact;

};

const onDeleteHandler =(e)=>{
    // cl('Deleted !!!');
    let getId = e.getAttribute('data-id');
    cl(getId);
   let newStdArray = stdArray.filter(e =>{
       return e.id != getId
   })
localStorage.setItem('setStdInfo',JSON.stringify(newStdArray));
templating(newStdArray);
}

const onUpdateHandler = (eve) =>{
    cl(eve.target);
    let getId = localStorage.getItem("setId");
    cl(getId);

    // let getData = JSON.parse(localStorage.getItem("setStdInfo"));

    stdArray.forEach((ele)=>{
        if(ele.id === getId){
           ele.getFname = fname.value;
           ele.getLname = lname.value;
           ele.getEmail = email.value;
           ele.getContact = contact.value;
        }
    });

    localStorage.setItem('setStdInfo',JSON.stringify(stdArray));
    templating(stdArray);
    updateBtn.classList.add('d-none');
    submitBtn.classList.remove('d-none');
    stdInfoForm.reset();
    
}
stdInfoForm.addEventListener('submit',onStudentSubmit);
updateBtn.addEventListener('click',onUpdateHandler);

