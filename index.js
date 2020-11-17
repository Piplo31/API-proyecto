const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const dbRoutes = require('./routers');

dbRoutes(app);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
