const express= require ('express');
const app = express();

const nodemailer= require('nodemailer');

require('dotenv').config();

const PORT= process.env.PORT || 3010;


//Middleware 
app.use (express.static('public'));

//another middleware to receive formData from front-end 
app.use (express.json());


app.get('/', (req, res) => {
    res.sendFile(_dirname + '/public/index.html');
});

//We need to create a POST for this route
app.post('/', (req,res) => {

    //since we sending JSON format then our server can read our JSON in the req.body
    console.log(req.body);

    //Use transport method to create pass in email data to pass our actual emails. Takes an object service, auth credentials another object passing user (which is our email and password). Now these are stored in enviromental variables to keep things secured. 


    const transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
            user: process.env.DB_EMAIL,
            pass: process.env.DB_PASS, 
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.DB_EMAIL,
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.send('error');
        } else {
            console.log('Email sent:' + info.response);
            res.send('success');
        }
    })
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

