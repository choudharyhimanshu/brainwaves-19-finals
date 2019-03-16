
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    Key_20: { type: String, unique: true, required : true, dropDups: true },
    Key_22A:String,
    Key_22C:String,
    Key_30T:String,
    Key_52A:String,
    Key_82A:String,
    Key_87A:String,
    Key_77H:String,
    Key_30V:String,
    Key_36: String,
    Key_32B:String,
    Key_57A:String,
    Key_33B:String,
    Key_53A:String,
    Key_56: String,
    Key_57D:String,
    Key_58A:String,
    Key_24D:String,
    status: String,
    clientRef: String,
});

const SGMessage = module.exports = mongoose.model('sgMessage', schema, 'sg_messages');
