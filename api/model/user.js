const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    _id   :mongoose.Schema.Types.ObjectId,
    name  : String,
    password : String
});


module.exports=mongoose.model('user',userSchema);