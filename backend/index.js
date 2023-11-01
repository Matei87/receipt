import express from 'express';
import cors from 'cors';
import fs from 'fs';
import multer from 'multer';
import sharp from 'sharp';

const upload = multer({ dest: './uploads' });
const app = express();

app.use(express.json());
app.use(cors());

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

    const imageFile = `${req.file.destination}/${req.file.originalname}`;
    const grayImageFile = `${req.file.destination}/gray_${req.file.originalname}`;

    await sharp(imageFile)
      .greyscale()
      .resize(1191, 2000, sharp.fit.cover)
      //.threshold(250)
      .negate({ alpha: false })
      .toFile(grayImageFile);

    var imageAsBase64 = fs.readFileSync(grayImageFile, { encoding: 'base64' });
    const formData = new FormData();
    formData.append('base64Image', 'data:image/jpg;base64,' + imageAsBase64);
    formData.append('OCREngine', '2');

    const request = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: {
        apiKey: '927a0897c488957',
      },
      body: formData,
    });

    console.log(request);
    if (request.status === 200) {
      const result = await request.json();
      console.log('2 ', result.ParsedResults[0].ParsedText);
      res.status(201).json(result.ParsedResults);
    }

    fs.unlinkSync(imageFile);
    fs.unlinkSync(grayImageFile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log('Server is running on port ' + PORT));
