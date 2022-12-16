const mysqlcon = require("../../config/db_connection");

// Default Api 👇

// module.exports.defaultLimit = async (req, res) => {
//   // 👇Pagination 👇
//   let pagination = (total, page, limit) => {
//     let numOfPages = Math.ceil(total / limit);
//     let start = page * limit - limit;
//     return { limit, start, numOfPages };
//   };

//   try {
//     let searchItem = req.body.searchItem;
//     let sql = "select count (*) as Total from tbl_set_limit";
//     let sqlCount =
//       "select count (*) as Total FROM tbl_set_limit WHERE page_title  LIKE '%" +
//       searchItem +
//       "%'";

//     let result = await mysqlcon(searchItem ? sqlCount : sql);
//     let total = result[0].Total;
//     let page = req.body.page ? Number(req.body.page) : 1;
//     let limit = req.body.limit ? Number(req.body.limit) : 10;
//     let { start, numOfPages } = pagination(total, page, limit);

//     let sql1 = "SELECT id, user_id, gateway, currency, min, max,status, created_on, updated_on FROM tbl_set_limit LIMIT ?,?";
//     let sql2 =
//       "SELECT id, user_id, gateway, currency, min, max,status, created_on, updated_on FROM tbl_set_limit WHERE page_title  LIKE '%" +
//       searchItem +
//       "%' LIMIT ?,?";

//     let result1 = await mysqlcon(searchItem ? sql2 : sql1, [start, limit]);
    

//     if (result1.length === 0) {
//       return res.json(201, {
//         message: `Showing ${total} from ${total} data `,
//         currentPage: page,
//         totalPages: numOfPages,
//         pageLimit: limit,
//         data: result1,
//       });
//     } else {
//       return res.json(200, {
//         message: `Showing ${total} from ${total} data `,
//         currentPage: page,
//         totalPages: numOfPages,
//         pageLimit: limit,
//         data: result1,
//       });
//     }
//   } catch (error) {
//     return res.json(500, {
//       message: "error occurered",
//       error: error,
//     });
//   }
// };

module.exports.defaultSetLimitmodule = async function (req, res) {
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };
  try {
    const { to,from,date,searchText } = req.body;
    
    let sqlcount = "select count (*) as Total from tbl_set_limit";
    let sqCountDate = "select count (*) as Total from tbl_set_limit where DATE(created_on) = ?";
    let sqlToFromCount = "select count (*) as Total from tbl_set_limit where DATE(created_on)  >= ? AND DATE(created_on) <= ?";
    
  
    let result = await mysqlcon(date?sqCountDate:(to&&from)?sqlToFromCount:searchText?sqlcount:sqlcount,date?[date]:(to&&from)?[from,to]: '');

    let total = result[0].Total;
    let Page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, Page, limit);

    let sql= 'SELECT tbl_set_limit.id, tbl_set_limit.user_id, tbl_user.name, payment_gateway.gateway_name, tbl_set_limit.currency, tbl_set_limit.min, tbl_set_limit.max, tbl_set_limit.status, tbl_set_limit.created_on, tbl_set_limit.updated_on FROM tbl_set_limit INNER JOIN tbl_user ON tbl_set_limit.user_id = tbl_user.id INNER JOIN payment_gateway ON tbl_set_limit.gateway=payment_gateway.id';
    let sqlDate = 'SELECT tbl_set_limit.user_id, tbl_user.name, payment_gateway.gateway_name, tbl_set_limit.currency, tbl_set_limit.min, tbl_set_limit.max, tbl_set_limit.status, tbl_set_limit.created_on, tbl_set_limit.updated_on FROM tbl_set_limit INNER JOIN tbl_user ON tbl_set_limit.user_id = tbl_user.id INNER JOIN payment_gateway ON tbl_set_limit.gateway = payment_gateway.id where tbl_set_limit(created_on) = ? ORDER BY created_on ASC limit ?,?';
    let sqlToFrom = 'SELECT tbl_set_limit.user_id, tbl_user.name, payment_gateway.gateway_name, tbl_set_limit.currency, tbl_set_limit.min, tbl_set_limit.max, tbl_set_limit.status, tbl_set_limit.created_on, tbl_set_limit.updated_on FROM tbl_set_limit INNER JOIN tbl_user ON tbl_set_limit.user_id = tbl_user.id INNER JOIN payment_gateway ON tbl_set_limit.gateway = payment_gateway.id where tbl_set_limit.created_on >= ? AND tbl_set_limit.created_on <= ? ORDER BY created_on ASC limit ?,?';
  

    let result1 = await mysqlcon(date?sqlDate:(to&&from)?sqlToFrom:searchText?sql:sql,date?[date,start,limit]:(to&&from)?[from,to,start,limit]:[start,limit]);

    if (result1.length === 0) {
      return res.json(201, {
        message: `Showing ${total} from ${total} data `,
        currentPage: Page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
      
      });
    } else {
      return res.json(200, {
        message: `Showing ${total} from ${total} data `,
        currentPage: Page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
      
      });
    }
  }
  catch (error) {
    console.log(error)
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
}

// Toggle Button
module.exports.toggleLimit = async function (req, res) {
    try {
      let { status, id } = req.body;
  
      let sql = "UPDATE tbl_set_limit SET status = ? WHERE id = ?";
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

// 👇 Create Api👇
module.exports.createLimit = async function (req, res) {
  try {
    let { user_id, gateway, currency, max, min } = req.body;

    let details = {
      user_id,
      gateway,
      currency, 
      max, 
      min
    };

    let sql = "INSERT INTO tbl_set_limit SET ? , created_on = NOW() , updated_on = NOW()";

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
      console.log(error)
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// All currency
module.exports.allCurrency = async function (req, res) {
  try{
      
      sql = "SELECT id, currency_code from tbl_currency"
      let result = await mysqlcon(sql);
  
      res.status(200).json({
          Data:result
      })
  
  }
  catch(err){
      res.status(500).json({
          message:"Server Error",
          err,
      })
  }
  
};

// 👇 Update Api 👇
module.exports.editLimit = async function (req, res) {
  try {
    let { id, user_id, gateway, currency, max, min } = req.body;
 
    let details = {
      user_id,
      gateway,
      currency, 
      max, 
      min
    };

    if (id) {
      let sql = "UPDATE tbl_set_limit SET ? where id = ?";
      let result = await mysqlcon(sql, [details, id]);
      if (result) {
        return res.json(200, {
          message: "Data Updated ✅",
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
module.exports.readOneLimit = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT tbl_set_limit.id, tbl_set_limit.user_id, tbl_user.name, tbl_set_limit.gateway, payment_gateway.gateway_name, tbl_set_limit.currency, tbl_set_limit.min, tbl_set_limit.max, tbl_set_limit.status, tbl_set_limit.created_on, tbl_set_limit.updated_on FROM tbl_set_limit INNER JOIN tbl_user ON tbl_set_limit.user_id = tbl_user.id INNER JOIN payment_gateway ON tbl_set_limit.gateway=payment_gateway.id WHERE tbl_set_limit.id = ?";
    let result = await mysqlcon(sql, [id]);
    res.json(result[0]);
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};