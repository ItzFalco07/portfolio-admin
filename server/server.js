require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const port = process.env.PORT;
const uri = process.env.MONGO_URI;

// module imports
const projectRoutes = require('./modules/projectRoutes');

// middleweres
app.use(express.json());
app.use(cors({
	origin: "https://portfolio-admin.vercel.app"
}));
app.use('/api', projectRoutes)

// mongoose connection
const connectDB = () => {
	try {
    	mongoose.connect(uri);
	} catch(error) {
		console.error(error);
	} finally {
        console.log('connected..');
	}
}

connectDB();

// express server
app.listen(port, () => {
	console.log(`server running on port: ${port}`);
})

app.get('/', (req,res) => {
	res.send('this is backend')
})

module.exports = app;
