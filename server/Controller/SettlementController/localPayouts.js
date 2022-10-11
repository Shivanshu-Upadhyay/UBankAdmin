const mysqlcon = require("../../config/db_connection");
const Pagination = require('../../services/pagination')
class LocalPayouts{
    async default(req,res){
        try {
          const { toDate,fromDate,today,yesterday,pageNumber,searchItem} = req.body
          let sqlAllCount = "select count (*) as Total from tbl_icici_payout_transaction_response_details";
          let result = await mysqlcon(sqlAllCount);
          let total = result[0].Total;
          let page = req.body.pageNumber ? Number(req.body.pageNumber) : 1;
          let limit = req.body.limit ? Number(req.body.limit) : 10;
          let { start, numOfPages } = Pagination.pagination(total, page, limit);
          let sql = 'select * from tbl_icici_payout_transaction_response_details ORDER BY `tbl_icici_payout_transaction_response_details`.`created_on` DESC limit ?,? '
          const data=  await mysqlcon(sql,[start,limit]);
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