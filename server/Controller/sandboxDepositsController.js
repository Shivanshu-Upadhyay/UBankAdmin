const mysqlcon = require('../config/db_connection');


module.exports.defaultSandboxDeposits = async (req, res) => {
    // 👇Pagination 👇
    let pagination = (total, page, limit) => {
      let numOfPages = Math.ceil(total / limit);
      let start = page * limit - limit;
      return { limit, start, numOfPages };
    };
  
    try {
      let searchItem = req.body.searchItem;
      let sql = "select count (*) as Total from tbl_merchant_transaction_sandbox";
      let sqlCount =
        "select count (*) as Total FROM tbl_merchant_transaction_sandbox WHERE user_id LIKE '%" +
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

      let sql1 = "SELECT tbl_user.name, tbl_merchant_transaction_sandbox.user_id, tbl_merchant_transaction_sandbox.invoice_id, tbl_merchant_transaction_sandbox.txn_id, tbl_merchant_transaction_sandbox.order_no, tbl_merchant_transaction_sandbox.payment_type, tbl_merchant_transaction_sandbox.payment_status, tbl_merchant_transaction_sandbox.ammount_type, tbl_merchant_transaction_sandbox.ammount, tbl_merchant_transaction_sandbox.payin_charges, tbl_merchant_transaction_sandbox.gst_charges, tbl_merchant_transaction_sandbox.our_bank_charge_gst, tbl_merchant_transaction_sandbox.our_bank_charge, tbl_merchant_transaction_sandbox.rolling_reverse_amount, tbl_merchant_transaction_sandbox.settle_amount, tbl_merchant_transaction_sandbox.status, tbl_merchant_transaction_sandbox.created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id LIMIT ?,?";
      let sql2 =
        "SELECT tbl_user.name, tbl_merchant_transaction_sandbox.user_id, tbl_merchant_transaction_sandbox.invoice_id, tbl_merchant_transaction_sandbox.txn_id, tbl_merchant_transaction_sandbox.order_no, tbl_merchant_transaction_sandbox.payment_type, tbl_merchant_transaction_sandbox.payment_status, tbl_merchant_transaction_sandbox.ammount_type, tbl_merchant_transaction_sandbox.ammount, tbl_merchant_transaction_sandbox.payin_charges, tbl_merchant_transaction_sandbox.gst_charges, tbl_merchant_transaction_sandbox.our_bank_charge_gst, tbl_merchant_transaction_sandbox.our_bank_charge, tbl_merchant_transaction_sandbox.rolling_reverse_amount, tbl_merchant_transaction_sandbox.settle_amount, tbl_merchant_transaction_sandbox.status, tbl_merchant_transaction_sandbox.created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id WHERE user_id  LIKE '%" +
        searchItem +
        "%' OR  txn_id LIKE '%" +
        searchItem +
        "%' OR  order_no LIKE '%" +
        searchItem +
        "%' LIMIT ?,?";
  
      let result1 = await mysqlcon(searchItem ? sql2 : sql1, [start, limit]);
      
  
      if (result1.length === 0) {
        return res.json(201, {
          message: `Showing ${limit} from ${total} data `,
          currentPage: page,
          totalPages: numOfPages,
          pageLimit: limit,
          data: result1,
        });
      } else {
        return res.json(200, {
          message: `Showing ${limit} from ${total} data `,
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


module.exports.getIdDeposits = async function (req, res) {
  try {
    let { invoice_id } = req.body;
    // let sql = "SELECT tbl_user.name, tbl_merchant_transaction_sandbox.user_id, tbl_merchant_transaction_sandbox.txn_id, tbl_merchant_transaction_sandbox.order_no, tbl_merchant_transaction_sandbox.payment_type, tbl_merchant_transaction_sandbox.payment_status, tbl_merchant_transaction_sandbox.ammount_type, tbl_merchant_transaction_sandbox.ammount, tbl_merchant_transaction_sandbox.payin_charges, tbl_merchant_transaction_sandbox.gst_charges, tbl_merchant_transaction_sandbox.our_bank_charge_gst, tbl_merchant_transaction_sandbox.our_bank_charge, tbl_merchant_transaction_sandbox.rolling_reverse_amount, tbl_merchant_transaction_sandbox.settle_amount, tbl_merchant_transaction_sandbox.status, tbl_merchant_transaction_sandbox.created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id WHERE txn_id = ?";

    let sql= "SELECT * from tbl_merchant_transaction_sandbox WHERE invoice_id = ?"
    let result = await mysqlcon(sql, [invoice_id]);
    if (result.length !== 0) {
      return res.json(200, {
        message: `Records for invoice_id =  ${invoice_id}`,
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