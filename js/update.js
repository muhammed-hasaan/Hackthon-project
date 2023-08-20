import { app, auth, db, storage } from './firebase.mjs'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, getDocs, getDoc, addDoc, where, query, onSnapshot, orderBy, deleteField, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
onAuthStateChanged(auth, async (user) => {
  if (user) {

    var userss = document.getElementById("username")
    var userss2 = document.getElementById("userpassword")
    var userss3 = document.getElementById("username2")
    var pass1 = document.getElementById("pass1")
    // const q = query(collection(db, "posts"), where("email", "==", user.email));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach(async(doc) => {
    var pass;
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      getDownloadURL(ref(storage, doc.data().email))
        .then((url) => {
          document.getElementById("updimage").src = url
          userss.innerHTML =
            `${doc.data().fname} 
<i class="fa-solid fa-pen-to-square" onclick="update('${doc.id}')"></i>
  `
          userss3.innerHTML =
            `${doc.data().lname} 
<i class="fa-solid fa-pen-to-square" onclick="update1('${doc.id}')"></i>
  `
          pass = doc.data().password
          userss2.innerHTML =
            `${doc.data().password}
<i class="fa-solid fa-pen-to-square" onclick="update2('${doc.id}')"></i>
  `
          console.log(doc.data());
        })
    })
      .catch((error) => {
        // Handle any errors
      });
  }

  async function update(postId) {
    const { value: firstname } = await Swal.fire({
      input: 'text',
      inputLabel: 'Update Your First Name',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    if (firstname) {
      const postRef = doc(db, "users", postId);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();

      try {
        await updateDoc(postRef, {
          fname: firstname,
        });
        window.location.reload()
        // Optionally, update the UI to reflect the changes
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }

  }
  window.update = update


  async function update1(postId) {
    const { value: lastnamename } = await Swal.fire({
      input: 'text',
      inputLabel: 'Update Your Last Name',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    if (lastnamename) {
      const postRef = doc(db, "users", postId);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();

      try {
        await updateDoc(postRef, {
          lname: lastnamename,
        });
        window.location.reload()
        // Optionally, update the UI to reflect the changes
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  }
  window.update1 = update1




  async function update2(postId1) {
    const { value: password } = await Swal.fire({
      input: 'password',
      inputLabel: 'Update Your Password',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    if (password) {
      const postRef = doc(db, "users", postId1);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();

      try {
        await updateDoc(postRef, {
          password: password
        });
        window.location.reload()
        // Optionally, update the UI to reflect the changes
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  }
  window.update2 = update2
  var name;


  var userss = document.getElementById("userss")
  var logout = document.getElementById("logout")
  var logout1 = document.getElementById("logout1")
  var loginmain = document.getElementById("loginmain")
  loginmain.style.display = "none"
  logout.style.display = "block"
  logout1.style.display = "block"
  userss.style.display = "block"

  const q2 = query(collection(db, "users"), where("email", "==", user.email));
  onSnapshot(q2, (querySnapshot) => {
    querySnapshot.forEach((doc) => {

      userss.innerText = doc.data().fname + " " + doc.data().lname
      console.log(doc.data());

      name = doc.data().fname + " " + doc.data().lname
      logout.innerText = " logout"

      userss.addEventListener("click", async () => {

        window.location.href = "./update.html"
      })
    })
  })
  document.getElementById("logout").addEventListener("click", () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      window.location.href = "../pages/index.html"
    }).catch((error) => {
      // An error happened.
    });
  })

})