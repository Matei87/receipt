import express from 'express';
import cors from 'cors';
import fs from 'fs';
import multer from 'multer';
import request from 'request';
import mindee from 'mindee';
import sharp from 'sharp';
import tesseract from 'tesseract.js';

import data from './data.json' assert { type: 'json' };

const upload = multer({ dest: './uploads' });
const app = express();

app.use(express.json());
app.use(cors());

app.get('/api', async (req, res) => {
  try {
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/uploadFile', upload.single('file'), async (req, res) => {
  try {
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
    const grayImageFile = `${req.file.destination}/gray_${req.file.originalname}`;
    // const mindeeClient = new mindee.Client({
    //   apiKey: process.env.MINDEE_API_KEY,
    // });
    // const inputSource = mindeeClient.docFromPath(imageFile);
    // const apiResponse = await mindeeClient.parse(
    //   mindee.product.ReceiptV5,
    //   inputSource
    // );

    await sharp(imageFile)
      //.greyscale()
      .resize(1191, 2000, sharp.fit.cover)
      .threshold(190)
      //.negate({ alpha: false })
      .toFile(grayImageFile);

    const request = await tesseract.recognize(grayImageFile, 'ron');
    if (request.data.text) {
      res.status(201).json(request.data.text);
    }

    fs.unlinkSync(imageFile);
    fs.unlinkSync(grayImageFile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log('Server is running on port ' + PORT));
