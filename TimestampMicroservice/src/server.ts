import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/:date?', (req, res) => {
  const { date } = req.params;

  let response;

  if (!date) {
    const now = new Date();
    response = {
      unix: now.getTime(),
      utc: now.toUTCString()
    };
  } else {
    const parsedDate = !isNaN(Number(date)) ? new Date(Number(date)) : new Date(date);
    if (parsedDate.toString() === 'Invalid Date') {
      response = { error: 'Invalid Date' };
    } else {
      response = {
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString()
      };
    }
  }

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
