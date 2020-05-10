const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

// ======= DB & MIDDLEWARE =======
const db = require('./../models');
const errorHandlers = require('../helpers/errorHandlers');
const accidents = require('../routes/api/accidents');
const users = require('../routes/users/users');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// ========== ROUTES ==============
app.get('/', (req, res) => {
    res.json({
        message: "Accidents API",
    });
});

// ========== API ROUTES ==========
app.use('/users', users);
app.use('/api/accidents', accidents);

// ========== ERROR HANDLER =======
app.use(errorHandlers.notFound);
app.use(errorHandlers.errorHandler);

// ========= START SERVER =============
const port = process.env.PORT || 2000;
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`listening at localhost:${port}`);
    });
});
