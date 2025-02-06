require('dotenv').config();
const express = require("express");
const PORT = process.env.port || 8080;
const app = express();

app.use(express.json());
/* it the middleware to parse url-encoded when submit the form data given true allow us to deep nesting the data
    with the help the of it you can access the data via req.body in form data */
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy',  1);

const server = app.listen(PORT, () => {
    console.log("Welcome to server")
})