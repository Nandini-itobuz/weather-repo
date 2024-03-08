const express = require('express')
const weatherRouter = require('./weather/routes');
const app = express();


// middlewares
app.use(express.json());

// middlewear-routes
app.use('/weather', weatherRouter)


const port = 8080;
app.listen(port, () => {
    console.log("Listining to port number 8080...")
})