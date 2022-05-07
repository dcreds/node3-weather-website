const path = require('path')

const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')






const app = express()
const port = process.env.PORT || 3000

const pathToPublic = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pathToPublic))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Dustin Cammer"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: "Dustin Cammer"
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: "This is the help page",
        helpMessage: "You're fucked now if you think I'm going to help you!",
        name: "Dustin Cammer"

    })
})

app.get('/weather', (req,res)=>{
if(!req.query.address){
    return res.send({
        error: "you must provide an address!!!"
    })
}
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
        return res.send({error})
    }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            
            
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })

        })



})

    
})

app.get('/products',(req,res) =>{
    if(!req.query.search){
       return res.send({
            error: "you must provide a search term"
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: [] 
    })
})


app.get('/help/*',(req,res)=>{
    res.render('errors',{
        title: "Uh oh!",
        message: "The help file you are looking for is unavailable",
        name: "Dustin Cammer"
    })
    })

app.get('*',(req,res)=>{
res.render('errors',{
    title: "Uh oh!",
    message: "The file you are looking for is in another castle.",
    name: "Dustin Cammer"
})
})

app.listen(port, () =>{
    console.log('server is up on port ' + port)
})