console.log('Client side js file loaded!');

// const fetch = require("node-fetch");

 const weatherForm = document.querySelector('form');
 const search = document.querySelector('input');
 const messageOne = document.querySelector('#message-1')
 const messageTwo = document.querySelector('#message-2')

 // messageOne.textContent = 'from js'

 weatherForm.addEventListener('submit', (event)=>{
     event.preventDefault();


     const location = search.value;


     messageOne.textContent = 'Loading ...';
     messageTwo.textContent = ''
     

     fetch('/weather?address='+ location).then( (response)=>{
        response.json().then((data)=>{
            if(data.error){
                 console.log(data.error);
                messageOne.textContent = data.error
            }
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                // console.log(data.location);
                // console.log(data.forecast);
        });
     });
 });