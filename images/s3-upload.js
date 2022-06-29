require("dotenv").config();

const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4;
const path = require("path");

console.log(__dirname);
console.log(process.env);

const app = express();

// Note: credentials stored locally in credentials file.
// aws.config.update({
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.region,
//   },
// });

const s3 = new aws.S3({
  apiVersion: "2006-03-01",
});

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read", //so client can display images from S3
    bucket: "sunny-codes-blog-storage",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuid()}${ext}`);
    },
  }),
});

app.use(express.static(__dirname));

//Note: array is allow multiple files...
app.post("/upload", upload.array("blog-s3-image-uploads"), (req, res) => {
  return res.json({ status: "OK", uploaded: req.files.length });
});

try {
  let port = process.env.IMAGE_UPLOAD_PORT || 3005;
  app.listen(port);
  console.log(`App is listening on ${port}`);
} catch (error) {
  throw error;
}
