const mysqlcon = require("../../config/db_connection");

// Default Api 👇

module.exports.defaultNewCurrency = async (req, res) => {
  // 👇Pagination 👇
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let searchItem = req.body.searchItem;
    let sql = "select count (*) as Total from tbl_currency";
    let sqlCount =
      "select count (*) as Total FROM tbl_currency WHERE rate  LIKE '%" +
      searchItem +
      "%' OR  deposit_currency  LIKE '%" +
      searchItem +
      "%' or  settled_currency  LIKE '%" +
      searchItem +
      "%'";

    let result = await mysqlcon(searchItem ? sqlCount : sql);
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);

    let sql1 = "SELECT * FROM tbl_currency LIMIT ?,?";
    let sql2 =
      "SELECT * FROM tbl_currency WHERE rate  LIKE '%" +
      searchItem +
      "%' OR  deposit_currency  LIKE '%" +
      searchItem +
      "%' or  settled_currency  LIKE '%" +
      searchItem +
      "%' LIMIT ?,?";

    let result1 = await mysqlcon(searchItem ? sql2 : sql1, [start, limit]);
    

    if (result1.length === 0) {
      return res.json(201, {
        message: `Showing ${total} from ${limit} data `,
        currentPage: page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
      });
    } else {
      return res.json(200, {
        message: `Showing ${total} from ${limit} data `,
        currentPage: page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// Toggle Button
module.exports.toggleCurrency = async function (req, res) {
    try {
      let { status, id } = req.body;
  
      let sql = "UPDATE tbl_currency SET status = ? WHERE id = ?";
      let result = await mysqlcon(sql, [status, id]);
      if (result.affectedRows > 0) {
        return res.json(200, {
          message: `Status ${
            status === "1" ? "Enabled" : "Disabled"
          } Successfully `,
          data: result,
          sql,
        });
      } else {
        return res.json(201, {
          message: "Error while Changing Status",
          data: result,
        });
      }
    } catch (error) {
      return res.json(500, {
        message: "error occurered",
        error: error,
      });
    }
};

// 👇Delete Api 👇
module.exports.deleteNewCurrency = async function (req, res) {
    try {
      let { id } = req.body;
  
      let sql = "DELETE FROM tbl_currency WHERE id = ?";
      let result = await mysqlcon(sql, [id]);
  
      if (result) {
        return res.json(200, {
          message: "Delete Successfully✅",
        });
      } else {
        return res.json(201, {
          message: "Error while Deleting",
        });
      }
    } catch (error) {
      return res.json(500, {
        message: "error occurered",
        error: error,
      });
    }
};

// 👇 Create Api👇
module.exports.addCurrency = async function (req, res) {
  try {
    let { country, currency, currency_code } = req.body;

    let details = {
      country,
      currency,
      currency_code,
    };

    let sql = "INSERT INTO tbl_currency SET ? , created_on = NOW() , updated_on = NOW()";

    let result = await mysqlcon(sql, [details]);

    if (result) {
      return res.json(200, {
        message: "Data Inserted Successfully✅",
      });
    } else {
      return res.json(201, {
        message: "Error While Creating",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// 🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
