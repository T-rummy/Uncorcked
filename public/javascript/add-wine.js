async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}



function openNav3() {
  document.getElementById("search2").style.height = "100px";
  
}

function closeNav3() {
  document.getElementById("search2").style.height = "0";
}

function openNav4() {
  document.getElementById("add").style.height = "100%";
}

function closeNav4() {
  document.getElementById("add").style.height = "0";
}

function openNav5() {
  document.getElementById("out").style.height = "100px";
}

function closeNav5() {
  document.getElementById("out").style.height = "0";
}

document.querySelector('#logout').addEventListener('click', logout);
