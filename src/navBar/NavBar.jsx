import React, { useContext, useState } from 'react'
import Context from '../ContextWrapper';
import { Link, redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false),
        handleMenuToggle = () => setShowMenu(!showMenu),
        { state, dispatch, setCurrency, currency, setAuth, carts } = useContext(Context);

    const logOut = () => {
        Cookies.remove(localStorage.getItem('curUser'));
        localStorage.removeItem('curUser');
        setAuth(false);
        redirect('/login');
    }

    return (
        <nav className="flex flex-col px-6 py-4 sm:px-16 whitespace-nowrap bg-white">
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    className="flex justify-start sm:hidden navbar-burger p-2 px-5 text-teal-500 rounded border border-teal-500"
                    onClick={handleMenuToggle}
                >
                    {showMenu ? (
                        <svg
                            className="fill-current h-4 w-4 text-teal-500"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Close</title>
                            <path
                                fillRule="evenodd"
                                d="M13.414 6l3.536-3.536A2 2 0 0 0 15.536 .050L12 3.586 8.464 .050a2 2 0 0 0-2.828 2.828L9.172 6 .536 14.636a2 2 0 1 0 2.828 2.828L12 9.172l3.536 3.536a2 2 0 1 0 2.828-2.828L13.414 6z"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="fill-current h-4 w-4"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    )}
                </button>
                <div className="hidden gap-5 justify-start sm:flex">
                    <div className="text-base leading-5 uppercase text-zinc-900 gap-9 flex-grow sm:flex sm:items-center sm:w-auto">
                        <Link
                            to='/category?Cars'
                            className={`pt-4 uppercase pb-7 font-['raleway'] ${state.obj.women ? 'border-b-2 border-[#5ECE7B] text-[#5ECE7B]' : ''}`}
                            onClick={() => dispatch({ type: 'women' })}
                        >
                            car
                        </Link>
                        <Link
                            to="/category?Tech"
                            className={`pt-4 uppercase pb-7 font-['raleway'] ${state.obj.men ? 'border-b-2 border-[#5ECE7B] text-[#5ECE7B]' : ''}`}
                            onClick={() => dispatch({ type: 'men' })}
                        >
                            technology
                        </Link>
                        <Link
                            to='/category?Clothing'
                            className={`pt-4 uppercase pb-7 font-['raleway'] ${state.obj.kids ? 'border-b-2 border-[#5ECE7B] text-[#5ECE7B]' : ''}`}
                            onClick={() => dispatch({ type: 'kids' })}
                        >
                            clothing
                        </Link>
                    </div>
                </div>
                <Link
                    to="/category"
                    className="flex justify-center items-center"
                    onClick={() => state.obj.women = state.obj.kids = state.obj.men = false}
                >
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b38d7740cb3d1ee4d09fa33450aed6df3f28e691eaf2c09cb00b7f1c1bba6a16?apiKey=7fd63095772b4b9cba810904a8369e88&"
                        className="w-10 h-10"
                    />
                </Link>
                <div className="flex gap-5">
                    <div className="flex items-center">
                        <select value={currency} className='pb-2 text-xl' onChange={
                            e => setCurrency(e.target.value.toString())
                        }>
                            <option className='text-xl'>&#36;</option>
                            <option className='text-xl'>&#x20BC;</option>
                            <option className='text-xl'>&#8364;</option>
                        </select>
                    </div>
                    <Link to='/cart' className='pt-2'>
                        <div className='shrink-0 relative'>
                            {
                                carts.length > 0 ?
                                    <span className={`absolute bottom-3 left-3 flex h-5 w-5 items-center justify-center rounded-full border bg-black text-sm
                                 font-medium text-white shadow sm:-top-2 sm:-right-2`}
                                    >{carts.length}</span> : ''
                            }
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/815dacbe8240837dd113a067558b5c70a3dbcb1d92a01e6caf91c222bc18aa2e?apiKey=7fd63095772b4b9cba810904a8369e88&"
                                className="w-5 h-5"
                            />
                        </div>
                    </Link>
                    <button onClick={logOut}>
                        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#374151" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    </button>
                </div>
            </div>
            {
                showMenu && (
                    <div className="flex flex-col border-b-2 items-center mt-4 space-y-2 sm:hidden">
                        <Link
                            to='/category?Cars'
                            className={`p-2 uppercase font-['railway'] ${state.obj.women ? 'border-b-2 border-t-2 border-green-400 text-green-400' : ''}`}
                            onClick={() => dispatch({ type: 'women' })}
                        >
                            cars
                        </Link>
                        <Link
                            to='/category?Tech'
                            className={`p-2 uppercase font-['railway'] ${state.obj.men ? 'border-b-2 border-t-2 border-green-400 text-green-400' : ''}`}
                            onClick={() => dispatch({ type: 'men' })}
                        >
                            technology
                        </Link>
                        <Link
                            to='/category?Clothing'
                            className={`p-2 uppercase font-['railway'] ${state.obj.kids ? 'border-b-2 border-t-2 border-green-400 text-green-400' : ''}`}
                            onClick={() => dispatch({ type: 'kids' })}
                        >
                            clothing
                        </Link>
                    </div>
                )
            }
        </nav >
    )
}

export default NavBar