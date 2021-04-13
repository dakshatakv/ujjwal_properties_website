var nodemailer = require('nodemailer');
const express=require('express');
const app=express();
const ejs=require("ejs");
const dotenv = require("dotenv");
const bodyParser=require('body-parser');
dotenv.config();
const PORT=process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('view engine','ejs');

app.post('/email',async(req,res)=>{
    const {email,name,query,mobile}=req.body;
    console.log(email);
     if(email){
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'harshsharma2345@gmail.com',
            pass: 'mpoounzavkzagbiq'
          }
        });
        
        var mailOptions = {
          from: 'harshsharma2345@gmail.com',
          to: 'shekhar.ujjawalgroup@gmail.com',
          subject: 'Elan Sector 50 Client Enquiry',
          html: `<div style="height: 100vh;padding: 10px;background-color:rgb(236, 230, 230)">
          <h1 style="color: rgb(14, 14, 22);font-family: fantasty;text-center">New client information</h1>
          <table>
           <thead><th>name</th><th>email</th><th>mobile</th><th>query</th></thead>
           <tbody>
            <tr>
             <td>${name}</td>
             <td>${email}</td>
             <td>${mobile}</td>
             <td>${query}</td>
            </tr>
            
           </tbody> 
          </table>
          </div>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            res.send({msg:"check your email"});
          }
        });
     }
     else{
         res.send({msg:'This email does not exist in our record :('});
     }
  });

  app.get("/",(req,res)=>{
      res.render("index");
  });
  app.listen(PORT,()=>{
      console.log(`LISTENING TO THE PORT ${PORT}`);
  });