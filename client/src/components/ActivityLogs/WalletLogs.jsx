import React from 'react'
import CommonComp from './CommonComp'

function WalletLogs() {
    const tableHeading = ["Merchant", "Current Wallet", "Update Wallet", "Action", "Effective Amt","Order Id","By Admin","Create"];
    
  return (
    <div><CommonComp tableHeading={tableHeading} apiEndPoint="walletLogs" name="Wallet" />
    
    </div>
  )
}

export default WalletLogs