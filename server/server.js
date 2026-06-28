const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const assignmentRoutes = require('./routes/assignmentRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: frontendUrl ? frontendUrl.split(',').map((url) => url.trim()) : true
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'StudyTrack API is running' });
});

app.use('/api/assignments', assignmentRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
