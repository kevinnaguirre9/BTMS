const multer = require('multer');

exports.imgUpload = (req, res, next) => {
     const storage = multer.diskStorage({
          destination: function (req, file, cb) {
               const allowedMimes = ['image/png', 'image/jpg', 'image/jpeg'];

               if(!allowedMimes.includes(file.mimetype)) {// reject a file if it's not an image
                    res.send({message: 'Invalid file type. Only jpg and png image files are supported.'});
                    return false;
               }
               
               cb(null, 'uploads/');
          },
          filename: function (req, file, cb) {
               cb(null, file.originalname);
          },
     });

     const config = {
          storage: storage
     }

     const upload = multer(config).single('userPhoto');
        
     upload(req, res, function(err) {
          if(err) {
               return res.end("Error uploading the file.");
          }
          next();
     });
}