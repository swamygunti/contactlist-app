var mongoose = require("mongoose");

var contactSchema = mongoose.Schema({

    name : {
    	type : String,
    	required : true
    },
    email : {
    	type : String,
    	required : true
    },
    mobile : {
    	type : String,
    	required : true
    }


});

var Contact = module.exports = mongoose.model("contact", contactSchema);

module.exports.getContacts = function(callback){

   Contact.find(callback)

}

module.exports.addContact = function(contact, callback){    
    Contact.create(contact, callback);
}

module.exports.getContactById = function(id, callback){
     var Id = {_id : id};
     Contact.findById(Id, callback);
}

module.exports.updateContact = function(id, contact, callback){
   Contact.update({_id : id}, 
                  {$set : {
                            name : contact.name,
                            email : contact.email,
                            mobile : contact.mobile
                  }}, callback);    
}

module.exports.deleteContactById = function(id, callback){
     Contact.remove({_id : id}, callback);
}