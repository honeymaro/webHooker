var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/uploadedFiles/')
  },
  filename: function (req, file, cb) {
    cb(null, + Date.now() + "." + file.originalname.split(".").pop())
  }
});


var uploading = multer({
  fileFilter: function (req, file, cb) {
    var UnacceptableMimeTypes = ["exe", "com", "scr", "sh", "ln"]
    if (UnacceptableMimeTypes.indexOf(file.originalname.split(".").pop()) > -1) {
      return cb(new Error('Unacceptable file type.'))
    }

    cb(null, true)
  },
  storage: storage,
  limits: { fileSize: 1000 * 1000 * 20, files: 5 }
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


const exec = require('exec');

router.all('*', function (req, res, next) {
  // console.log(global.config.url);
  // log.info('log', {
  //   body: req.body,
  //   query: req.query,
  //   cookies: req.cookies
  // });

  if(global.config.url == req.url){
    var p = exec(['sh', global.config.scriptFile], function (err, out, code) {
      // if (err instanceof Error)
      //   throw err;
      console.log(err);
      console.log(out);
      p.kill("SIGINT");
      // process.stderr.write(err);
      // process.stdout.write(out);
      // process.exit(code);
    });
  
    res.send("Hello World!");
  }
  else{
    next();
  }


});

module.exports = router;
