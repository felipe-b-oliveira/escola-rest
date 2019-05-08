const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:SenhadeTeste@cluster0-5msyk.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

module.exports = mongoose;
