const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const https = require("https");
const { log } = require("console");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))



app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

// app.post("/", function(req, res){
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;

//     var data = {
//         members: [
//             {
//                 email: email,
//                 status: "subscribed",
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName
//                 }
//             }
//         ]
//     };
//     var jsonData = JSON.stringify(data);

//     https.request(url, options, function(response){

//     });

// });

mailchimp.setConfig({
    apiKey: "e2d8df7656c79253b78d6d69a0c9b396-us21",
    server: "us21",
});


app.post("/", function(req, res){

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    
    const listId = "e82f923708";

const subscribingUser = {
  firstName: firstName,
  lastName: lastName,
  email: email
};

async function run() {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName
    }
  });

  res.sendFile(__dirname + "/succes.html")
  console.log(
    `Successfully added contact as an audience member. The contact's id is ${
        response.id
      }.`
  );
}

app.post("/failure", function(req, res){
    res.redirect("/");
});

run().catch(e => res.sendFile(__dirname + "/failure.html"));

});

app.listen(process.env.PORT || 3000,function () {
    console.log("Server is running at port 3000");
});




//Api apiKey
//e2d8df7656c79253b78d6d69a0c9b396-us21

// audience id 
// e82f923708