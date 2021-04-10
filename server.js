// Uncaught SyntaxError: Unexpected token '<'
//server.js
const express = require('express'),
      path = require('path'),
      fs = require('fs'),
      app = express(),
      PORT = 3000;

// set server port to either the value defined in PORT, or if that's not set, then 3000
// app.set('port', process.env.PORT || 3000);

app.use("/assets", express.static('./assets'));
app.use("/db", express.static('./db'));


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic routes
app.get('/notes', (req,res) => {
   res.sendFile(path.join(__dirname, '/notes.html'));
});

app.get('/api/nodes', (req,res) => {
console.log ("api dump here bois");
});

app.get('*', (req,res) => { 
   res.sendFile(path.join(__dirname, '/index.html'));
});

// Express error handling middleware
// with a '*' route - we shouldn't be hitting this often
app.use((req,res)=>{
   res.type('text/plain');
   res.status(505);
   res.send('Error page');
});

//Binding to a port
app.listen(PORT, ()=> console.log(`Express server started at port ${PORT}`));