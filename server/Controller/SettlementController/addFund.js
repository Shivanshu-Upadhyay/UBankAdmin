const mysqlcon = require("../../config/db_connection");
const Pagination = require("../../services/pagination");
class AddFund {
  async default(req, res) {
    try {
      const { to, from, date, pageNumber, searchItem } = req.body;
      let sqlAllCount =
        "select count (*) as Total from tbl_add_settlement_fund";
      let sqCountDate =
        "select count (*) as Total from tbl_add_settlement_fund where DATE(created_on) = ?";
      let sqlToFromCount =
        "select count (*) as Total from tbl_add_settlement_fund where DATE(created_on)  >= ? AND DATE(created_on) <= ?";
      let sqlSearchCount = `select count (*) as Total from tbl_add_settlement_fund where merchant_id LIKE '%${searchItem}%'`;

      let result = await mysqlcon(
        date
          ? sqCountDate
          : to && from
          ? sqlToFromCount
          : searchItem
          ? sqlSearchCount
          : sqlAllCount,
        date ? [date] : to && from ? [from, to] : ""
      );
      let page = req.body.pageNumber ? Number(req.body.pageNumber) : 1;
      let limit = req.body.limit ? Number(req.body.limit) : 10;
      let { start, numOfPages } = Pagination.pagination(
        result[0].Total,
        page,
        limit
      );

      let sql =
        "select * from tbl_add_settlement_fund ORDER BY created_on DESC limit ?,?";
      let sqlDate =
        "select * from tbl_add_settlement_fund where DATE(created_on) = ? ORDER BY created_on DESC limit ?,?";
      let sqlToFrom =
        "select * from tbl_add_settlement_fund where DATE(created_on)  >= ? AND DATE(created_on) <= ? ORDER BY created_on DESC limit ?,?";
      let sqlSearch = `select * from tbl_add_settlement_fund where merchant_id LIKE '%${searchItem}%' ORDER BY created_on DESC limit ?,?`;

      const data = await mysqlcon(
        date ? sqlDate : to && from ? sqlToFrom : searchItem ? sqlSearch : sql,
        date
          ? [date, start, limit]
          : to && from
          ? [from, to, start, limit]
          : [start, limit]
      );
      res.status(200).json({
        result: data,
        numOfPages,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  }
  async curMer(req, res) {
    try {
      const sqlMer = "select name as label, id from tbl_user";
      const sqlCurr = "select id,currency_code as label from tbl_currency";
      const merchant = await mysqlcon(sqlMer);
      const currency = await mysqlcon(sqlCurr);
      res.status(200).json({ merchant, currency });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  async murAndCurSelect(req, res) {
    try {
      const { merId, currency } = req.body;
      if (!merId || !currency) {
        return res
          .status(400)
          .json({ message: "Kidly provid Id and Currency" });
      }
      const sql =
        "select SUM(amount) as total from tbl_icici_payout_transaction_response_details where users_id = ? AND currency = ? ";
      const sql2 =
        "select SUM(ammount) as total from tbl_merchant_transaction where user_id = ? AND ammount_type = ? ";
      const result1 = await mysqlcon(sql, [merId, currency]);
      const result2 = await mysqlcon(sql2, [merId, currency]);
      res
        .status(200)
        .json({ preBal: Number(result2[0].total) - Number(result1[0].total) });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async addFund(req, res) {
    try {
      const {
        selectMer,
        merchant_name,
        current_amount,
        currency,
        addBal,
        option,
        available_balance,
        wallet_current_amount,
      } = req.body;
      if (
        selectMer===undefined ||
        merchant_name ===undefined||
        current_amount ===undefined||
        currency ===undefined||
        addBal ===undefined||
        option ===undefined||
        available_balance ===undefined||
        wallet_current_amount===undefined
      ) {
        return res.status(400).json({ message: "All Field Required" });
      }
      let { firstname,lastname } = req.user;
      const insertData = {
        merchant_id: selectMer,
        merchant_name,
        current_amount,
        currency,
        wallet_current_amount,
        add_amount: addBal,
        available_balance,
        funds_added_by: `${firstname} ${lastname}` ,
        // type: option,
      };
      const sqlSettCurr =
        "Select settle_currency,wallet from tbl_user where id=? ";
      const sqlSettRate =
        "Select rate from tbl_user_settled_currency where deposit_currency=? AND settled_currency= ? ";
      const result = await mysqlcon(sqlSettCurr, [15]);
      const result2 = await mysqlcon(sqlSettRate, [
        currency,
        result[0].settle_currency,
      ]);
      const FinalDataForWallet =
        Number(option) === 1
          ? result[0].wallet +
            (Number(addBal) / result2[0]?.rate ? result2[0].rate : 1)
          : result[0].wallet -
            (Number(addBal) / result2[0]?.rate ? result2[0].rate : 1);
      const sqlForWall = "Update tbl_user SET wallet = ? WHERE id = ?";
      await mysqlcon(sqlForWall, [FinalDataForWallet, selectMer]);
      const sqlForAddFund = "INSERT INTO tbl_add_settlement_fund SET ?";
      await mysqlcon(sqlForAddFund, [insertData]);
      res.status(200).json({ message: "Fund Added Successfully✅" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async updateFund(req, res) {
    try {
      const {
        id,
        selectMer,
        merchant_name,
        current_amount,
        currency,
        addBal,
        option,
        available_balance,
        wallet_current_amount,
      } = req.body;
      console.log(req.body);
      if (
        selectMer===undefined ||
        merchant_name ===undefined||
        current_amount ===undefined||
        currency ===undefined||
        addBal ===undefined||
        option ===undefined||
        available_balance ===undefined||
        wallet_current_amount===undefined||
        id===undefined
      ) {
        return res.status(400).json({ message: "All Field Required" });
      }
      let { firstname,lastname } = req.user;
      const insertData = {
        merchant_id: selectMer,
        merchant_name,
        current_amount,
        currency,
        wallet_current_amount,
        add_amount: addBal,
        available_balance,
        funds_added_by: `${firstname} ${lastname}` ,
        type: option,
      };
     
      const sqlSettCurr =
        "Select settle_currency,wallet from tbl_user where id=? ";
      const sqlSettRate =
        "Select rate from tbl_user_settled_currency where deposit_currency=? AND settled_currency= ? ";
      const result = await mysqlcon(sqlSettCurr, [15]);
      const result2 = await mysqlcon(sqlSettRate, [
        currency,
        result[0].settle_currency,
      ]);
      const FinalDataForWallet =
        Number(option) === 1
          ? result[0].wallet +
            (Number(addBal) / result2[0]?.rate ? result2[0].rate : 1)
          : result[0].wallet -
            (Number(addBal) / result2[0]?.rate ? result2[0].rate : 1);
      const sqlForWall = "Update tbl_user SET wallet = ? WHERE id = ?";
      await mysqlcon(sqlForWall, [FinalDataForWallet, selectMer]);
      const sqlForAddFund = "Update tbl_add_settlement_fund SET ? where id = ?";
      await mysqlcon(sqlForAddFund, [insertData,id]);
      res.status(200).json({ message: "Fund Update Successfully✅" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
module.exports = new AddFund();
