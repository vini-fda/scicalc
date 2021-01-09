const express = require('express');
const multer = require('multer');
const {exec} = require('child_process');
const upload = multer();
const router = express.Router();
const app = express();
let port = process.env.PORT;

// Port used for local development
if (port == null || port == "") {
	port = 8000;
}

// Expose static files for the website's front-end
app.use('/', express.static('public'));

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

//Expose parser for POST requests
router.post('/parser', (req, res) => {
    console.log(req.body);
    const expression = req.body.expr;

    exec(`scicalc-rs \"${expression}\"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
      
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        // Debug message
        //console.log(`${stdout}`);

        res.send(stdout);
    });
});

app.use('/', router);

// Listen on port 'port', succesfully running the app
app.listen(port, () => console.log(`Application listening on port ${port}!`));
