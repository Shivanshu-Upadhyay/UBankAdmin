const mysqlcon = require('../../../config/db_connection')

module.exports.yesterdayInternational = async (req, res) => {
    try {
        let fiat = [0, 0, 0, 0, 0, 0];
        let crypto = [0, 0, 0, 0, 0, 0];
        let total = 0
        let sql = "SELECT SUM(requestedAmount) as amount, settlementType, (CASE WHEN hour(created_on) < 4 then 0 WHEN hour(created_on) >= 4 and hour(created_on) < 8 then 1 WHEN hour(created_on) >= 8 and hour(created_on) < 12 then 2 WHEN hour(created_on) >= 12 and hour(created_on) < 16 then 3 WHEN hour(created_on) >= 16 and hour(created_on) < 20 then 4 ELSE 5 END) as hr FROM tbl_settlement WHERE status = 1 AND settlement_mode = 1 AND Date(created_on) = DATE(DATE_SUB(NOW(), INTERVAL 1 DAY)) GROUP by hr, settlementType";
        let result = await mysqlcon(sql);
        let temp_fiat = result.filter((item) => item.settlementType === "FIAT")
        let temp_crypto = result.filter((item) => item.settlementType === "CRYPTO")
        for (x of temp_fiat) {
            total += fiat[x.hr] = Number(x.amount)
        }
        for (y of temp_crypto) {
            total += crypto[y.hr] = Number(y.amount)
        }
        return res.status(200).json({
            status: true,
            message: "International Settlement (Yesterday)",
            data: {
                fiat: fiat,
                crypto: crypto,
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

module.exports.weeklyInternational = async (req, res) => {
    try {
        let day = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }
        const dates = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return (`${day[d.getDay()]} (${("0" + (d.getDate())).slice(-2)}-${("0" + (d.getMonth() + 1)).slice(-2)})`)
        })
        let sql = "SELECT sum(requestedAmount) AS amount, settlementType, date_format(created_on,'(%d-%m)') as day FROM tbl_settlement WHERE status = 1  AND settlement_mode = 1 AND Date(created_on) >= DATE(DATE_SUB(NOW(), INTERVAL 6 DAY))  GROUP BY day,  settlementType ORDER BY DATE(created_on) DESC";
        let result = await mysqlcon(sql);
        let temp_fiat = result.filter((item) => item.settlementType === "FIAT")
        let temp_crypto = result.filter((item) => item.settlementType === "CRYPTO")
        let data = dates.map((x) => ({
            day: x,
            fiat: (temp_fiat.filter((item) => item.day === x.split(' ')[1])).reduce((a, b) => { return b.amount }, 0),
            crypto: (temp_crypto.filter((item) => item.day === x.split(' ')[1])).reduce((a, b) => { return b.amount }, 0)
        }))
        let total = Number((result.reduce((a, b) => { return a + b.amount }, 0)).toFixed(2))
        return res.status(200).json({
            status: true,
            message: "International Settlement (Weekly) ",
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

module.exports.monthlyInternational = async (req, res) => {
    try {
        let day = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }
        const dates = [...Array(30)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return (`${day[d.getDay()]} (${("0" + (d.getDate())).slice(-2)}-${("0" + (d.getMonth() + 1)).slice(-2)})`)
        })
        let sql = "SELECT sum(requestedAmount) AS amount, settlementType, date_format(created_on,'(%d-%m)') as day FROM tbl_settlement WHERE status = 1  AND settlement_mode = 1 AND Date(created_on) >= DATE(DATE_SUB(NOW(), INTERVAL 29 DAY))  GROUP BY day,  settlementType ORDER BY DATE(created_on) DESC";
        let result = await mysqlcon(sql);
        let temp_fiat = result.filter((item) => item.settlementType === "FIAT")
        let temp_crypto = result.filter((item) => item.settlementType === "CRYPTO")
        let fiat = []
        let crypto = []
        for(x in dates){
            fiat[x] = (temp_fiat.filter((item) => item.day === dates[x].split(' ')[1])).reduce((a, b) => { return b.amount }, 0)
        }
        for(x in dates){
            crypto[x] = (temp_crypto.filter((item) => item.day === dates[x].split(' ')[1])).reduce((a, b) => { return b.amount }, 0)
        }
        // let fiat = dates.map((x) => ({
        //     // day: x,
        //     fiat: (temp_fiat.filter((item) => item.day === x.split(' ')[1])).reduce((a, b) => { return b.amount }, 0),
            
        // }))
        // let crypto = dates.map((x)=>({
        //     // day: x,
        //     crypto: (temp_crypto.filter((item) => item.day === x.split(' ')[1])).reduce((a, b) => { return b.amount }, 0)
        // }))
        let total = Number((result.reduce((a, b) => { return a + b.amount }, 0)).toFixed(2))
        return res.status(200).json({
            status: true,
            message: "International Settlement (Monthly) ",
            data: {
                fiat: fiat,
                crypto: crypto,
                dates:dates,
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

module.exports.yearlyInternational = async (req, res) => {
    try {
        const year = ((new Date()).getFullYear() % 100);
        let month = [`Jan-${year}`, `Feb-${year}`, `Mar-${year}`, `Apr-${year}`, `May-${year}`, `Jun-${year}`, `Jul-${year}`, `Aug-${year}`, `Sep-${year}`, `Oct-${year}`, `Nov-${year}`, `Dec-${year}`]
        let sql = "SELECT DATE_FORMAT(created_on, '%b-%y') as month, settlementType, SUM(requestedAmount) as amount FROM tbl_settlement WHERE status = 1  AND settlement_mode = 1 AND YEAR(created_on) = YEAR(NOW()) GROUP BY month, settlementType";

        let result = await mysqlcon(sql);
        let temp_fiat = result.filter((item) => item.settlementType === "FIAT")
        let temp_crypto = result.filter((item) => item.settlementType === "CRYPTO")
        let data = month.map((x) => ({
            day: x,
            fiat: (temp_fiat.filter((item) => item.month === x)).reduce((a, b) => { return b.amount }, 0),
            crypto: (temp_crypto.filter((item) => item.month === x)).reduce((a, b) => { return b.amount }, 0)
        }))
        let total = Number((result.reduce((a, b) => { return a + b.amount }, 0)).toFixed(2))
        return res.status(200).json({
            status: true,
            message: "International Settlement (Yearly) ",
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
