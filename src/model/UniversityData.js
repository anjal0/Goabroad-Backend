const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/UniversityDb');
const Schema = mongoose.Schema;

const UniversitySchema = new Schema({
    name: String,
    country: String,
    description: String,
    exam: String,
    courses: String
});

const Universitydata = mongoose.model('university', UniversitySchema);

module.exports = Universitydata;
