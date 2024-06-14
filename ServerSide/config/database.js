const mongoose = require('mongoose')

async function connectDB() {

    await mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("DB connected successfully"))
        .catch((err) => {
            console.log("Issue in DB connection");
            console.error(err.message);
            process.exit(1);  //?
        })
}

module.exports = connectDB