const path = require('path');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const express = require('express');
const hbs = require('hbs');

const app = express();


// Derfine paths for expres config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Using hbs as the default view engine requires just one line of code in your app setup. 
//This will render .hbs files when res.render is called.
// setup handlers for view location.
app.set('view engine', 'hbs');
app.set('views', viewsPath); 

hbs.registerPartials(partialsPath);

// set up static directory for express server 
app.use(express.static(publicDirectoryPath));


app.get('', (req,   res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Shiv '
    }); // index.hbs
})


app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Shiv'
    }); // about.hbs
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'This is some Useful text',
        title: 'Help',
        name: 'Shiv'
    }); //help.hbs
})


//app.com/weather
app.get('/weather', (req , res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} )=>{
        if(error) {
            return res.send({ error });
        };

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location, // shorthand property
                address: req.query.address
            });
        });
    });

});

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'YOu must provide a search term'
        })
    }
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res)=>{
    //res.send('Help article not found!');
    res.render('404',{
        title: 404,
        name: 'Shiv',
        errorMessage: 'Help article not found!'
    })
}) 


app.get('*', (req, res)=>{
    //res.send('Page not exixt')
    res.render('404',{
        title: 404,
        name: 'Shiv',
        errorMessage: 'Page Not Found'
    })
})



app.listen(3000,  ()=>{
    console.log('Server is up on port 3000');
});