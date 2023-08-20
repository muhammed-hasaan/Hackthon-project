import { app, auth, db, storage } from './firebase.mjs'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, getDocs, getDoc, addDoc, where, query, onSnapshot, orderBy, updateDoc, doc, deleteField, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

// getDownloadURL(ref(storage, doc.data().email))
//   .then((url) => {

// })

function detailpage(name, email, id, url) {
  localStorage.setItem("name", JSON.stringify(name))
  localStorage.setItem("email", JSON.stringify(email))
  localStorage.setItem("id", JSON.stringify(id))
  localStorage.setItem("detailurl", JSON.stringify(url))
  window.location.href = "../pages/profile.html"
}
window.detailpage = detailpage













var name;
onAuthStateChanged(auth, async (user) => {
  if (user) {

    document.getElementById("postadder").style.display = "block"
    var email = user.email
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
      document.getElementById("mainpostcontainer").innerHTML = ''
      querySnapshot.forEach((doc) => {

        userss.innerText = doc.data().fname + " " + doc.data().lname
        // console.log(doc.data());

        name = doc.data().fname + " " + doc.data().lname
        logout.innerText = " logout"

        userss.addEventListener("click", async () => {

          window.location.href = "./update.html"
        })
      })
    })


    const uid = user.uid;


    var Publish = document.getElementById("Publish");
    var newdate = new Date()
    var date = newdate.getDate()
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var year = newdate.getFullYear();
    var strTime = date + " " + monthNames[newdate.getMonth()] + " " + year
    var newdate1 = newdate.getMilliseconds()
    console.log(newdate1);
    Publish.addEventListener("click", async () => {
      var postname = document.getElementById("postname").value
      var postdesc = document.getElementById("postdesc").value
      var userid = user.uid


      if (postname.length < 5) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please enter the title greater than 5 letters and less than 50 letters',
        })
      }
      else if (postdesc.length < 100) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'the description is about minimum 100 characters and maximun 3000 characters',
        })
      }

      else {

        try {
          const docRef = await addDoc(collection(db, "posts"), {
            postname: postname,
            postdesc: postdesc,
            strTime: strTime,
            name: name,
            newdate1: newdate1,
            userid: userid,
            email: email

          });
          // postname = " "
          // postdesc = " "
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    })
    console.log(user.uid);
    const q1 = query(collection(db, "posts"), where("userid", "==", user.uid));
    onSnapshot(q1, (querySnapshot) => {
      document.getElementById("mainpostcontainer").innerHTML = ''
      querySnapshot.forEach((change) => {
        console.log(change.data(), "with user");
        getDownloadURL(ref(storage, user.email))
          .then((url) => {
            //   localStorage.setItem("imageurl"  ,JSON.stringify(url))
            // localStorage.setItem("email" ,JSON.stringify(email))
            //  var email12 =JSON.parse(localStorage.getItem("email"))
            if (user) {

              document.getElementById("mainpostcontainer").innerHTML +=
                `
                  <div class="post">
                  <div class="usershowinpost">
                  <div>
    
                  <img class="postimg" src="${url}" alt="">
                </div>
                <div>
                <h3 class="postuser" >${change.data().postname}</h3>
                <p class="postdate">${change.data().name} ${change.data().strTime} </p>
                </div>
                </div>
                <div class="postpara">
                <p id="postpara">${change.data().postdesc}</p>
                </div>
                <div class="editbtn">
                
            </div>
            <div style="display:flex; column-gap:20px; color: #7749F8;">
            <div class="delbtn" onclick="deletePost('${change.id}')">
            delete
            </div>
            <div class="delbtn" onclick="editPost('${change.id}')">
            edit
            </div>
            <div/>
            
            </div>
            `
            }
          })
          .catch((error) => {
            // Handle any errors
          });
      })


    })
    console.log(user.uid);
    async function editPost(postId) {
      const postRef = doc(db, "posts", postId);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();
      const { value: title } = await Swal.fire({
        input: 'text',
        inputLabel: 'Title',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })
      if (title) {
        try {
          await updateDoc(postRef, {
            postname: title,
          });
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      }




      const { value: text } = await Swal.fire({
        input: 'text',
        inputLabel: 'Descripton',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })
      if (text) {
        try {
          await updateDoc(postRef, {
            postdesc: text,
          });
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      }
    }
    window.editPost = editPost
  } else {
    const q2 = query(collection(db, "posts"));
    onSnapshot(q2, (querySnapshot) => {
      document.getElementById("mainpostcontainer").innerHTML = ''
      querySnapshot.forEach((change) => {
        console.log(change.data(), "without user");
        //   localStorage.setItem("imageurl"  ,JSON.stringify(url))
        // localStorage.setItem("email" ,JSON.stringify(email))
        //  var email12 =JSON.parse(localStorage.getItem("email"))
        getDownloadURL(ref(storage, change.data().email))
          .then((url) => {

            document.getElementById("mainpostcontainer").innerHTML +=
              `
                <div class="post">
                <div class="usershowinpost">
                <div>
      
                <img class="postimg" src="${url}" alt="">
              </div>
              <div>
              <h3 class="postuser" >${change.data().postname}</h3>
              <p class="postdate">${change.data().name} ${change.data().strTime} </p>
              </div>
              </div>
              <div class="postpara">
              <p id="postpara">${change.data().postdesc}</p>
              </div>
              <div class="editbtn">
              
          </div>
          <div style="display:flex; column-gap:20px; color: #7749F8;">
          <div class="delbtn" onclick="detailpage('${change.data().name}','${change.data().email}','${change.id}' , '${url}')">
          detail
          </div>
          <div/>
          
          </div>
          `
          })
          .catch((error) => {
            // Handle any errors
          });
      })



    })
  }


  function deletePost(postId) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this blog!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const postRef = doc(db, "posts", postId);
        try {
          await deleteDoc(postRef);
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your blog has been deleted',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  window.deletePost = deletePost
});


// var urll ;




document.getElementById("logout").addEventListener("click", () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    window.location.href = "../pages/index.html"
  }).catch((error) => {
    // An error happened.
  });
})
