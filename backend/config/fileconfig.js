// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log({ file, body: req.body, param: req.params });
//         let url = `./uploads/images`;
//         createFolder(url);
//         cb(null, url);
//     },
//     filename: function (req, file, cb) {
//         // Sanitize the filename to avoid issues
//         const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
//         const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Replace invalid characters
//         cb(null, `${timestamp}-${sanitizedFileName}`); // Use the sanitized name
//     },
// });

// const createFolder = (path) => {
//     try {
//         if (!fs.existsSync(path)) {
//             fs.mkdirSync(path, { recursive: true });
//             console.log('Directory is created.');
//         } else {
//             console.log('Directory already exists.');
//         }
//     } catch (err) {
//         console.log(err);
//     }
// };


// const fileFilter = (req, file, cb) => {
//     console.log(file);
//     if (
//         file.mimetype === 'image/jpg' ||
//         file.mimetype === 'image/png' ||
//         file.mimetype === 'image/jpeg'
//     ) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
    
// })

// module.exports = { upload };


const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log({ file, body: req.body, param: req.params });

        // Dynamically set the upload directory based on the environment
        const uploadDirectory = process.env.NODE_ENV === 'production' 
            ? path.join(__dirname, '..', 'uploads', 'images') 
            : './uploads/images';

        // Ensure the folder exists
        createFolder(uploadDirectory);
        cb(null, uploadDirectory);  // Use the dynamic directory
    },
    filename: function (req, file, cb) {
        // Sanitize the filename to avoid issues
        const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Replace invalid characters
        cb(null, `${timestamp}-${sanitizedFileName}`); // Use the sanitized name
    },
});

const createFolder = (path) => {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
            console.log('Directory is created.');
        } else {
            console.log('Directory already exists.');
        }
    } catch (err) {
        console.log(err);
    }
};

const fileFilter = (req, file, cb) => {
    console.log(file);
    if (
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = { upload };
