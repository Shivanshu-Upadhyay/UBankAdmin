const mysqlcon = require("../../config/db_connection");

// Default Api 👇

// module.exports.defaultIPWhitelist = async (req, res) => {
//   // 👇Pagination 👇
//   let pagination = (total, page, limit) => {
//     let numOfPages = Math.ceil(total / limit);
//     let start = page * limit - limit;
//     return { limit, start, numOfPages };
//   };

//   try {
//     let searchItem = req.body.searchItem;
//     let sql = "select count (*) as Total from tbl_ip_whitelist";
//     let sqlCount =
//       "select count (*) as Total FROM tbl_ip_whitelist WHERE page_title  LIKE '%" +
//       searchItem +
//       "%'";

//     let result = await mysqlcon(searchItem ? sqlCount : sql);
//     let total = result[0].Total;
//     let page = req.body.page ? Number(req.body.page) : 1;
//     let limit = req.body.limit ? Number(req.body.limit) : 10;
//     let { start, numOfPages } = pagination(total, page, limit);

//     let sql1 = "SELECT payment_gateway.gateway_name, tbl_ip_whitelist.ip, tbl_ip_whitelist.status, tbl_ip_whitelist.created_on, tbl_ip_whitelist.updated_on FROM tbl_ip_whitelist INNER JOIN payment_gateway ON tbl_ip_whitelist.gateway = payment_gateway.id";
//     let sql2 =
//       "SELECT * FROM tbl_ip_whitelist WHERE page_title  LIKE '%" +
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
//       console.log(error)
//     return res.json(500, {
//       message: "error occurered",
//       error: error,
//     });
//   }
// };


module.exports.defaultIPWhitelist = async function (req, res) {
  let pagination = (total, page, limit) => {
      let numOfPages = Math.ceil(total / limit);
      let start = page * limit - limit;
      return { limit, start, numOfPages };
    };
  try {
      const { to,from,date,searchText } = req.body;
    
      let sqlcount = "select count (*) as Total from tbl_ip_whitelist";
      let sqCountDate = "select count (*) as Total from tbl_ip_whitelist where DATE(created_on) = ?";
      let sqlToFromCount = "select count (*) as Total from tbl_ip_whitelist where DATE(created_on)  >= ? AND DATE(created_on) <= ?"
    
  
    let result = await mysqlcon(date?sqCountDate:(to&&from)?sqlToFromCount:searchText?sqlcount:sqlcount,date?[date]:(to&&from)?[from,to]: '');

    let total = result[0].Total;
    let Page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, Page, limit);

    let sql='SELECT payment_gateway.gateway_name, tbl_ip_whitelist.id, tbl_ip_whitelist.ip, tbl_ip_whitelist.status, tbl_ip_whitelist.created_on, tbl_ip_whitelist.updated_on FROM tbl_ip_whitelist INNER JOIN payment_gateway ON tbl_ip_whitelist.gateway = payment_gateway.id'
    let sqlDate = 'SELECT payment_gateway.gateway_name, tbl_ip_whitelist.id, tbl_ip_whitelist.ip, tbl_ip_whitelist.status, tbl_ip_whitelist.created_on, tbl_ip_whitelist.updated_on FROM tbl_ip_whitelist INNER JOIN payment_gateway ON tbl_ip_whitelist.gateway = payment_gateway.id where tbl_ip_whitelist(created_on) = ? ORDER BY created_on ASC limit ?,?'
    let sqlToFrom = 'SELECT payment_gateway.gateway_name, tbl_ip_whitelist.id, tbl_ip_whitelist.ip, tbl_ip_whitelist.status, tbl_ip_whitelist.created_on, tbl_ip_whitelist.updated_on FROM tbl_ip_whitelist INNER JOIN payment_gateway ON tbl_ip_whitelist.gateway = payment_gateway.id where tbl_ip_whitelist.created_on  >= ? AND tbl_ip_whitelist.created_on <= ? ORDER BY created_on ASC limit ?,?'


    // SELECT tbl_set_limit.user_id, tbl_user.name, payment_gateway.gateway_name, tbl_set_limit.currency, tbl_set_limit.min, tbl_set_limit.max, tbl_set_limit.status, tbl_set_limit.created_on, tbl_set_limit.updated_on FROM tbl_set_limit INNER JOIN tbl_user ON tbl_set_limit.user_id = tbl_user.id INNER JOIN payment_gateway ON tbl_set_limit.gateway = payment_gateway.id where tbl_set_limit.created_on >= ? AND tbl_set_limit.created_on <= ? ORDER BY created_on ASC limit ?,?

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

// 👇 Create Api👇
module.exports.createIPWhitelist = async function (req, res) {
  try {
    let { gateway, ip } = req.body;

    let details = {
      gateway,
      ip
    };

    let sql = "INSERT INTO tbl_ip_whitelist SET ? , created_on = NOW() , updated_on = NOW()";

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

// Gateway
module.exports.allGateway = async function (req, res) {
    try{
        
        sql = "SELECT id, gateway_name from payment_gateway"
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

// Toggle Button
module.exports.toggleIP = async function (req, res) {
    try {
      let { status, id } = req.body;
  
      let sql = "UPDATE tbl_ip_whitelist SET status = ? WHERE id = ?";
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

// 👇 Update Api 👇
module.exports.editIP = async function (req, res) {
  try {
    let { gateway, ip, id } = req.body;
 
    let details = {
      gateway,
      ip
    };

    if (id) {
      let sql = "UPDATE tbl_ip_whitelist SET ? where id = ?";
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
module.exports.readOneIP = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM tbl_ip_whitelist WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    res.json(result[0]);
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};