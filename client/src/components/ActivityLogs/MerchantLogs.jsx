import React from 'react'
import CommonComp from './CommonComp'

function MerchantLogs() {
    const tableHeading = ["Merchant Name", "URL", "Time Spend", "Create", "Update"];
    
  return (
    <div><CommonComp tableHeading={tableHeading} apiEndPoint="merchantLogs" name="Merchant" /></div>
  )
}

export default MerchantLogs