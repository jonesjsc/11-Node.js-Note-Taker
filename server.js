// Based on the "HotRestaurant" solution from uncc-cha-fsf-pt-01-2021-u-c\01-Class-Content\11-express\01-Activities\15-HotRestaurant
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Setup the HTML and API routes

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Start the server

app.listen(PORT, () => {
   console.log(`App listening on PORT: ${PORT}`);
 });
