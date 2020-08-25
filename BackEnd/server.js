const mongoose = require('mongoose');
const app = require('./app');

// require dotenv file
require('dotenv').config({ path: './variables.env' });

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Database connected'));

// start server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port : ${process.env.PORT}`);
})