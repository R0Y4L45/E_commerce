import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Context from "../ContextWrapper";

const LogIn = () => {
  const [error, setError] = useState(''),
    [validation, setValidation] = useState({}),
    [formObj, setFormObj] = useState({}),
    navigate = useNavigate(),
    { setAuth } = useContext(Context);

  const login = async (e, obj) => {
    e.preventDefault();

    Cookies.remove(localStorage.getItem('curUser'));
    localStorage.removeItem('curUser');
    setAuth(false);

    if (validation.isEmail && validation.isPassword) {
      const userLogin = await fetch('//localhost:5000/api/auth/login', {
        method: 'Post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
        .then(response => response.json())
        .then(data => data)
        .catch(err => err);

      if (!userLogin.user) {
        setError(userLogin.msg);
        return;
      }

      localStorage.setItem('curUser', userLogin.user.id);
      Cookies.set(`${userLogin.user.id}`, `${userLogin.user.token}`, { expires: 1 });
      setAuth(Cookies.get(localStorage.getItem('curUser')) == undefined ? false : true);
      navigate('/category');
    }
  }

  const checkValidation = (methodName, e) => {
    let element = e.currentTarget.value;

    if (methodName == 'n') {
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
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        className="flex flex-col px-5 text-sm w-[399px] max-w-[399px]"
        onSubmit={e => login(e, formObj)}
      >
        <header className="self-center text-5xl font-bold text-black whitespace-nowrap">
          Hello Again!
        </header>
        <header className="self-center mt-4 text-3xl text-black whitespace-nowrap">
          Welcome Back
        </header>
        <div className="flex gap-2 w-full px-[1.5px] py-3 mt-16 bg-white border border-solid border-zinc-100 rounded-[30px] text-zinc-800">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb58059c038f915c996af9a6cc9e7aaa9b4a651a29a8d01a071993b7c32824b4?apiKey=7fd63095772b4b9cba810904a8369e88&"
            className="pl-4"
            alt="Email Icon"
          />
          <input
            onChange={e => checkValidation('n', e)}
            placeholder="Email Address"
            type="email"
            role="textbox"
            required

            className="w-full pl-1.5 mr-4"
          />
        </div>
        <div className="flex gap-2 justify-between px-[1.5px] py-3.5 mt-8 whitespace-nowrap bg-white border border-solid border-zinc-100 rounded-[30px] text-zinc-800">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1fd26edbb750a1311b48146823241e237444bb2ddd0fa79cd78891edb6b9625f?apiKey=7fd63095772b4b9cba810904a8369e88&"
            className="pl-4"
            alt="Password Icon"
          />
          <input
            placeholder="Password"
            type="password"
            aria-label="Password"
            role="textbox"
            required
            className="w-full pl-1.5 mr-4"
            onChange={e => checkValidation('p', e)}
          />
        </div>
        <span className={`${error ? 'block' : 'hidden'} flex justify-center pt-3 text-red-800 text-sm`}>{error}</span>
        <button
          className="justify-center rounded items-center px-16 py-4 mt-8 w-full text-white whitespace-nowrap bg-custom_green"
        >
          Login
        </button>
        <div className="self-center mt-7 text-lg font-medium text-teal-800 whitespace-nowrap">
          <a className="text-teal-800">
            Do not have account?
          </a>{" "}
          <a href="/register" className="text-teal-800 underline">
            Register
          </a>
        </div>
      </form>
    </div>
  )
}

export default LogIn