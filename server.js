// Uncaught SyntaxError: Unexpected token '<'
//server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// Basic routes
// app.get('/notes', (req,res) => {
//    res.sendFile(path.join(__dirname, 'notes.html'));
// });

// app.get('/api/notes', (req,res) => {
//    res.sendFile(path.join(__dirname, 'api.html'));
// });

// app.get('*', (req,res) => { 
//    res.sendFile(path.join(__dirname, 'index.html'));
// });

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

//Binding to a port
app.listen(PORT, () => {
   console.log(`App listening on PORT: ${PORT}`);
 });
