const mysqlcon = require('../config/db_connection');

// tbl_per_day_payin_records


let pagination = (total,page,limit)=>{
    

    let numOfPages = Math.ceil(total / limit)
    let start = ((page * limit) - (limit))

    return {limit,start,numOfPages}
}


module.exports.defaultMEOD = async function(req,res){

    try {

        let {from,to,merchantName,searchText}  = req.body;


        if(searchText === 'Update' || searchText === 'update' || searchText === 'UPDATE'){

            searchText = 0;
         

        }

        if(searchText === 'Updated' || searchText === 'updated' || searchText === 'UPDATED'){

            searchText = 1;

        }
        
        let sqld;

        if(from && to){
            sqld = "";
            sqld += " AND DATE(tbl_per_day_payin_records.created_on) >= '"+from+"' AND DATE(tbl_per_day_payin_records.created_on) <= '"+to+"'";
         
            if(merchantName){
                sqld += " AND tbl_per_day_payin_records.users_id = '"+merchantName+"'";
      
            }

        }
        else if(merchantName){
            sqld = "";

            sqld += " AND tbl_per_day_payin_records.users_id = '"+merchantName+"'";         

        }

        let sqlM = "SELECT id,name from tbl_user WHERE status = 1 AND complete_profile = 1";
        let resultM = await mysqlcon(sqlM);
         

        let sql = "SELECT COUNT(*) as Total FROM tbl_user INNER JOIN tbl_per_day_payin_records ON tbl_user.id = tbl_per_day_payin_records.users_id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1";

        // let sql = "SELECT tbl_user.name,tbl_per_day_payin_records.* FROM `tbl_user` INNER JOIN `tbl_per_day_payin_records` ON tbl_user.id = tbl_per_day_payin_records.users_id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1"

        if(from || to || merchantName){
            sql+=sqld;
        }
        

        
        if(searchText === 0 || searchText === 1){

            if(from || to || merchantName){
                sql+= " AND (tbl_per_day_payin_records.wallet_status = " +searchText+ ")";
               
            }else{
                sql+= " AND (tbl_per_day_payin_records.wallet_status = " +searchText+ ")";

            }
          
        }
        else if(searchText){

            if(from || to || merchantName){

                sql+= " AND ((tbl_per_day_payin_records.date LIKE '%" +searchText+ "%') OR (tbl_per_day_payin_records.no_of_trx LIKE '%" +searchText+ "%') OR (DATE(tbl_per_day_payin_records.created_on) LIKE '%" +searchText+ "%') OR (DATE(tbl_per_day_payin_records.updated_on) LIKE '%" +searchText+ "%'))";

            }else{
                sql+= " AND ((tbl_per_day_payin_records.date LIKE '%" +searchText+ "%') OR (tbl_per_day_payin_records.no_of_trx LIKE '%" +searchText+ "%') OR (DATE(tbl_per_day_payin_records.created_on) LIKE '%" +searchText+ "%') OR (DATE(tbl_per_day_payin_records.updated_on) LIKE '%" +searchText+ "%'))";
            }
            

        }

        let result = await mysqlcon(sql);

        let total  = result[0].Total;
        let Page = req.body.page ? Number(req.body.page) : 1;
        let limit = req.body.limit ? Number(req.body.limit) : 10;

        let page = pagination(total,Page,limit);


        let sql1 = "SELECT tbl_user.name,tbl_per_day_payin_records.* FROM tbl_user INNER JOIN tbl_per_day_payin_records ON tbl_user.id = tbl_per_day_payin_records.users_id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1";

        if(from || to || merchantName){
            sql1 += sqld;
            
        }


        if(searchText === 0 || searchText === 1){

            if(from || to || merchantName){
                sql1+= " AND (tbl_per_day_payin_records.wallet_status = " +searchText+ ")";
               
            }else{
                sql1+= " AND (tbl_per_day_payin_records.wallet_status = " +searchText+ ")";

            }
          
        }
        else if(searchText){

            if(from || to || merchantName){

                sql1+= " AND ((tbl_per_day_payin_records.date LIKE '%" +searchText+ "%') OR (tbl_per_day_payin_records.no_of_trx LIKE '%" +searchText+ "%') OR (DATE(tbl_per_day_payin_records.created_on) LIKE '%" +searchText+ "%') OR (DATE(tbl_per_day_payin_records.updated_on) LIKE '%" +searchText+ "%'))";

            }else{
                sql1+= " AND ((tbl_per_day_payin_records.date LIKE '%" +searchText+ "%') OR (tbl_per_day_payin_records.no_of_trx LIKE '%" +searchText+ "%') OR (DATE(tbl_per_day_payin_records.created_on) LIKE '%" +searchText+ "%') OR (DATE(tbl_per_day_payin_records.updated_on) LIKE '%" +searchText+ "%'))";
            }
       

        }

        sql1+=" ORDER BY created_on DESC LIMIT ?,?";


        let result1 = await mysqlcon(sql1,[page.start,page.limit]);


        if (result1.length === 0) {
            return res.json(201,{
                message: `No Record Found`,
                data: result1
            })
        } else {


            if(from && to){


                if(merchantName){

                    return res.json(200,{
                            message: `All Records are ${total} from date ${from} to ${to} for merchant id ${merchantName}`,
                            currentPage: Page,
                            totalPages: page.numOfPages,
                            pageLimit: page.limit,
                            merchants:resultM,
                            data: result1
                    })

                }  
                
                return res.json(200,{
                    message: `All Records are ${total} from date ${from} to ${to}`,
                    currentPage: Page,
                    totalPages: page.numOfPages,
                    pageLimit: page.limit,
                    merchants:resultM,
                    data: result1

                })

    
            }
            else if(merchantName){
                
                        return res.json(200,{
                            message: `All Records are ${total} for merchant id ${merchantName} `,
                            currentPage: Page,
                            totalPages: page.numOfPages,
                            pageLimit: page.limit,
                            merchants:resultM,
                            data: result1
                        })


            }
            

            return res.json(200,{
                message: `All Records are ${total}`,
                currentPage: Page,
                totalPages: page.numOfPages,
                pageLimit: page.limit,
                merchants:resultM,
                data: result1
            })

            
        }

        
    } catch (error) {
        console.log(error);

        return res.json(500,{
            message: "error occurered",
            error: error
        })
        
    }
}


module.exports.toggleStatusMEOD = async function(req,res){


    try {

        let {status,id} = req.body;
        // status = Number(status);

       

        // if(status !== '1'){
        //     return res.json(201,{
        //         message: `Status Not Updated`,
            
        //     })
            
        // }

        let sql = "UPDATE tbl_per_day_payin_records SET wallet_status = ? WHERE id = ?";
        let result = await mysqlcon(sql, [status,id]);

        

        if(result.affectedRows > 0){
            return res.json(200,{
                message: `Status ${status === '1' ? 'Updated' : 'Update'} Successfully `,
                data: result,
                sql

            })
        }else{

            return res.json(201,{
                message: "Error while Changing Status",
                data: result

            })

        }

        
    } catch (error) {

        return res.json(500,{
            message: "error occurered",
            error: error
        })
        
    }

}
