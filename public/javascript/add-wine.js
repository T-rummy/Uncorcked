



async function newWine(event) {
   event.preventDefault();
  

   const name = document.querySelector('#name').value.trim();
   const price = document.querySelector('#price').value.trim();
   const resell = document.querySelector('#resell').value.trim();
  const notes = document.querySelector('#notes').value.trim();
  const user_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
 

  if (name) {
    
    const response = await fetch('/api/wines', {
      method: 'post',
      body: JSON.stringify({
        name,
        price,
        resell,
        notes
      }),
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.new-post-form').addEventListener('click', newWine);
