const express = require('express');
const cors = require('cors');
const path = require('path');
const aiRoutes = require('./routes/ai.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../frontend')));

// Routes
app.use('/ai', aiRoutes);

module.exports = app;