const mysqlcon = require("../../config/db_connection");

// Default Api 👇

module.exports.defaultMeta = async (req, res) => {
  // 👇Pagination 👇
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let searchItem = req.body.searchItem;
    let sql = "select count (*) as Total from tbl_meta";
    let sqlCount =
      "select count (*) as Total FROM tbl_meta WHERE page_title  LIKE '%" +
      searchItem +
      "%'";

    let result = await mysqlcon(searchItem ? sqlCount : sql);
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);

    let sql1 = "SELECT meta_id, page_title, meta_keyword, meta_description, updated_on FROM tbl_meta LIMIT ?,?";
    let sql2 =
      "SELECT meta_id, page_title, meta_keyword, meta_description, updated_on FROM tbl_meta WHERE page_title  LIKE '%" +
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

// Read One Api 👇
module.exports.readOneMeta = async function (req, res) {
    try {
      let { meta_id } = req.body;
      let sql = "SELECT * FROM tbl_meta WHERE meta_id = ?";
      let result = await mysqlcon(sql, [meta_id]);
      res.json(result[0]);
    } catch (error) {
      return res.json(500, {
        message: "error occurered",
        error: error,
      });
    }
  };

// 👇 Update Api 👇
module.exports.updateMeta = async function (req, res) {
    try {
      let { meta_id, page_title,  meta_keyword, meta_description } = req.body;
   
      let details = {
          page_title, meta_keyword, meta_description
        };
      if (meta_id) {
        let sql = "UPDATE tbl_meta SET ? where meta_id = ?";
        let result = await mysqlcon(sql, [details, meta_id]);
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

// 🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
