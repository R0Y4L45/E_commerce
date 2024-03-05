import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState('');
    const [validation, setValidation] = useState({});
    const [formObj, setFormObj] = useState({});
    const navigate = useNavigate();

    const register = async (obj, e) => {
        e.preventDefault();
        if (validation.isName && validation.isSurname && validation.isPassword && validation.isEmail) {
            const userRegister = await fetch('//localhost:5000/api/auth/register', {
                method: 'Post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(response => response.json())
                .catch(err => err);

            if (userRegister.msg) {
                setError(userRegister.msg);
                return;
            }

            navigate('/login');
        }
    }

    const formEvent = (methodName, e) => {
        let element = e.currentTarget.value;

        if (methodName == 'n') {
            if (element.length >= 3) {
                setFormObj({ ...formObj, name: element });
                e.target.setCustomValidity('');
            } else e.target.setCustomValidity('The name must contain at least 3 letters');

            setValidation({ ...validation, isName: e.target.checkValidity() });
        }
        else if (methodName == 's') {
            if (element.length >= 3) {
                setFormObj({ ...formObj, surname: element });
                e.target.setCustomValidity('');
            } else e.target.setCustomValidity('The surname must contain at least 3 letters');

            setValidation({ ...validation, isSurname: e.target.checkValidity() });
        }
        else if (methodName == 'e') {
            setFormObj({ ...formObj, email: element });
            setValidation({ ...validation, isEmail: e.target.checkValidity() });
        }
        else if (methodName == 'p') {
            if (element.length >= 5) {
                setFormObj({ ...formObj, password: element });
                e.target.setCustomValidity('');
            } else e.target.setCustomValidity('The password must contain at least 5 letters');

            setValidation({ ...validation, isPassword: e.target.checkValidity() });
        }
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <form
                className="flex flex-col items-center px-5 w-[775px] max-w-[775px]"
                onSubmit={e => register(formObj, e)}
            >
                <header className="text-5xl font-bold text-center text-black whitespace-nowrap max-md:text-4xl">
                    Hello Again!
                </header>
                <div className="mt-5 text-3xl text-center text-black whitespace-nowrap">
                    Welcome <span className="">Back</span>
                </div>
                <div className="flex gap-5 justify-between items-start self-stretch mt-16 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-2 w-full px-4 py-3 bg-white border border-solid border-zinc-100 rounded-[30px] max-md:px-5">
                        <svg width="24" height="25" fill="none">
                            <g opacity="0.3">
                                <circle cx="12" cy="6.5" r="4" stroke="#1C274C" />
                                <ellipse cx="12" cy="17.5" rx="7" ry="4" stroke="#1C274C" />
                            </g>
                            <defs>
                                <clipPath id="clip0_457_768">
                                    <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                        <input
                            onChange={e => {
                                formEvent('n', e)
                            }}
                            placeholder='Name'
                            required
                            name='n'
                            type="text"
                            className="input-field w-full pl-1.5"
                        />
                    </div>
                    <div className="flex gap-2 justify-center w-full px-4 py-3 bg-white border border-solid border-zinc-100 rounded-[30px] text-zinc-800 max-md:px-5">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/658f60bc8a511871dc0578fec013e08eeb96ba3fc026e5121adefc5ab2fbaa4f?apiKey=7fd63095772b4b9cba810904a8369e88&"
                            className="w-6 aspect-square"
                            alt="No Icon"
                        />
                        <div className="flex-auto my-auto">
                            <input
                                onChange={e => formEvent('e', e)}
                                placeholder='Email'
                                required
                                name='e'
                                type="email"
                                className="input-field w-full pl-1.5"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-5 justify-between items-start self-stretch mt-3.5 w-full max-md:flex-wrap max-md:max-w-full">
                    <div className="flex gap-2 w-full px-4 py-3 bg-white border border-solid border-zinc-100 rounded-[30px] max-md:px-5">
                        <svg width="24" height="25" fill="none">
                            <g opacity="0.3">
                                <circle cx="12" cy="6.5" r="4" stroke="#1C274C" />
                                <ellipse cx="12" cy="17.5" rx="7" ry="4" stroke="#1C274C" />
                            </g>
                            <defs>
                                <clipPath id="clip0_457_768">
                                    <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                        <input
                            onChange={e => formEvent('s', e)}
                            placeholder='Surname'
                            name='s'
                            required
                            type="text"
                            className="input-field w-full pl-1.5"
                        />
                    </div>
                    <div className="flex gap-2 justify-center w-full px-4 py-3 bg-white border border-solid border-zinc-100 rounded-[30px] text-zinc-800 max-md:px-5">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6697c2d3105d5859bd84094846f6b7e7135e33ab240b3074831d438721b0048e?apiKey=7fd63095772b4b9cba810904a8369e88&"
                            className="w-6 aspect-square"
                            atl="No Icon"
                        />
                        <div className="flex-auto my-auto">
                            <input
                                onChange={e => formEvent('p', e)}
                                placeholder='Password'
                                required
                                name='p'
                                type="password"
                                className="input-field w-full pl-1.5"
                            />
                        </div>
                    </div>
                </div>
                <span className={`${error ? 'block' : 'hidden'} text-red-800 text-sm`}>{error}</span>
                <button
                    className="justify-center items-center px-6 sm:px-16 py-5 mt-11 max-w-full rounded text-sm text-white whitespace-nowrap bg-custom_green w-full sm:w-[322px] max-md:px-5 max-md:mt-10"
                >
                    Register
                </button>
                <div className="mt-5 text-lg font-medium text-teal-800 whitespace-nowrap">
                    <span className="text-teal-800">Do you have an account? </span>
                    <a href="/login" className="text-teal-800 underline">
                        Log in
                    </a>
                </div>
            </form>
        </div>
    );
}

export default Register