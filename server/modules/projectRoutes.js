const projectSchema = require('./projectSchema');
const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Set up multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET  // Your Cloudinary API secret
});

// Function to handle the upload to Cloudinary
async function uploadImage(imgPath) {
  try {
    const result = await cloudinary.uploader.upload(imgPath, {
      folder: "images",
    });
    return result.secure_url;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to upload image');
  }
}

// Route for posting a project
router.post('/post-project', upload.single('file'), async (req, res) => {
  try {
    const { Name, Description, Tags, Link } = req.body;
    const TagSplit = Tags.split(',');

    // Check if the file is uploaded
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Upload the file to Cloudinary using the file path
    const imageUrl = await uploadImage(req.file.path);
    
    // Create and save the new project
    const newProj = new projectSchema({
      Name,
      Description,
      Tags: TagSplit,
      Image: imageUrl,  // Use the Cloudinary image URL
      Link
    });

    await newProj.save();
    res.status(200).send('Project added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/get-project', async (req, res)=> {
	try {
    const allProjects = await projectSchema.find()
    res.json(allProjects)
	} catch(err) {
		console.error(err);
    res.json([]);
	}
});

module.exports = router