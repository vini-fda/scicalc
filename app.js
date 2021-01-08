const express = require('express');
const multer = require('multer');
const {exec} = require('child_process');
const upload = multer();
const router = express.Router();
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
	port = 8000;
}

app.use('/', express.static('public'));

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

router.post('/parser', (req, res) => {
    //do parsing
    console.log(req.body);
    const expression = req.body.expr;

    exec(`ls -l`, (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
      
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`${stdout}`);

        res.send(stdout);
    });
});

app.use('/', router);

app.listen(port, () => console.log(`Application listening on port ${port}!`));
