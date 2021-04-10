// Uncaught SyntaxError: Unexpected token '<'
//server.js
const express = require('express'),
      path = require('path'),
      app = express(),
      PORT = 3000;

// set server port to either the value defined in PORT, or if that's not set, then 3000
app.set('port', process.env.PORT || 3000);
app.use("/assets", express.static('./assets'));

// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//Basic routes
app.get('/notes', (req,res) => {
   res.sendFile(path.join(__dirname, '/notes.html'));
   console.log(path.join(__dirname, './notes.html'));
});

app.get('/index', (req,res) => { 
   res.sendFile(path.join(__dirname, './index.html'));
   console.log(path.join(__dirname, './index.html'));
});




// Express error handling middleware
// with a '*' route - we shouldn't be hitting this often
// server.use((request,response)=>{
//    response.type('text/plain');
//    response.status(505);
//    response.send('Error page');
// });

//Binding to a port
app.listen(3000, ()=>{
  console.log('Express server started at port 3000');
});