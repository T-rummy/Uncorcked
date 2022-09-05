

function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const age = document.querySelector('#age-signup').value.trim();
  const check = document.querySelector('#checkbox-signup').value.trim();

  if (username && email && password && age && check) {
    fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        age,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {console.log(response)})
  }
};
  
  async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}

function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.height = "100px";
  
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.height = "0";
}

function openNav1() {
  document.getElementById("mySidenav2").style.height = "100%";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav1() {
  document.getElementById("mySidenav2").style.height = "0";
}

function openNav2() {
  document.getElementById("mySidenav3").style.height = "350px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav2() {
  document.getElementById("mySidenav3").style.height = "0";
}

document.querySelector('.signupbtn').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);