const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	Name: {type: String},
	Description: {type: String},
	Tags: [{type: String}],
	Image: {type: String},
	Link: {type: String},
})

module.exports = mongoose.model('projects', projectSchema); 