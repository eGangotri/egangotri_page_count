//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/eGangotri-page-counter'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/eGangotri-page-counter/index.html'));
});

// Start the app by listening on the default Heroku port
const _port = process.env.PORT || 8080
app.listen(_port);
console.log(`eGangotri Page Counter Launched: ${_port}`);