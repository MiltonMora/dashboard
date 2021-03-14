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

    const setThema = payload => {
        setState({
            ...state,
            thema: payload,
        });
    }

    return {
        menuStatus,
        setThema,
        state,
    }
};

export default useInitialState;