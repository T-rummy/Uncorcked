// async function newFormHandler(event) {
//   event.preventDefault();

//   const name = document.querySelector('#name').value;
//   const size = document.querySelector('#size').value;
//   const price = document.querySelector('#price').value;
//   const resell = document.querySelector('#resell').value;
//   const notes = document.querySelector('#notes').value;

//   const response = await fetch('/api/wine', {
//     method: 'post',
//     body: JSON.stringify({
//       name,
//       size,
//       price,
//       resell,
//       notes
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   if (response.ok) {
//     document.location.replace('/dashboard');
//   } else {
//     alert(response.statusText);
//   }
// }

// document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

async function newWine(event) {
  event.preventDefault();

   const name = document.querySelector('#name').value.trim();
   const size = document.querySelector('#size').value.trim();
   const price = document.querySelector('#price').value.trim();
   const resell = document.querySelector('#resell').value.trim();
  const notes = document.querySelector('#notes').value.trim();

  if (name) {
    const response = await fetch('/api/wine', {
      method: "POST",
      body: JSON.stringify({
        name,
        size,
        price,
        resell,
        notes
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newWine);
