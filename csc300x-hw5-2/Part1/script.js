// Function to fetch repositories based on input username
function fetchRepositories() {
    // Get the username entered by the user
    const username = document.getElementById('username').value;
    // Construct the URL to fetch repositories from GitHub API
    const url = `https://api.github.com/users/${username}/repos`;

    // Fetch repositories data from GitHub API
    fetch(url)
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                // Throw an error if the response is not ok
                throw new Error('Network response was not ok');
            }
            // Parse the response as JSON
            return response.json();
        })
        .then(data => {
            // Call function to display fetched repositories
            displayRepositories(data);
        })
        .catch(error => {
            // Log any errors to the console
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to display fetched repositories on the page
function displayRepositories(repositories) {
    // Get the container element to display repositories
    const repositoriesContainer = document.getElementById('repositories');
    // Clear previous repository cards
    repositoriesContainer.innerHTML = '';

    // Iterate through each repository in the fetched data
    repositories.forEach(repo => {
        // Create a new div element for each repository
        const repositoryElement = document.createElement('div');
        // Add class for styling
        repositoryElement.classList.add('repository');
        // Populate the div with repository information
        repositoryElement.innerHTML = `
            <h2>${repo.name}</h2>
            <p>${repo.description || 'No description available'}</p>
            <p><strong>Created:</strong> ${new Date(repo.created_at).toDateString()}</p>
            <p><strong>Last Updated:</strong> ${new Date(repo.updated_at).toDateString()}</p>
            <p><strong>Commits:</strong> ${repo.commits_url}</p>
            <p><strong>Languages:</strong> ${Object.keys(repo.languages_url)}</p>
            <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        // Append the repository card to the main container
        repositoriesContainer.appendChild(repositoryElement);
    });
}
