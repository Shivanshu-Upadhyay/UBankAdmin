const mysqlcon = require("../config/db_connection");
let pagination = (total, page, limit) => {
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;
  return { limit, start, numOfPages };
};
class ActivityLogs {
  async adminLogs(req, res) {
    try {
      const { searchItem, limit, merchantName, page } = req.body;
      let sql = "select count (*) as Total from tbl_admin_log";
      let sqlCount =
        "select count (*) as Total FROM tbl_admin_log WHERE id  LIKE '%" +
        searchItem +
        "%' OR  admin_id  LIKE '%" +
        searchItem +
        "%' OR  url  LIKE '%" +
        searchItem +
        "%' OR  updated_on  LIKE '%" +
        searchItem +
        "%' OR  created_on  LIKE '%" +
        searchItem +
        "%'";
      let sqlACount = `SELECT count (*) as Total FROM tbl_admin_log where admin_id=${merchantName}`;
      let result = await mysqlcon(
        searchItem ? sqlCount : merchantName ? sqlACount : sql
      );
      let total = result[0].Total;
      let currentpage = page ? Number(page) : 1;
      let pagelimit = limit ? Number(limit) : 10;
      let { start, numOfPages } = pagination(total, currentpage, pagelimit);

      let sql1 = `SELECT CONCAT(firstname,lastname) as name ,tbl_admin_log.url ,tbl_admin_log.updated_on,tbl_admin_log.created_on,  TIMEDIFF(tbl_admin_log.updated_on,tbl_admin_log.created_on)as timeDeff FROM tbl_admin_log INNER JOIN tbl_login ON tbl_admin_log.admin_id = tbl_login.user_id  LIMIT ?,?`;
      let sql2 =
        "SELECT CONCAT(firstname,lastname) as name ,tbl_admin_log.url ,tbl_admin_log.updated_on,tbl_admin_log.created_on,  TIMEDIFF(tbl_admin_log.updated_on,tbl_admin_log.created_on)as timeDeff FROM tbl_admin_log INNER JOIN tbl_login ON tbl_admin_log.admin_id = tbl_login.user_id where admin_id= ? LIMIT ?,?";
      let sql3 =
        "SELECT CONCAT(firstname,lastname) as name ,tbl_admin_log.url ,tbl_admin_log.updated_on,tbl_admin_log.created_on,  TIMEDIFF(tbl_admin_log.updated_on,tbl_admin_log.created_on)as timeDeff FROM tbl_admin_log INNER JOIN tbl_login ON tbl_admin_log.admin_id = tbl_login.user_id WHERE id  LIKE '%" +
        searchItem +
        "%' OR  admin_id  LIKE '%" +
        searchItem +
        "%' OR  url  LIKE '%" +
        searchItem +
        "%' OR  updated_on  LIKE '%" +
        searchItem +
        "%' OR  created_on  LIKE '%" +
        searchItem +
        "%'  LIMIT ?,?";

      let result1 = await mysqlcon(
        searchItem ? sql3 : merchantName ? sql2 : sql1,
        merchantName ? [merchantName, start, pagelimit] : [start, pagelimit]
      );

      res.json(201, {
        message: `Showing ${limit} data from ${total}  `,
        currentPage: currentpage,
        totalPages: result1.length > 1 ? numOfPages : 0,
        pageLimit: pagelimit,
        data: result1,
      });
    } catch (error) {
      res.status(500).json({
        message: "Somthing went wrong",
        error: error,
      });
    }
  }
  async merchantLogs(req, res) {
    try {
      const { searchItem, limit, merchantName, page } = req.body;
      let sql = "select count (*) as Total from tbl_merchants_log INNER JOIN tbl_user ON tbl_merchants_log.merchant_id = tbl_user.id";
      let sqlCount =
        "select count (*) as Total FROM tbl_merchants_log INNER JOIN tbl_user ON tbl_merchants_log.merchant_id = tbl_user.id WHERE id  LIKE '%" +
        searchItem +
        "%' OR  merchant_id  LIKE '%" +
        searchItem +
        "%' OR  url  LIKE '%" +
        searchItem +
        "%' OR  updated_on  LIKE '%" +
        searchItem +
        "%' OR  created_on  LIKE '%" +
        searchItem +
        "%'";
      let sqlACount = `SELECT count (*) as Total FROM tbl_merchants_log where merchant_id=${merchantName}`;
      let result = await mysqlcon(
        searchItem ? sqlCount : merchantName ? sqlACount : sql
      );
      let total = result[0].Total;
      let currentpage = page ? Number(page) : 1;
      let pagelimit = limit ? Number(limit) : 10;
      let { start, numOfPages } = pagination(total, currentpage, pagelimit);

      let sql1 = `SELECT name,tbl_merchants_log.url ,tbl_merchants_log.updated_on,tbl_merchants_log.created_on,  TIMEDIFF(tbl_merchants_log.updated_on,tbl_merchants_log.created_on)as timeDeff FROM tbl_merchants_log INNER JOIN tbl_user ON tbl_merchants_log.merchant_id = tbl_user.id  LIMIT ?,?`;
      let sql2 =
        "SELECT name,tbl_merchants_log.url ,tbl_merchants_log.updated_on,tbl_merchants_log.created_on,  TIMEDIFF(tbl_merchants_log.updated_on,tbl_merchants_log.created_on)as timeDeff FROM tbl_merchants_log INNER JOIN tbl_user ON tbl_merchants_log.merchant_id = tbl_user.id where merchant_id= ? LIMIT ?,?";
      let sql3 =
        "SELECT name,tbl_merchants_log.url ,tbl_merchants_log.updated_on,tbl_merchants_log.created_on,  TIMEDIFF(tbl_merchants_log.updated_on,tbl_merchants_log.created_on)as timeDeff FROM tbl_merchants_log INNER JOIN tbl_user ON tbl_merchants_log.merchant_id = tbl_user.id WHERE id  LIKE '%" +
        searchItem +
        "%' OR  merchant_id  LIKE '%" +
        searchItem +
        "%' OR  url  LIKE '%" +
        searchItem +
        "%' OR  updated_on  LIKE '%" +
        searchItem +
        "%' OR  created_on  LIKE '%" +
        searchItem +
        "%'  LIMIT ?,?";

      let result1 = await mysqlcon(
        searchItem ? sql3 : merchantName ? sql2 : sql1,
        merchantName ? [merchantName, start, pagelimit] : [start, pagelimit]
      );

      res.json(201, {
        message: `Showing ${limit} data from ${total}  `,
        currentPage: currentpage,
        totalPages: result1.length > 1 ? numOfPages : 0,
        pageLimit: pagelimit,
        data: result1,
      });
    } catch (error) {
      res.status(500).json({
        message: "Somthing went wrong",
        error: error,
      });
    }
  }
  async walletLogs(req, res) {
    try {
      const { searchItem, limit, merchantName, page,to,from } = req.body;
      console.log(from,to);
      
      let sql = "select count (*) as Total  from tbl_wallet_update_log INNER JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id INNER JOIN tbl_login on tbl_wallet_update_log.login_admin = tbl_login.user_id";
      let sqlCount =
        "select count (*) as Total FROM tbl_wallet_update_log INNER JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id INNER JOIN tbl_login on tbl_wallet_update_log.login_admin = tbl_login.user_id WHERE tbl_user.name  LIKE '%" +
        searchItem +
        "%' OR  tbl_wallet_update_log.current_wallet  LIKE '%" +
        searchItem +
        "%' OR  tbl_wallet_update_log.update_wallet_tot  LIKE '%" +
        searchItem +
        "%' OR  effective_amt  LIKE '%" +
        searchItem +
        "%' OR  order_id  LIKE '%" +
        searchItem +
        "%'  OR  tbl_wallet_update_log.created_on  LIKE '%" +
        searchItem +
        "%'";
      let sqlACount = `SELECT count (*) as Total FROM tbl_wallet_update_log where merchant_id=${merchantName}`;
      let sqlACount2 = `SELECT count (*) as Total FROM tbl_wallet_update_log wallet INNER JOIN tbl_user ON wallet.merchant_id = tbl_user.id INNER JOIN tbl_login on wallet.login_admin = tbl_login.user_id where(wallet.created_on >= '${to}' AND wallet.created_on <= '${from}')`;
      let result = await mysqlcon(
        searchItem ? sqlCount : merchantName ? sqlACount  : (to&&from)?sqlACount2: sql
      );
      let total = result[0].Total;
      let currentpage = page ? Number(page) : 1;
      let pagelimit = limit ? Number(limit) : 10;
      let { start, numOfPages } = pagination(total, currentpage, pagelimit);
      let sql1 = `SELECT name,tbl_wallet_update_log.current_wallet,tbl_wallet_update_log.update_wallet_tot,if(tbl_wallet_update_log.current_action=1,'ADD','SUB') as Action,effective_amt,order_id,CONCAT(tbl_login.firstname,tbl_login.lastname) as byAdmin,tbl_wallet_update_log.created_on from tbl_wallet_update_log INNER JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id INNER JOIN tbl_login on tbl_wallet_update_log.login_admin = tbl_login.user_id LIMIT ?,?`;
      let sql2 =
        "SELECT name,tbl_wallet_update_log.current_wallet,tbl_wallet_update_log.update_wallet_tot,if(tbl_wallet_update_log.current_action=1,'ADD','SUB') as Action,effective_amt,order_id,CONCAT(tbl_login.firstname,tbl_login.lastname) as byAdmin,tbl_wallet_update_log.created_on from tbl_wallet_update_log INNER JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id INNER JOIN tbl_login on tbl_wallet_update_log.login_admin = tbl_login.user_id where merchant_id= ? LIMIT ?,?";
      let sql3 =
        "SELECT name,tbl_wallet_update_log.current_wallet,tbl_wallet_update_log.update_wallet_tot,if(tbl_wallet_update_log.current_action=1,'ADD','SUB') as Action,effective_amt,order_id,CONCAT(tbl_login.firstname,tbl_login.lastname) as byAdmin,tbl_wallet_update_log.created_on from tbl_wallet_update_log INNER JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id INNER JOIN tbl_login on tbl_wallet_update_log.login_admin = tbl_login.user_id WHERE tbl_user.name  LIKE '%" +
        searchItem +
        "%' OR  tbl_wallet_update_log.current_wallet  LIKE '%" +
        searchItem +
        "%' OR  tbl_wallet_update_log.update_wallet_tot  LIKE '%" +
        searchItem +
        "%' OR  effective_amt  LIKE '%" +
        searchItem +
        "%' OR  order_id  LIKE '%" +
        searchItem +
        "%'  OR  tbl_wallet_update_log.created_on  LIKE '%" +
        searchItem +
        "%'   LIMIT ?,?";

        let sql4 = `SELECT name,wallet.current_wallet,wallet.update_wallet_tot,if(wallet.current_action=1,'ADD','SUB') as Action,effective_amt,order_id,CONCAT(tbl_login.firstname,tbl_login.lastname) as byAdmin,wallet.created_on from tbl_wallet_update_log wallet INNER JOIN tbl_user ON wallet.merchant_id = tbl_user.id INNER JOIN tbl_login on wallet.login_admin = tbl_login.user_id where(wallet.created_on >= '${to}' AND wallet.created_on <= '${from}')LIMIT ?,?`;

      let result1 = await mysqlcon(
        searchItem ? sql3 : merchantName ? sql2 : (to&&from)?sql4: sql1,
        merchantName ? [merchantName, start, pagelimit] : [start, pagelimit]
      );

      res.status(200).json({
        message: `Showing ${pagelimit} data from ${total}  `,
        currentPage: currentpage,
        totalPages: result1.length > 1 ? numOfPages : 0,
        pageLimit: pagelimit,
        data: result1,
      });
    } catch (error) {
      res.status(500).json({
        message: "Somthing went wrong",
        error: error,
      });
    }
  }
 
}

module.exports = new ActivityLogs();
