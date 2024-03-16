function priceFormat(){
  document.querySelectorAll('.price').forEach( node => {
    node.textContent = new Intl.NumberFormat('ru-Ru',{
        currency:'usd',
        style: 'currency'
        }).format(node.textContent)
});
}
priceFormat()

const toDate = date => {
  return new Intl.DateTimeFormat('uk-UA',{
     day:'2-digit',
     month:'long',
     year:'numeric',
     hour:'2-digit',
     minute:'2-digit',
     second:'2-digit'
  }).format(new Date(date))
}

document.querySelectorAll('.date').forEach(node =>{
  node.textContent = toDate(node.textContent)
})

const $card = document.querySelector('#card')
if ($card) {
    $card.addEventListener('click', event => {
      if (event.target.classList.contains('js-remove')) {
        const id = event.target.dataset.id;
        const _csrf = event.target.dataset.csrf;

        fetch('/card/remove/' + id, {
          method: 'DELETE',
          headers: {
            'X-XSRF-TOKEN': _csrf
          },
        }).then(res => res.json())
          .then(card => {
            if (card.courses.length) {
              const html = card.courses.map(c => {
                return `
                  <tr>
                    <td>${c.title}</td>
                    <td> 
                    ${c.count}
                 </td>
                    <td>
                      <button class="btn btm-small js-remove" data-id="${c.id}">Удалить</button>
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


    $card.addEventListener('click', event => {
      if (event.target.classList.contains('js-remove-all')) {
        const csrfToken = event.target.dataset.csrf;
        fetch('/card/remove-all/', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrfToken 
          },
        }).then(res => res.json())
        .then(card => {
          if (card.courses.length) {
            const html = card.courses.map(c => {
              return `
                <tr>
                  <td>${c.title}</td>
                  <td> 
                  ${c.count}
               </td>
                  <td>
                    <button class="btn btm-small js-remove" data-id="${c.id}">Удалить</button>
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
const forms = document.querySelectorAll('.form-add');
forms.forEach(form => {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("add to cart")
    document.querySelector('#loader').classList.add('active')
    const cId = form.querySelector('.cid').value;
    const _csrf = form.querySelector('.csrf').value;

    fetch('/card/add', {
      method: 'POST',
      headers: {
        'X-XSRF-TOKEN': _csrf,
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify({id: cId}),
    })
    .then(response => {
      document.querySelector('#loader').classList.remove('active')
      if (!response.ok) {
        alert('Course not added! Something go wrong! Try again later!')
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      window.location.href = '/card';
      // alert('Course added')

      return response.json();
    })
    .then(data => {
      // Handle the response data if needed
      countCard();
      console.log(data);
    })
    .catch(error => {
      // Handle errors
      alert('Course not added! Something go wrong! Try again later!')
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
    .then(courses => {
      // Handle the response data if needed
      
      let coursesInCard = 0;
      if(courses.length){
        courses.forEach(c => {
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

M.Tabs.init(document.querySelectorAll('.tabs'))