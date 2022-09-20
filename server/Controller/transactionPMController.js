const mysqlcon = require("../config/db_connection");

let pagination = (total, page, limit) => {
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;

  return { limit, start, numOfPages };
};

module.exports.defaultPM = async function (req, res) {
  try {
    let { from, to, merchantName, status, searchText } = req.body;

    let sqld;

    if (from && to) {
      sqld = "";
      sqld +=
        " AND DATE(tbl_icici_payout_transaction_response_details.created_on) >= '" +
        from +
        "' AND DATE(tbl_icici_payout_transaction_response_details.created_on) <= '" +
        to +
        "'";

      if (merchantName) {
        sqld +=
          " AND tbl_icici_payout_transaction_response_details.users_id = '" +
          merchantName +
          "'";

        if (status) {
          sqld +=
            " AND tbl_icici_payout_transaction_response_details.status = '" +
            status +
            "'";
        }
      } else if (status) {
        sqld +=
          " AND tbl_icici_payout_transaction_response_details.status = '" +
          status +
          "'";
      }
    } else if (merchantName) {
      sqld = "";

      sqld +=
        " AND tbl_icici_payout_transaction_response_details.users_id = '" +
        merchantName +
        "'";
      if (status) {
        sqld +=
          " AND tbl_icici_payout_transaction_response_details.status = '" +
          status +
          "'";
      }
    } else if (status) {
      sqld = "";
      sqld +=
        " AND tbl_icici_payout_transaction_response_details.status = '" +
        status +
        "'";
    }

    let sql =
      "SELECT COUNT(*) as Total FROM tbl_user INNER JOIN tbl_icici_payout_transaction_response_details ON tbl_user.id = tbl_icici_payout_transaction_response_details.users_id WHERE tbl_user.status = 1 AND complete_profile = 1";

    if (from || to || merchantName || status) {
      sql += sqld;
    }

    if (searchText) {
      if (from || to || merchantName || status) {
        sql +=
          " AND tbl_icici_payout_transaction_response_details.uniqueid LIKE '%" +
          searchText +
          "%'";
      } else {
        sql +=
          " AND tbl_icici_payout_transaction_response_details.uniqueid LIKE '%" +
          searchText +
          "%'";
      }
    }

    let result = await mysqlcon(sql);

    let total = result[0].Total;
    let Page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;

    let page = pagination(total, Page, limit);

    let sql1 =
      "SELECT tbl_user.name,tbl_icici_payout_transaction_response_details.* FROM tbl_user INNER JOIN tbl_icici_payout_transaction_response_details ON tbl_user.id = tbl_icici_payout_transaction_response_details.users_id WHERE tbl_user.status = 1 AND complete_profile = 1";

    // "SELECT COUNT(*) as Total FROM tbl_user INNER JOIN tbl_icici_payout_transaction_response_details ON tbl_user.id = tbl_icici_payout_transaction_response_details.users_id WHERE tbl_user.status = 1 AND complete_profile = 1"

    if (from || to || merchantName || status) {
      sql1 += sqld;
    }

    if (searchText) {
      if (from || to || merchantName || status) {
        sql1 +=
          " AND tbl_icici_payout_transaction_response_details.uniqueid LIKE '%" +
          searchText +
          "%'";
      } else {
        sql1 +=
          " AND tbl_icici_payout_transaction_response_details.uniqueid LIKE '%" +
          searchText +
          "%'";
      }
    }

    sql1 += " ORDER BY created_on DESC LIMIT ?,?";

    let result1 = await mysqlcon(sql1, [page.start, page.limit]);

    let sqlM =
      "SELECT id,name FROM tbl_user WHERE status = 1 AND complete_profile = 1";
    let resultM = await mysqlcon(sqlM);

    if (result1.length === 0) {
      return res.json(201, {
        message: `No record found.`,
        currentPage: Page,
        totalPages: page.numOfPages,
        pageLimit: page.limit,
        merchants: resultM,
        data: result1,
      });
    } else {
      if (from && to) {
        if (merchantName) {
          if (status) {
            return res.json(200, {
              message: `All Records are ${total} from date ${from} to ${to} for merchant id ${merchantName} and status ${status}`,
              currentPage: Page,
              totalPages: page.numOfPages,
              pageLimit: page.limit,
              merchants: resultM,
              data: result1,
            });
          } else {
            return res.json(200, {
              message: `All Records are ${total} from date ${from} to ${to} for merchant id ${merchantName}`,
              currentPage: Page,
              totalPages: page.numOfPages,
              pageLimit: page.limit,
              merchants: resultM,
              data: result1,
            });
          }
        } else if (status) {
          return res.json(200, {
            message: `All Records are ${total} from date ${from} to ${to} for status ${status}`,
            currentPage: Page,
            totalPages: page.numOfPages,
            pageLimit: page.limit,
            merchants: resultM,
            data: result1,
          });
        }

        return res.json(200, {
          message: `All Records are ${total} from date ${from} to ${to}`,
          currentPage: Page,
          totalPages: page.numOfPages,
          pageLimit: page.limit,
          merchants: resultM,
          data: result1,
        });
      } else if (merchantName) {
        if (status) {
          return res.json(200, {
            message: `All Records are ${total} for merchant id ${merchantName} and status ${status}`,
            currentPage: Page,
            totalPages: page.numOfPages,
            pageLimit: page.limit,
            merchants: resultM,
            data: result1,
          });
        } else {
          return res.json(200, {
            message: `All Records are ${total} for merchant id ${merchantName} `,
            currentPage: Page,
            totalPages: page.numOfPages,
            pageLimit: page.limit,
            merchants: resultM,
            data: result1,
          });
        }
      } else if (status) {
        return res.json(200, {
          message: `All Records are ${total} for status ${status}`,
          currentPage: Page,
          totalPages: page.numOfPages,
          pageLimit: page.limit,
          merchants: resultM,
          data: result1,
        });
      }

      return res.json(200, {
        message: `All Records are ${total}`,
        currentPage: Page,
        totalPages: page.numOfPages,
        pageLimit: page.limit,
        merchants: resultM,
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

// for toggle the status

module.exports.toggleStatusPM = async function (req, res) {
  try {
    let { status, id } = req.body;
    // status = Number(status);
    console.log(status);

    if (status !== "PENDING" && status !== "SUCCESS" && status !== "FAILURE") {
      return res.json(201, {
        message: `Status Not Updated`,
      });
    }

    let sql =
      "UPDATE tbl_icici_payout_transaction_response_details SET status = ? WHERE id = ?";
    let result = await mysqlcon(sql, [status, id]);

    if (result.affectedRows > 0) {
      return res.json(200, {
        message: `Status ${
          status === "SUCCESS"
            ? "Success"
            : status === "PENDING"
            ? "Pending"
            : status === "FAILURE"
            ? "Failure"
            : ""
        } Successfully `,
        data: result,
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

// for creating
module.exports.createPM = async function (req, res) {
  try {
    let { id, currency_id, trx_type, transaction_id, payee_name, amount } =
      req.body;

      console.log(currency_id);
    
    let sqlF = "SELECT * FROM tbl_merchant_charges WHERE currency_id = ?";
    let resultF = await mysqlcon(sqlF, [currency_id]);
    let charge = 0;
    if (resultF.length === 0) {
      let sqlU = "SELECT * FROM tbl_user WHERE user_id = ?";
      let resultU = await mysqlcon(sqlU, [id]);
      if (resultU.length !== 0) {
        if (trx_type === "CASH") {
          charge = resultU[0].payout_imps;
        } else {
          charge = resultU[0].payout_rtgs;
        }
      }
    } else {
      charge = resultF[0].payout_amount;
    }
    let akonto_charge = (amount * charge) / 100;
    let gst_amount = 0;
    let bank_charges = 0;
    if (currency_id === "53") {
      gst_amount = (amount * 18) / 100;
    }
    let wallet_deduct = amount + akonto_charge + gst_amount + bank_charges;
    let details = {
      users_id: id,
      trx_type,
      uniqueid: transaction_id,
      payee_name,
      amount,
      status: "SUCCESS",
      akonto_charge: akonto_charge,
      merchant_db_response: 1,
      tnx_status_check: 1,
      bank_request: 2,
      gst_amount: gst_amount,
      bank_charges: bank_charges,
      wallet_deduct: wallet_deduct,
    };
    

    console.log(details)


    let sql = "INSERT INTO tbl_icici_payout_transaction_response_details SET ?";

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

    console.log(error);
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// for getting currency dropdown according to the merchant id selected
module.exports.getCurrency = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "SELECT * FROM tbl_user WHERE id = ?";

    let result = await mysqlcon(sql, [id]);

    let currencyId = "";

    if (result.length !== 0) {
      currencyId += result[0].solution_apply_for_country;
    }

    let currA = currencyId.split(",");

    let sql1 = "SELECT id as currencyID,currency FROM countries WHERE id IN (";

    for (let i = 0; i < currA.length; i++) {
      sql1 += "'";
      sql1 += currA[i];
      sql1 += "',";
    }

    sql1 = sql1.slice(0, -1);
    sql1 += ")";

    let result1 = await mysqlcon(sql1);

    if (result1.length !== 0) {
      return res.json(200, {
        message: `Currency for merchant id = ${id} are ${currA.length}`,

        data: result1,
      });
    } else {
      return res.json(201, {
        message: `No Record Found`,
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