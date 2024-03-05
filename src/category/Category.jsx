import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../navBar/NavBar'
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import Context from '../ContextWrapper';

const productsFunc = (p, currency, navigate) => {
    return (
        <div key={p._id} className='flex flex-col items-center p-0 md:p-2'>
            <div className='relative border-2 p-3 rounded-md hover:drop-shadow-2xl md:max-w-[600px] md:max-h-[370px] '>
                <img src={`${p.gallery[0]}`} className='w-full h-full rounded-md opacity-30 pb-4' />
                <a
                    onClick={() => navigate('/detail', { state: p })}
                    className='absolute bottom-1 sm:bottom-0 right-6'>
                    <svg className='w-10 sm:w-12' viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="26" cy="26" r="26" fill="#5ECE7B" />
                        <path d="M37.4736 19.8484C37.0186 19.2925 36.3109 18.9546 35.5785 18.9546H20.1907L19.711 17.1669C19.4326 16.1277 18.4732 15.4028 17.3608 15.4028H14.7837C14.3544 15.4028 14 15.7407 14 16.1523C14 16.5628 14.3534 16.9017 14.7837 16.9017H17.3608C17.7398 16.9017 18.0685 17.1433 18.1692 17.5058L21.2517 29.2494C21.53 30.2886 22.4894 31.0135 23.6018 31.0135H33.6833C34.7947 31.0135 35.7808 30.2886 36.0335 29.2494L37.9286 21.807C38.1053 21.1293 37.9543 20.4044 37.4736 19.8485L37.4736 19.8484ZM36.3879 21.4671L34.4928 28.9095C34.3921 29.272 34.0634 29.5136 33.6844 29.5136H23.6018C23.2228 29.5136 22.8941 29.272 22.7935 28.9095L20.5953 20.4772H35.5796C35.8323 20.4772 36.085 20.598 36.237 20.7915C36.388 20.984 36.463 21.2257 36.388 21.4673L36.3879 21.4671Z" fill="white" />
                        <path d="M24.1332 31.978C22.6932 31.978 21.5059 33.1135 21.5059 34.4905C21.5059 35.8675 22.6933 37.0029 24.1332 37.0029C25.5733 37.0039 26.7606 35.8684 26.7606 34.4912C26.7606 33.114 25.5732 31.9778 24.1332 31.9778V31.978ZM24.1332 35.4816C23.5519 35.4816 23.0968 35.0465 23.0968 34.4906C23.0968 33.9346 23.5519 33.4995 24.1332 33.4995C24.7146 33.4995 25.1696 33.9346 25.1696 34.4906C25.1687 35.0229 24.689 35.4816 24.1332 35.4816Z" fill="white" />
                        <path d="M32.825 31.9778C31.3849 31.9778 30.1976 33.1132 30.1976 34.4902C30.1976 35.8672 31.385 37.0027 32.825 37.0027C34.265 37.0027 35.4524 35.8672 35.4524 34.4902C35.4277 33.1141 34.265 31.9778 32.825 31.9778ZM32.825 35.4814C32.2437 35.4814 31.7886 35.0463 31.7886 34.4903C31.7886 33.9344 32.2437 33.4993 32.825 33.4993C33.4064 33.4993 33.8614 33.9344 33.8614 34.4903C33.8614 35.0227 33.3807 35.4814 32.825 35.4814Z" fill="white" />
                    </svg>
                </a>
            </div>
            <div className=''></div>
            <div className="mt-3 font-[raleway]">{p.title}</div>
            <div className="text-left font-[raleway] pb-2 font-bold">{currency}{currency.charCodeAt() == '8364' ? (0.9259 * p.price).toFixed(2) :
                currency.charCodeAt() == '8380' ? (1.7 * p.price).toFixed(2) : p.price}</div>
        </div>
    )
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const Category = () => {
    const [products, setProducts] = useState([]),
        [loading, setLoading] = useState(false),
        prop = useLocation(),
        { currency, oldUrl, setOldUrl } = useContext(Context),
        navigate = useNavigate(),
        l = useLocation();

    useEffect(() => {
        response();
        removeQueryParams();
    }, []);

    const response = async () => {
        let products = await fetch("http://localhost:5000/api/products", {
            headers: {
                'Authorization': `Bearer ${Cookies.get(localStorage.getItem('curUser'))}`
            }
        })
            .then(response => {
                if (response.ok) {
                    const contentType = response.headers.get('Content-Type');
                    return contentType && contentType.includes('application/json') ? response.json() : response.text();
                }
            })
            .catch(err => err);

        setProducts(products);
        await sleep(300);
        setLoading(true);
    }

    const removeQueryParams = () => {
        const { pathname, search } = window.location;
        if (search) {
            const newUrl = `${window.location.origin}${pathname}`;
            window.history.replaceState({}, document.title, newUrl);
            if (oldUrl == newUrl) {
                prop.search = '';
                setOldUrl(newUrl);
            }
        }
    };

    return (
        <>
            <NavBar />
            <header className="flex flex-col px-6 sm:px-16 whitespace-nowrap bg-white">
                <div className="flex justify-center items-center sm:block font-[raleway] py-6 pb-12 font-bold sm:font-normal text-3xl sm:text-5xl text-zinc-900 sm:pt-16">
                    Category name
                </div>
                {
                    !loading ? <p className='flex justify-center items-center text-3xl font-[raleway] font-bold'>loading...</p> :
                        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                            {
                                products.product.map(p => {
                                    if (prop.search != '') {
                                        if (prop.search == `?${p.category}`) {
                                            return productsFunc(p, currency, navigate);
                                        }
                                    } else {
                                        return productsFunc(p, currency, navigate);
                                    }
                                })
                            }
                        </div>
                }
            </header >
        </>
    )
}

export default Category