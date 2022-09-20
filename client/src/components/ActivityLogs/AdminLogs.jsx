import React from 'react'
import CommonComp from './CommonComp'

function AdminLogs() {
    const tableHeading = ["Admin", "URL", "Time Spend", "Create", "Update"];
    
  return (
    <div><CommonComp tableHeading={tableHeading} apiEndPoint="AdminLogs" name="Admin"/> </div>
  )
}

export default AdminLogs