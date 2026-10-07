// Fa Family Budget — Firebase settings.
// 1) Paste the config object from Firebase console → Project settings → Your apps → Web app.
// 2) List the two Google accounts allowed to use the app (must match firestore.rules).
// These values are safe to keep in a public repo: the database is protected by firestore.rules, not by hiding this file.
window.FFB_CONFIG = {
  firebase: {
    apiKey: "AIzaSyA7j6O9QE_elMUztbEDJbF1NPgOaTr5mH0",
    authDomain: "fa-family-budget.firebaseapp.com",
    projectId: "fa-family-budget",
    storageBucket: "fa-family-budget.firebasestorage.app",
    messagingSenderId: "601916635497",
    appId: "1:601916635497:web:677c19b8e6a8d69bcf25f8"
  },
  householdEmails: [
    "filipefa1998@gmail.com",
    "wife.email@gmail.com"
  ]
};
