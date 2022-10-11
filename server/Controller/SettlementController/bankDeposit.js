const mysqlcon = require("../../config/db_connection");

class BankDeposit{
    pagination(total, page, limit=10)  {
        let numOfPages = Math.ceil(total / limit);
        let start = page * limit - limit;
        return { limit, start, numOfPages };
      };
    async default(req,res){
        try {
          const { toDate,fromDate,today,yesterday,page,searchItem} = req.body
          let sqlAllCount = "select count (*) as Total from tbl_bank_deposites_receive";
          let result = await mysqlcon(sqlAllCount);
          
        //   let total = result[0].Total;
        //   let currentpage = page ? Number(page) : 1;
        //   let pagelimit = limit ? Number(limit) : 10;
        //   let { start, numOfPages } = pagination(total, currentpage, pagelimit);
          res.status(200).json({
            result:result[0].Total
          })
        } catch (error) {
            res.status(500).json({error:"Something went wrong"})
        }
      
    }
}

module.exports = new BankDeposit