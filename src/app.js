import { app } from "./server.js";
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})