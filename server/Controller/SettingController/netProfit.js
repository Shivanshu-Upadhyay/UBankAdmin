const mysqlcon = require("../../config/db_connection");

// Default Api 👇

module.exports.defaultProfit = async (req, res) => {

    try {
        let deposits = "SELECT ammount_type, SUM(ammount) as amount FROM tbl_merchant_transaction WHERE status = 1 GROUP BY ammount_type";
        let payout = "SELECT currency, SUM(amount) as amount FROM tbl_icici_payout_transaction_response_details WHERE status = 'SUCCESS' GROUP BY currency";
        let settlement = "SELECT fromCurrency, SUM(requestedAmount) as amount FROM tbl_settlement WHERE status = 1 GROUP BY fromCurrency";
        
        let depositResult = await mysqlcon(deposits);
        let payoutResult = await mysqlcon(payout);
        let settlementResult = await mysqlcon(settlement);
        
        return res.json(201, {
            depositResult: depositResult,
            payoutResult: payoutResult,
            settlementResult: settlementResult,
        });
    } catch (error) {
        console.log(error)
        return res.json(500, {
        message: "error occurered",
        error: error,
        });
    }
};