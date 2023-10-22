import express from 'express';
import cors from 'cors';
import fs from 'fs';
import multer from 'multer';
import request from 'request';

const upload = multer({ dest: './uploads' });
const app = express();
app.use(cors());

app.post('/uploadFile', upload.single('file'), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  fs.rename(
    `${req.file.destination}/${req.file.filename}`,
    `${req.file.destination}/${req.file.originalname}`,
    (err) => {
      if (err) console.log('ERROR: ' + err);
    }
  );

  const receiptOcrEndpoint = 'https://ocr.asprise.com/api/v1/receipt';
  const imageFile = `${req.file.destination}/${req.file.originalname}`;

  request.post(
    {
      url: receiptOcrEndpoint,
      formData: {
        client_id: 'TEST', // Use 'TEST' for testing purpose
        recognizer: 'auto', // can be 'US', 'CA', 'JP', 'SG' or 'auto'
        ref_no: 'ocr_nodejs_123', // optional caller provided ref code
        file: fs.createReadStream(imageFile), // the image file
      },
    },
    (error, response, body) => {
      if (error) {
        // console.error(error);
        res.status(400).json({ message: error });
      }
      console.log(body);
      res.status(400).json({ message: body });
      //console.log('result ', body); // Receipt OCR result in JSON;
    }
  );

  // if (fs.existsSync(imageFile)) {
  //   fs.unlink(imageFile, (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log('FILE Deleted !!!');
  //   });
  // }

  //res.status(201).json(body);
});

const PORT = 5000;
app.listen(PORT, () => console.log('Server is running on port ' + PORT));
