const cohortName = "2302-ACC-CT-WEB-PT-B";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;
const POSTS_API_URL = `${API_URL}/posts`;
const LOGIN_API_URL = `${API_URL}/users/login`;

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
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
