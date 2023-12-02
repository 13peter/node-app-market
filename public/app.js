function priceFormat(){
  document.querySelectorAll('.price').forEach( node => {
    node.textContent = new Intl.NumberFormat('ru-Ru',{
        currency:'usd',
        style: 'currency'
        }).format(node.textContent)
});
}
priceFormat()

const $card = document.querySelector('#card')
if ($card) {
    $card.addEventListener('click', event => {
      if (event.target.classList.contains('js-remove')) {
        const id = event.target.dataset.id;

        fetch('/card/remove/' + id, {
          method: 'DELETE'
        }).then(res => res.json())
          .then(card => {
            if (card.courses.length) {
              const html = card.courses.map(c => {
                return `
                  <tr>
                    <td>${c.title}</td>
                    <td> 
                    <div class="qty-block">
                         <button type="button" class="decrease-btn js-remove" data-id="${c.id}">-</button>
                         <input type="number" class="quantity" value="${c.count}" min="1" max="100">
                         <button type="button" class="increase-btn js-add" data-id="${c.id}">+</button>
                    </div>
                 </td>
                    <td> 
                      <button class="btn btn-small js-remove-all" data-id="${c.id}"> Удалить </button>
                    </td>
                  </tr>
                `;
              }).join('');
              $card.querySelector('tbody').innerHTML = html;
              $card.querySelector('.price').textContent = card.price;
              priceFormat()
            } else {
              $card.innerHTML = '<p>Корзина пуста</p>'; // Corrected: Use single quotes for the HTML string
            }

            countCard()
          })
          .catch(error => {
            console.error('Error:', error);
            // Handle errors if any
          });
      }
    });

    // $card.addEventListener('click', event => {
    //   if (event.target.classList.contains('js-add')) {
    //     const cId = event.target.dataset.id;

    //     fetch('/card/add', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json', // Set the content type to JSON
    //       },
    //       body: JSON.stringify({id: cId}),
    //     }).then(res => res.json())
    //       .then(card => {
    //         if (card.courses.length) {
    //           const html = card.courses.map(c => {
    //             return `
    //               <tr>
    //                 <td>${c.title}</td>
    //                 <td> 
    //                 <div class="qty-block">
    //                      <button type="button" class="decrease-btn js-remove" data-id="${c.id}">-</button>
    //                      <input type="number" class="quantity" value="${c.count}" min="1" max="100">
    //                      <button type="button" class="increase-btn js-add" data-id="${c.id}">+</button>
    //                 </div>
    //              </td>
    //                 <td> 
    //                   <button class="btn btn-small js-remove-all" data-id="${c.id}"> Удалить </button>
    //                 </td>
    //               </tr>
    //             `;
    //           }).join('');
    //           $card.querySelector('tbody').innerHTML = html;
    //           $card.querySelector('.price').textContent = card.price;
    //           priceFormat()
    //         } else {
    //           $card.innerHTML = '<p>Корзина пуста</p>'; // Corrected: Use single quotes for the HTML string
    //         }

    //         countCard()
    //       })
    //       .catch(error => {
    //         console.error('Error:', error);
    //         // Handle errors if any
    //       });
    //   }
    // });



    $card.addEventListener('click', event => {
      if (event.target.classList.contains('js-remove-all')) {
        const id = event.target.dataset.id;
        fetch('/card/remove-all/' + id, {
          method: 'DELETE'
        }).then(res => res.json())
          .then(card => {
            if (card.courses.length) {
              const html = card.courses.map(c => {
                return `
                  <tr>
                    <td>${c.title}</td>
                    <td> 
                    <div class="qty-block">
                         <button type="button" class="decrease-btn js-remove" data-id="${c.id}">-</button>
                         <input type="number" class="quantity" value="${c.count}" min="1" max="100">
                         <button type="button" class="increase-btn js-add" data-id="${c.id}">+</button>
                    </div>
                 </td>
                    <td> 
                      <button class="btn btn-small js-remove-all" data-id="${c.id}"> Удалить </button>
                    </td>
                  </tr>
                `;
              }).join('');
              $card.querySelector('tbody').innerHTML = html;
              $card.querySelector('.price').textContent = card.price;
              priceFormat()
            } else {
              $card.innerHTML = '<p>Корзина пуста</p>'; // Corrected: Use single quotes for the HTML string
            }

            countCard()
          })
          .catch(error => {
            console.error('Error:', error);
            // Handle errors if any
          });
      }
    });
  }
  if($card){
   $card.querySelectorAll('.js-remove').forEach(btn => {
    btn.addEventListener('click', () =>{
        console.log(btn.dataset.id)
    })
   })
}

// if($card){
//     $card.addEventListener('click', event => {
//         if(event.target.classList.contains('js-remove')){
//             const id = event.target.dataset.id

//             fetch('/card/remove/' + id, {
//                 method:'delete'
//             }).then(res => res.json())
//               .then(card =>{
//                 if(card.courses.lenght){
//                   const html = card.courses.map(c =>{
//                      return`
//                      <tr>
//                     <td>${c.title}</td>
//                     <td>${c.count}</td>
//                     <td> 
//                       <button class="btn btm-small js-remove " data-id="${c.id}"> Удалить </button>
//                     </td>
//                   </tr>
//                      `
//                   }).join('')
//                   $card.querySelector('tbody').innerHTML = html
//                   $card.querySelector('.price').textContent = card.price
//                 } else {
//                   $card.innerHTML = <p>Корзина пуста</p>
//                 }
//               })
//         }
//     })
// }s

const forms = document.querySelectorAll('.form-add');
forms.forEach(form => {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const cId = form.querySelector('input').value
 

    fetch('/card/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify({id: cId}),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle the response data if needed
        countCard()
        console.log(data);
      })
      .catch(error => {
        // Handle errors
        console.error('Fetch error:', error);
      });
  });
});






function countCard() {

  fetch('/card/count', {
    method: 'GET'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Handle the response data if needed
      
      let coursesInCard = 0;
      if(data.courses.length){
        data.courses.forEach(c => {
          coursesInCard += c.count;
        })
      }

      console.log(coursesInCard);

      document.querySelector('#cardCount').innerText = coursesInCard
    })
    .catch(error => {
      // Handle errors
      console.error('Fetch error:', error);
    });
}

countCard()