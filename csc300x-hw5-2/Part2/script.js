// Function to fetch joke categories from the backend
async function fetchCategories() {
    const response = await fetch('/jokebook/categories');
    const categories = await response.json();
    return categories;
}


