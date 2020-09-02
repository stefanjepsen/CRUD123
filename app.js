// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBDtnl0n3TzS5fMtslr3VZg0--j-sXIiTE",
    authDomain: "fir-javascriptcrud-a6a42.firebaseapp.com",
    databaseURL: "https://fir-javascriptcrud-a6a42.firebaseio.com",
    projectId: "fir-javascriptcrud-a6a42",
    storageBucket: "fir-javascriptcrud-a6a42.appspot.com",
    messagingSenderId: "1036266358032",
    appId: "1:1036266358032:web:8ad3c117f14996dcb89195"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Setup variables

  var db = firebase.database();
  var reviews = document.getElementById("reviews");
  var reviewsRef = db.ref("/reviews");

  reviewForm.addEventListener("submit", e => {

    var fullName = document.getElementById("fullName");
    var message = document.getElementById("message");
    var hiddenId = document.getElementById("hiddenId");

    var id = hiddenId.value || Date.now();

    db.ref("reviews/" + id).set({
        fullName: fullName.value,
        message: message.value,
        createdAt: firebase.database.ServerValue.TIMESTAMP
    });
  })

  reviewsRef.on("child_added", data => {
      var li = document.createElement("li");
      li.id = data.key;
      li.innerHTML = reviewTemplate(data.val());
      reviews.appendChild(li);
  });

 reviews.addEventListener("click", e => {
     updateReview(e);
 });

  function updateReview(e) {
      /*
      var reviewNode = e.target.parentNode;

      if (e.target.classList.contains("edit")) {
          console.log(reviewNode);
          fullName.value = reviewNode.querySelector(".fullName").innerText;
          message.value = reviewNode.querySelector(".message").innerText;

          hiddenId.value = reviewNode.id;
          Materialize.updateTextFields();
      }
       */ 
      var reviewNode = e.target.parentNode;
    if (e.target.classList.contains("edit")) {
        fullName.value = reviewNode.querySelector(".fullName").innerText;
        message.value = reviewNode.querySelector(".message").innerText;
        
        hiddenId.value = reviewNode.id;
        Materialize.updateTextFields();
    }

  }

 
 
  function reviewTemplate({ fullName, message, createdAt}) {
      var createdAtFormatted = new Date(createdAt);

      return `
       <div>
          <label>Full Name:</label>
          <label class="fullName"><strong>${ fullName }</strong></label>
      </div>

      <div>
      <label>Message:</label>
      <label class="message"><strong>${ message }</strong></label>
      <br>

      <button class="waves-effect waves-light btn delete">Delete</button>
      <button class="waves-effect waves-light btn edit">Update</button>
      <br/>
  </div>
    `;
  }