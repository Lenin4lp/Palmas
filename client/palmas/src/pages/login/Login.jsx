import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const {
    signin,
    errors: SigninErrors,
    isAuthenticated,
    user,
    logout,
  } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  if (SigninErrors.length > 0) {
    toast.error(SigninErrors[0]);
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className=" font-mono h-screen w-screen flex justify-center items-center bg-white md:bg-gradient-to-br from-[#852655] to-[#8f0e2a]">
      <div className=" h-full w-full md:h-[500px] md:w-[800px] bg-white rounded-md grid grid-cols-1 md:grid-cols-2 md:m-3">
        <div className=" flex justify-center rounded-md items-center md:border-r-[3px] border-[#852655] bg-gradient-to-br from-[#e9e9e9] to-[#bdbdbd]">
          <div className=" block">
            <div className=" hidden md:flex justify-center items-centers">
              <h1 className=" text-center text-3xl font-bold">Las Palmas</h1>
            </div>
            <div className=" my-6 hidden md:flex justify-center items-center">
              <svg
                className=" h-[200px] w-auto"
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <style type="text/css"> </style>{" "}
                  <g>
                    {" "}
                    <rect
                      x="207.086"
                      y="496.19"
                      className="st0"
                      width="140.908"
                      height="15.81"
                    ></rect>{" "}
                    <path
                      className="st0"
                      d="M472.271,113.106c-13.991-49.444-54.964-70.478-101.933-62.483c-43.254,7.362-65.847,61.281-76.372,93.978 c3.124-43.308-4.871-103.534-56.541-131.656C158.477-30.028,108.51,46.922,103.513,56.915c-4.997,9.994-5.013,11.906,8.994,10.993 c4.169-0.273,40.505-10.5,76.153-4.052l16.786-15.474l7.776,21.806c29.544,10.352,53.247,36.882,57.51,76.661 c-23.968-29.466-60.929-48.437-102.558-48.437c-72.39,0-131.055,57.079-131.055,127.487c0,5.668,0.11,1.6,0.11,1.6 c0.203,2.67,1.951,4.974,4.466,5.888c2.514,0.906,5.34,0.257,7.198-1.663c0,0,1.467-2.272,8.026-8.268 c11.555-10.572,24.265-19.885,37.881-27.826l12.446-23.242l16.801,8.924c25.218-10.048,52.716-15.591,81.51-15.591 c19.003,0,37.443,2.413,55.026,6.933c-40.552-2.685-101.684,18.457-125.886,70.071c-29.98,63.958-0.468,114.722,3.794,118.696 c3.498,3.256,7.729,0.719,8.869-4.958c2.514-12.406,9.4-35.594,22.048-61.6l-5.106-20.626l14.053,3.598 c17.629-31.073,43.425-63.7,79.932-85.678c-21.877,48.196-40.63,113.715-31.495,197.012H52.546v15.81H228.79 c2.17,14.522,5.231,29.582,9.228,45.142h-87.536v15.81h91.752h86.896h58.196v-15.81h-71.063 c-7.136-10.127-16.145-25.186-24.046-45.142h176.26v-15.81H286.58c-13.741-42.964-20.705-104.088,0.188-183.894 c9.962,12.874,22.641,31.557,33.212,54.316l13.382,1.687l-5.981,16.005c7.324,19.597,12.601,41.489,13.335,64.918 c0.187,5.981,3.794,10.408,5.637,6.489c28.231-60.164,19.346-121.741-20.221-157.67c24.952,8.229,45.346,28.294,61.226,51.247 l18.956,4.068l-3.529,21.361c13.288,25.28,21.455,50.311,24.359,64.661c1.156,5.652,4.154,9.338,7.761,2.905 c21.548-38.335,24.327-111.896-14.6-152.166c-30.184-31.214-83.446-33.268-116.237-24.617 c21.533-36.203,79.136-38.897,79.136-38.897s9.119-20.986,11.118-23.984c1.999-2.998,12.992,20.44,12.992,20.44l58.008,23.695 c0,0,7.449,5.091,8.9-3.56C475.097,130.945,475.628,122.896,472.271,113.106z"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            <div className=" flex justify-center items-center">
              <img
                className=" h-[80px] md:h-[100px]"
                src="https://softdeveral.com/AliQuo/AliQuoPay.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full items-start p-8">
          <div className=" block">
            <div className=" flex justify-center items-center p-3">
              <svg
                className=" h-[80px]"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <circle
                    cx="512"
                    cy="512"
                    r="512"
                    fill="#000000"
                  ></circle>{" "}
                  <path
                    d="m458.15 617.7 18.8-107.3a56.94 56.94 0 0 1 35.2-101.9V289.4h-145.2a56.33 56.33 0 0 0-56.3 56.3v275.8a33.94 33.94 0 0 0 3.4 15c12.2 24.6 60.2 103.7 197.9 164.5V622.1a313.29 313.29 0 0 1-53.8-4.4zM656.85 289h-144.9v119.1a56.86 56.86 0 0 1 35.7 101.4l18.8 107.8A320.58 320.58 0 0 1 512 622v178.6c137.5-60.5 185.7-139.9 197.9-164.5a33.94 33.94 0 0 0 3.4-15V345.5a56 56 0 0 0-16.4-40 56.76 56.76 0 0 0-40.05-16.5z"
                    fill="#ffffff"
                    S
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <div className=" flex justify-center items-center mt-5">
              <form>
                <p className="mb-4 text-sm select-none">
                  Por favor ingrese su usuario y contraseña
                </p>
                {/* <!--Username input--> */}
                <input
                  className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  name=""
                  type="text"
                  {...register("user_name", {
                    required: true,
                  })}
                  placeholder="Usuario"
                />

                {/* <!--Password input--> */}
                <input
                  className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  name="password"
                  type="password"
                  {...register("user_password", {
                    required: true,
                  })}
                  placeholder="Contraseña"
                />

                <div className="py-5 h-fit text-center grid grid-rows-2">
                  <button
                    onClick={onSubmit}
                    className="rounded-xl w-36 justify-self-center bg-gradient-to-br from-[#3E8F44] to-[#64bb6a] px-5 py-3 text-base font-medium text-white transition duration-300 hover:shadow-lg hover:shadow-black/50 active:transform active:scale-90"
                  >
                    Ingresar
                  </button>

                  <a className=" hover:text-[#852655] text-sm dark:hover:text-black transition duration-700 pt-7">
                    ¿Olvidaste la contraseña?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default Login;
