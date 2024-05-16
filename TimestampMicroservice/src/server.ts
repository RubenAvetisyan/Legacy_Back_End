import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let parsedDate;

  if (!date) {
    // Handle empty date parameter
    parsedDate = new Date();
  } else {
    // Handle Unix timestamp
    if (!isNaN(Number(date))) {
      parsedDate = new Date(Number(date));
    } else {
      // Handle date string
      parsedDate = new Date(date);
    }
  }

  if (parsedDate.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
