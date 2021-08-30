// imports
const mongoose = require('mongoose');

// creating connection
mongoose.connect(process.env.DB_URI || "mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedtopology: true,
});

// on connection and disconnection operations
mongoose.connection.on("connected", () => {
    console.log("database connected!")
})

mongoose.connection.on("error", (err) => {
    console.log(err.message)
})

mongoose.connection.on("disconnected", () => {
    console.log("database disconnected!")
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})