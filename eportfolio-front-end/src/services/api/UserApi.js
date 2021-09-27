export async function logIn(username, password) {
  let resp = await fetch('https://api.youreportfolio.uk/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
  if (resp.ok) {
    return resp;
  } else {
    throw Error(resp.statusText);
  }
}

export async function userFromUsername(username) {
  let resp = await fetch('https://api.youreportfolio.uk/u/' + username, {
    method: 'GET',
    headers: {}
  });
  if (resp.ok) {
    return await resp.json();
  } else {
    throw Error(resp.statusText)
  }
}

export async function updateOwnDetails(user) {
  const resp = await fetch(
    'https://api.youreportfolio.uk/self/',
    {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        description: user.description,
      })
    });
  if (resp.ok) {
    return await resp.json();
  } else {
    throw Error(resp.statusText);
  }
}

export async function getProfilePictureUploadLink() {
  const resp = await fetch(
    'https://api.youreportfolio.uk/profilepic',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }
  );
  if (resp.ok) {
    return await resp.json()
  } else {
    throw Error(resp.statusText)
  }
}

export async function updateOwnPost(post, draft) {

  const resp = await fetch(
    'https://api.youreportfolio.uk/post/' + post.id,
    {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: post.content,
        title: post.title,
        category: post.category,
        draft: draft,
      })
    });

  if (resp.ok) {
    return await resp.json();
  } else {
    throw Error(resp.statusText);
  }
}