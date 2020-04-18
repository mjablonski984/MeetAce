const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/meetings', require('./routes/meetings'));
app.use('/api/auth', require('./routes/auth'));

// Serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  // get all - place bellow all ather routes !
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
