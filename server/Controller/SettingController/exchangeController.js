const mysqlcon = require("../../config/db_connection");

// Default Api ๐

module.exports.defaultExchange = async (req, res) => {
  // ๐Pagination ๐
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let searchItem = req.body.searchItem;
    let sql = "select count (*) as Total from tbl_settlement_exchange_rate";
    let sqlCount =
      "select count (*) as Total FROM tbl_settlement_exchange_rate WHERE rate  LIKE '%" +
      searchItem +
      "%' OR  exchange_title  LIKE '%" +
      searchItem +
      "%' or  created_on  LIKE '%" +
      searchItem +
      "%'";

    let result = await mysqlcon(searchItem ? sqlCount : sql);
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);

    let sql1 = "SELECT * FROM tbl_settlement_exchange_rate LIMIT ?,?";
    let sql2 =
      "SELECT * FROM tbl_settlement_exchange_rate WHERE rate  LIKE '%" +
      searchItem +
      "%' OR  exchange_title  LIKE '%" +
      searchItem +
      "%' or  created_on  LIKE '%" +
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
// ๐ Update Api ๐
module.exports.updateExchange = async function (req, res) {
  try {
    let { exchange_title,  rate, id } = req.body;
 
    let details = {
        exchange_title, rate
    };

    if (id) {
      let sql = "UPDATE tbl_settlement_exchange_rate SET ? where id = ?";
      let result = await mysqlcon(sql, [details, id]);
      if (result) {
        return res.json(200, {
          message: "Row Updated โ",
        });
      } else {
        return res.json(201, {
          message: "Error while updating",
        });
      }
    } else {
      return res.json(205, {
        message: "Kindly Provide Id",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// Read One Api ๐
module.exports.readOneExchange = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM tbl_settlement_exchange_rate WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    res.json(result[0]);
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// ๐Delete Api ๐
module.exports.deleteExchange = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "DELETE FROM tbl_settlement_exchange_rate WHERE id = ?";
    let result = await mysqlcon(sql, [id]);

    if (result) {
      return res.json(200, {
        message: "Delete Successfullyโ",
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

// ๐ Create Api๐
module.exports.createExchange = async function (req, res) {
  try {
    let { exchange_title, rate } = req.body;

    let details = {
     exchange_title,
      rate,
    };

    let sql = "INSERT INTO tbl_settlement_exchange_rate SET ?";

    let result = await mysqlcon(sql, [details]);

    if (result) {
      return res.json(200, {
        message: "Data Inserted Successfullyโ",
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

// ๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐
