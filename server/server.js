//installing dependencies
const express = require('express');    //http request and setting up routes
const cors = require('cors');          //sharing across differen origins
const multer = require('multer');      //upload files
const bodyParser = require('body-parser')  //handle JSON payloads
const dotenv = require('dotenv');

//load enviournment variables
dotenv.config(); //loads environment variables from a .env file into process.env (store API, URLS etc.)

//express application
const app = express();

const port = process.env.PORT || 5000;

//middleware setup
app.use(cors);
app.use(bodyParser.json());

//multer for file uploads
const storage = multer.memoryStorage();     //memory storage
const upload = multer({storage: storage});   //file uploads

//test route
app.get('/',(req, res) => {
    res.send('MatchHire API')   //check server is running
});

//POST route for file uploads
app.post('/upload', upload.fields([{name: 'resume'}, {name: 'jobDescription'}]), (req,res)=>{
    const {resume, jobDescription} = req.files;
    if (!resume || !jobDescription){
        return res.status(400).send('Please upload both resume and job description files');
    }
    res.send('Files upoaded successfully');
});

//start 
app.listen(port,() => {
    console.log('Server running at http://localhost:${port}');
});