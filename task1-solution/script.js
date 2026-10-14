// Model answer for Task 1 (teacher copy).
// If GitHub blocks requests (error 403), change USE_LOCAL_FILE to true.
// Open the page with Live Server so the local file can be read.
const USE_LOCAL_FILE = false;// if true it will go for the json
const USERNAME = 'S022203';//github user

/**
 * Fetches the public repositories of a GitHub user.
 * @param {string} username - The GitHub username.
 * @returns {Promise<Object[]>} The repository objects.
 */
async function getRepos(username) {
  const address = USE_LOCAL_FILE ? 'repos.json' : `https://api.github.com/users/${username}/repos?per_page=100`;//URL its searching
  const response = await fetch(address);//checks if the link exits
  if (!response.ok) {// checks if it can get a response from the link
    throw new Error(`Request failed with status ${response.status}`);//error message
  }
  return response.json();//return the json list of repos
}

/**
 * Displays repositories as a list of links.
 * @param {Object[]} repos - The repository objects.
 */
function showRepos(repos) {
  const list = document.querySelector('#repos');//constant list
  list.innerHTML = '';// creates list in the html
  if (repos.length === 0) {//checks if there are no viewable repositories on the github link
    list.textContent = 'No public repositories found.';//error message for if there is no repos
    return;//exits function
  }
  for (const repo of repos) {
    const item = document.createElement('li');//adds list tags to html
    const link = document.createElement('a');//adds link tags to html
    link.href = repo.html_url;//adds link to repos in the list
    link.textContent = repo.name;//makes the text of the link the name of the repo
    item.append(link);//adds link to list
    list.append(item);//adds item to the list
  }
}

/** Loads the repositories and shows them, or shows a message if it fails. */
async function init() {
  try {//aptempts to un code
    showRepos(await getRepos(USERNAME));// displays repo
  } catch (error) {//gets error code
    console.error(error);//puts error code in console
    document.querySelector('#repos').textContent = 'Sorry, the repositories could not be loaded.';// displays error message
  }
}

init();//runs function