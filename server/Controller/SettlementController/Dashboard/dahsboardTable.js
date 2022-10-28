const mysqlcon = require('../../../config/db_connection')

module.exports.dashboardTable = async (req, res) => {
    try {
        let sql = "SELECT user.name, settlement.requestedAmount as amount FROM tbl_settlement settlement INNER JOIN tbl_user user ON settlement.user_id = user.id WHERE settlement.status = 1  AND settlement.settlement_mode = 1 GROUP BY settlement.user_id ORDER BY settlement.requestedAmount DESC LIMIT 0,10"
        let sql2 = "SELECT user.name, settlement.requestedAmount as amount FROM tbl_settlement settlement INNER JOIN tbl_user user ON settlement.user_id = user.id WHERE settlement.status = 1  AND settlement.settlement_mode = 2  GROUP BY settlement.user_id ORDER BY settlement.requestedAmount DESC LIMIT 0,10"
        let sql3 = "SELECT name, MAX(amount) as amount, currency FROM (SELECT user.name, settlement.requestedAmount as amount, settlement.fromCurrency as currency FROM tbl_settlement settlement INNER JOIN tbl_user user ON settlement.user_id = user.id WHERE settlement.status = 1 GROUP BY currency, settlement.user_id) tbl GROUP BY currency";
        let topLocal = await mysqlcon(sql);
        let topInternational = await mysqlcon(sql2);
        let result = await mysqlcon(sql3);
        currencies = ['INR', 'CNY', 'IDR', 'THB', 'VND', 'USD', 'PHP', 'MYR', 'CLP', 'MXN', 'PEN', 'GTQ', 'CRC', 'BRL', 'PKR', 'KRW',]
        topCurrency = currencies.map(x=>({
            name: result.filter(item=> item.currency === x).reduce((a, b) => { return b.name }, 'NA'),
            amount: result.filter(item=> item.currency === x).reduce((a, b) => { return b.amount }, 'NA'),
            currency : x
        }))
        return res.status(200).json({
            status: true,
            data: {
                topLocal: topLocal,
                topInternational: topInternational,
                topCurrency: topCurrency
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error occured",
            error: error
        })
    }
}