const mysqlcon = require("../../config/db_connection");
const Pagination = require('../../services/pagination')
class BankDeposit{
    async default(req,res){
        try {
          const { toDate,fromDate,today,yesterday,pageNumber,searchItem} = req.body
          let sqlAllCount = "select count (*) as Total from tbl_bank_deposites_receive";
          let result = await mysqlcon(sqlAllCount);
          let total = result[0].Total;
          let page = req.body.pageNumber ? Number(req.body.pageNumber) : 1;
          let limit = req.body.limit ? Number(req.body.limit) : 10;
          let { start, numOfPages } = Pagination.pagination(total, page, limit);
          let sql = 'select tbl_bank_deposites_receive.*, tbl_akonto_banks_code.title from tbl_bank_deposites_receive JOIN tbl_akonto_banks_code ON tbl_bank_deposites_receive.bank_name = tbl_akonto_banks_code.id limit ?,?'
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

module.exports = new BankDeposit