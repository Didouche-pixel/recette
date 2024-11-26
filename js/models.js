// model.js

// Initialiser Firebase
const firebaseConfig = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "VOTRE_AUTH_DOMAIN",
    databaseURL: "VOTRE_DATABASE_URL",
    projectId: "VOTRE_PROJECT_ID",
    storageBucket: "VOTRE_STORAGE_BUCKET",
    messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
    appId: "VOTRE_APP_ID"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

const Model = {
    // Authentification
    signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    },
    signIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    },
    signOut() {
        return auth.signOut();
    },

    // Gestion des recettes
    addRecipe(userId, recipe) {
        const recetteRef = database.ref(`recettes/${userId}`).push();
        return recetteRef.set(recipe);
    },
    getRecipes(userId) {
        return database.ref(`recettes/${userId}`).once('value');
    },
    updateRecipe(userId, recipeId, updatedData) {
        const recetteRef = database.ref(`recettes/${userId}/${recipeId}`);
        return recetteRef.update(updatedData);
    },
    deleteRecipe(userId, recipeId) {
        const recetteRef = database.ref(`recettes/${userId}/${recipeId}`);
        return recetteRef.remove();
    }
};
