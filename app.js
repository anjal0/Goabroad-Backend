const express = require('express');
const app = express();
const cors = require('cors');
const Universitydata = require('./src/model/UniversityData');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const port = 5000;

app.use(express.urlencoded({extended:true}));

app.use(bodyparser.json());

app.use(express.json());

app.use(cors());
user="admin";
password="1234";





function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

app.post('/login', (req, res) => {
    let userData = req.body
    
      
        if (!user) {
          res.status(401).send('Invalid Username')
        } else 
        if ( password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: user+password}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      
    })
app.get('/university', function(req,res){
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    Universitydata.find()
    .then(function(universities){
        // console.log(universities);
        res.send(universities);
    })

});

app.post('/addUniversity',verifyToken, function(req,res){
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS');
    var item = {
        name: req.body.university.name,
        country: req.body.university.country,
        description: req.body.university.description,
        exam: req.body.university.exam,
        courses: req.body.university.courses
    }
    var university = Universitydata(item);
    university.save();
});

app.get('/single', function(req,res){
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    const id = req.query.i;
    Universitydata.findOne({_id:id})
    .then(function(university){
        // console.log(university);
        res.send(university);
    })

});

app.delete('/remove/:id',(req,res)=>{
    id = req.params.id;
    Universitydata.findByIdAndDelete({"_id":id})
    .then(()=>{
        res.send();
    })
});

app.post('/update/:i', function(req,res){
    var id = req.params.i
    var item = { $set : req.body.university }
    Universitydata.updateOne({_id:id}, item,{ strict:false }, function(err,result) {
        if (err) {
            console.log(err);
        }else {
            res.send();
        }
    });
});

app.listen(port, () => {console.log("server ready at " + port)});