const UploadFile = require('../models/upload_file');
const { streamUpload } = require('../utils/cloudinary');

exports.uploadFileResult = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided' });

    // Upload to Cloudinary
    const result = await streamUpload(req.file.buffer);

    req.body.user = req.user._id;
    req.body.field_name = req.body.name;
    req.body.url = result.secure_url;

    const uploadFile = new UploadFile(req.body);
    const createdUploadFile = await uploadFile.save();

    res.json(createdUploadFile);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err?.message || 'Error uploading file' });
  }
};
