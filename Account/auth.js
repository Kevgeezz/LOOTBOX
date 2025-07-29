document.addEventListener('DOMContentLoaded', function () {
    const firebaseConfig = {
      apiKey: "AIzaSyB9jxnU1G6WgE6rRKI_IufJ-abQNE-v7dk",
      authDomain: "lootbox-vproduct.firebaseapp.com",
      projectId: "lootbox-vproduct",
      storageBucket: "lootbox-vproduct.firebasestorage.app",
      messagingSenderId: "753114136209",
      appId: "1:753114136209:web:75f2b96440b32c04c70930"
    };
  
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
  
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        window.location.href = "Account/Account.html";
      }
    });
  });

  /*document.addEventListener('DOMContentLoaded', function () {
    const firebaseConfig = {
      apiKey: "AIzaSyB9jxnU1G6WgE6rRKI_IufJ-abQNE-v7dk",
      authDomain: "lootbox-vproduct.firebaseapp.com",
      projectId: "lootbox-vproduct",
      storageBucket: "lootbox-vproduct.firebasestorage.app",
      messagingSenderId: "753114136209",
      appId: "1:753114136209:web:75f2b96440b32c04c70930"
    };
  
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
  
    firebase.auth().onAuthStateChanged(user => {
      // Get current page path
      const currentPage = window.location.pathname.split('/').pop();
      
      if (!user) {
        // Only redirect if not already on Account.html
        if (currentPage !== 'Account.html') {
          window.location.href = "Account/Account.html"; // Path to your login page
        }
      } else {
        // If user is logged in but on login page, redirect to home
        if (currentPage === 'Account.html') {
          window.location.href = "../index.html"; // Goes up one level to main directory
        }
      }
    });
});*/
  