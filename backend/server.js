const express = require('express');
const cors = require('cors');
const { sequelize, Profile } = require('./models');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Sync database
sequelize.sync();

// POST endpoint to receive LinkedIn profile data
app.post('/api/profiles', async (req, res) => {
  const { name, url, about, bio, location, followerCount, connectionCount, bioLine } = req.body;
  if (!name || !url) {
    return res.status(400).json({ error: 'Name and URL are required.' });
  }
  try {
    await Profile.create({ name, url, about, bio, location, followerCount, connectionCount, bioLine });
    res.json({ message: 'Profile saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save profile.' });
  }
});

// GET endpoint to view all profiles
app.get('/api/profiles', async (req, res) => {
  const profiles = await Profile.findAll();
  res.json(profiles);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
