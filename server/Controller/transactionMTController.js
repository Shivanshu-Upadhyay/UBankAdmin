var dateTime = require("node-datetime");
const mysqlcon = require("../config/db_connection");

var dt = dateTime.create();
var formatted_date = dt.format("Y-m-d H:M:S");

let pagination = (total, page, limit) => {
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;

  return { limit, start, numOfPages };
};

//completed with the serach filter module
module.exports.defaultMT = async function (req, res) {
  try {
    let { from, to, merchantName, status, statusType, searchText } = req.body;

    let sqlM =
      "SELECT id,name from tbl_user WHERE status = 1 AND complete_profile = 1";
    let resultM = await mysqlcon(sqlM);

    let sqld;

    if (from && to) {
      sqld = "";
      sqld +=
        " WHERE DATE(created_on) >= '" +
        from +
        "' AND DATE(created_on) <= '" +
        to +
        "'";

      if (merchantName) {
        sqld += " AND user_id = '" + merchantName + "'";

        if (status && statusType === "0") {
          sqld += " AND status = '" + status + "'";
        } else if (status && statusType === "1") {
          sqld +=
            " AND status = '" + status + "' AND pending_hit_response_by = 1";
        } else if (status && statusType === "2") {
          sqld +=
            " AND status = '" + status + "' AND pending_hit_response_by = 2";
        }
      }
      if (status && statusType === "0") {
        sqld += " AND status = '" + status + "'";
      } else if (status && statusType === "1") {
        sqld +=
          " AND status = '" + status + "' AND pending_hit_response_by = 1";
      } else if (status && statusType === "2") {
        sqld +=
          " AND status = '" + status + "' AND pending_hit_response_by = 2";
      }
    } else if (merchantName) {
      sqld = "";

      sqld += " WHERE user_id = '" + merchantName + "'";
      if (status && statusType === "0") {
        sqld += " AND status = '" + status + "'";
      } else if (status && statusType === "1") {
        sqld +=
          " AND status = '" + status + "' AND pending_hit_response_by = 1";
      } else if (status && statusType === "2") {
        sqld +=
          " AND status = '" + status + "' AND pending_hit_response_by = 2";
      }
    } else if (status && statusType === "0") {
      sqld = "";
      sqld += " WHERE status = '" + status + "'";
    } else if (status && statusType === "1") {
      sqld = "";
      sqld +=
        " WHERE status = '" + status + "' AND pending_hit_response_by = 1";
    } else if (status && statusType === "2") {
      sqld = "";
      sqld +=
        " WHERE status = '" + status + "' AND pending_hit_response_by = 2";
    }

    let sql = "SELECT COUNT(*) as Total FROM tbl_merchant_transaction";

    if (from || to || merchantName || status) {
      sql += sqld;
    }

    if (searchText) {
      if (from || to || merchantName || status) {
        sql +=
          " AND ((order_no LIKE '%" +
          searchText +
          "%') OR (payment_type LIKE '%" +
          searchText +
          "%') OR (transaction_id LIKE '%" +
          searchText +
          "%') OR (ammount_type LIKE '%" +
          searchText +
          "%'))";
      } else {
        sql +=
          " WHERE ((order_no LIKE '%" +
          searchText +
          "%') OR (payment_type LIKE '%" +
          searchText +
          "%') OR (transaction_id LIKE '%" +
          searchText +
          "%') OR (ammount_type LIKE '%" +
          searchText +
          "%'))";
      }
    }

    let result = await mysqlcon(sql);

    let total = result[0].Total;
    let Page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;

    let page = pagination(total, Page, limit);

    let sql1 = "SELECT * FROM tbl_merchant_transaction";

    if (from || to || merchantName || status) {
      sql1 += sqld;
    }

    if (searchText) {
      if (from || to || merchantName || status) {
        sql1 +=
          " AND ((order_no LIKE '%" +
          searchText +
          "%') OR (payment_type LIKE '%" +
          searchText +
          "%') OR (transaction_id LIKE '%" +
          searchText +
          "%') OR (ammount_type LIKE '%" +
          searchText +
          "%'))";
      } else {
        sql1 +=
          " WHERE ((order_no LIKE '%" +
          searchText +
          "%') OR (payment_type LIKE '%" +
          searchText +
          "%') OR (transaction_id LIKE '%" +
          searchText +
          "%') OR (ammount_type LIKE '%" +
          searchText +
          "%'))";
      }
    }

    sql1 += " ORDER BY created_on DESC LIMIT ?,?";

    let result1 = await mysqlcon(sql1, [page.start, page.limit]);

    if (result1.length === 0) {
      return res.json(201, {
        message: `No Record Found`,
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
    console.log(error);

    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.getIdMT = async function (req, res) {
  try {
    let { id } = req.body;
    console.log(id)

    let sql = "SELECT * FROM tbl_merchant_transaction WHERE invoice_id = ?";

    let result = await mysqlcon(sql, [id]);
    let od_id = result[0].new_trx === 1 ? result[0].txn_id : result[0].order_no;


    let sql1 = "SELECT * FROM tbl_payin_request WHERE order_id = ?";
    let sql2 = "SELECT * FROM tbl_payment_gate_response_tale WHERE order_id = ?";
    let sql3 = `SELECT * FROM tbl_cron_log WHERE data LIKE '{"order_id":"${od_id}%'`;


    let request_data = await mysqlcon(sql1, [result[0].order_no]);
    let bank_data = await mysqlcon(sql2, [result[0].order_no]);
    let cron_data = await mysqlcon(sql3);

    if (result.length !== 0) {
      return res.json(200, {
        message: `Records for id =  ${id}`,
        data: result,
        request_data: request_data,
        bank_data: bank_data,
        cron_data: cron_data
      });
    } else {
      return res.json(201, {
        message: `No Record Found`,
        data: result[0],
      });
    }
  } catch (error) {
    console.log(error)
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.toggleStatusMT = async function (req, res) {
  try {
    let { status, id } = req.body;
   

    if (status > 5 || status < 0) {
      return res.json(201, {
        message: `Status Not Updated`,
      });
    }

    let sql =
      "UPDATE tbl_merchant_transaction SET status = ? WHERE invoice_id = ?";
    let result = await mysqlcon(sql, [status, id]);

    if (result.affectedRows > 0) {
      return res.json(200, {
        message: `Status ${
          status === "0"
            ? "Failed"
            : status === "1"
            ? "Success"
            : status === "2"
            ? "Waiting"
            : status === "3"
            ? "Pending"
            : status === "4"
            ? "Refund"
            : status === "5"
            ? "ChargeBack"
            : ""
        } `,
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

module.exports.createMT = async function (req, res) {
  try {
    let { merchantId, currency_id, trx_type, transaction_id, name, amount } =
      req.body;
    

    let sqlF = "SELECT * FROM tbl_merchant_charges WHERE currency_id = ?";
    let resultF = await mysqlcon(sqlF, [currency_id]);

    let charge = 0;

    if (resultF.length === 0) {
      let sqlU = "SELECT * FROM tbl_user WHERE user_id = ?";
      let resultU = await mysqlcon(sqlU, [merchantId]);
      if (resultU.length !== 0) {
        if (trx_type === "CASH") {
          charge = resultU[0].payin_card_credit;
        } else {
          charge = resultU[0].payin_card_credit;
        }
      }
    } else {
      charge = resultF[0].payin_amount;
    }

    let akonto_charge = (amount * charge) / 100;
    let gst_amount = 0;

    if (currency_id === "53") {
      gst_amount = (amount * 18) / 100;
    }

    let settle_amount = amount - akonto_charge + gst_amount;

    let details = {
      ammount: amount,
      user_id: merchantId,
      i_flname: name,
      order_no: transaction_id,
      payment_type: trx_type,
      payment_status: `Success by ${trx_type}`,
      status: 1,
      payin_charges: akonto_charge,
      merchant_db_response: 1,
      sales_from: 1,
      pending_hit_response_by: 2,
      gst_charges: gst_amount,
      trx_live_test: 1,
      settle_amount: settle_amount,
      created_on: formatted_date,
      updated_on: formatted_date,
      settlement_on: formatted_date,
    };

    if (
      merchantId !== undefined &&
      trx_type !== undefined &&
      transaction_id !== undefined &&
      name !== undefined &&
      amount !== undefined
    ) {
      let sql = "INSERT INTO tbl_merchant_transaction SET ?";

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
    } else {
      return res.json(201, {
        message: "Error While Creating! Enter All 5 Parameter",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.getCurrencyMT = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "SELECT * FROM tbl_user WHERE id = ?";

    let result = await mysqlcon(sql, [id]);

    let currencyId = "";

    if (result.length !== 0) {
      currencyId += result[0].solution_apply_for_country;
    }

    let currA = currencyId.split(",");

    let sql1 = "SELECT id as currencyID,sortname FROM countries WHERE id IN (";

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

module.exports.allMerchant = async function (req, res) {
  try{
    const {adminfilter} = req.body
    
    let sqlM ="SELECT id,name from tbl_user WHERE status = 1 AND complete_profile = 1";
    let sqlAdmin = "select user_id as id , CONCAT(firstname, lastname) as name from tbl_login"
  let resultM = await mysqlcon(adminfilter?sqlAdmin:sqlM);
  
  res.status(200).json({
    Data:resultM
  })

  }
  catch(err){
    res.status(500).json({
      message:"Server Error",
      err,
    })
  }
  
};
