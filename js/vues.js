// view.js

const View = {
    // Afficher les messages (succès, erreur)
    showMessage(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerText = message;
        document.body.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), 3000);
    },

    // Afficher les recettes
    displayRecipes(recipes) {
        const recettesContainer = document.getElementById("recettesContainer");
        recettesContainer.innerHTML = ""; // Vider le conteneur avant d'afficher

        recipes.forEach(recipe => {
            const recipeDiv = document.createElement("div");
            recipeDiv.innerHTML = `
                <h3>${recipe.titre}</h3>
                <p><strong>Ingrédients:</strong> ${recipe.ingredients}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                <button onclick="Controller.editRecipe('${recipe.id}')">Modifier</button>
                <button onclick="Controller.deleteRecipe('${recipe.id}')">Supprimer</button>
            `;
            recettesContainer.appendChild(recipeDiv);
        });
    }
};
