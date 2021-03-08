import { useState } from 'react';

import initialState from '../initialState';


const useInitialState = () => {
    const [state, setState] = useState(initialState);

    const addUserToken = payload => {
        setState({
            ...state,
            user: payload,
        });
    }
    return {
        addUserToken,
        state,
    }
};

export default useInitialState;