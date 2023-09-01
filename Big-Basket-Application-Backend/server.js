const express = require('express');            // loading the library 
const app = express();                         // initializing the library 
const cors = require('cors'); 
const dotenv = require('dotenv'); 
const mongoose = require('mongoose'); 

// configuring cors                ---- use ? 
app.use(cors()); 

// configuring express to receive the form data       ---- use ? 
app.use(express.json()); 

// configuring dotenv 
dotenv.config(); 

// getting port and hostname 
const hostname = process.env.Host_NAME; 
const port = process.env.PORT; 

// configuring the router 
app.use('/api', require('./Router/productRouter'));     

// Connecting to mongo db database 
mongoose.connect(process.env.MONGO_DB_LOCAL_URL).then((response) => {
    console.log('Connected to Mongo DB Successfully'); 
}).catch((error) => {
    console.error(error); 
    process.exit(1);                   // ----Stop the node js process if db unable to connect 
}); 

//empty URL 
app.get('/', (request, response) => {
     response.send(`<h2>Welcome to Big Basket Application</h2>`); 
}); 

// final configuration of server 
app.listen(port, hostname, () => {
      console.log(`Express server is started at http://${hostname}:${port}`); 
}); 



