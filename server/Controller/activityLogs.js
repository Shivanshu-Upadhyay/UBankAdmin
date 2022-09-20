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
      let sql = "select count (*) as Total from tbl_merchants_log";
      let sqlCount =
        "select count (*) as Total FROM tbl_merchants_log WHERE id  LIKE '%" +
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
  
}

module.exports = new ActivityLogs();
