const mysqlcon = require("../config/db_connection");

// 👇Read Api 👇

module.exports.readMid = async (req, res) => {
  // 👇Pagination 👇
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  
  try {
    let searchItem = req.body.searchItem;
    let sql = "select count (*) as Total from tbl_ingenico_mid";
    let sqlCount =
      "select count (*) as Total FROM tbl_ingenico_mid WHERE sec_key  LIKE '%" +
      searchItem +
      "%' OR  mid  LIKE '%" +
      searchItem +
      "%' or  iv  LIKE '%" +
      searchItem +
      "%' or  merchant_url  LIKE '%" +
      searchItem +
      "%' or  merchant_otherurl  LIKE '%" +
      searchItem +
      "%' or  title  LIKE '%" +
      searchItem +
      "%'";
    
   
    let result = await mysqlcon(searchItem ? sqlCount:sql);
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);
   

    let sql1 = "SELECT * FROM tbl_ingenico_mid LIMIT ?,?";
    let sql2 =
      "SELECT * FROM tbl_ingenico_mid WHERE sec_key  LIKE '%" +
      searchItem +
      "%' OR  mid  LIKE '%" +
      searchItem +
      "%' or  iv  LIKE '%" +
      searchItem +
      "%' or  merchant_url  LIKE '%" +
      searchItem +
      "%' or  merchant_otherurl  LIKE '%" +
      searchItem +
      "%' or  title  LIKE '%" +
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

// 👇 Update Api 👇

module.exports.updateMid = async function (req, res) {
  try {
    let { title, mid, sec_key, iv, merchant_url, merchant_otherurl, id } =
      req.body;

    let details = {
      title,
      mid,
      sec_key,
      iv,
      merchant_url,
      merchant_otherurl,
    };

    if (id) {
      let sql = "UPDATE tbl_ingenico_mid SET ? where id = ?";
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
module.exports.readUpdateMid = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM tbl_ingenico_mid WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    res.json(result[0]);
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// 👇Delete Api 👇

module.exports.deleteMid = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "DELETE FROM tbl_ingenico_mid WHERE id = ?";
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

module.exports.createMid = async function (req, res) {
  try {
    let { title, mid, sec_key, iv, merchant_url, merchant_otherurl } = req.body;

    let details = {
      title,
      mid,
      sec_key,
      iv,
      merchant_url,
      merchant_otherurl,
    };

    let sql = "INSERT INTO tbl_ingenico_mid SET ?";

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
