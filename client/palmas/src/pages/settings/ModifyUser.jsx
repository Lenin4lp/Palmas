import React, { useState } from "react";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ContentComponent from "../../components/ContentComponent";
import Modal from "../../components/Modal";
import { toast, Toaster } from "sonner";
import { updateUser } from "../../api/user";

function ModifyUser() {
  const userData = useLoaderData();
  const user = userData.data.user;
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [userStatus, setUserStatus] = useState();
  const { register, handleSubmit } = useForm();

  console.log(user);

  const modifyUser = async (id, data) => {
    try {
      console.log(data);
      const res = await updateUser(id, data);
      if (res.status === 200) {
        toast.success("Usuario modificado con éxito");
        setTimeout(() => {
          window.location.href = "/superadmin/usuarios";
        }, 2000);
      }
    } catch (error) {
      error.response.data.map((err) => toast.error(err));
    }
  };

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {};

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }

    modifyUser(user.user_id, modifiedData);
  });

  const onSubmit2 = handleSubmit((data) => {
    data.status = userStatus;

    modifyUser(user.user_id, { status: userStatus });
  });

  if (navigation.state === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <ContentComponent>
      <div className=" flex justify-center min-h-screen h-fit items-start w-screen">
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className=" block m-3">
            <div className=" my-3">
              <h1 className=" text-center text-white text-lg font-bold">
                Confirmación
              </h1>
            </div>
            <div className=" my-3">
              <h1 className=" text-center text-white text-base font-medium">
                ¿Estás seguro de modificar el usuario?
              </h1>
            </div>
            <div className=" flex justify-center items-center">
              <div className=" my-2 grid grid-cols-2">
                <div className=" mx-4">
                  <button
                    onClick={onSubmit}
                    className=" p-2 active:transform active:scale-90 border border-white bg-[#384c85]  rounded-lg hover:bg-[#146898] text-white hover:text-white text-[12px] md:text-sm lg:text-base duration-500"
                  >
                    Aceptar
                  </button>
                </div>
                <div className=" mx-4">
                  <button
                    onClick={() => setOpen(false)}
                    className=" p-2 text-white active:transform active:scale-90 border border-gray-400 rounded-lg bg-[#ad2c2c] hover:bg-[#b94d4d]  text-[12px] md:text-sm lg:text-base duration-500"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal open={open2} onClose={() => setOpen2(false)}>
          <div className=" block m-3">
            <div className=" my-3">
              <h1 className=" text-center text-white text-lg font-bold">
                Confirmación
              </h1>
            </div>
            <div className=" my-3">
              <h1 className=" text-center text-white text-base font-medium">
                {user.status === 1 || user.status === null
                  ? "¿Estás seguro de bloquear el usuario?"
                  : "¿Estás seguro de desbloquear el usuario?"}
              </h1>
            </div>
            <div className=" flex justify-center items-center">
              <div className=" my-2 grid grid-cols-2">
                <div className=" mx-4">
                  <button
                    onClick={onSubmit2}
                    className=" p-2 active:transform active:scale-90 border border-white bg-[#384c85]  rounded-lg hover:bg-[#146898] text-white hover:text-white text-[12px] md:text-sm lg:text-base duration-500"
                  >
                    Aceptar
                  </button>
                </div>
                <div className=" mx-4">
                  <button
                    onClick={() => setOpen2(false)}
                    className=" p-2 text-white active:transform active:scale-90 border border-gray-400 rounded-lg bg-[#ad2c2c] hover:bg-[#b94d4d]  text-[12px] md:text-sm lg:text-base duration-500"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <div className=" block">
          <div className=" md:pl-[70px] w-screen h-[70px] md:h-[100px] flex justify-start items-center bg-gradient-to-r from-[#852655] to-[#8f0e2a]">
            <svg
              className=" fill-white h-[40px] md:h-[60px] w-auto mx-5"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 474.565 474.565"
              xmlSpace="preserve"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="M255.204,102.3c-0.606-11.321-12.176-9.395-23.465-9.395C240.078,95.126,247.967,98.216,255.204,102.3z"></path>{" "}
                  <path d="M134.524,73.928c-43.825,0-63.997,55.471-28.963,83.37c11.943-31.89,35.718-54.788,66.886-63.826 C163.921,81.685,150.146,73.928,134.524,73.928z"></path>{" "}
                  <path d="M43.987,148.617c1.786,5.731,4.1,11.229,6.849,16.438L36.44,179.459c-3.866,3.866-3.866,10.141,0,14.015l25.375,25.383 c1.848,1.848,4.38,2.888,7.019,2.888c2.61,0,5.125-1.04,7.005-2.888l14.38-14.404c2.158,1.142,4.55,1.842,6.785,2.827 c0-0.164-0.016-0.334-0.016-0.498c0-11.771,1.352-22.875,3.759-33.302c-17.362-11.174-28.947-30.57-28.947-52.715 c0-34.592,28.139-62.739,62.723-62.739c23.418,0,43.637,13.037,54.43,32.084c11.523-1.429,22.347-1.429,35.376,1.033 c-1.676-5.07-3.648-10.032-6.118-14.683l14.396-14.411c1.878-1.856,2.918-4.38,2.918-7.004c0-2.625-1.04-5.148-2.918-7.004 l-25.361-25.367c-1.94-1.941-4.472-2.904-7.003-2.904c-2.532,0-5.063,0.963-6.989,2.904l-14.442,14.411 c-5.217-2.764-10.699-5.078-16.444-6.825V9.9c0-5.466-4.411-9.9-9.893-9.9h-35.888c-5.451,0-9.909,4.434-9.909,9.9v20.359 c-5.73,1.747-11.213,4.061-16.446,6.825L75.839,22.689c-1.942-1.941-4.473-2.904-7.005-2.904c-2.531,0-5.077,0.963-7.003,2.896 L36.44,48.048c-1.848,1.864-2.888,4.379-2.888,7.012c0,2.632,1.04,5.148,2.888,7.004l14.396,14.403 c-2.75,5.218-5.063,10.708-6.817,16.438H23.675c-5.482,0-9.909,4.441-9.909,9.915v35.889c0,5.458,4.427,9.908,9.909,9.908H43.987z"></path>{" "}
                  <path d="M354.871,340.654c15.872-8.705,26.773-25.367,26.773-44.703c0-28.217-22.967-51.168-51.184-51.168 c-9.923,0-19.118,2.966-26.975,7.873c-4.705,18.728-12.113,36.642-21.803,52.202C309.152,310.022,334.357,322.531,354.871,340.654z "></path>{" "}
                  <path d="M460.782,276.588c0-5.909-4.799-10.693-10.685-10.693H428.14c-1.896-6.189-4.411-12.121-7.393-17.75l15.544-15.544 c2.02-2.004,3.137-4.721,3.137-7.555c0-2.835-1.118-5.553-3.137-7.563l-27.363-27.371c-2.08-2.09-4.829-3.138-7.561-3.138 c-2.734,0-5.467,1.048-7.547,3.138l-15.576,15.552c-5.623-2.982-11.539-5.481-17.751-7.369v-21.958 c0-5.901-4.768-10.685-10.669-10.685H311.11c-2.594,0-4.877,1.04-6.739,2.578c3.26,11.895,5.046,24.793,5.046,38.552 c0,8.735-0.682,17.604-1.956,26.423c7.205-2.656,14.876-4.324,22.999-4.324c36.99,0,67.086,30.089,67.086,67.07 c0,23.637-12.345,44.353-30.872,56.303c13.48,14.784,24.195,32.324,31.168,51.976c1.148,0.396,2.344,0.684,3.54,0.684 c2.733,0,5.467-1.04,7.563-3.13l27.379-27.371c2.004-2.004,3.106-4.721,3.106-7.555s-1.102-5.551-3.106-7.563l-15.576-15.552 c2.982-5.621,5.497-11.555,7.393-17.75h21.957c2.826,0,5.575-1.118,7.563-3.138c2.004-1.996,3.138-4.72,3.138-7.555 L460.782,276.588z"></path>{" "}
                  <path d="M376.038,413.906c-16.602-48.848-60.471-82.445-111.113-87.018c-16.958,17.958-37.954,29.351-61.731,29.351 c-23.759,0-44.771-11.392-61.713-29.351c-50.672,4.573-94.543,38.17-111.145,87.026l-9.177,27.013 c-2.625,7.773-1.368,16.338,3.416,23.007c4.783,6.671,12.486,10.631,20.685,10.631h315.853c8.215,0,15.918-3.96,20.702-10.631 c4.767-6.669,6.041-15.234,3.4-23.007L376.038,413.906z"></path>{" "}
                  <path d="M120.842,206.782c0,60.589,36.883,125.603,82.352,125.603c45.487,0,82.368-65.014,82.368-125.603 C285.563,81.188,120.842,80.939,120.842,206.782z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
            <div className=" flex justify-center items-center">
              <h1 className=" text-xl md:text-2xl lg:text-3xl font-bold text-white">
                {`Modificación de usuario - ${user.user_name}`}
              </h1>
            </div>
          </div>
          <div className=" my-5 w-full flex justify-center items-center">
            <div className="block">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" fill-none h-[100px] md:h-[150px] w-auto"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
                    className=" fill-[#8f0e2a]"
                  ></path>{" "}
                </g>
              </svg>
              <div className=" flex justify-center items-center">
                <h1 className=" text-[#8f0e2a] text-lg font-bold">Usuario:</h1>
              </div>
              <div className=" flex justify-center items-center">
                <h1 className=" text-[#8f0e2a] ">{user.user_name}</h1>
              </div>
              <div className=" my-5 flex justify-center items-center">
                <h1 className=" text-[#8f0e2a] font-bold">
                  {user.role_id === 1
                    ? "Superadministrador"
                    : user.role_id === 2
                    ? "Administrador"
                    : "Asistente"}
                </h1>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <form className=" block md:grid gap-10 grid-cols-2">
              <div className=" flex justify-start items-center">
                <div className=" block">
                  <h1 className=" text-[#8f0e2a]">Nombre de usuario</h1>
                  <input
                    className=" my-2 p-2 w-[200px] border-[2px] border-[#8f0e2a] rounded-lg"
                    type="text"
                    placeholder={user.user_name}
                    {...register("user_name")}
                  />
                </div>
              </div>
              <div className="flex justify-start items-center">
                <div className=" block">
                  <h1 className=" text-[#8f0e2a]">Contraseña</h1>
                  <input
                    className=" my-2 p-2 w-[200px] border-[2px] border-[#8f0e2a] rounded-lg"
                    type="password"
                    {...register("user_password")}
                  />
                </div>
              </div>
              <div className=" my-5 md:my-0 col-span-2 flex justify-center  items-center"></div>
            </form>
          </div>
          <div className=" flex justify-center items-center">
            <button
              onClick={() => setOpen(true)}
              className=" bg-[#8f0e2a] p-2 rounded-lg text-white hover:border-[1px] hover:scale-95 transition duration-300 border-black"
            >
              <h1>Guardar</h1>
            </button>
          </div>
          <div className=" my-5 flex justify-center items-center">
            {user.status == 1 || user.status == null ? (
              <button
                onClick={() => {
                  if (user.status == true || user.status == null) {
                    setUserStatus(0);
                  } else if (user.status == false) {
                    setUserStatus(1);
                  }
                  setOpen2(true);
                }}
                className=" flex items-center bg-[#b4471b] p-2 rounded-lg text-white hover:border-[1px] hover:bg-[#c0582e] hover:scale-95 transition duration-300 border-black"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className=" h-[30px] fill-none mr-2 w-auto"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                      className=" stroke-white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <h1>Bloquear usuario</h1>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (user.status == 1 || user.status == null) {
                    setUserStatus(0);
                  } else if (user.status == 0) {
                    setUserStatus(1);
                  }
                  setOpen2(true);
                }}
                className=" flex items-center bg-[#245c9c] p-2 rounded-lg text-white hover:border-[1px] hover:bg-[#3367a3] hover:scale-95 transition duration-300 border-black"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className=" h-[30px] fill-none mr-2 w-auto"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M3 3L21 21M17 10V8C17 5.23858 14.7614 3 12 3C11.0283 3 10.1213 3.27719 9.35386 3.75681M7.08383 7.08338C7.02878 7.38053 7 7.6869 7 8V10.0288M19.5614 19.5618C19.273 20.0348 18.8583 20.4201 18.362 20.673C17.7202 21 16.8802 21 15.2 21H8.8C7.11984 21 6.27976 21 5.63803 20.673C5.07354 20.3854 4.6146 19.9265 4.32698 19.362C4 18.7202 4 17.8802 4 16.2V14.8C4 13.1198 4 12.2798 4.32698 11.638C4.6146 11.0735 5.07354 10.6146 5.63803 10.327C5.99429 10.1455 6.41168 10.0647 7 10.0288M19.9998 14.4023C19.9978 12.9831 19.9731 12.227 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.773 10.0269 17.0169 10.0022 15.5977 10.0002M10 10H8.8C8.05259 10 7.47142 10 7 10.0288"
                      className=" stroke-white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <h1>Desbloquear usuario</h1>
              </button>
            )}
          </div>
        </div>
        <Toaster position="top-center" richColors />
      </div>
    </ContentComponent>
  );
}

export default ModifyUser;
