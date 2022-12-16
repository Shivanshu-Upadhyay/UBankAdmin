const mysqlcon = require('../config/db_connection');


module.exports.defaultSandboxPayout = async (req, res) => {
    // 👇Pagination 👇
    let pagination = (total, page, limit) => {
      let numOfPages = Math.ceil(total / limit);
      let start = page * limit - limit;
      return { limit, start, numOfPages };
    };
  
    try {
      let searchItem = req.body.searchItem;
      let sql = "select count (*) as Total from tbl_icici_payout_transaction_sandbox_response_details";
      let sqlCount =
        "select count (*) as Total FROM tbl_icici_payout_transaction_sandbox_response_details WHERE user_id LIKE '%" +
        searchItem +
        "%' OR  txn_id LIKE '%" +
        searchItem +
        "%' OR  order_no LIKE '%" +
        searchItem +
        "%'";
  
      let result = await mysqlcon(searchItem ? sqlCount : sql);
      let total = result[0].Total;
      let page = req.body.page ? Number(req.body.page) : 1;
      let limit = req.body.limit ? Number(req.body.limit) : 10;
      let { start, numOfPages } = pagination(total, page, limit);
      
      let sql1 = "SELECT tbl_user.name, tbl_icici_payout_transaction_sandbox_response_details.id, tbl_icici_payout_transaction_sandbox_response_details.users_id, tbl_icici_payout_transaction_sandbox_response_details.trx_from, tbl_icici_payout_transaction_sandbox_response_details.payout_bank, tbl_icici_payout_transaction_sandbox_response_details.uniqueid, tbl_icici_payout_transaction_sandbox_response_details.customer_order_id, tbl_icici_payout_transaction_sandbox_response_details.status, tbl_icici_payout_transaction_sandbox_response_details.response, tbl_icici_payout_transaction_sandbox_response_details.utrnumber, tbl_icici_payout_transaction_sandbox_response_details.trx_type, tbl_icici_payout_transaction_sandbox_response_details.payee_name, tbl_icici_payout_transaction_sandbox_response_details.creditacc, tbl_icici_payout_transaction_sandbox_response_details.ifsc, tbl_icici_payout_transaction_sandbox_response_details.amount, tbl_icici_payout_transaction_sandbox_response_details.bank_charges, tbl_icici_payout_transaction_sandbox_response_details.wallet_deduct, tbl_icici_payout_transaction_sandbox_response_details.currency, tbl_icici_payout_transaction_sandbox_response_details.created_on, tbl_icici_payout_transaction_sandbox_response_details.updated_on, tbl_icici_payout_transaction_sandbox_response_details.bank_full_response, tbl_icici_payout_transaction_sandbox_response_details.bank_encrypted_request_response, tbl_icici_payout_transaction_sandbox_response_details.wallet_address FROM tbl_icici_payout_transaction_sandbox_response_details INNER JOIN tbl_user ON tbl_icici_payout_transaction_sandbox_response_details.users_id = tbl_user.id LIMIT ?,?";
      let sql2 =
        "SELECT tbl_user.name, tbl_icici_payout_transaction_sandbox_response_details.id, tbl_icici_payout_transaction_sandbox_response_details.users_id, tbl_icici_payout_transaction_sandbox_response_details.trx_from, tbl_icici_payout_transaction_sandbox_response_details.payout_bank, tbl_icici_payout_transaction_sandbox_response_details.uniqueid, tbl_icici_payout_transaction_sandbox_response_details.customer_order_id, tbl_icici_payout_transaction_sandbox_response_details.status, tbl_icici_payout_transaction_sandbox_response_details.response, tbl_icici_payout_transaction_sandbox_response_details.utrnumber, tbl_icici_payout_transaction_sandbox_response_details.trx_type, tbl_icici_payout_transaction_sandbox_response_details.payee_name, tbl_icici_payout_transaction_sandbox_response_details.creditacc, tbl_icici_payout_transaction_sandbox_response_details.ifsc, tbl_icici_payout_transaction_sandbox_response_details.amount, tbl_icici_payout_transaction_sandbox_response_details.bank_charges, tbl_icici_payout_transaction_sandbox_response_details.wallet_deduct, tbl_icici_payout_transaction_sandbox_response_details.currency, tbl_icici_payout_transaction_sandbox_response_details.created_on, tbl_icici_payout_transaction_sandbox_response_details.updated_on, tbl_icici_payout_transaction_sandbox_response_details.bank_full_response, tbl_icici_payout_transaction_sandbox_response_details.bank_encrypted_request_response, tbl_icici_payout_transaction_sandbox_response_details.wallet_address FROM tbl_icici_payout_transaction_sandbox_response_details INNER JOIN tbl_user ON tbl_icici_payout_transaction_sandbox_response_details.users_id = tbl_user.id WHERE user_id  LIKE '%" +
        searchItem +
        "%' OR  txn_id LIKE '%" +
        searchItem +
        "%' OR  order_no LIKE '%" +
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

// for toggle the status
module.exports.toggleSandboxPayout = async function (req, res) {
  try {
    let { status, id } = req.body;

    if (status !== "PENDING" && status !== "SUCCESS" && status !== "FAILURE") {
      return res.json(201, {
        message: `Status Not Updated`,
      });
    }

    let sql = "UPDATE tbl_icici_payout_transaction_sandbox_response_details SET status = ? WHERE id = ?";
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

module.exports.getIdPayout = async function (req, res) {
  try {
    let { id } = req.body;

    let sql= "SELECT * from tbl_icici_payout_transaction_sandbox_response_details WHERE id = ?"
    let result = await mysqlcon(sql, [id]);
    if (result.length !== 0) {
      return res.json(200, {
        message: `Records for id =  ${id}`,
        data: result,
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