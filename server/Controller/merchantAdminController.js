const mysqlcon = require("../config/db_connection");
const crypto = require("crypto");
// 👇Read Api 👇
module.exports.merchantAdmin = async (req, res) => {
  // 👇Pagination 👇
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let searchItem = req.body.searchItem;
    let sql = "select count (*) as Total from tbl_user";
    let sqlCount =
      "select count (*) as Total FROM tbl_user WHERE wallet  LIKE '%" +
      searchItem +
      "%' OR  payin_upi  LIKE '%" +
      searchItem +
      "%' or  payout_neft  LIKE '%" +
      searchItem +
      "%' or  payout_imps  LIKE '%" +
      searchItem +
      "%' or  payout_rtgs  LIKE '%" +
      searchItem +
      "%' or  rolling_reverse  LIKE '%" +
      searchItem +
      "%' or  id  LIKE '%" +
      searchItem +
      "%' or  name  LIKE '%" +
      searchItem +
      "%' or  secretkey  LIKE '%" +
      searchItem +
      "%' or  sec_iv  LIKE '%" +
      searchItem +
      "%' or  test_secretkey  LIKE '%" +
      searchItem +
      "%' or  test_sec_iv  LIKE '%" +
      searchItem +
      "%'";

    // list api 👇
    let paymentSql = "select * from payment_gateway where type ='0'";
    let paymentResult = await mysqlcon(paymentSql);
    let urlSql = "select * from tbl_ingenico_mid";
    let urlResult = await mysqlcon(urlSql);
    let payoutSql = "select * from payment_gateway where type = '1'";
    let payoutResult = await mysqlcon(payoutSql);

    // list api End 👇

    let result = await mysqlcon(searchItem ? sqlCount : sql);
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);

    let sql1 = "SELECT * FROM tbl_user LIMIT ?,?";
    let sql2 =
      "SELECT * FROM tbl_user  WHERE wallet  LIKE '%" +
      searchItem +
      "%' OR  payin_upi  LIKE '%" +
      searchItem +
      "%' or  payout_neft  LIKE '%" +
      searchItem +
      "%' or  payout_imps  LIKE '%" +
      searchItem +
      "%' or  payout_rtgs  LIKE '%" +
      searchItem +
      "%' or  rolling_reverse  LIKE '%" +
      searchItem +
      "%' or  id  LIKE '%" +
      searchItem +
      "%' or  name  LIKE '%" +
      searchItem +
      "%' or  secretkey  LIKE '%" +
      searchItem +
      "%' or  sec_iv  LIKE '%" +
      searchItem +
      "%' or  test_secretkey  LIKE '%" +
      searchItem +
      "%' or  test_sec_iv  LIKE '%" +
      searchItem +
      "%' LIMIT ?,?";

    let result1 = await mysqlcon(searchItem ? sql2 : sql1, [start, limit]);

    if (result1.length === 0) {
      return res.json(201, {
        message: `Data Not Found`,
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
        paymentResult,
        urlResult,
        payoutResult,
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// Update select and key Gen 👇
module.exports.updateSelectKey = async (req, res) => {
  try {
    let { id, secretName, value } = req.body;

    if (!id && !secretName) {
      return res.json(205, {
        message: "Kindly Provide Id and Name🆔",
      });
    }
    if (
      secretName === "secretkey" ||
      secretName === "sec_iv" ||
      secretName === "test_secretkey" ||
      secretName === "test_sec_iv"
    ) {
      value = crypto.randomBytes(8).toString("hex");
    }

    let sql = "UPDATE tbl_user SET " + secretName + " = ? WHERE id = ?";

    let result = await mysqlcon(sql, [value, id]);
    if (result) {
      return res.json(200, {
        message: "Update Successfully✅",
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

// 👇 Update Api 👇
module.exports.updateMerchantAdmin = async function (req, res) {
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
      let sql = "UPDATE tbl_user SET ? where id = ?";
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

// Read one  Api 👇
module.exports.readOneMerchantAdmin = async function (req, res) {
  try {
    let { id } = req.body;
    if (!id) {
      return res.json(205, {
        message: "Kindly Provide Id",
      });
    }
    let sql = "SELECT *  FROM tbl_user WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    let sql2 =
      "SELECT name,gst_amount,payin_amount,payout_amount  FROM countries INNER JOIN tbl_merchant_charges ON  countries.id = tbl_merchant_charges.currency_id where countries.id IN (" +
      result[0].solution_apply_for_country +
      ")";
    let country = await mysqlcon(sql2);
    let sql3 = "SELECT id as value , title as label FROM tbl_akonto_banks_code";
    let bankName = await mysqlcon(sql3);
  
    if (result) {
      return res.json(200, {
        message: "Data Found",
        data: result[0],
        country: country,
        bankName: bankName,
      });
    } else {
      return res.json(201, {
        message: "Data Not Found",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// 👇Delete Api 👇
module.exports.deleteMerchantAdmin = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "DELETE FROM tbl_user WHERE id = ?";
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
module.exports.createMerchantAdmin = async function (req, res) {
  try {
    let {
      fname,
      lname,
      email,
      mobile_no,
      bname,
      blocation,
      job_title,
      website,
      apv,
      ata,
      charge_back_per,
      currencies_req,
    } = req.body;

    let details = {
      name: fname + " " + lname,
      fname,
      lname,
      email,
      mobile_no,
      bname,
      blocation,
      job_title,
      website,
      apv,
      ata,
      charge_back_per,
      currencies_req,
    };

   

    let sql = "INSERT INTO tbl_user SET ?";
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

// Update Wallet 👇
module.exports.updateWallet = async function (req, res) {
  try {
    let { id, wallet } = req.body;
    if (!id && !wallet) {
      return res.json(205, {
        message: "Kindly Provide Id and Wallet",
      });
    }
    let sql = "UPDATE tbl_user SET wallet = ? where id = ?";
    let result = await mysqlcon(sql, [wallet, id]);
    if (result) {
      return res.json(200, {
        message: "Data updated Successfully✅",
      });
    } else {
      return res.json(201, {
        message: "Data Not updated",
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
