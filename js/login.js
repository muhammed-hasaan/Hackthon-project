import { app, auth, db, storage } from './firebase.mjs'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

var sign = document.getElementById("Loginbtn")
sign.addEventListener("click", () => {
  var email = document.getElementById("email1").value
  var password = document.getElementById("password1").value
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      // ...
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Account has been Logined Seccessfully',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        window.location.href = "../pages/index.html"
      }, 3000)
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User Not Found',
      })
      const errorCode = error.code;
      const errorMessage = error.message;
    });
})

onAuthStateChanged(auth, async (user) => {
  if (user) {

    setTimeout(() => {
      window.location.href = "../pages/index.html"
    }, 3000)
  }
})

