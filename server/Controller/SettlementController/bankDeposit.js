const mysqlcon = require("../../config/db_connection");
const Pagination = require('../../services/pagination')
class BankDeposit{
    async default(req,res){
        try {
          const { to,from,date,pageNumber,searchItem} = req.body
          let sqlAllCount = "select count (*) as Total from tbl_bank_deposites_receive";
          let sqCountDate = "select count (*) as Total from tbl_bank_deposites_receive where DATE(created_on) = ?";
          let sqlToFromCount = "select count (*) as Total from tbl_bank_deposites_receive where DATE(created_on)  >= ? AND DATE(created_on) <= ?"
          let sqlSearchCount = `select count (*) as Total from tbl_bank_deposites_receive where trx_id LIKE '%${searchItem}%'`

          let result = await mysqlcon(date?sqCountDate:(to&&from)?sqlToFromCount:searchItem?sqlSearchCount:sqlAllCount,date?[date]:(to&&from)?[from,to]: '')
          let page = req.body.pageNumber ? Number(req.body.pageNumber) : 1;
          let limit = req.body.limit ? Number(req.body.limit) : 10;
          let { start, numOfPages } = Pagination.pagination(result[0].Total, page, limit);

          let sql='select tbl_bank_deposites_receive.*, tbl_akonto_banks_code.title from tbl_bank_deposites_receive JOIN tbl_akonto_banks_code ON tbl_bank_deposites_receive.bank_name = tbl_akonto_banks_code.id limit ?,?'
          let sqlDate = 'select tbl_bank_deposites_receive.*, tbl_akonto_banks_code.title from tbl_bank_deposites_receive JOIN tbl_akonto_banks_code ON tbl_bank_deposites_receive.bank_name = tbl_akonto_banks_code.id where DATE(tbl_bank_deposites_receive.created_on) = ? ORDER BY tbl_bank_deposites_receive.created_on DESC limit ?,?'
          let sqlToFrom = 'select tbl_bank_deposites_receive.*, tbl_akonto_banks_code.title from tbl_bank_deposites_receive JOIN tbl_akonto_banks_code ON tbl_bank_deposites_receive.bank_name = tbl_akonto_banks_code.id where DATE(tbl_bank_deposites_receive.created_on)  >= ? AND DATE(tbl_bank_deposites_receive.created_on) <= ? ORDER BY tbl_bank_deposites_receive.created_on DESC limit ?,?'
          let sqlSearch = `select tbl_bank_deposites_receive.*, tbl_akonto_banks_code.title from tbl_bank_deposites_receive JOIN tbl_akonto_banks_code ON tbl_bank_deposites_receive.bank_name = tbl_akonto_banks_code.id where trx_id LIKE '%${searchItem}%' ORDER BY tbl_bank_deposites_receive.created_on DESC limit ?,?`

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
    async createAndUpdate(req,res){  
       if(!req.body.length){
        const {email} = req.user
        let sqlForMerchant = "select id,name from tbl_user";
        let sqlForBank = "SELECT id,gateway_name FROM payment_gateway where type = 0 And status=1"
        let merchant= mysqlcon(sqlForMerchant)
        let bankName= mysqlcon(sqlForBank)
        const data = await Promise.all([merchant,bankName])
        return res.status(200).json({merchant:data[0],bankName:data[1],authorizer:email})
       } 
    }
}

module.exports = new BankDeposit