import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import {  Secret } from "./secret.js";

const app = express();
let result,value,icon_link;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",(req,res)=>{
    res.render("index.ejs",{data: value});
});

app.post('/',async (req,res)=>{
    const body = req.body;
    let city = body['cityName'];
    const secret =new Secret();
    const link = secret.Link(city);
    try{
        const response = await axios.get(link);
        result = response.data;
    }
    catch (error){
        console.log(error.message);
    }
    icon_link = `https://openweathermap.org/img/wn/${result["weather"][0]["icon"]}@4x.png`;
    const value = {
        ctemp: Math.round(result["main"]["temp"]),
        feelslike: Math.round(result["main"]["feels_like"]),
        tempmax: Math.round(result["main"]["temp_max"]),
        speed: Math.round(result["wind"]["speed"] * 3.6),
        pressure: result["main"]["pressure"],
        humidity: result["main"]["humidity"],
        city: result["name"],
        info: result["weather"][0]["main"],
        icon: icon_link,
    }
    res.render("index.ejs",{data: value});
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("Your Server is started at 3000.");
});
