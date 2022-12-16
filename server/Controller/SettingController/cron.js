const mysqlcon = require("../../config/db_connection");

// Default Api 👇

module.exports.defaultCron = async (req, res) => {
  // 👇Pagination 👇
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let searchItem = req.body.searchItem;
    let sql = "select count (*) as Total from payment_gateway";
    let sqlCount =
      "select count (*) as Total FROM payment_gateway WHERE page_title  LIKE '%" +
      searchItem +
      "%'";

    let result = await mysqlcon(searchItem ? sqlCount : sql);
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);

    let sql1 = "SELECT id, type, gateway_name, cron_status, manual_callback, additional_charges FROM payment_gateway LIMIT ?,?";
    let sql2 =
      "SELECT id, type, gateway_name, cron_status, manual_callback, additional_charges FROM payment_gateway WHERE page_title  LIKE '%" +
      searchItem +
      "%' LIMIT ?,?";

    let cronSql = "SELECT cron_id, cron_status FROM tbl_cron_status";
    let cronResult = await mysqlcon(cronSql);

    let result1 = await mysqlcon(searchItem ? sql2 : sql1, [start, limit]);
    

    if (result1.length === 0) {
      return res.json(201, {
        message: `Showing ${limit} from ${total} data `,
        currentPage: page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
        cronStatus: cronResult
      });
    } else {
      return res.json(200, {
        message: `Showing ${limit} from ${total} data `,
        currentPage: page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
        cronStatus: cronResult
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// Toggle Button
module.exports.toggleCron = async function (req, res) {
  try {
    let { cron_status, id } = req.body;

    let sql = "UPDATE payment_gateway SET cron_status = ? WHERE id = ?";
    let result = await mysqlcon(sql, [cron_status, id]);
    if (result.affectedRows > 0) {
      return res.json(200, {
        message: `Status ${
          cron_status === "1" ? "Enabled" : "Disabled"
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

// Toggle Switch
module.exports.toggleSwitch = async function (req, res) {
  try {
    let { cron_status, cron_id } = req.body;

    let sql = "UPDATE tbl_cron_status SET cron_status = ?";
    let result = await mysqlcon(sql, [cron_status, cron_id]);
    if (result.affectedRows > 0) {
      return res.json(200, {
        message: `Cron Status For All Gateway ${
          cron_status === "1" ? "Enabled" : "Disabled"
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

// Toggle ON or OFF
module.exports.toggleON = async function (req, res) {
  try {
    let { manual_callback, id } = req.body;

    let sql = "UPDATE payment_gateway SET manual_callback = ? WHERE id = ?";
    let result = await mysqlcon(sql, [manual_callback, id]);
    if (result.affectedRows > 0) {
      return res.json(200, {
        message: `Manual Callback ${
          manual_callback === "1" ? "ON" : "OFF"
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

// 👇 Update Api 👇
module.exports.updateAdditional = async function (req, res) {
  try {
    let { additional_charges, id } = req.body;
 
    let details = {
      additional_charges
    };

    if (id) {
      let sql = "UPDATE payment_gateway SET ? where id = ?";
      let result = await mysqlcon(sql, [details, id]);
      if (result) {
        return res.json(200, {
          message: "Additional Charges Updated ✅",
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
module.exports.readOneCron = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM payment_gateway WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    res.json(result[0]);
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};



module.exports.SetLimit_SetLimitmodule = async function (req, res) {
  try
  {
    let { user_id} = req.user;
    let {
          gateway,
          currency,
          min,
          max
      } = req.body
    let edit = {
          gateway,
          currency,
          min,
          max
      };
     let sqlMerchant = "SELECT id, name FROM  tbl_user WHERE account_type = 1";
     let sqlGateway = "SELECT id, gateway_name FROM payment_gateway";
     let sqlCurrency = "SELECT currency_code FROM `tbl_currency`";

     let Merchantresult = await mysqlcon(sqlMerchant);
     let Gatewayresult = await mysqlcon(sqlGateway);
     let Currencyresult = await mysqlcon(sqlCurrency);
     if (user_id) {
      let sql = "INSERT INTO tbl_set_limit SET ? ";
      let result = await mysqlcon(sql, [edit, user_id]);
      if (result) {
        return res.json(200, {
          message: 'Data Inserted Successfully ✅',
          status: true,
          message: 'Showing Data',
          data: {
              Merchant: Merchantresult,
              Gateway: Gatewayresult,
              Currency: Currencyresult
          },
        });
      } else {
        return res.json(201, {
          message: "Data not Inserted❌",
        });
      }
    } else {
      return res.json(205, {
        message: "Kindly Provide gateway",
        data: {
            Merchant: Merchantresult,
            Gateway: Gatewayresult,
            Currency: Currencyresult
        },
      });
    }
  }
  catch(error)
  {
    console.log(error)
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
}

// module.exports.edit_SetLimitmodule = async function (req, res) {
//     try
//     {
//       // let { user_id} = req.user;
//       let {
//             user_id,
//             gateway,
//             currency,
//             min,
//             max
//         } = req.body
//       let edit = {
//             gateway,
//             currency,
//             min,
//             max,
//         };

//         let sql = "INSERT INTO tbl_set_limit SET ? ";
//         let result = await mysqlcon(sql, [edit, user_id]);
//         if (result.affectedRows>0) {
   
//           return res.json(200, {
//               message: 'Data Inserted Successfully✅'
//           })
//       }
//       else{
//           return res.json(201, {
//               message: 'Data not Inserted❌ '
//           })
//       }
//     }
//     catch(error)
//     {
//       console.log(error)
//       return res.json(500, {
//         message: "error occurered",
//         error: error,
//       });
//     }
// }


// module.exports.status_SetLimitmodule = async function (req, res){
//   try
//   {
//       let{
//             id,
//             status
//        } = req.body;

//        let action = {
//            status
//        };

//        var sql = "UPDATE tbl_set_limit SET ? WHERE id = ?";  //status => (1 - enable), (0 - disable)
//        var result = await mysqlcon(sql,[action, id]);

           
//            if (result.affectedRows>0)
//            {
//                 return res.json(200, {
//                 message: 'Data Updated Successfully✅'
//                })
//            }
//            else
//            {
//                return res.json(201, {
//                    message: 'Data not updated in table❌'
//                })
//            }
       
//   }
//   catch(error)
//   {
      
//       console.log(error);
//       return res.json(500,{
//       message: "error occurered",
//       error: error
//       }) 
//   }
// }