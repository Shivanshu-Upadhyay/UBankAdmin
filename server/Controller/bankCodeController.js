const mysqlcon = require("../config/db_connection");

// 👇Read Api 👇
module.exports.readBankCode = async (req, res) => {
  // 👇Pagination 👇
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let searchItem = req.body.searchItem;
    let sql =
      "select count (*) as Total from tbl_code inner join payment_gateway on tbl_code.payment_gate = payment_gateway.id";
    let sqlCount =
      "select count (*) as Total FROM tbl_code inner join payment_gateway on tbl_code.payment_gate = payment_gateway.id WHERE akontocode  LIKE '%" +
      searchItem +
      "%' OR  gateway_name  LIKE '%" +
      searchItem +
      "%' OR  title  LIKE '%" +
      searchItem +
      "%' OR  code  LIKE '%" +
      searchItem +
      "%' OR  bank_services_charge  LIKE '%" +
      searchItem +
      "%'";

    let result = await mysqlcon(searchItem ? sqlCount : sql);
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);
    

    let sql1 =
      "SELECT *, tbl_code.id as identification,tbl_code.status as status2,tbl_code.type as type2 FROM tbl_code inner join payment_gateway on tbl_code.payment_gate = payment_gateway.id   LIMIT ?,?";
    let sql2 =
      "SELECT *, tbl_code.id as identification,tbl_code.status as status2,tbl_code.type as type2  FROM tbl_code inner join payment_gateway on tbl_code.payment_gate = payment_gateway.id WHERE title  LIKE '%" +
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

// 👇 type 1 Api 👇
module.exports.readType1BankCode = async function (req, res) {
  try {
    let sql = "SELECT id ,gateway_name FROM payment_gateway ";
    let result = await mysqlcon(sql);
    return res.json(200, {
      message: "Data Fetched Successfully✅",
      data: result,
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};
// 👇 type 2 Api 👇
module.exports.readType2BankCode = async function (req, res) {
  try {
    let sql = "SELECT code,title FROM tbl_akonto_banks_code ";
    let result = await mysqlcon(sql);
    return res.json(200, {
      message: "Data Fetched Successfully✅",
      data: result,
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.updateBankCode = async function (req, res) {
  try {
    let { type, akontocode, payment_gate, bank_services_charge, title, code, id } = req.body;

    let details = {
      type,
      akontocode,
      payment_gate,
      bank_services_charge,
      title,
      code,
    };
   
  

    if (id) {
      let sql = "UPDATE tbl_code SET ? where id = ?";
      let result = await mysqlcon(sql, [details, id]);
      if (result) {
        return res.json(200, {
          message: "Row Updated ✅",
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
// Read Update Api 👇
module.exports.readUpdateBankCode = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM tbl_code WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    return res.json(200, {
      message: "Data Fetched Successfully✅",
      data: result[0],
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};
// 👇Delete Api 👇
module.exports.deleteBankCode = async function (req, res) {
  try {
    let { id } = req.body;
  

    let sql = "DELETE FROM tbl_code WHERE id = ?";
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
module.exports.createBankCode = async function (req, res) {
  try {
    let { type, akontocode, payment_gate, bank_services_charge, title, code } = req.body;

    let details = {
      type,
      akontocode,
      payment_gate,
      bank_services_charge,
      title,
      code,
    };

    

    let sql = "INSERT INTO tbl_code SET ?";

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
// 👇 TOGGLE Api👇
module.exports.toggleBankCode = async function (req, res) {
  try {
    let { id, status } = req.body;
    
    let sql = "UPDATE tbl_code SET status = ? WHERE id = ?";

    let result = await mysqlcon(sql, [status, id]);

    if (result) {
      return res.json(200, {
        message: "Data Updated Successfully✅",
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
// 🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
