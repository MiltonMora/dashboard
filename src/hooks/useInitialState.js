import { useState } from 'react';

import initialState from '../initialState';


const useInitialState = () => {
    const [state, setState] = useState(initialState);

    const menuStatus = payload => {
        setState({
            ...state,
            lateralMenu: payload,
        });
    }
    
    const setUser = payload => {
        setState({
            ...state,
            user: payload,
        });
    }

    return {
        menuStatus,
        setUser,
        state,
    }
};

export default useInitialState;