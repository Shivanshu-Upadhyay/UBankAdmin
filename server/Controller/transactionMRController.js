const mysqlcon = require('../config/db_connection');


let pagination = (total,page,limit)=>{
    

    let numOfPages = Math.ceil(total / limit)
    let start = ((page * limit) - (limit))

    return {limit,start,numOfPages}
}


// module.exports.defaultMR = async function(req,res){

//     try {

//         let { searchText } = req.body;

    
//         let sql = "SELECT COUNT(*) as Total FROM tbl_user INNER JOIN user_request ON tbl_user.id = user_request.merchant_id WHERE tbl_user.status = 1 AND complete_profile = 1";

//         if(searchText){
//             sql +=  " AND ((tbl_user.name LIKE '%" +searchText+ "%') OR (user_request.request_id LIKE '%" +searchText+ "%') OR (user_request.invoice_id LIKE '%" +searchText+ "%') OR (user_request.message LIKE '%" +searchText+ "%') OR (user_request.refund_status LIKE '%" +searchText+ "%') OR (user_request.created_on LIKE '%" +searchText+ "%') OR (user_request.amount LIKE '%" +searchText+ "%'))";
//         }
      
//         let result = await mysqlcon(sql);

//         let total  = result[0].Total;
//         let Page = req.body.page ? Number(req.body.page) : 1;
//         let limit = req.body.limit ? Number(req.body.limit) : 10;

//         let page = pagination(total,Page,limit);


//         let sql1 = "SELECT tbl_user.name,user_request.* FROM tbl_user INNER JOIN user_request ON tbl_user.id = user_request.merchant_id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1";


//         if(searchText){
//             sql1 +=  " AND ((tbl_user.name LIKE '%" +searchText+ "%') OR (user_request.request_id LIKE '%" +searchText+ "%') OR (user_request.invoice_id LIKE '%" +searchText+ "%') OR (user_request.message LIKE '%" +searchText+ "%') OR (user_request.refund_status LIKE '%" +searchText+ "%') OR (user_request.created_on LIKE '%" +searchText+ "%') OR (user_request.amount LIKE '%" +searchText+ "%'))";
//         }

//         sql1+=  " ORDER BY created_on DESC LIMIT ?,?";

//         let result1 = await mysqlcon(sql1,[page.start,page.limit]);


//         if (result1.length === 0) {
          
//            return res.json(201,{
//             message: `No record found.`,
//             data: result1
//         });

//         } else {
//             return res.json(200,{
//                 message: `All Records are ${total}`,
//                 currentPage: Page,
//                 totalPages: page.numOfPages,
//                 pageLimit: page.limit,
//                 data: result1
//             })
//         }


        
//     } catch (error) {

//         return res.json(500,{
//             message: "error occurered",
//             error: error
//         })
        
//     }

// }

//toggle status left

module.exports.defaultMR = async function(req,res){

    try {

        let { searchText } = req.body;

    
        let sql = "SELECT COUNT(*) as Total FROM tbl_user INNER JOIN user_request ON tbl_user.id = user_request.id";

        if(searchText){
            sql +=  " AND ((tbl_user.name LIKE '%" +searchText+ "%') OR (user_request.request_id LIKE '%" +searchText+ "%') OR (user_request.invoice_id LIKE '%" +searchText+ "%') OR (user_request.message LIKE '%" +searchText+ "%') OR (user_request.refund_status LIKE '%" +searchText+ "%') OR (user_request.created_on LIKE '%" +searchText+ "%') OR (user_request.amount LIKE '%" +searchText+ "%'))";
        }
      

        let result = await mysqlcon(sql);

        let total  = result[0].Total;
        let Page = req.body.page ? Number(req.body.page) : 1;
        let limit = req.body.limit ? Number(req.body.limit) : 10;

        let page = pagination(total,Page,limit);


        let sql1 = "SELECT tbl_user.name,user_request.* FROM tbl_user INNER JOIN user_request ON tbl_user.id = user_request.id ";


        if(searchText){
            sql1 +=  " AND ((tbl_user.name LIKE '%" +searchText+ "%') OR (user_request.request_id LIKE '%" +searchText+ "%') OR (user_request.invoice_id LIKE '%" +searchText+ "%') OR (user_request.message LIKE '%" +searchText+ "%') OR (user_request.refund_status LIKE '%" +searchText+ "%') OR (user_request.created_on LIKE '%" +searchText+ "%') OR (user_request.amount LIKE '%" +searchText+ "%'))";
        }

        sql1+=  " ORDER BY created_on DESC LIMIT ?,?";

        let result1 = await mysqlcon(sql1,[page.start,page.limit]);


        if (result1.length === 0) {
          
           return res.json(201,{
            message: `No record found.`,
            data: result1
        });

        } else {
            return res.json(200,{
                message: `All Records are ${total}`,
                currentPage: Page,
                totalPages: page.numOfPages,
                pageLimit: page.limit,
                data: result1
            })
        }


        
    } catch (error) {

        return res.json(500,{
            message: "error occurered",
            error: error
        })
        
    }

}


module.exports.toggleMR = async function(req,res){
    try {


            let sql = "UPDATE user_request set status = ? "
        
    } catch (error) {

        return res.json(500,{
            message: "error occurered",
            error: error
        })
        
    }
}