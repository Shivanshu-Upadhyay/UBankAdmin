const mysqlcon = require("../config/db_connection");
var md5 = require("md5");
let pagination = (total, page, limit) => {
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;
  return { limit, start, numOfPages };
};

module.exports.subAdmin = async function (req, res) {
  try {
    let { searchText } = req.body;

    let sql = "";
    if (searchText) {
      sql =
        "SELECT COUNT(*) as Total FROM tbl_login WHERE ((firstname LIKE '%" +
        searchText +
        "%') OR (lastname LIKE '%" +
        searchText +
        "%') OR (email LIKE '%" +
        searchText +
        "%'))";
    } else {
      sql = "SELECT COUNT(*) as Total FROM tbl_login";
    }

    let result = await mysqlcon(sql);

    let total = result[0].Total;
    let Page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;

    let page = pagination(total, Page, limit);

    let sql1 = "SELECT * FROM tbl_login";

    if (searchText) {
      sql1 +=
        " WHERE ((firstname LIKE '%" +
        searchText +
        "%') OR (lastname LIKE '%" +
        searchText +
        "%') OR (email LIKE '%" +
        searchText +
        "%'))";
    }

    sql1 += " ORDER BY created_on DESC LIMIT ?,?";

    let result1 = await mysqlcon(sql1, [page.start, page.limit]);

    let sql2 = "SELECT id,role_name FROM tbl_role";
    let result2 = await mysqlcon(sql2);

    if (result1.length === 0) {
      return res.json(201, {
        message: `No record found.`,
        roles: result2,
        data: result1,
      });
    } else {
      return res.json(200, {
        message: `All Records are ${total}`,
        currentPage: Page,
        totalPages: page.numOfPages,
        pageLimit: page.limit,
        roles: result2,
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
module.exports.toggleSubAdmin = async function (req, res) {
  try {
    let { status, id } = req.body;
    

    if (status !== "0" && status !== "1") {
      return res.json(201, {
        message: "Status Not Updated",
      });
    }

    let sql = "UPDATE tbl_login SET status = ? WHERE user_id = ?";
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
module.exports.deleteSubAdmin = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "DELETE FROM tbl_login WHERE user_id = ?";
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

module.exports.createSubAdmin = async function (req, res) {
  try {
    let { fname, lname, email, password, role } = req.body;
   
    password = md5(password);

    let details = {
      firstname: fname,
      lastname: lname,
      email: email,
      password: password,
      role: role,
    };

    let sql = "INSERT INTO tbl_login SET ?";
    let result = await mysqlcon(sql, [details]);

    if (result.affectedRows > 0) {
      return res.json(200, {
        message: `${
          role === "1" ? "SubAdmin" : role === "2" ? "Settlement" : ""
        } Created Successfully`,
        data: result,
      });
    } else {
      return res.json(201, {
        message: `Error in Creating`,
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
module.exports.getRole = async function(req,res){

  try {

      let sql = "SELECT * FROM tbl_role";
      let result =await mysqlcon(sql);

      if(result.length !== 0){
          return res.json(200,{
              message:"Role are",
              data:result
          })
      }
      else{

          return res.json(201,{
              message:"No Record Found",
              data:result
          })

      }


      
  } catch (error) {

      return res.json(500,{
          message: "error occurered",
          error: error
      })
      
  }



}
module.exports.getPermissionDetails = async function (req, res) {
  try {
    let { id } = req.body;

    let modules = [
      "Sub Admin Module",
      "PG Module",
      "MID Module",
      "Chinese bank Module",
      "Bankcode BankConnect Module",
      "Bankcode Module",
      "Merchant Module",
      "Transaction Module",
      "SandBox Module",
      "Banner Module",
      "Settlement Module",
      "Activity Logs",
      "Contact Module",
      "CMS Module",
      "Meta Module",
      "Setting Module",
      "Change Password",
    ];

    let sql1 =
      "SELECT firstname,lastname,email FROM tbl_login WHERE user_id = ?";
    let result1 = await mysqlcon(sql1, [id]);

    let sql =
      "SELECT module,m_add,m_edit,m_delete,m_view,status FROM tbl_module_action WHERE user_id = ?";

    let result = await mysqlcon(sql, [id]);

    let output = [];

    for (let i = 0; i < modules.length; i++) {
      var j = 0;

      for (j = 0; j < result.length; j++) {
        if (result[j].module === modules[i]) {
          output.push(result[j]);
          break;
        }
      }
      if (j === result.length) {
        output.push({
          module: modules[i],
          m_add: 0,
          m_edit: 0,
          m_delete: 0,
          m_view: 0,
          status: 0,
        });
      }
    }

    if (result1.length !== 0) {
      return res.json(200, {
        message: `Take Permission`,
        details: result1,
        permissions: output,
      });
    } else {
      return res.json(201, {
        message: `No SubAdmin Found`,
        details: result1,
        permissions: output,
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
module.exports.permissionSubAdmin = async function (req, res) {
  try {
    let { id, actionData } = req.body;
    
    let modules = [
      "Sub Admin Module",
      "PG Module",
      "MID Module",
      "Chinese bank Module",
      "Bankcode BankConnect Module",
      "Bankcode Module",
      "Merchant Module",
      "Transaction Module",
      "SandBox Module",
      "Banner Module",
      "Settlement Module",
      "Activity Logs",
      "Contact Module",
      "CMS Module",
      "Meta Module",
      "Setting Module",
      "Change Password",
    ];

   

    actionData = JSON.parse(actionData);


    let result;

    for (let i = 0; i < actionData.length; i++) {
      let name = modules[actionData[i].moduleName];

      if (actionData[i].status === 0) {
        let sqlCheck =
          "SELECT * FROM tbl_module_action WHERE user_id = ? AND module = ?";
        let resultCheck = await mysqlcon(sqlCheck, [id, name]);

        let sql = "";

        if (resultCheck.length !== 0) {
          sql +=
            "UPDATE tbl_module_action SET ? WHERE user_id = ? AND module = ?";
        } else {
          sql += "INSERT INTO tbl_module_action SET ?";
        }

        let details = {
          user_id: id,
          module: name,
          m_add: 0,
          m_edit: 0,
          m_delete: 0,
          m_view: 0,
          status: actionData[i].status,
        };

        if (resultCheck.length !== 0) {
          result = await mysqlcon(sql, [details, id, name]);
        } else {
          result = await mysqlcon(sql, [details]);
        }
      } else {
        let sqlCheck =
          "SELECT * FROM tbl_module_action WHERE user_id = ? AND module = ?";
        let resultCheck = await mysqlcon(sqlCheck, [id, name]);

        let sql = "";

        if (resultCheck.length !== 0) {
          sql +=
            "UPDATE tbl_module_action SET ? WHERE user_id = ? AND module = ?";
        } else {
          sql += "INSERT INTO tbl_module_action SET ?";
        }

        let detail = {
          user_id: id,
          module: name,
          m_add: actionData[i].m_add,
          m_edit: actionData[i].m_edit,
          m_delete: actionData[i].m_delete,
          m_view: actionData[i].m_view,
          status: actionData[i].status,
        };

        if (resultCheck.length !== 0) {
          result = await mysqlcon(sql, [detail, id, name]);
        } else {
          result = await mysqlcon(sql, [detail]);
        }
      }
    }

    if (result.affectedRows > 0) {
      return res.json(200, {
        message: "Row Created/Updated",
        data: result,
      });
    } else {
      return res.json(201, {
        message: "Error while Creating/Updating",
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
module.exports.getViewSubAdmin = async function(req,res){
  try {

      let {id} = req.body;
      let sql = "SELECT * FROM tbl_login WHERE user_id = ?";
      let result = await mysqlcon(sql,[id]);

      if(result.length !== 0){
          return res.json(200,{
              message:`Data for id = ${id}`,
              data:result
          })
      }
      else{

          return res.json(201,{
              message:`No Record Found`,
              data:result
          })

      }
      
  } catch (error) {

      return res.json(500,{
          message: "error occurered",
          error: error
      })
      
  }
}
module.exports.updateSubAdmin = async function(req,res){

  try {

      let {id,fname,lname,email,password} = req.body;

      let details = {
          firstname:fname,
          lastname:lname,
          email,
          
      }

      if(password){
          details = {
              firstname:fname,
              lastname:lname,
              email,
              password:md5(password)

          }   
      }

      let sql = "UPDATE tbl_login SET ? WHERE user_id = ?";
      let result = await mysqlcon(sql,[details,id]);

   
      if(result.affectedRows > 0){
          return res.json(200,{
              message:`Updated Data✅`,
              data:result
          })
      }
      else{

          return res.json(201,{
              message:`Error While Updating`,
              data:result
          })

      }
      
  } catch (error) {

      return res.json(500,{
          message: "error occurered",
          error: error
      })
      
  }
}
