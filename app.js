const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const https = require('https')
    const url = 'https://us4.api.mailchimp.com/3.0/lists/a72d53da77'
    const options = {
        method: "POST",
        auth: "stickoking:767cbd082b55ddfc32243bd5bac09653-us4"
    }
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

    const jsonData = JSON.stringify(data);

   const request = https.request(url, options, (response) => {
       if(response.statusCode == 200){
           res.sendFile(__dirname + "/success.html");
       }

       else{
           res.sendFile(__dirname + "/failure.html");
       }
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post('/failure', (req, res) => {
    res.redirect('/');
})


//MailChimp APIKEY
//767cbd082b55ddfc32243bd5bac09653-us4

//ListId
//a72d53da77