const cohortName = "2302-ACC-CT-WEB-PT-B";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;
const POSTS_API_URL = `${API_URL}/posts`;
const LOGIN_API_URL = `${API_URL}/users/login`;
const LOGGEDIN_API_URL = `${API_URL}/users/me`;
const REGISTER_API_URL = `${API_URL}/users/register`;

// Fetch all posts: unauthenticated
export async function fetchPosts(token) {
  try {
    if (token) {
      const response = await fetch(POSTS_API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.data.posts;
    } else {
      const response = await fetch(POSTS_API_URL);
      const data = await response.json();
      return data.data.posts;
    }
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

// Posting a new post
export async function fetchNewPost(
  userToken,
  title,
  description,
  price,
  location,
  willDeliver
) {
  try {
    const response = await fetch(POSTS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        post: {
          title: `${title}`,
          description: `${description}`,
          price: `${price}`,
          location: `${location}`,
          willDeliver: `${willDeliver}`,
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

export async function deletePost(postId, userToken) {
  try {
    const response = await fetch(`${POSTS_API_URL}/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

export async function editPost(
  postId,
  userToken,
  title,
  description,
  price,
  location,
  willDeliver
) {
  try {
    const response = await fetch(`${POSTS_API_URL}/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        post: {
          title: `${title}`,
          description: `${description}`,
          price: `${price}`,
          location: `${location}`,
          willDeliver: `${willDeliver}`,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function postMessage(postId, userToken, message) {
  try {
    const response = await fetch(`${POSTS_API_URL}/${postId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        message: {
          content: `${message}`,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}
