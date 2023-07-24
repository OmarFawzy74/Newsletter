
const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  // console.log(firstName);
  // console.log(lastName);
  // console.log(email);
  
  // const client = require("@mailchimp/mailchimp_marketing");

  // client.setConfig({
  //   apiKey: "dd4c7928cdfbfbb9ad7f5135ccc371ac-us12",
  //   server: "us12",
  // });

  // const run = async () => {
  //   const response = await client.lists.batchListMembers("76962ba023", {
  //     members: [{
  //       email_address: email,
  //       status: "subscribed",
  //       merge_fields: {
  //         FNAME: firstName,
  //         LNAME: lastName
  //       }
  //     }]
  //   });
  //   console.log(response);

  //   if(response.error_count == 0) {
  //     res.sendFile(__dirname + "/success.html");
  //   }
  //   else {
  //     res.sendFile(__dirname + "/failure.html");
  //   }
  // };

  // run();

  const run = async () => {
    var SibApiV3Sdk = require('sib-api-v3-sdk');
    var defaultClient = SibApiV3Sdk.ApiClient.instance;

    // Configure API key authorization: api-key
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = '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';

    var apiInstance = new SibApiV3Sdk.ContactsApi();

    var createContact = new SibApiV3Sdk.CreateContact(); // CreateContact | Values to create a contact
    // createContact = { 'email' : email };
    createContact.email = email;
    createContact.attributes = {'LNAME' : lastName, 'FNAME' : firstName};

    apiInstance.createContact(createContact).then(function(data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      res.sendFile(__dirname + "/success.html");
    }, function(error) {
      console.error(error);
      res.sendFile(__dirname + "/failure.html");
    });
  }

  run();
})

app.post("/failure", function(req, res) {
  res.redirect("/")
})

app.listen(port || process.env.PORT, (req, res) => {
  console.log("Server is running on port 3000");
})

// MailChimp

// Audience ID OR List ID
// 76962ba023

// API Key
// dd4c7928cdfbfbb9ad7f5135ccc371ac-us12

// Server Prefix
// us12



// Brevo

// API KEY
// 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