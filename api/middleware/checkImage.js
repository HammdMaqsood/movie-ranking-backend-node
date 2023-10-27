const multer = require('multer');
const path = require('path');

const storageEngine = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const userId = req.userData.userId;
    console.log('userId', userId);
    cb(null, `${req.userData.userId}-profile-${file.originalname}`);
  },
});

const upload = multer({
  storage: storageEngine,
  limits: { 
    fileSize: 100000000 
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb('Error: You can only upload image files (jpeg, jpg, png, gif, svg)!');
  }
};

module.exports = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    next();
  });
};
