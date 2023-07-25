
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

  const run = async () => {
    const MailerLite = require('@mailerlite/mailerlite-nodejs').default;

    const mailerlite = new MailerLite({
      api_key: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZTRhZGFkYTYyZDg2NGQ5N2Y0Y2QzNmMxNWVjM2RmODczMDc0Mjc2NTNlZGFkYzVlZThiODE0ZWY5OWQ2YWE5NmIwZDg2MjlkYTFjNzU4ZTIiLCJpYXQiOjE2OTAyNDIyNTQuNTQ2NjQ0LCJuYmYiOjE2OTAyNDIyNTQuNTQ2NjQ3LCJleHAiOjQ4NDU5MTU4NTQuNTQxNDk0LCJzdWIiOiI1NTMwNzMiLCJzY29wZXMiOltdfQ.T2BNAskXJWv-ysNlokaNR-Ixo_vRcnDFlsAVLDH2udiWYjLVes-PnqTgUjmv366nDF1GIGj8XMgtg0jXu5snM0YnfqBl69AqVuA0a0X_kH2eDqZpAQYl4zdqcwXduPnID47NEthumJTZK3dEkBmLJGgPc-OzGPjjMLXVrSLl7exNB4mRIF_8HB3s0M0HPwZ7bUuwQOzSsZ1QN1crplzKhr6Zy0ev62JeMb786hqzNqVo7oHm2eRbqrS3Pf6WGLG2HETfv4SakqFJO-GZlc62Ey9QpLNSjPaj1jhfy04QGVfjcWWBlowzQWlnwUAUHEo8R54v7eAvXaMWZAGVnuNEgWrUaPwYrVaBsfZRTTqplwHBeX0Ul-xCoMma1_Bb7cw6n7fYsIfHeR7K67nphzW40V7jLSHI_JXjKF87OpBZ9fowV30KFltQEeLe-7TbWH7wk2PVbGiIxWdqo-O2NaGbCcGvDaT-8Z2ovoReDh8YnAZMHMhtArDkX2ko836PLd5H5rYVkxGvX6DrBKkvT0-9ayX2fAGU30Oylgfqu2_BPle89WzAqFIrzAS3MYuCEXkIGom_FUXcFQ3lbsZoW6CmsKbEfAgHFwVyPmgi5Ms5rIwAsAGb6oZmLmd0cjz-ILs_9CmnKFN4lfIK1c6IiI2-Ia1oM208L2AY-AYhUjwIADA"
    });
  
    const params = {
      email: email,
      fields: {
        name: firstName,
        last_name: lastName,
      }
    };

    mailerlite.subscribers.createOrUpdate(params)
    .then(response => {
      console.log(response.data);
      res.sendFile(__dirname + "/success.html");
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
        res.sendFile(__dirname + "/failure.html");
      } 
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


//MailerLite

//API KEY
//eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZTRhZGFkYTYyZDg2NGQ5N2Y0Y2QzNmMxNWVjM2RmODczMDc0Mjc2NTNlZGFkYzVlZThiODE0ZWY5OWQ2YWE5NmIwZDg2MjlkYTFjNzU4ZTIiLCJpYXQiOjE2OTAyNDIyNTQuNTQ2NjQ0LCJuYmYiOjE2OTAyNDIyNTQuNTQ2NjQ3LCJleHAiOjQ4NDU5MTU4NTQuNTQxNDk0LCJzdWIiOiI1NTMwNzMiLCJzY29wZXMiOltdfQ.T2BNAskXJWv-ysNlokaNR-Ixo_vRcnDFlsAVLDH2udiWYjLVes-PnqTgUjmv366nDF1GIGj8XMgtg0jXu5snM0YnfqBl69AqVuA0a0X_kH2eDqZpAQYl4zdqcwXduPnID47NEthumJTZK3dEkBmLJGgPc-OzGPjjMLXVrSLl7exNB4mRIF_8HB3s0M0HPwZ7bUuwQOzSsZ1QN1crplzKhr6Zy0ev62JeMb786hqzNqVo7oHm2eRbqrS3Pf6WGLG2HETfv4SakqFJO-GZlc62Ey9QpLNSjPaj1jhfy04QGVfjcWWBlowzQWlnwUAUHEo8R54v7eAvXaMWZAGVnuNEgWrUaPwYrVaBsfZRTTqplwHBeX0Ul-xCoMma1_Bb7cw6n7fYsIfHeR7K67nphzW40V7jLSHI_JXjKF87OpBZ9fowV30KFltQEeLe-7TbWH7wk2PVbGiIxWdqo-O2NaGbCcGvDaT-8Z2ovoReDh8YnAZMHMhtArDkX2ko836PLd5H5rYVkxGvX6DrBKkvT0-9ayX2fAGU30Oylgfqu2_BPle89WzAqFIrzAS3MYuCEXkIGom_FUXcFQ3lbsZoW6CmsKbEfAgHFwVyPmgi5Ms5rIwAsAGb6oZmLmd0cjz-ILs_9CmnKFN4lfIK1c6IiI2-Ia1oM208L2AY-AYhUjwIADA