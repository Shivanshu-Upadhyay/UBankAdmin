const mysqlcon = require("../../config/db_connection");

// Default Api ๐

module.exports.defaultAllUpi = async (req, res) => {
  // ๐Pagination ๐
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let searchItem = req.body.searchItem;
    let sql = "select count (*) as Total from tbl_upi_block";
    let sqlCount =
      "select count (*) as Total FROM tbl_upi_block WHERE rate  LIKE '%" +
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

    let sql1 = "SELECT * FROM tbl_upi_block LIMIT ?,?";
    let sql2 =
      "SELECT * FROM tbl_upi_block WHERE rate  LIKE '%" +
      searchItem +
      "%' OR  deposit_currency  LIKE '%" +
      searchItem +
      "%' or  settled_currency  LIKE '%" +
      searchItem +
      "%' LIMIT ?,?";
      let sql3 ="INSERT INTO tbl_upi_block SET ?"

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

// ๐ Create Api๐
module.exports.createAllUpi = async function (req, res) {
  try {
    let { deposit_currency, settled_currency, rate } = req.body;

    let details = {
      deposit_currency,
      settled_currency,
      rate,
    };

    let sql = "INSERT INTO tbl_upi_block SET ?";

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
