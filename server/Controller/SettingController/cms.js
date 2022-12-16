const mysqlcon = require("../../config/db_connection");

// Default Api 👇

module.exports.defaultCMS = async (req, res) => {
  // 👇Pagination 👇
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let searchItem = req.body.searchItem;
    let sql = "select count (*) as Total from tbl_pages";
    let sqlCount =
      "select count (*) as Total FROM tbl_pages WHERE page_title  LIKE '%" +
      searchItem +
      "%'";

    let result = await mysqlcon(searchItem ? sqlCount : sql);
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);

    let sql1 = "SELECT id, page_title, created_on, updated_on FROM tbl_pages LIMIT ?,?";
    let sql2 =
      "SELECT id, page_title, created_on, updated_on FROM tbl_pages WHERE page_title  LIKE '%" +
      searchItem +
      "%' LIMIT ?,?";

    let result1 = await mysqlcon(searchItem ? sql2 : sql1, [start, limit]);
    

    if (result1.length === 0) {
      return res.json(201, {
        message: `Showing ${total} from ${total} data `,
        currentPage: page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
      });
    } else {
      return res.json(200, {
        message: `Showing ${total} from ${total} data `,
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

// 👇 View Api👇
module.exports.viewCMS = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "SELECT page_title, content, created_on, updated_on FROM tbl_pages WHERE id = ?";

    let result = await mysqlcon(sql, [id]);
    console.log(id)

    return res.json(200, {
        message: "Data✅",
        data: result
    });
    } catch (error) {
        return res.json(500, {
        message: "error occurered",
        error: error,
        });
    }
};

// 👇 Update Api 👇
module.exports.updateCMS = async function (req, res) {
  try {
    let { page_title,  content, id } = req.body;
 
    let details = {
        page_title, content
    };

    if (id) {
      let sql = "UPDATE tbl_pages SET ? where id = ? created_on = NOW() , updated_on = NOW()";
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

// Read One Api 👇
module.exports.readOneCMS = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM tbl_pages WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    res.json(result[0]);
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// 🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
