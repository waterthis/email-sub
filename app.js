const express = require('express');
// const bodyParser = require('body-parser');
const requestModule = require('request');
const https = require('https');
const PORT_ = 3000;

// IP key
const APIkey = "c6b492e9cb0744f31f4ec7144744b8c4-us8";
const audienceID = "ca1fb52ab3";
// c6b492e9cb0744f31f4ec7144744b8c4-us8

// audience ID
// ca1fb52ab3

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post('/failure',function(req,res){
  res.sendFile(__dirname+"/signup.html");
})
app.post('/', function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  let dataIn = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  }

  const jsonFormat = JSON.stringify(dataIn);

  let theURL = 'https://us8.api.mailchimp.com/3.0/lists/'+audienceID;

  const options = {
    method:'POST',
    auth:'dododoyo:'+APIkey,
  }

  const request = https.request(theURL,options,function(response){
    console.log(response.statusCode);  
    if (response.statusCode === 200){
      // res.send('Sucessfully Subscibed');
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on('data',function(data){
      // console.log(JSON.parse(data));
    })
  })
  request.write(jsonFormat);
  // console.log(firstName);
  // console.log(lastName);
  // console.log(email);

  request.end();
}) 








app.listen(process.env.PORT || PORT_,function(){
  console.log(`Server Listening on port ${PORT_}`);
})
