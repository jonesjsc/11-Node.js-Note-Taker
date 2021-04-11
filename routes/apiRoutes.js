// our Notes Database is really just a json file
const notesData = require('../db/db.json');
const notesDataFile = './db/db.json';
// let notes = [];
// console.log("CL "+notesData);
// console.log("Notes Data File "+notesDataFile);

const util = require('util');
const fs = require('fs');

// import { v1 as uuidv1 } from 'uuid'; // Used to generate the Unique ID stored with the note

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {

  readDataFile (filename) {
    return readFileAsync(filename, 'utf8');
  }

  writeDataFile (filename,notes) {
    return writeFileAsync (filename, JSON.stringify(notes));
  }

  readNotes () {
    return this.readDataFile(notesDataFile).then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  addNote (note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Neither Title nor Text can be empty");
    }

    const newNote = { title, text, id: uuidv1() };

    return this.readNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.addNote(updatedNotes))
      .then(() => newNote);
  }
}

module.exports = new Store();
module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/notes... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  // app.get('/api/notes', (req, res) => res.json(notesData));
  // app.get('/api/notes', (req, res) => {
  //   // console.log("answer is "+ans);
  //   res.send(Store.readNotes);
  // });
  app.get('/api/notes', (req, res) => res.json(JSON.parse(fs.readFileSync(notesDataFile, "utf8"))));

    // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the JSON file
  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    writeFileAsync
    notesData.push(req.body);
    res.json(true);

    });

    ///-----
    // if (notesData.length < 5) {
    //   notesData.push(req.body);
    //   res.json(true);
    // } 
    // else {
    //   wai
    //   tListData.push(req.body);
    //   res.json(false);
    // }
  // });

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post('/api/clear', (req, res) => {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};
