const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const accidents = require('./api/accidents');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// ========== ROUTES ==============
app.get('/', (req, res) => {
    res.json({
        message: "hello world",
    });
});

// ========== API ROUTES ==========
app.use('/api/accidents', accidents);

// ========== ERROR HANDLER =======
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// ========= LISTENER =============
const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`listening at localhost:${port}`);
});
