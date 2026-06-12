const defaultRecipes = [
    {
        id: 1,
        title: "Creamy Tomato & Basil Pasta",
        category: "Lunch",
        image: "images/pasta.webp",
        ingredients: "200g Pasta, 400g Chopped Tomatoes, 2 cloves Garlic, Fresh Basil, Olive Oil, Salt",
        instructions: "Cook the pasta. In a separate pan, sauté garlic in olive oil, add tomatoes and simmer. Mix everything with fresh basil."
    },
    {
        id: 2,
        title: "Classic Fluffy Pancakes",
        category: "Breakfast",
        image: "images/pancakes.webp",
        ingredients: "1 cup Flour, 2 tbsp Sugar, 1 tbsp Baking Powder, 1 cup Milk, 1 Egg, 2 tbsp Melted Butter",
        instructions: "Whisk dry ingredients, then add wet ingredients. Whisk until smooth. Pour batter onto a hot griddle and flip when bubbly."
    },
    {
        id: 3,
        title: "Healthy Berry Smoothie Bowl",
        category: "Breakfast",
        image: "images/smoothie.webp",
        ingredients: "1 cup Frozen Berries, 1 Frozen Banana, 1/2 cup Almond Milk, Chia seeds, Granola",
        instructions: "Blend the berries, banana, and almond milk until thick. Pour into a bowl and top with granola and chia seeds."
    }
];

function getRecipes() {
    const storedRecipes = localStorage.getItem('recipes');
    if (!storedRecipes) {
        localStorage.setItem('recipes', JSON.stringify(defaultRecipes));
        return defaultRecipes;
    }
    return JSON.parse(storedRecipes);
}

function initMobileMenu() {
    const menuToggle = document.querySelector('#menu-toggle');
    const navMenu = document.querySelector('#navigation-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
    }
}

function displayHomeDashboard() {
    const recipes = getRecipes();
    const featuredCard = document.querySelector('#recipe-of-the-day-card');
    if (featuredCard && recipes.length > 0) {
        const dailyRecipe = recipes[0]; 
    
        featuredCard.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${dailyRecipe.image || 'images/placeholder.webp'}" alt="${dailyRecipe.title}" width="400" height="300" loading="lazy">
            </div>
            <div class="card-content">
                <span class="recipe-tag">${dailyRecipe.category}</span>
                <h3>${dailyRecipe.title}</h3>
                <p><strong>Ingredients:</strong> ${dailyRecipe.ingredients.substring(0, 60)}...</p>
                <a href="all-recipes.html" class="btn btn-primary">View Full Recipe</a>
            </div>
        `;
    }
    const previewGrid = document.querySelector('#recipes-preview-grid');
    if (previewGrid) {
       
        const recentRecipes = recipes.slice(-3).reverse();
        let gridHTML = '';

        recentRecipes.forEach(recipe => {
            gridHTML += `
                <div class="recipe-card">
                    <img src="${recipe.image || 'images/placeholder.webp'}" alt="${recipe.title}" width="300" height="200" loading="lazy">
                    <div class="card-content">
                        <span class="recipe-tag">${recipe.category}</span>
                        <h3>${recipe.title}</h3>
                        <p>${recipe.instructions.substring(0, 80)}...</p>
                    </div>
                </div>
            `;
        });

        previewGrid.innerHTML = gridHTML;
    }
}
function initRecipeForm() {
    const recipeForm = document.querySelector('#recipe-form');
    const feedback = document.querySelector('#form-feedback');

    if (recipeForm) {
        recipeForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const title = document.querySelector('#recipe-title').value.trim();
            const category = document.querySelector('#recipe-category').value;
            const image = document.querySelector('#recipe-image').value.trim();
            const ingredients = document.querySelector('#recipe-ingredients').value.trim();
            const instructions = document.querySelector('#recipe-instructions').value.trim();

            const newRecipe = {
                id: Date.now(), 
                title: title,
                category: category,
                image: image || null, 
                ingredients: ingredients,
                instructions: instructions
            };

            const currentRecipes = getRecipes();
            currentRecipes.push(newRecipe);
            localStorage.setItem('recipes', JSON.stringify(currentRecipes));

            if (feedback) {
                feedback.innerHTML = `<strong>Success!</strong> "${title}" has been added directly to your collection.`;
                feedback.classList.remove('hidden', 'error');
                feedback.classList.add('success');
            }

            recipeForm.reset();
        });
    }
}

function initCollectionPage() {
    const collectionGrid = document.querySelector('#full-collection-grid');
    const categoryFilter = document.querySelector('#category-filter');

    if (collectionGrid) {
    
        let recipes = getRecipes();
        const renderGrid = (recipesToDisplay) => {
            if (recipesToDisplay.length === 0) {
                collectionGrid.innerHTML = `<div class="no-recipes"><p>No recipes found. Go to "Add Recipe" to create one!</p></div>`;
                return;
            }

            let gridHTML = '';
            recipesToDisplay.forEach(recipe => {
                gridHTML += `
                    <div class="recipe-card">
                        <img src="${recipe.image || 'images/placeholder.webp'}" alt="${recipe.title}" width="300" height="200" loading="lazy">
                        <div class="card-content">
                            <span class="recipe-tag">${recipe.category}</span>
                            <h3>${recipe.title}</h3>
                            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                            <p style="margin-top: 10px; margin-bottom: 15px;"><strong>Instructions:</strong> ${recipe.instructions}</p>
                            
                            <button class="btn btn-delete" data-id="${recipe.id}">Delete Recipe</button>
                        </div>
                    </div>
                `;
            });
            collectionGrid.innerHTML = gridHTML;
        };


        renderGrid(recipes);

        collectionGrid.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-delete')) {
                const recipeIdToDelete = parseInt(event.target.getAttribute('data-id'));
                const confirmDelete = confirm("Are you sure you want to delete this recipe?");
                
                if (confirmDelete) {
                    recipes = recipes.filter(recipe => recipe.id !== recipeIdToDelete);

                    localStorage.setItem('recipes', JSON.stringify(recipes));
                    
                    const currentFilter = categoryFilter ? categoryFilter.value : 'all';
                    if (currentFilter === 'all') {
                        renderGrid(recipes);
                    } else {
                        const filtered = recipes.filter(recipe => recipe.category === currentFilter);
                        renderGrid(filtered);
                    }
                }
            }
        });

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                const selectedCategory = e.target.value;
                if (selectedCategory === 'all') {
                    renderGrid(recipes);
                } else {
                    const filtered = recipes.filter(recipe => recipe.category === selectedCategory);
                    renderGrid(filtered);
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    displayHomeDashboard();
    initRecipeForm();
    initCollectionPage();
});