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

    return {
        menuStatus,
        state,
    }
};

export default useInitialState;