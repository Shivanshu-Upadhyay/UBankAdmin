const mysqlcon = require("../config/db_connection");

let pagination = (total, page, limit) => {
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;
  return { limit, start, numOfPages };
};

module.exports.paymentGateway = async function (req, res) {
  try {
    let { searchText } = req.body;
    // 0 means payin 1 means status
    let searchTextType;
    if (
      searchText === "Payin" ||
      searchText === "payin" ||
      searchText === "PAYIN"
    ) {
      searchText = 0;
      searchTextType = 0;
    }

    if (
      searchText === "Payout" ||
      searchText === "payout" ||
      searchText === "PAYOUT"
    ) {
      searchText = 1;
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
      searchText = 1;
      searchTextType = 1;
    }

    let sql = "SELECT COUNT(*) as Total FROM payment_gateway";

    if (
      (searchText === 0 && searchTextType === 0) ||
      (searchText === 1 && searchTextType === 0)
    ) {
      sql += " WHERE type LIKE '%" + searchText + "%'";
    } else if (
      (searchText === 0 && searchTextType === 1) ||
      (searchText === 1 && searchTextType === 1)
    ) {
      sql += " WHERE status LIKE '%" + searchText + "%'";
    } else if (searchText) {
      sql +=
        " WHERE ((gateway_name LIKE '%" +
        searchText +
        "%') OR (merNo LIKE '%" +
        searchText +
        "%') OR (gateway_number LIKE '%" +
        searchText +
        "%') OR (DATE(created_on) LIKE '%" +
        searchText +
        "%') OR (DATE(updated_on) LIKE '%" +
        searchText +
        "%'))";
    }

    let result = await mysqlcon(sql);

    let total = result[0].Total;
    let Page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;

    let page = pagination(total, Page, limit);

    let sql1 = "SELECT * FROM payment_gateway";

    if (
      (searchText === 0 && searchTextType === 0) ||
      (searchText === 1 && searchTextType === 0)
    ) {
      sql1 += " WHERE type LIKE '%" + searchText + "%'";
    } else if (
      (searchText === 0 && searchTextType === 1) ||
      (searchText === 1 && searchTextType === 1)
    ) {
      sql1 += " WHERE status LIKE '%" + searchText + "%'";
    } else if (searchText) {
      sql1 +=
        " WHERE ((gateway_name LIKE '%" +
        searchText +
        "%') OR (merNo LIKE '%" +
        searchText +
        "%') OR (gateway_number LIKE '%" +
        searchText +
        "%') OR (DATE(created_on) LIKE '%" +
        searchText +
        "%') OR (DATE(updated_on) LIKE '%" +
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

module.exports.getId = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "SELECT * FROM payment_gateway WHERE id = ?";

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

module.exports.edit = async function (req, res) {
  try {
    let { type, gateway_name, merchantN, gatewayN, key, id } = req.body;

    let details = {
      type: type,
      gateway_name: gateway_name,
      merNo: merchantN,
      gateway_number: gatewayN,
      key: key,
    };

    let sql = "UPDATE payment_gateway SET ? WHERE id = ?";

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

module.exports.delete = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "DELETE FROM payment_gateway WHERE id = ?";
    let result = await mysqlcon(sql, [id]);

    

    if (result.affectedRows > 0) {
      return res.json(200, {
        message: "Row Deleted",
        data: result,
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

module.exports.create = async function (req, res) {
  try {
    let { type, gateway_name, merchantN, gatewayN, key } = req.body;

    let details = {
      type: type,
      gateway_name: gateway_name,
      merNo: merchantN,
      gateway_number: gatewayN,
      key: key,
    };

    let sql = "INSERT INTO payment_gateway SET ?";

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

module.exports.togglePayment = async function (req, res) {
  try {
    let { status, id } = req.body;
    // status = Number(status);

    let sql = "UPDATE payment_gateway SET status = ? WHERE id = ?";
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
