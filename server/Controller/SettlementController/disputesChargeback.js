const mysqlcon = require("../../config/db_connection");
const Pagination = require('../../services/pagination')
class DisputesChargeback{
    async default(req,res){
        try {
            const { to,from,date,pageNumber,searchItem} = req.body
            let sqlAllCount = "select count (*) as Total from tbl_chargeback_disputes ";
            let sqCountDate = "select count (*) as Total from tbl_chargeback_disputes where DATE(created_on) = ? ";
            let sqlToFromCount = "select count (*) as Total from tbl_chargeback_disputes where DATE(created_on)  >= ? AND DATE(created_on) <= ? "
            let sqlSearchCount = `select count (*) as Total from tbl_chargeback_disputes where tbl_chargeback_disputes.id LIKE '%${searchItem}%' `

            let result = await mysqlcon(date?sqCountDate:(to&&from)?sqlToFromCount:searchItem?sqlSearchCount:sqlAllCount,date?[date]:(to&&from)?[from,to]: '')
            let page = req.body.pageNumber ? Number(req.body.pageNumber) : 1;
            let limit = req.body.limit ? Number(req.body.limit) : 10;
            let { start, numOfPages } = Pagination.pagination(result[0].Total, page, limit);
            
            let sql='select tbl_chargeback_disputes.* ,payment_gateway.gateway_name As bankName from tbl_chargeback_disputes JOIN payment_gateway ON tbl_chargeback_disputes.bank_name = payment_gateway.id  ORDER BY tbl_chargeback_disputes.created_on DESC limit ?,?'
            let sqlDate = 'select tbl_chargeback_disputes.* ,payment_gateway.gateway_name As bankName from tbl_chargeback_disputes JOIN payment_gateway ON tbl_chargeback_disputes.bank_name = payment_gateway.id where DATE(tbl_chargeback_disputes.created_on) = ?  ORDER BY tbl_chargeback_disputes.created_on DESC limit ?,?'
            let sqlToFrom = 'select tbl_chargeback_disputes.* ,payment_gateway.gateway_name As bankName from tbl_chargeback_disputes JOIN payment_gateway ON tbl_chargeback_disputes.bank_name = payment_gateway.id where DATE(tbl_chargeback_disputes.created_on)  >= ? AND DATE(tbl_chargeback_disputes.created_on) <= ?  ORDER BY tbl_chargeback_disputes.created_on DESC limit ?,?'
            let sqlSearch = `select tbl_chargeback_disputes.* ,payment_gateway.gateway_name As bankName from tbl_chargeback_disputes JOIN payment_gateway ON tbl_chargeback_disputes.bank_name = payment_gateway.id where tbl_chargeback_disputes.id LIKE '%${searchItem}%' ORDER BY tbl_chargeback_disputes.created_on DESC limit ?,?`

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

module.exports = new DisputesChargeback