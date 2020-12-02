require('dotenv').config();
const Dashboard = require('../models/dashboard_model');

const getDashboard = async (req, res) => {
    let dateStart = req.body.dateStart;
    let dateEnd = req.body.dateEnd;
    let process = req.body.process;

    const dashboardDailyEfficiency = (await Dashboard.getDailiEfficiency(dateStart, dateEnd, process));
    console.log(dashboardDailyEfficiency);
    res.status(200).send({data: dashboardDailyEfficiency});
};

module.exports = {
    getDashboard
};