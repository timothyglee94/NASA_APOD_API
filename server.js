
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const image = ('../models/image');

mongoose.connect('mongodb://127.0.0.1/nasaAPODs');
mongoose.connection
    .once('open', ()=> console.log('connected to database'))
    .on('error', (error) => console.error(error));
    
app.use(express.json())
const usersRouter = require('./routes/users');
app.use('/', usersRouter);

app.listen(PORT, () => console.log(`it's alive at http://localhost:${PORT}`));
