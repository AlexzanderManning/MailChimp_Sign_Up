const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

//Allows us to use static files with a relative path.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html")
})

app.post('/', (req, res) => {
 
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = `https://us8.api.mailchimp.com/3.0/lists/406a142e07`;

  const options = {
    method: "POST",
    auth: "dlong:cd43c789eec0488e2e0edf1035027ee4-us8"
  }

  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      console.log(JSON.parse(data));
      
    })
  })

  request.write(jsonData);
  request.end();

});

app.listen(3000, () => {
  console.log("You are now on port 3000.");
})


//cd43c789eec0488e2e0edf1035027ee4-us8

// list ID 406a142e07