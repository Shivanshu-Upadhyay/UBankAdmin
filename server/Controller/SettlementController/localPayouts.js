const mysqlcon = require("../../config/db_connection");
const Pagination = require('../../services/pagination')
class LocalPayouts{
    async default(req,res){
        try {
            const { to,from,date,pageNumber,searchItem} = req.body
            let sqlAllCount = "select count (*) as Total from tbl_icici_payout_transaction_response_details";
            let sqlAllCountDate = "select count (*) as Total from tbl_icici_payout_transaction_response_details where DATE(created_on) = ?";
            let sqlToFromCount = "select count (*) as Total from tbl_icici_payout_transaction_response_details where DATE(created_on)  >= ? AND DATE(created_on) <= ?"

            let result = await mysqlcon(date?sqlAllCountDate:(to&&from)?sqlToFromCount:sqlAllCount,date?[date]:(to&&from)?[from,to] :'')
            let page = req.body.pageNumber ? Number(req.body.pageNumber) : 1;
            let limit = req.body.limit ? Number(req.body.limit) : 10;
            let { start, numOfPages } = Pagination.pagination(result[0].Total, page, limit);

            let sqlDate = 'select * from tbl_icici_payout_transaction_response_details where DATE(created_on) = ? ORDER BY created_on DESC limit ?,?'
            let sqlToFrom = 'select * from tbl_icici_payout_transaction_response_details where DATE(created_on)  >= ? AND DATE(created_on) <= ? ORDER BY created_on DESC limit ?,?'
            let sql='select * from tbl_icici_payout_transaction_response_details ORDER BY created_on DESC limit ?,?'

            const data = await mysqlcon(date?sqlDate:(to&&from)?sqlToFrom:sql,date?[date,start,limit]:(to&&from)?[from,to,start,limit]:[start,limit]);
            res.status(200).json({
            result:data,
            numOfPages
            })
          
        } catch (error) {
            res.status(500).json({message:"Something went wrong",
        error})
        }
      
    }
}

module.exports = new LocalPayouts