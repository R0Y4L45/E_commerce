import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../navBar/NavBar'
import Context from '../ContextWrapper';

const Cart = () => {
    const { carts, currency, setCarts } = useContext(Context);

    const handleCount = (plus_minus, obj) => {
        setCarts(prev =>
            prev.map(cart => {
                if (cart === obj) {
                    if (plus_minus === 'plus') return { ...cart, count: Math.min(cart.count + 1, obj.location.inventory) };
                    else if (plus_minus === 'minus') return { ...cart, count: Math.max(cart.count - 1, 1) };
                }
                return cart;
            })
        )
    }

    const calculateTax = () => (total() * 21 / 100).toFixed(1)

    const quantity = () => {
        let quantity = 0;
        carts.map(cart => {
            quantity += cart.count;
        });
        return quantity;
    }

    const total = () => {
        let total = 0;
        carts.map(cart => {
            total += cart.location.price * cart.count;
        });
        return total;
    }

    return (
        <>
            <NavBar />
            <div className="mt-12">
                <div className="flex px-4 sm:px-16 items-start justify-start">
                    <h1 className="text-2xl font-semibold text-gray-900 text-[32px] font-[raleway]">Cart</h1>
                </div>
                <div className="sm:px-9 mt-5 h-full w-full">
                    <div className="px-4 py-6 sm:px-8 sm:py-10">
                        <div className="flow-root">
                            <ul className="-my-8">
                                {
                                    carts ?
                                        carts.map((obj, index) =>
                                            <li
                                                key={index}
                                                className="flex flex-col space-y-3 py-6 sm:py-8 border-t text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                                <div className="shrink-0 relative">
                                                    <span
                                                        className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-black text-sm font-medium text-white shadow sm:-top-2 sm:-right-2"
                                                    >
                                                        {obj.count}
                                                    </span>
                                                    <img
                                                        className="w-28 h-28 sm:h-44 sm:w-44 max-w-full rounded-lg object-cover"
                                                        src={obj != null &&
                                                            obj.location.gallery != null ?
                                                            obj.location.gallery[0] : ''}
                                                        alt="no photo" />
                                                    <div className="mt-4 flex gap-x-6 sm:gap-x-12 sm:mt-3">
                                                        <button onClick={() => handleCount('minus', obj)} className='w-9 h-9 border rounded font-bold ml-2.5 font-[raleway] text-[21px] font-[raleway]'>-</button>
                                                        <button onClick={() => handleCount('plus', obj)} className='w-9 h-9 border rounded ml-10 font-bold text-[21px] font-[raleway] font-[raleway]'>+</button>
                                                    </div>
                                                </div>
                                                <div className="relative flex flex-1 flex-col justify-between">
                                                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                        <div className="pr-8 sm:pr-5">
                                                            <p className="text-base font-semibold text-[20px] font-[raleway] text-black">{obj.location.brand}</p>
                                                            <p className="text-base font-semibold font-[raleway] text-gray-900">{obj.location.title}</p>
                                                        </div>
                                                        <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                            <p
                                                                className="shrink-0 w-20 text-base font-semibold font-[raleway] text-gray-900 sm:order-2 sm:ml-8 sm:text-right"
                                                            >
                                                                {currency}{currency.charCodeAt() == '8364' ? (0.9259 * obj.location.price).toFixed(2) :
                                                                    currency.charCodeAt() == '8380' ? (1.7 * obj.location.price).toFixed(2) : obj.location.price}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className='uppercase pt-3 text-gray-900 font-[raleway] font-bold text-[12px]'>size:</p>
                                                        </div>
                                                        <div></div>
                                                        <div className="mt-4 flex gap-x-3 sm:mt-3">
                                                            {
                                                                obj.location.size.map((size, index) =>
                                                                    <button
                                                                        key={index}
                                                                        className='uppercase border rounded text-[12px] font-[raleway] w-16 h-11'
                                                                    >
                                                                        {size}
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                        <div></div>
                                                        <div className='pt-1'>
                                                            <p className='uppercase pt-3 text-gray-900 font-[raleway] font-bold text-[12px]'>color:</p>
                                                        </div>
                                                        <div></div>
                                                        <div className="flex gap-x-3 pt-3">
                                                            {
                                                                obj.location.colors.map((color, index) =>
                                                                    <button
                                                                        onMouseOver={e => e.currentTarget.style.borderBlockColor = 'black'}
                                                                        onMouseLeave={e => e.currentTarget.style.borderBlockColor = ''}
                                                                        key={index}
                                                                        style={{ backgroundColor: color }}
                                                                        className='w-9 h-9 border-2 font-[raleway] bg-blue-500 w-16 h-11'></button>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                                        <button
                                                            type="button"
                                                            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                                            onClick={() => setCarts(prev => prev.filter(item => item != obj))}
                                                        >
                                                            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" className=""></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ) : ''
                                }
                            </ul>
                        </div>
                        <div className="mt-6 space-y-3 border-y py-8">
                            <div className="flex items-center justify-between">
                                <p className="text-gray-400 font-[raleway]">Tax 21%</p>
                                <p className="text-lg font-semibold text-gray-900 font-[raleway]">
                                    {currency}
                                    {
                                        currency.charCodeAt() == '8364' ?
                                            (0.9259 * calculateTax()).toFixed(2) :
                                            currency.charCodeAt() == '8380' ?
                                                (1.7 * calculateTax()).toFixed(2) : calculateTax()
                                    }
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-400 font-[raleway]">Quantity</p>
                                <p className="text-lg font-semibold text-gray-900 font-[raleway]"
                                >
                                    {
                                        quantity()
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-2xl font-medium text-gray-900 font-[raleway]">Total</p>
                            <p className="text-2xl font-semibold text-gray-900 font-[raleway]"
                            >
                                {currency}
                                {
                                    currency.charCodeAt() == '8364' ?
                                        (0.9259 * total()).toFixed(2) :
                                        currency.charCodeAt() == '8380' ?
                                            (1.7 * total()).toFixed(2) : total()
                                }
                            </p>
                        </div>
                        <div className="mt-6 text-center">
                            <button type="button" className="group inline-flex uppercase w-full items-center justify-center rounded-md bg-custom_green px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 font-[raleway]">
                                order
                                <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart