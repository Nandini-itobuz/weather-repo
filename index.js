const express = require('express')
const fs = require("fs");
const app = express();
const port = 8080;
const data =fs.readFileSync('data.json','utf-8');
const weatherData = JSON.parse(data);

app.use(express.json());

const weatherRouter = express.Router();
app.use('/weather', weatherRouter)

function updateData(req,res){
    weatherData.push(req.body);
    fs.writeFileSync("data.json", JSON.stringify(weatherData))
    res.status(200).json({ status:"200", message:"success,", data: "data added successfully"});
}


function getData (req, res){
    res.status(200).json({ status:"200", message:"success", data: weatherData})
    res.end();
}


function findPlace (req, res){
    let currentPlace = req.params.place;
    let newPlace = weatherData.find(ele => ele.name.toLowerCase() === currentPlace.toLowerCase());
    if(newPlace === undefined){
        res.status(404).json({ status:"404", message:"failed", data: "Location not found"})
    }
    else{
        res.status(200).json({ status:"200", message:"success,", data: newPlace})
    }
    res.end();
}

weatherRouter.route('/').get(getData).post(updateData);
weatherRouter.route("/:place").get(findPlace)


app.listen(port, ()=>{
    console.log("Listining to port number 8080...")
})