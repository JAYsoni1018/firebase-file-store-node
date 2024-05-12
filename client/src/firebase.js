

import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDv9TEAttCmrXmk5BJnuhOA7tsIqZduqH4",
    authDomain: "node-file-store.firebaseapp.com",
    projectId: "node-file-store",
    storageBucket: "node-file-store.appspot.com",
    messagingSenderId: "373105431008",
    appId: "1:373105431008:web:44c426f99602d41c595b85"
  };

  const app=initializeApp(firebaseConfig);

  export default app;