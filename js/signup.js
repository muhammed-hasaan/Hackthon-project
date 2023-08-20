import { app, auth, db, storage } from './firebase.mjs'
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";


var sign = document.getElementById("signupbtn")
sign.addEventListener("click", () => {
  var fname = document.getElementById("fname").value
  var lname = document.getElementById("lname").value
  var email = document.getElementById("email").value
  var password = document.getElementById("password").value
  var repeatpassword = document.getElementById("repeatpassword").value
  var fileinput = document.getElementById("file");





  if (fname == "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'First name is not entered',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
  else if (lname == "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Last name is not entered',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
  else if (email == "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Email is not entered and must enter @ in email',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
  else if (password == "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Password is not entered',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
  else if (repeatpassword == "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Password is not entered',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
  else if (fname.length < 4) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter the first name greater than three letters',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
  else if (lname.length < 1) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter the first name greater than three letters',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
  else if (fname.length > 10) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter the first name less than 10 letters',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
  else if (lname.length > 10) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter the Last name less than 10 letters',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
  else if (password.length < 8) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'make a password greater than 8 characters',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }




  else if (email && password || fname == "" || lname == "" || repeatpassword == "") {
    if (email.includes("@")) {


      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          const storageRef = ref(storage, email);


          // 'file' comes from the Blob or File API



          try {
            const docRef = await addDoc(collection(db, "users"), {
              fname: fname,
              lname: lname,
              email: email,
              password: password,
            });
            var file = fileinput.files[0]
            const storageRef = ref(storage, email);
            uploadBytes(storageRef, file).then((snapshot) => {
              console.log('Uploaded a blob or file!');
            });





            console.log("Document written with ID: ", docRef.id);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your Account has been created',
              showConfirmButton: false,
              timer: 1500
            })
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Account has been created',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            window.location.href = "../pages/login.html"
          }, 3000)
          // ...
          // .catch((error) => {

          //   const errorCode = error.code;
          //   const errorMessage = error.message;
          //   console.log(errorCode, errorMessage)
          //   // ..
          // })
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'there is no @ in email',
      })
    }
  } else {

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        const storageRef = ref(storage, email);
        try {
          const docRef = await addDoc(collection(db, "users"), {
            fname: fname,
            lname: lname,
            email: email,
            password: password,
          });
          console.log("Document written with ID: ", docRef.id);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Account has been created',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.href = "../pages/login.html"
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your Account has been created',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.href = "../pages/login.html"
        // ...

      }).catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        // ..
      })
  }
})
