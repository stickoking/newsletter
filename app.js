const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
//set up port for both local and server deployment
app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});
//send the home route to the signup page
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});
//Process the post from the signup page
app.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const https = require('https')
    //mail chimp API for adding members
    const url = 'https://usX.api.mailchimp.com/3.0/lists/listID key' //Please replace your listID key with your listID key from mailchimp, replce usX with the .usX at the end of your mailchimp API Key
    const options = {
        method: "POST",
        auth: "username:apiKey"
    }
    //member/user data to be sent to mailchimp server
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }
    //mailChimp requires the data to be in json string format.
    const jsonData = JSON.stringify(data);

   const request = https.request(url, options, (response) => {
       //send users to success page if api call is successfull.
       if(response.statusCode == 200){
           res.sendFile(__dirname + "/success.html");
       }
       //send users to failure page if api call is unsuccessfull.
       else{
           res.sendFile(__dirname + "/failure.html");
       }
        response.on("data", (data) => {
            //console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})
//Allow users to redirect to home route if they failed to signup.
app.post('/failure', (req, res) => {
    res.redirect('/');
})


