require("dotenv").config();

const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4;
const path = require("path");

// console.log(__dirname);
// console.log(process.env);

// TODO: create authorized route on frontend to upload images
// TODO: image model needs an article id to pass images to the right article

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

//TODO: metdata to asscoiate image with article
const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read", //so client can display images from S3
    bucket: "sunny-codes-blog-storage",
    metadata: (req, file, cb) => {
      //   cb(null, { fieldName: file.fieldname });
      cb(
        null,
        Object.assign(
          {},
          { articleId: req.body["article-number"] },
          { fieldName: file.fieldname }
        )
      );
    },
    key: (req, file, cb) => {
      //const ext = path.extname(file.originalname);
      //   cb(null, `${uuid()}${ext}`);
      cb(null, `${uuid()}-${file.originalname}`);
    },
  }),
});

app.use(express.static(__dirname));

//Note: array is to allow multiple files...
//Note: upload is the multer middleware. upload.single for a single file
app.post("/upload", upload.array("blog-s3-image-uploads"), (req, res) => {
  //image model fields: imageTitle,s3URL, inArtcileIndex, isIcon
  let images = req.files;
  console.log("images: ", images);
  let data = images.map((an_img) => {
    return {
      imageTitle: an_img.originalname,
      s3URL: an_img.location,
      articleId: Number(an_img.metadata.articleId),
    };
  });
  console.log("data: ", data);
  return res.json({
    status: "OK",
    imageData: data,
  });
});

try {
  let port = process.env.IMAGE_UPLOAD_PORT || 3005;
  app.listen(port);
  console.log(`App is listening on ${port}`);
} catch (error) {
  throw error;
}
