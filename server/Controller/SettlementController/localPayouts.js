const mysqlcon = require("../../config/db_connection");
const Pagination = require('../../services/pagination')
class LocalPayouts{
    async default(req,res){
        try {
            const { to,from,date,pageNumber,searchItem} = req.body
            let sqlAllCount = "select count (*) as Total from tbl_icici_payout_transaction_response_details";
            let sqCountDate = "select count (*) as Total from tbl_icici_payout_transaction_response_details where DATE(created_on) = ?";
            let sqlToFromCount = "select count (*) as Total from tbl_icici_payout_transaction_response_details where DATE(created_on)  >= ? AND DATE(created_on) <= ?"
            let sqlSearchCount = `select count (*) as Total from tbl_icici_payout_transaction_response_details where creditacc LIKE '%${searchItem}%'`

            let result = await mysqlcon(date?sqCountDate:(to&&from)?sqlToFromCount:searchItem?sqlSearchCount:sqlAllCount,date?[date]:(to&&from)?[from,to]: '')
            let page = req.body.pageNumber ? Number(req.body.pageNumber) : 1;
            let limit = req.body.limit ? Number(req.body.limit) : 10;
            let { start, numOfPages } = Pagination.pagination(result[0].Total, page, limit);
            
            let sql='select payout_bank,trx_from,uniqueid,customer_order_id,status,response,utrnumber,trx_type,payee_name,creditacc,ifsc,amount,remark,gst_amount,bank_charges,wallet_deduct,currency,created_on,updated_on from tbl_icici_payout_transaction_response_details ORDER BY created_on DESC limit ?,?'
            let sqlDate = 'select payout_bank,trx_from,uniqueid,customer_order_id,status,response,utrnumber,trx_type,payee_name,creditacc,ifsc,amount,remark,gst_amount,bank_charges,wallet_deduct,currency,created_on,updated_on from tbl_icici_payout_transaction_response_details where DATE(created_on) = ? ORDER BY created_on DESC limit ?,?'
            let sqlToFrom = 'select payout_bank,trx_from,uniqueid,customer_order_id,status,response,utrnumber,trx_type,payee_name,creditacc,ifsc,amount,remark,gst_amount,bank_charges,wallet_deduct,currency,created_on,updated_on from tbl_icici_payout_transaction_response_details where DATE(created_on)  >= ? AND DATE(created_on) <= ? ORDER BY created_on DESC limit ?,?'
            let sqlSearch = `select payout_bank,trx_from,uniqueid,customer_order_id,status,response,utrnumber,trx_type,payee_name,creditacc,ifsc,amount,remark,gst_amount,bank_charges,wallet_deduct,currency,created_on,updated_on from tbl_icici_payout_transaction_response_details where creditacc LIKE '%${searchItem}%' ORDER BY created_on DESC limit ?,?`

            const data = await mysqlcon(date?sqlDate:(to&&from)?sqlToFrom:searchItem?sqlSearch:sql,date?[date,start,limit]:(to&&from)?[from,to,start,limit]:[start,limit]);
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