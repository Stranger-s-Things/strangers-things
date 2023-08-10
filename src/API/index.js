const cohortName = "2302-ACC-CT-WEB-PT-B";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;
const POSTS_API_URL = `${API_URL}/posts`;
const LOGIN_API_URL = `${API_URL}/users/login`;
const LOGGEDIN_API_URL = `${API_URL}/users/me`;
const REGISTER_API_URL = `${API_URL}/users/register`;

// Fetch all posts: unauthenticated
export async function fetchPosts() {
  try {
    const response = await fetch(POSTS_API_URL);
    const data = await response.json();
    return data.data.posts;
  } catch (error) {
    console.log("Trouble fetching posts: ", error);
  }
}

fetchPosts();

// Fetch login, authenticating a user if their username and password mathes the right data
export async function fetchLogin(username, password) {
  try {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${username}`,
          password: `${password}`,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// Fetching a token based on if a user is currently logged in
export async function fetchLoggedIn(token) {
  try {
    const response = await fetch(LOGGEDIN_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// Registering a new user
export async function fetchNewUser(username, password) {
  try {
    const response = await fetch(REGISTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${username}`,
          password: `${password}`,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}
