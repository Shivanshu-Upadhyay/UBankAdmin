const mysqlcon = require("../config/db_connection");

// ๐Read Api ๐
module.exports.readBankCodeAkonto = async (req, res) => {
  // ๐Pagination ๐
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let searchItem = req.body.searchItem;
    let sql = "select count (*) as Total from tbl_akonto_banks_code";
    let sqlCount =
      "select count (*) as Total FROM tbl_akonto_banks_code WHERE title  LIKE '%" +
      searchItem +
      "%' OR  code  LIKE '%" +
      searchItem +
      "%'";

    let result = await mysqlcon(searchItem ? sqlCount : sql);
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);
    

    let sql1 = "SELECT * FROM tbl_akonto_banks_code LIMIT ?,?";
    let sql2 =
      "SELECT * FROM tbl_akonto_banks_code WHERE title  LIKE '%" +
      searchItem +
      "%' OR  code  LIKE '%" +
      searchItem +
      "%'  LIMIT ?,?";

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
module.exports.updateBankCodeAkonto = async function (req, res) {
  try {
    let { type, title, code, id } = req.body;
    
    let details = {
      type,
      title,
      code,
    };

    if (id) {
      let sql = "UPDATE tbl_akonto_banks_code SET ? where id = ?";
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
// Read Update Api ๐
module.exports.readUpdateBankCodeAkonto = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM tbl_akonto_banks_code WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    return res.json(200, {
      message: "Data Fetched Successfullyโ",
      data: result[0],
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};
// ๐Delete Api ๐
module.exports.deleteBankCodeAkonto = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "DELETE FROM tbl_akonto_banks_code WHERE id = ?";
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
module.exports.createBankCodeAkonto = async function (req, res) {
  try {
    let { type, title, code } = req.body;

    let details = {
      type,
      title,
      code,
    };

    let sql = "INSERT INTO tbl_akonto_banks_code SET ?";

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
// ๐ TOGGLE Api๐
module.exports.toggleBankCodeAkonto = async function (req, res) {
  try {
    let { id, status } = req.body;
    let sql = "UPDATE tbl_akonto_banks_code SET status = ? WHERE id = ?";

    let result = await mysqlcon(sql, [status, id]);

    if (result) {
      return res.json(200, {
        message: "Data Updated Successfullyโ",
      });
    } else {
      return res.json(201, {
        message: "Error While Updating",
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
