// importing request model
const Report = require('../models/report');

// importing helper functions
const {
    createReport,
    updateReport,
} = require('../utils/helper')

// exprorting controller functions
module.exports = {
    // this function is used to save reports
    saveReports: async (req, res, next) => {
        try {
            const {
                marketID,
                cmdtyID,
                userID,
                convFctr,
                price,
                priceUnit,
            } = req.body.reportDetails;
            var latestReoprt = await Report.find({
                marketID: marketID,
                cmdtyID: cmdtyID,
            }).exec();
            if (latestReoprt.length != 0) {
                latestReoprt = (await latestReoprt).sort((a, b) => {
                    return b.createdAt - a.createdAt;
                })
                latestReoprt = latestReoprt[0];
                const date = new Date();
                if (latestReoprt.createdAt.toDateString() == date.toDateString()) {
                    var userIDs = latestReoprt.userIDs,
                        convFctrs = latestReoprt.convFctrs,
                        prices = latestReoprt.prices,
                        priceUnits = latestReoprt.priceUnits;
                    userIDs.push(userID);
                    convFctrs.push(convFctr);
                    prices.push(price);
                    priceUnits.push(priceUnit);
                    var sum = 0;
                    for (var i = 0; i < convFctrs.length; i++) {
                        sum = sum + (prices[i] / convFctrs[i]);
                    }
                    sum = sum / convFctrs.length;
                    const add = {
                        userIDs: userIDs,
                        convFctrs: convFctrs,
                        prices: prices,
                        priceUnits: priceUnits,
                        avgInKgTillnow: sum,
                    };
                    const result = await updateReport(add, latestReoprt._id);
                    if (result) {
                        console.log('updated new request!');
                        res.status(200).json({
                            status: "success",
                            reportID: result._id,
                        });
                    } else {
                        console.log('unable to update new request!');
                        res.status(500).json({
                            status: "failed",
                        });
                    }
                } else {
                    console.log('old reports found for current data! creating new report for today');
                    const result = await createReport(req.body.reportDetails);
                    if (result) {
                        console.log('created new request!');
                        res.status(200).json({
                            status: "success",
                            reportID: result._id,
                        });
                    } else {
                        console.log('unable to create new request!');
                        res.status(500).json({
                            status: "failed",
                        });
                    }
                }
            } else {
                console.log('no reports found for current data! creating new report for today')
                const result = await createReport(req.body.reportDetails);
                if (result) {
                    console.log('created new request!');
                    res.status(200).json({
                        status: "success",
                        reportID: result._id,
                    });
                } else {
                    console.log('unable to create new request!');
                    res.status(500).json({
                        status: "failed",
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                status: "failed",
            });
        }
    },
    // this function is used to get reports
    getReports: async (req, res, next) => {
        try {
            const result = await Report.findById(req.query.reportID);
            if (result) {
                res.status(200).json({
                    userID: result.userIDs,
                    marketID: result.marketID,
                    marketName: result.marketName,
                    cmdtyID: result.cmdtyID,
                    cmdtyName: result.cmdtyName,
                    priceUnit: 'Kg',
                    price: result.avgInKgTillnow,
                });
            } else {
                res.status(404).json({
                    status: 'not found'
                })
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                status: 'failed',
            });
        }
    },
};