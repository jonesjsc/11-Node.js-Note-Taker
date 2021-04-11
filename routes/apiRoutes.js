// our Notes Database is really just a json file
// const notesData = require('../db/db.json'); <--- chased this rathole for hours
const notesDataFile = './db/db.json';

const {v1: uuidv1} = require('uuid');   // <--- took longer than it should to figure this out
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = (app) => {

  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/notes... they are shown a JSON of the data in the table)
 
  app.get('/api/notes', (req, res) => {

    // lets read the data file

    readFile(notesDataFile, 'utf8')
      .then((notesData) => {
    
    // and response back a JSON parsed format of this data
    
        res.json(JSON.parse(notesData))
      })
  });
  
  // API POST Requests

  app.post('/api/notes', (req, res) => {

    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware

    readFile(notesDataFile, 'utf8')
      .then((notesData) => {

        // lets JSON.parse the loaded file and store in notes

        const notes = JSON.parse(notesData)
        
        // the caller has passed to us a new note in the body
        // we could optrionally deconstruct that here - but why bother?
        // there's the req.body.title and req.body.text in this reqeust
        
        const newNote = req.body

        // so to make things much easier for the delete function, we want a unique id.

        newNote.id = uuidv1();
                
        //!! totally baffled at what is happening here - there are lots of articles on stackoverflow - but
        //!! I can't figure out why this notes.push is running twice every time I post a note
        //!! so I just put this check in here to keep from pushing blank notes on to the stack.
        //!! this is dumb.

        if (typeof newNote.title !== 'undefined') {
          notes.push(newNote)
        }

        // Let's overwrite the notesDataFile with the new array of notes

        writeFile(notesDataFile, JSON.stringify(notes, null, '\t'))
          .then(() => {

        // A thoughtful but unnecessary step is to return the new notes array.  Real nice for troubelshooting

            res.json(notes)

          })
                
              
      })   
            
  });

  app.delete('/api/notes/:id', (req, res) => {

    // the user has clicked on a note to delete.  We're picking ou the 'id' that is 
    // associated with this note from the request.params that were passed when this 
    // route was activated
    
    const choice = req.params.id;
    
    // we're reading the entire notes file in and holding it in notesData
    
    readFile(notesDataFile, "utf8").then((notesData) => {
    
    // parsing the JSON string and storing this in notes
    
      const notes = JSON.parse(notesData)
    
    // usinmg the array filter method to create a new array of everything minus the deleted element
    
      const notesFilter = notes.filter(val => val.id !== choice);
    
    // now we will overwrite the data file with a JSON.stringified version of the data 
    
      writeFile(notesDataFile, JSON.stringify(notesFilter, null, "\t")).then(() => {
    
    // lets respond back to the caller with json formatted array of the notes, minus the deleted one

        res.json(notesFilter);
      })
    });
  });
};
