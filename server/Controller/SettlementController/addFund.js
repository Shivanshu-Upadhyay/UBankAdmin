const mysqlcon = require("../../config/db_connection");
const Pagination = require('../../services/pagination')
class AddFund{
    async default(req,res){
        try {
            const { to,from,date,pageNumber,searchItem} = req.body
            let sqlAllCount = "select count (*) as Total from tbl_add_settlement_fund";
            let sqCountDate = "select count (*) as Total from tbl_add_settlement_fund where DATE(created_on) = ?";
            let sqlToFromCount = "select count (*) as Total from tbl_add_settlement_fund where DATE(created_on)  >= ? AND DATE(created_on) <= ?"
            let sqlSearchCount = `select count (*) as Total from tbl_add_settlement_fund where merchant_id LIKE '%${searchItem}%'`

            let result = await mysqlcon(date?sqCountDate:(to&&from)?sqlToFromCount:searchItem?sqlSearchCount:sqlAllCount,date?[date]:(to&&from)?[from,to]: '')
            let page = req.body.pageNumber ? Number(req.body.pageNumber) : 1;
            let limit = req.body.limit ? Number(req.body.limit) : 10;
            let { start, numOfPages } = Pagination.pagination(result[0].Total, page, limit);
            
            let sql='select * from tbl_add_settlement_fund ORDER BY created_on DESC limit ?,?'
            let sqlDate = 'select * from tbl_add_settlement_fund where DATE(created_on) = ? ORDER BY created_on DESC limit ?,?'
            let sqlToFrom = 'select * from tbl_add_settlement_fund where DATE(created_on)  >= ? AND DATE(created_on) <= ? ORDER BY created_on DESC limit ?,?'
            let sqlSearch = `select * from tbl_add_settlement_fund where merchant_id LIKE '%${searchItem}%' ORDER BY created_on DESC limit ?,?`

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
    async curMer(req,res){
        try {
        const sqlMer = "select name as label, id from tbl_user";
        const sqlCurr = "select id,currency_code as label from tbl_currency";
        const merchant = await mysqlcon(sqlMer)
        const currency = await mysqlcon(sqlCurr)
        res.status(200).json({merchant,currency})
        } catch (error) {
            res.status(500).json({error})
        } 
    }
}
module.exports = new AddFund