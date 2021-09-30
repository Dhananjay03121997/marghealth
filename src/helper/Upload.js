let path = require('path');
let multer = require('multer');
let reqPath = path.join(__dirname, '../../uploads/');

let excelFilter  = multer({
    dest: 'uploads',
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(xlsx|csv)$/)){
            return cb(new Error('upload files with .xlsx or .csv format'));
        }
        cb(undefined, true);
    }
})
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, reqPath);
      },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
});
var uploadFile = multer({ storage: storage, excelFilter : excelFilter  });
module.exports = uploadFile;