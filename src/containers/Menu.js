import React, { useContext }  from 'react';
import AppContext from '../context/AppContext';

const Menu = () => {

    const {state: {permission, user}} = useContext(AppContext);

    return (
        <div>
        </div>
    )
}

export default Menu
