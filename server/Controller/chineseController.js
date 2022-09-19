const mysqlcon = require("../config/db_connection");

let pagination = (total, page, limit) => {
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;

  return { limit, start, numOfPages };
};

module.exports.defaultChinese = async function (req, res) {
  try {
    let { searchText } = req.body;

    if (
      searchText === "YTpay" ||
      searchText === "ytpay" ||
      searchText === "YTPAY" ||
      searchText === "Ytpay"
    ) {
      searchText = 19;
      searchTextType = 0;
    }

    if (
      searchText === "Gate8" ||
      searchText === "gate8" ||
      searchText === "GATE8"
    ) {
      searchText = 16;
      searchTextType = 0;
    }

    if (
      searchText === "Enable" ||
      searchText === "enable" ||
      searchText === "ENABLE"
    ) {
      searchText = 1;
      searchTextType = 1;
    }

    if (
      searchText === "Disable" ||
      searchText === "Disable" ||
      searchText === "DISABLE"
    ) {
      searchText = 0;
      searchTextType = 1;
    }

    let sql = "SELECT COUNT(*) as Total FROM tbl_chinese_banks_list";

    if (
      (searchText === 19 && searchTextType === 0) ||
      (searchText === 16 && searchTextType === 0)
    ) {
      sql += " WHERE payment_gate LIKE '%" + searchText + "%'";
    } else if (
      (searchText === 0 && searchTextType === 1) ||
      (searchText === 1 && searchTextType === 1)
    ) {
      sql += " WHERE status LIKE '%" + searchText + "%'";
    } else if (searchText) {
      sql +=
        " WHERE ((title LIKE '%" +
        searchText +
        "%') OR (title_en LIKE '%" +
        searchText +
        "%'))";
    }

    let result = await mysqlcon(sql);

    let total = result[0].Total;
    let Page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;

    let page = pagination(total, Page, limit);

    let sql1 = "SELECT * FROM tbl_chinese_banks_list";

    if (
      (searchText === 19 && searchTextType === 0) ||
      (searchText === 16 && searchTextType === 0)
    ) {
      sql1 += " WHERE payment_gate LIKE '%" + searchText + "%'";
    } else if (
      (searchText === 0 && searchTextType === 1) ||
      (searchText === 1 && searchTextType === 1)
    ) {
      sql1 += " WHERE status LIKE '%" + searchText + "%'";
    } else if (searchText) {
      sql1 +=
        " WHERE ((title LIKE '%" +
        searchText +
        "%') OR (title_en LIKE '%" +
        searchText +
        "%'))";
    }

    sql1 += " ORDER BY created_on DESC LIMIT ?,?";

    let result1 = await mysqlcon(sql1, [page.start, page.limit]);

    if (result1.length === 0) {
      return res.json(201, {
        message: `No record found.`,
        data: result1,
      });
    } else {
      return res.json(200, {
        message: `All Records are ${total}`,
        currentPage: Page,
        totalPages: page.numOfPages,
        pageLimit: page.limit,
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

module.exports.getIdChinese = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "SELECT * FROM tbl_chinese_banks_list WHERE id = ?";

    let result = await mysqlcon(sql, [id]);

    if (result.length > 0) {
      return res.json(200, {
        message: `Take data for id = ${id}`,
        data: result[0],
      });
    } else {
      return res.json(201, {
        message: "No Record Found",
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

module.exports.editChinese = async function (req, res) {
  try {
    let { type, title, title_en, id } = req.body;
    

    type = typeof type === "string" ? Number(type) : type;

    let details = {
      payment_gate: type,
      title: title,
      title_en: title_en,
    };

    let sql = "UPDATE tbl_chinese_banks_list SET ? WHERE id = ?";

    let result = await mysqlcon(sql, [details, id]);

    if (result.affectedRows > 0) {
      return res.json(200, {
        message: "Row Updated",
        data: result,
      });
    } else {
      return res.json(201, {
        message: "Error while updating",
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

module.exports.deleteChinese = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "DELETE FROM tbl_chinese_banks_list WHERE id = ?";
    let result = await mysqlcon(sql, [id]);

    

    if (result.affectedRows > 0) {
      return res.json(200, {
        message: "Row Deleted",
        data: result,
      });
    } else {
      return res.json(201, {
        message: "Error while Deleting",
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

module.exports.createChinese = async function (req, res) {
  try {
    let { type, title, title_en } = req.body;

    type = typeof type === "string" ? Number(type) : type;

    let details = {
      payment_gate: type,
      title: title,
      title_en: title_en,
    };

    let sql = "INSERT INTO tbl_chinese_banks_list SET ?";

    let result = await mysqlcon(sql, [details]);

    if (result.affectedRows > 0) {
      return res.json(200, {
        message: "Row Created",
        data: result,
      });
    } else {
      return res.json(201, {
        message: "Error While Creating",
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

module.exports.toggleChinese = async function (req, res) {
  try {
    let { status, id } = req.body;

    let sql = "UPDATE tbl_chinese_banks_list SET status = ? WHERE id = ?";
    // let sql1 ="update tbl_chinese_banks_list SET status = ? WHERE id  =  ?";
    // let result1 = await mysqlcon(sql,[status,id]);
    let result = await mysqlcon(sql, [status, id]);

    // if(result){
    //     return res.json(200,{
    //         message: "Row Updated",

    //     })
    // }else{

    //     return res.json(201,{
    //         message: "Error while updating",

    //     })

    // }

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
