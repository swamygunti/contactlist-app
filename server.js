var express = require("express");

var app = express();

var mongoose = require("mongoose");

var contact = require("./models/contact");

var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/contactlist", function(){

     console.log("successfully connected to mongoose db...!!!");
 

});

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json());

app.get("/contactList", function(req, res){

	contact.getContacts(function(err, data){

         if(err){
           throw err;
         }
        res.json(data);
	})
})


app.post("/contactList", function(req, res){

   var body = req.body;
   console.log(body); 

   contact.addContact(body, function(err, data){

       if(err){
          console.log(err);
       }
       res.json(data);

   }) 

})


app.get("/contactList/:id", function(req, res){

      var id = req.params.id;
      contact.getContactById(id, function(err, data){

         if(err){
            throw err;
         }
         res.json(data);

      })


})


app.put("/contactList/:id", function(req, res){

    var id = req.params.id;
    var body = req.body;
    contact.updateContact(id, body, function(err, data){
        
        if(err){
            throw err;
        }
         res.json(data);

    })


})


app.delete("/contactList/:id", function(req, res){
   
   var id = req.params.id; 
   contact.deleteContactById(id, function(err, data){
       if(err){
         throw err;
       }
       res.json(data);

   }) 


})


app.get("/employeList", function(req, res){

   console.log("Employee deails.....");

})


app.listen(port, function(){

   console.log("server is listening in port "+ port);

})