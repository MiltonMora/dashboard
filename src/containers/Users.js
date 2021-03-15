import React, { useEffect } from 'react';

import { getUsers } from '../actions/UserActions';

function Users() {

    useEffect(()=> {
        
        getUsers()
        .then(res => {
            console.log(res)
          })
        .catch(err => {
            console.log(err)
          })
        
      },[]);
    return (
        <div>
        </div>
    )
}

export default Users
