const mysqlcon = require('../config/db_connection');


let pagination = (total,page,limit)=>{
    

    let numOfPages = Math.ceil(total / limit)
    let start = ((page * limit) - (limit))

    return {limit,start,numOfPages}
}


module.exports.defaultSettlement = async function(req,res){

    try {

        let {group_id} = req.user;
        
        let sql = "SELECT COUNT(*) as Total FROM tbl_settlement";
        let result = await mysqlcon(sql);

        let total  = result[0].Total;
        let Page = req.body.page ? Number(req.body.page) : 1;
        let limit = req.body.limit ? Number(req.body.limit) : 10;

        let page = pagination(total,Page,limit);

        let sql1 = "SELECT tbl_user.name,tbl_settlement.* FROM tbl_user INNER JOIN tbl_settlement ON tbl_user.id = tbl_settlement.user_id ORDER BY created_on DESC LIMIT ?,?";

        let result1 = await mysqlcon(sql1,[page.start,page.limit]);

        let sqlM = "SELECT id,name from tbl_user WHERE status = 1 AND complete_profile = 1";
        let resultM = await mysqlcon(sqlM);

        let sqlC = "SELECT id as currencyId,sortname from countries ORDER BY sortname ASC";
        let resultC = await mysqlcon(sqlC);

        if(result1.length !== 0){

            return res.json(200,{
                message:`Total settlements are ${total}`,
                currentPage: Page,
                totalPages: page.numOfPages,
                pageLimit: page.limit,
                group_id:group_id,
                merchants:resultM,
                currency:resultC,
                data: result1         

            })
        }
        else{

            return res.json(201,{
                message:`No Record Found`,
                group_id:group_id,
                merchants:resultM,
                currency:resultC,
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


module.exports.toggleSettlement = async function(req,res){
    
    try {

        let {id} = req.body;
        let {group_id} = req.user;
        

        let sql="";

        let sqlCheck = "SELECT status FROM tbl_settlement WHERE id = ?";
        let resultCheck = await mysqlcon(sqlCheck,[id]);


        // SubAdmin
        if(group_id === 2){

            if(resultCheck.length !== 0){

                if(resultCheck[0].status !== 1 && resultCheck[0].status !== 2){

                    sql += "UPDATE tbl_settlement SET status = 2 WHERE id = ?";

                }else{
                    return res.json(200,{
                        message:`Already Status Updated to ${resultCheck[0].status === 2 ? '2 by SubAdmin':resultCheck[0].status === 1 ? '1 by SuperAdmin':''}`,
                    

                    })
                }
                

            }

        }
        
        // SuperAdmin
        if(group_id === 1){

            if(resultCheck.length !== 0){

                if(resultCheck[0].status !== 1){

                    sql += "UPDATE tbl_settlement SET status = 1 WHERE id = ?";

                }else{
                    return res.json(200,{
                        message:`Status is Already ${resultCheck[0].status === 1 ? 'updated to 1 by SuperAdmin':''}`
                    })
                }

            }


        }

        

       let result = await mysqlcon(sql,[id]);
          
        

        if(result.affectedRows > 0){

            return res.json(200,{
                message:`Settlement Approved  ${group_id === 1 ? 'to 2 by SuperAdmin': group_id === 2 ? ' to 1 by SubAdmin':''} `,
                data: result        

            })
        }
        else{

            return res.json(201,{
                message:`No Record Found`,
                data: result  

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



module.exports.createSettlement = async function(req,res){

    try {

        let {group_id} = req.user;
      
     
        let { 
                settlementId,
                merchant_id,
                settlementType,
                currency,
                toCurrency,
                walletAddress,
                accountNumber,
                available_balance,
                requested_time,
                settlement_time,
                requestedAmount,
                fee_charge,
                total_charges,
                net_amount_for_settlement,
                exchangeRate,
                bankName,
                branchName,
                city,
                zip_code,
                country,
                swiftCode,
                Settlement_Ammount,
                merchant_name

                } = req.body;



    //   let total_charges = requestedAmount - (requestedAmount * fee_charge) / 100;

    //   let Settlement_Ammount = total_charges / exchangeRate;
 

      let Settlement = {
          settlementId: settlementId,
          user_id: merchant_id,
          settlementType: settlementType,
          fromCurrency: currency,
          toCurrency: toCurrency,
          walletAddress: "",
          accountNumber: accountNumber,
          available_balance: available_balance,
          requested_time,
          settlement_time,
          requestedAmount: requestedAmount,
          charges: fee_charge, 
          totalCharges: total_charges,
          net_amount_for_settlement:net_amount_for_settlement,
          exchangeRate: exchangeRate,
          bankName: bankName,
          branchName:branchName,
          city:city,
          zip_code:zip_code,
          country: country,
          swiftCode: swiftCode,
          settlementAmount: Settlement_Ammount, 
          merchant_name,
          source:group_id === 1 ? "By SuperAdmin" : "By SubAdmin"
      };

      if (Settlement.settlementType === "CRYPTO") {
        Settlement = {
          settlementId: settlementId, // id = date
          user_id: merchant_id,
          settlementType: settlementType,
          fromCurrency: currency, // like USD
          toCurrency: toCurrency,
          walletAddress,
          available_balance: available_balance,
          requested_time,
          settlement_time,
          accountNumber: "",
          bankName: "",
          branchName: "",
          city: "",
          country: "",
          swiftCode: "",
          zip_code:zip_code,
          requestedAmount: requestedAmount,
          charges: fee_charge, 
          totalCharges: total_charges, 
          net_amount_for_settlement:net_amount_for_settlement,
          exchangeRate: exchangeRate, 
          settlementAmount: Settlement_Ammount,
          merchant_name,
          source:group_id === 1 ? "By SuperAdmin" : "By SubAdmin"
        }

    }
      

      let sql2 = "INSERT INTO tbl_settlement SET ?";
      let result = await mysqlcon(sql2, Settlement);


      // let mail = send_mail.invoiceMail(Settlement,user.email);

      if(result.affectedRows > 0){
        return res.status(200).json({
            message: "Request settlement transaston Successfully",
            data:result
          });

      }else{

        return res.json(201,{
            message: "Error While Creating",
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


// for creating settlement we need  fee_charge and wallet for merchant list dropdown and for currency we need

module.exports.detailSettlement = async function(req,res){

    try {

        let {merchant_id,currency} = req.body;

        let sql="";
        let result;

        if(merchant_id && currency === undefined){
            sql += "SELECT fee_charge,wallet FROM tbl_user where id = ?";
            result = await mysqlcon(sql, [merchant_id]);
        }
        else if(currency){
            sql = "SELECT rate FROM tbl_settled_currency WHERE deposit_currency = ?";
            result = await mysqlcon(sql,[currency]);

        }

        if(result.length !== 0){

            return res.json(200,{
                message: `Data for ${(merchant_id && currency === undefined)?`merchant id ${merchant_id}`:currency?`currency ${currency}`:''}`,
                data:result
            })

        }else{
            return res.json(201,{
                message: "Not data Found",
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


// for updating page we need data
module.exports.getById = async function(req,res){

    try {

        let {id} = req.body;

        let sql = "SELECT * FROM tbl_settlement WHERE id = ?";
        let result = await mysqlcon(sql,[id]);

        if(result.length !== 0){
            return res.json(200,{
                message:`Settlement for id = ${id} `,
                data: result    

            })
        }
        else{

            return res.json(201,{
                message:`No Record Found`,
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

//update api
module.exports.updateSettlement = async function(req,res){
    
    try {

        // used to update
        let {id} = req.body;

        if(id === undefined){
            return res.json(201,{
                message:'Please send the id of the row by which i can search the record and update it'
            })
        }
            let { 
                settlementId,
                merchant_id,
                settlementType,
                currency,
                toCurrency,
                walletAddress,
                accountNumber,
                available_balance,
                requested_time,
                settlement_time,
                requestedAmount,
                fee_charge,
                total_charges,
                net_amount_for_settlement,
                exchangeRate,
                bankName,
                branchName,
                city,
                zip_code,
                country,
                swiftCode,
                Settlement_Ammount
    
        } = req.body;


        let Settlement = {
            settlementId: settlementId,
            user_id: merchant_id,
            settlementType: settlementType,
            fromCurrency: currency, 
            toCurrency: toCurrency,
            walletAddress: "",
            accountNumber: accountNumber,
            available_balance: available_balance,
            requested_time,
            settlement_time,
            requestedAmount: requestedAmount,
            charges: fee_charge, 
            totalCharges: total_charges, 
            net_amount_for_settlement:net_amount_for_settlement,
            exchangeRate: exchangeRate, 
            bankName: bankName,
            branchName:branchName,
            city:city,
            zip_code:zip_code,
            country: country,
            swiftCode: swiftCode,
            settlementAmount: Settlement_Ammount, 
        };
  
        if (Settlement.settlementType === "CRYPTO") {
          Settlement = {
            settlementId: settlementId, 
            user_id: merchant_id,
            settlementType: settlementType,
            fromCurrency: currency, 
            toCurrency: toCurrency,
            walletAddress,
            available_balance: available_balance,
            requested_time,
            settlement_time,
            accountNumber: "",
            bankName: "",
            branchName: "",
            city: "",
            country: "",
            swiftCode: "",
            zip_code:zip_code,
            requestedAmount: requestedAmount,
            charges: fee_charge, 
            totalCharges: total_charges, 
            net_amount_for_settlement:net_amount_for_settlement,
            exchangeRate: exchangeRate, 
            settlementAmount: Settlement_Ammount,
          }
  
      }



      let sql = "UPDATE tbl_settlement SET ? WHERE id = ?";
      let result = await mysqlcon(sql,[Settlement,id]);


      if(result.affectedRows > 0){
        return res.json(200,{
            message:`Settlement Updated Successfully`,
            data:result
        })
      }
      else{
        return res.json(200,{
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