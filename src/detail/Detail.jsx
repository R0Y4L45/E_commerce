import React, { useContext, useState } from 'react'
import NavBar from '../navBar/NavBar'
import { useLocation, useNavigate } from 'react-router-dom'
import Context from '../ContextWrapper';

const Detail = () => {
    const location = useLocation().state,
        [currenntPic, setCurrentPic] = useState(location != null && location.gallery != null && location.gallery[0] != null ? location.gallery[0] : ''),
        { currency, setCarts } = useContext(Context),
        navigate = useNavigate();

    return (
        <>
            <NavBar />
            <div className='my-12 md:my-24 md:flex md:flex-row lg:gap-6 xl:gap-12 mx-4 md:mx-12'>
                <div className='flex mb-12 sm:p-0 gap-4 flex-row md:flex-col w-1/4 md:w-[120px] lg:w-[120px] xl:w-[120px] 2xl:w-[120px]'>
                    {
                        location != null &&
                        location.gallery != null &&
                        location.gallery.map((pic, index) =>
                            <img
                                key={index}
                                onMouseOver={e => setCurrentPic(e.currentTarget.src)}
                                className='md:pb-[1.5em] lg:pb-[2.5em]'
                                alt='no photo'
                                src={pic} />
                        )
                    }
                </div>
                <div className='flex mb-12 items-center md:ml-[2.5em] w-full h-full lg:ml-[2.5em] xl:ml-[4.5em] md:w-[38em] md:h-[20em] lg:w-[45em] lg:h-[30em] xl:w-[45em] xl:h-[35em] 2xl:w-[45em] 2xl:h-[35em]'>
                    <img className='w-full h-full' alt='no photo' src={`${currenntPic}`} />
                </div>
                <div className='md:ml-[2.5em] lg:ml-[4.5em] w-full md:w-[500px]'>
                    <h1 className='text-3xl font-bold font-[raleway]'>{`${location != null ? location.brand : ''}`}</h1>
                    <h3 className='text-3xl pt-2 font-[raleway]'>{`${location != null ? location.title : ''}`}</h3>
                    <p className='uppercase mt-[43px] text-base font-[raleway] underline underline-offset-2 font-bold'>size :</p>
                    <div className='flex flex-row gap-4 md:gap-12 mt-[8px]'>
                        {
                            location != null &&
                                location.size.length > 0 ?
                                location.size.map((size, index) =>
                                    <button
                                        onMouseOver={e => e.currentTarget.style.borderBlockColor = 'green'}
                                        onMouseOut={e => e.currentTarget.style.borderBlockColor = ''}
                                        key={index}
                                        className='uppercase w-full h-full border-2 p-1 md:p-2 md:w-[63px] md:h-[45px] ring-offset-black'>{size}</button>
                                ) : ''
                        }
                    </div>
                    <p className='uppercase mt-[45px] text-base font-[raleway] font-bold'>color:</p>
                    <div className='flex flex-row gap-x-2 mt-2'>
                        {
                            location != null &&
                                location.colors.length > 0 ?
                                location.colors.map((color, index) =>
                                    <button
                                        onMouseOut={e => e.currentTarget.style.borderColor = ''}
                                        onMouseOver={e => e.currentTarget.style.borderColor = 'green'}
                                        key={index} style={{ backgroundColor: color }} className={` border border-custom_green w-[36px] h-[36px]`}></button>
                                ) : ''
                        }
                    </div>
                    <p className='uppercase mt-[36px] text-base font-[raleway] font-bold'>price:</p>
                    <p className='mt-[10px] text-lg font-[raleway] font-bold'>{currency}{`${location != null ?
                        currency.charCodeAt() == '8364' ?
                            (0.9259 * location.price).toFixed(2) :
                            currency.charCodeAt() == '8380' ?
                                (1.7 * location.price).toFixed(2) :
                                location.price : ''}`}</p>
                    <button
                        onClick={() => {
                            if (location != null) {
                                let obj = {
                                    location: location,
                                    count: 1
                                }
                                navigate('/cart');
                                setCarts(arr => {
                                    let flag = false;
                                    arr.map(element => {
                                        if (element.location._id == location._id && element.location.inventory > element.count + 1) {
                                            flag = true;
                                            element.count++;
                                        }
                                    })

                                    if (!flag) return [...arr, obj];
                                    return arr;
                                });
                            }
                        }}
                        type="button"
                        className="group mt-4 inline-flex uppercase w-full items-center justify-center rounded-md bg-custom_green px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 font-[raleway]">
                        add to cart
                        <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                    <p className='mt-[40px] text-base font-[raleway] font-bold'>{`${location != null ? location.description : ''}`}</p>
                </div>
            </div >
        </>
    )
}

export default Detail