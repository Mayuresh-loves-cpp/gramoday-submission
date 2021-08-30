// importing mongoose
const mongoose = require('mongoose');

// DB schema for report details collection
const reportSchema = mongoose.Schema({
    userIDs: {
        type: Array,
        required: true,
    },
    marketID: {
        type: String,
        required: true,
    },
    marketName: {
        type: String,
        required: true,
    },
    cmdtyID: {
        type: String,
        required: true,
    },
    marketType: {
        type: String,
        required: false,
    },
    cmdtyName: {
        type: String,
        required: true,
    },
    priceUnits: {
        type: Array,
        required: true,
    },
    convFctrs: {
        type: Array,
        required: true,
    },
    prices: {
        type: Array,
        required: true,
    },
    avgInKgTillnow: {
        type: Number,
    }
}, {
    timestamps: true
});

// exporting schema
module.exports = mongoose.model('report details', reportSchema);