const mysqlcon = require("../config/db_connection");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const emailvalidator = require("email-validator");
var md5 = require("md5");
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (emailvalidator.validate(email)) {
      if (email && password) {
        let sql = "select * from tbl_login where email = ? and password = ?";
        let result = await mysqlcon(sql, [email, md5(password)]);
        if(result[0]?.role<=0){
          return res.status(202).json({
            message:"Role not Assign"
          })
        }
        else if (Object.keys(result).length > 0) {
          let token = await jwt.sign(
            { id: result[0].user_id,role:result[0].role },
            config.JWT_SECRET,
            {
              expiresIn: config.JWT_EXPIRY,
            }
          );
          return res.status(200).json({
            message: "Login Successful✅",
            token: token,
            role:result[0].role
          });
        } else {
          return res.status(201).json({
            message: "Invalid Email or Password",
          });
        }
      } else {
        return res.status(201).json({
          message: "Please fill all the fields",
        });
      }
    } else {
      return res.status(201).json({
        status: "error",
        message: "Invalid Email",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};
module.exports.modulePesmission = async (req, res) => {
  try {
    const { token } = req.body;
    if (token) {
      jwt.verify(token, config.JWT_SECRET, async (err, payload) => {
        if (err) {
          return res.status(201).json({
            message: "Login First",
          });
        }
        let id = payload.id;
        if (id) {
          let sqlPermission =
            "select * from tbl_module_action where user_id = ?";
          let permissionResult = await mysqlcon(sqlPermission, [id]);
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
          let output = [];
          for (let i = 0; i < modules.length; i++) {
            var j = 0;
            for (j = 0; j < permissionResult.length; j++) {
              if (permissionResult[j].module === modules[i]) {
                output.push(permissionResult[j]);
                break;
              }
            }
            if (j === permissionResult.length) {
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
          if (Object.keys(permissionResult).length > 0) {
            return res.status(200).json({
              message: "Permission List",
              permission: output,
            });
          } else {
            return res.status(201).json({
              message: "No Permission Found",
            });
          }
        } else {
          return res.json(201, {
            message: "Invalid Token",
          });
        }
      });
    } else {
      return res.status(201).json({
        message: "Please Provide token",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "error occurered",
      error: error,
    });
  }
};
