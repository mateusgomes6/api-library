const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use('/api', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});