const mysqlcon = require("../../config/db_connection");

// Default Api 👇
module.exports.siteSetting = async (req, res) => {
  try {
    let sql = "SELECT * FROM tbl_setting";
    let result = await mysqlcon(sql);
    if (result.length === 0) {
      return res.json(201, {
        message: "No Data Found",
        data: result[0],
      });
    } else {
      return res.json(201, {
        message: "Data Fetched Successfully✅",
        data: result[0],
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
module.exports.updateSiteSetting = async function (req, res) {
  try {
    let {
      contact_no,
      email,
      skype,
      copyright,
      full_address,
      facebook,
      twitter,
      linkedin,
      google_plus,
      id,
    } = req.body;
    let details = {
      contact_no,
      email,
      skype,
      copyright,
      full_address,
      facebook,
      twitter,
      linkedin,
      google_plus,
    };

    if (id) {
      let sql = "UPDATE tbl_setting SET ? where id = ?";
      let result = await mysqlcon(sql, [details, id]);
      if (result) {
        return res.json(200, {
          message: "Site Updated ✅",
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
// Read Update Api 👇
module.exports.readUpdateSiteSetting = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM tbl_setting WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    return res.json(200, {
      message: "Data Fetched Successfully✅",
      data: result[0],
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// 🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
