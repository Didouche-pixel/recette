// controller.js

const Controller = {
    init() {
        this.setupEventListeners();
        this.checkUserStatus();
    },

    setupEventListeners() {
        // Inscription
        document.getElementById("signUpForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("signUpEmail").value;
            const password = document.getElementById("signUpPassword").value;

            Model.signUp(email, password)
                .then(() => View.showMessage("success", "Inscription réussie"))
                .catch(error => View.showMessage("error", error.message));
        });

        // Connexion
        document.getElementById("signInForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("signInEmail").value;
            const password = document.getElementById("signInPassword").value;

            Model.signIn(email, password)
                .then(() => View.showMessage("success", "Connexion réussie"))
                .catch(error => View.showMessage("error", error.message));
        });

        // Déconnexion
        document.getElementById("logoutButton").addEventListener("click", () => {
            Model.signOut()
                .then(() => View.showMessage("success", "Déconnexion réussie"))
                .catch(error => View.showMessage("error", error.message));
        });

        // Ajout de recette
        document.getElementById("recipeForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const ingredients = document.getElementById("ingredients").value;
            const instructions = document.getElementById("instructions").value;
            const user = auth.currentUser;

            if (user) {
                Model.addRecipe(user.uid, { titre: title, ingredients, instructions })
                    .then(() => {
                        View.showMessage("success", "Recette ajoutée !");
                        this.refreshRecipes(user.uid);
                    })
                    .catch(error => View.showMessage("error", error.message));
            }
        });
    },

    checkUserStatus() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.refreshRecipes(user.uid);
                document.getElementById("auth-section").style.display = "none";
                document.getElementById("recipe-section").style.display = "block";
            } else {
                document.getElementById("auth-section").style.display = "block";
                document.getElementById("recipe-section").style.display = "none";
            }
        });
    },

    refreshRecipes(userId) {
        Model.getRecipes(userId).then(snapshot => {
            const recipes = [];
            snapshot.forEach(child => {
                recipes.push({ id: child.key, ...child.val() });
            });
            View.displayRecipes(recipes);
        });
    },

    deleteRecipe(recipeId) {
        const user = auth.currentUser;
        if (user) {
            Model.deleteRecipe(user.uid, recipeId)
                .then(() => {
                    View.showMessage("success", "Recette supprimée !");
                    this.refreshRecipes(user.uid);
                })
                .catch(error => View.showMessage("error", error.message));
        }
    }
};
