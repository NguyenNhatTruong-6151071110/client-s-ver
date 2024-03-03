const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


const PORT = process.env.PORT || 3000;

// Simulated weather data
const weatherData = {
  Hanoi: {
    '2024-03-03': {
      temperature: 25,
      description: 'Sunny',
    },
    '2024-03-04': {
      temperature: 22,
      description: 'Partly Cloudy',
    },
  },
  HoChiMinhCity: {
    '2024-03-03': {
      temperature: 30,
      description: 'Hot',
    },
    '2024-03-04': {
      temperature: 28,
      description: 'Cloudy',
    },
  },
  DaNangCity:{
    '2024-03-03':{
        temperature: 20,
        description: 'Cold',
    },
    '2024-03-04':{
        temperature: 35,
        description: 'Hot',
    },
  },
};

app.use(express.json());

app.get('/weather', (req, res) => {
  const { date, location } = req.query;

  if (!date || !location) {
    return res.status(400).json({ error: 'Missing date or location parameter' });
  }

  const locationData = weatherData[location];

  if (!locationData) {
    return res.status(404).json({ error: 'Location not found' });
  }

  const forecast = locationData[date];

  if (!forecast) {
    return res.status(404).json({ error: 'Forecast not found for the specified date and location' });
  }

  res.json({ location, date, forecast });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
