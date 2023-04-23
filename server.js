const express = require('express');
const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(3000, () => {
            console.log(`Running on port ${port}`)
        });
    }
});
