import Cookies from 'js-cookie';
import React, { useState, useReducer, createContext } from 'react'

const Context = createContext();
export default Context;

const reducer = (state, action) => {
    switch (action.type) {
        case 'women':
            return {
                obj: {
                    women: true,
                    men: false,
                    kids: false
                }
            }
        case 'men':
            return {
                obj: {
                    women: false,
                    men: true,
                    kids: false
                }
            }
        case 'kids':
            return {
                obj: {
                    women: false,
                    men: false,
                    kids: true
                }
            }
        default: return state
    }
}

export function ContextWrapper({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        obj: {
            women: false,
            men: false,
            kids: false
        }
    }),
        [currency, setCurrency] = useState('$'),
        [auth, setAuth] = useState(Cookies.get(localStorage.getItem('curUser')) == undefined ? false : true),
        [oldUrl, setOldUrl] = useState(''),
        [carts, setCarts] = useState([]),
        [productsCount, setProductsCount] = useState(0),
        contextData = {
            dispatch: dispatch,
            state: state,
            currency: currency,
            setCurrency: setCurrency,
            auth: auth,
            setAuth: setAuth,
            oldUrl: oldUrl,
            setOldUrl: setOldUrl,
            carts: carts,
            setCarts: setCarts,
            productsCount: productsCount,
            setProductsCount: setProductsCount
        };

    return <Context.Provider value={contextData}>{children}</Context.Provider>
}
