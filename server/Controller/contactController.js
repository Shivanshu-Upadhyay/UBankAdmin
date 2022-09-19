const mysqlcon = require("../config/db_connection");

// 👇All read Api 👇
module.exports.Contact = async (req, res) => {
  // 👇Pagination 👇
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let searchItem = req.body.searchItem;
    let sql = "select count (*) as Total from tbl_contact_us";
    let sqlCount =
      "select count (*) as Total FROM tbl_contact_us WHERE name  LIKE '%" +
      searchItem +
      "%' OR  mobile  LIKE '%" +
      searchItem +
      "%' OR  email  LIKE '%" +
      searchItem +
      "%' OR  message  LIKE '%" +
      searchItem +
      "%' OR  created_on  LIKE '%" +
      searchItem +
      "%'";

    let result = await mysqlcon(searchItem ? sqlCount : sql);
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);
    

    let sql1 = "SELECT * FROM tbl_contact_us LIMIT ?,?";
    let sql2 =
      "SELECT * FROM tbl_contact_us WHERE name  LIKE '%" +
      searchItem +
      "%' OR  mobile  LIKE '%" +
      searchItem +
      "%' OR  email  LIKE '%" +
      searchItem +
      "%' OR  message  LIKE '%" +
      searchItem +
      "%' OR  created_on  LIKE '%" +
      searchItem +
      "%'  LIMIT ?,?";

    let result1 = await mysqlcon(searchItem ? sql2 : sql1, [start, limit]);

    if (result1.length === 0) {
      return res.json(201, {
        message: `Showing ${limit} data from ${total}  `,
        currentPage: page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
      });
    } else {
      return res.json(200, {
        message: `Showing ${limit}  data from ${total} `,
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

// Read Update Api 👇
module.exports.readContact = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM tbl_contact_us WHERE id = ?";
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
module.exports.deleteContact = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "DELETE FROM tbl_contact_us WHERE id = ?";
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



// 🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
