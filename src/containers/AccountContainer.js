import React from 'react'
import DeleteAuthor from '../components/DeleteAuthor'
import EditUsername from '../components/EditUsername'
import EditPassword from '../components/EditPassword'

const AccountContainer = (props) => {
   return ( <>
         <div style={{textAlign: "center", marginTop: "20%"}}>
            <EditUsername />
            <EditPassword />
            <h3>Delete Account</h3>
            <DeleteAuthor />
         </div>
    </>)
}

export default AccountContainer