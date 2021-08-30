// imoprting report model
const Report = require('../models/report')

// exporting helper functions
module.exports = {
    // this function creates new report object in collection with given data
    createReport: async (rawData) => {
        const {
            userID,
            marketID,
            marketName,
            cmdtyID,
            marketType,
            cmdtyName,
            convFctr,
            priceUnit,
            price
        } = rawData;
        const result = await Report.create({
            userIDs: userID,
            marketID: marketID,
            marketName: marketName,
            cmdtyID: cmdtyID,
            marketType: marketType,
            cmdtyName: cmdtyName,
            priceUnits: [priceUnit,],
            prices: [price,],
            convFctrs: [convFctr,],
            avgInKgTillnow: price / convFctr,
        })
        return result;
    },
    // this function updates the contents of the given reportID
    updateReport: async (add, reportID) => {
        const result = Report.findByIdAndUpdate(reportID, add);
        return result;
    },
}