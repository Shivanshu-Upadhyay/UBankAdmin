const mysqlcon = require('../../../config/db_connection')

module.exports.yesterdayCommissions = async (req, res) => {
    try {
        let yesterday = [0, 0, 0, 0, 0, 0];
        let sql = "SELECT SUM(charges) as amount, (CASE WHEN hour(created_on) < 4 then 0 WHEN hour(created_on) >= 4 and hour(created_on) < 8 then 1 WHEN hour(created_on) >= 8 and hour(created_on) < 12 then 2 WHEN hour(created_on) >= 12 and hour(created_on) < 16 then 3 WHEN hour(created_on) >= 16 and hour(created_on) < 20 then 4 ELSE 5 END) as hr FROM tbl_settlement WHERE status = 1  AND Date(created_on) = DATE(DATE_SUB(NOW(), INTERVAL 1 DAY)) GROUP by hr";
        let result = await mysqlcon(sql);
        for (x of result) {
            yesterday[x.hr] = x.amount
        }
        let total = yesterday.reduce((a, b) => a + b, 0);
        return res.status(200).json({
            status: true,
            message: "Commission (Yesterday) ",
            data: {
                yesterday: yesterday,
                total: total
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error occured",
            error: error
        })
    }
}

module.exports.weeklyCommissions = async (req, res) => {
    try {
        let day = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }
        const dates = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return (`${day[d.getDay()]} (${("0" + (d.getDate())).slice(-2)}-${("0" + (d.getMonth() + 1)).slice(-2)})`)
        })
        let sql = "SELECT sum(charges) AS amount,date_format(created_on,'(%d-%m)') as day FROM tbl_settlement WHERE status = 1  AND Date(created_on) >= DATE(DATE_SUB(NOW(), INTERVAL 6 DAY))  GROUP BY day ORDER BY DATE(created_on) DESC";
        let result = await mysqlcon(sql);
        let total = 0
        let data = {}
        dates.forEach(item => {
            total += data[item] = (result.filter((item1) => item1.day === item.split(' ')[1])).reduce((a, b) => { return b.amount }, 0)
        });
        return res.status(200).json({
            status: true,
            message: "Commission (Weekly) ",
            data: {
                weekly: data,
                total: total
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error occured",
            error: error
        })
    }
}

module.exports.monthlyCommissions = async (req, res) => {
    try {
        let day = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }
        const dates = [...Array(30)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return (`${day[d.getDay()]} (${("0" + (d.getDate())).slice(-2)}-${("0" + (d.getMonth() + 1)).slice(-2)})`)
        })
        let sql = "SELECT sum(charges) AS amount,date_format(created_on,'(%d-%m)') as day FROM tbl_settlement WHERE status = 1 AND Date(created_on) >= DATE(DATE_SUB(NOW(), INTERVAL 29 DAY))  GROUP BY day ORDER BY DATE(created_on) DESC";
        let result = await mysqlcon(sql);
        let total = 0
        let data = {}
        dates.forEach(item => {
            total += data[item] = (result.filter((item1) => item1.day === item.split(' ')[1])).reduce((a, b) => { return b.amount }, 0)
        });
        return res.status(200).json({
            status: true,
            message: "Commission (Monthly) ",
            data: {
                monthly: data,
                total: total
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error occured",
            error: error
        })
    }
}

module.exports.yearlyCommissions = async (req, res) => {
    try {
        const year = ((new Date()).getFullYear() % 100);
        let month = [`Jan-${year}`, `Feb-${year}`, `Mar-${year}`, `Apr-${year}`, `May-${year}`, `Jun-${year}`, `Jul-${year}`, `Aug-${year}`, `Sep-${year}`, `Oct-${year}`, `Nov-${year}`, `Dec-${year}`]
        let sql = "SELECT DATE_FORMAT(created_on, '%b-%y') as month, SUM(charges) as amount FROM tbl_settlement WHERE status = 1  AND YEAR(created_on) = YEAR(NOW()) GROUP BY month";
        let result = await mysqlcon(sql);
        let total = 0
        let data = {}
        month.forEach(item => {
            total += data[item] = (result.filter((item1) => item1.month === item)).reduce((a, b) => { return b.amount }, 0)
        });
        return res.status(200).json({
            status: true,
            message: "Commission (Yearly) ",
            data: {
                yearly: data,
                total: total
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error occured",
            error: error
        })
    }
}
