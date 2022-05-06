console.log('client side js is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//      response.json().then((data)=>{
//          console.log(data)
//      })
// })

 

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

// message1.textContent = 'From Js'


weatherForm.addEventListener('submit', (e)=>{
e.preventDefault()

const location = search.value

message1.textContent = 'now mloading'
message2.textContent = ''
    
fetch("http://localhost:3000/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
          return  message1.textContent = data.error
        }
        message1.textContent = (data.location)
        console.log(data.forecast)
        message2.textContent = "It's currently "+(data.forecast.currentTemp)+" degrees celsius and it feels like " + data.forecast.feelsLike + " degrees celsius."
    })
})


})
