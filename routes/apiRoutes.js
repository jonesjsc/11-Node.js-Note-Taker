// our Notes Database is really just a json file
// const notesData = require('../db/db.json'); <--- chased this rathole for hours
const notesDataFile = './db/db.json';

const {v1: uuidv1} = require('uuid');   
const util = require('util');
const fs = require('fs');

// import { v1 as uuidv1 } from 'uuid'; // Used to generate the Unique ID stored with the note

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/notes... they are shown a JSON of the data in the table)
 
  app.get('/api/notes', (req, res) => {
    readFile(notesDataFile, 'utf8')
      .then((notesData) => {
        res.json(JSON.parse(notesData))
      })
  });

  
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the JSON file
  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
      readFile(notesDataFile, 'utf8')
            .then((notesData) => {
                const notes = JSON.parse(notesData)
                const newNote = req.body
                newNote.id = uuidv1();
                
                // totally baffled at what is happening here - there are lots of articles on stackoverflow - but
                // I can't figure out why this notes.push is running twice every time I post a note
                // so I just put this check in here to keep from pushing blank notes on to the stack.
                // this is dumb.

                if (typeof newNote.title !== 'undefined') {
                  notes.push(newNote)
                }
                
                writeFile(notesDataFile, JSON.stringify(notes, null, '\t'))
                  .then(() => {
                    res.json(notes)
                  })
                
              
            })   
            
    });

};
