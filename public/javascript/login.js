

function openNav() {
  document.getElementById("search").style.height = "100px";
  
}

function closeNav() {
  document.getElementById("search").style.height = "0";
}

function openNav1() {
  document.getElementById("signup").style.height = "100%";
}

function closeNav1() {
  document.getElementById("signup").style.height = "0";
}

function openNav2() {
  document.getElementById("signin").style.height = "350px";
}

function closeNav2() {
  document.getElementById("signin").style.height = "0";
}


// document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
// document.querySelector('.login-form').addEventListener('submit', loginFormHandler); 

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

