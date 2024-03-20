import React, { useState, useEffect } from "react";
import ContentComponent from "../../components/ContentComponent";
import RoleCard from "../../components/RoleCard";
import {
  useLoaderData,
  useNavigation,
  Link,
  useParams,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { createNeighbor } from "../../api/neighbors";
import { Toaster, toast } from "sonner";

function RegisterNeighbor() {
  const [errors, setErrors] = useState([]);
  const rolesdata = useLoaderData();
  const roles = rolesdata.data;
  const navigation = useNavigation();
  const [roleId, setRoleId] = useState("");

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const registerNeighbor = async (data) => {
    try {
      const res = await createNeighbor(data);
      if (res.status === 200) {
        toast.success("Vecino registrado con éxito");
        setTimeout(() => {
          window.location.href = `/vecinos/${res.data.neighbor_id}/inmuebles`;
        }, 2000);
      }
    } catch (error) {
      error.response.data.map((err) => toast.error(err));
    }
  };

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {};

    data.role_id = roleId;

    if (data.role_id === "") {
      setErrors(["Debes seleccionar un rol"]);
    } else if (data.role_id === "1") {
      data.role_id = 1;
    } else if (data.role_id === "2") {
      data.role_id = 2;
    }

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }

    registerNeighbor(modifiedData);
  });

  if (navigation.state === "loading") {
    return <div>Cargando</div>;
  }

  return (
    <ContentComponent>
      <div className="block">
        <div className=" h-[70px] sm:h-[100px] w-screen md:px-[70px] bg-gradient-to-r from-[#852655] to-[#8f0e2a]">
          <div className=" flex h-full justify-start px-10 items-center">
            <svg
              className="  pr-4 h-[20px] md:h-[25px] w-auto"
              viewBox="-0.03 0 20.052 20.052"
              xmlns="http://www.w3.org/2000/svg"
              fill=""
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g id="add-user-9" transform="translate(-2 -1.948)">
                  {" "}
                  <path
                    id="secondary"
                    className=" fill-[#8f0e2a]  transition duration-500"
                    d="M15.94,14.22a1,1,0,0,1-.28-1.45,5.91,5.91,0,0,0,.88-1.47,5.5,5.5,0,0,1-4-5.3,5.37,5.37,0,0,1,.65-2.58A5.85,5.85,0,0,0,11.73,3,6,6,0,0,0,5,9a5.94,5.94,0,0,0,1.34,3.77,1,1,0,0,1-.28,1.45A7,7,0,0,0,3,20a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,7,7,0,0,0-3.06-5.78Z"
                  ></path>{" "}
                  <path
                    className=" stroke-white transition duration-500"
                    id="primary"
                    d="M17,5h4M19,3V7"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>{" "}
                  <path
                    id="primary-2"
                    className=" stroke-white transition duration-500"
                    dataname="primary"
                    d="M16.65,11a5.71,5.71,0,0,1-1,1.77,1,1,0,0,0,.28,1.45A7,7,0,0,1,19,20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1,7,7,0,0,1,3.06-5.78,1,1,0,0,0,.28-1.45A5.94,5.94,0,0,1,5,9a6,6,0,0,1,6.73-6A5.47,5.47,0,0,1,13,3.3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
            <h1 className=" text-white text-lg sm:text-2xl font-semibold">
              REGISTRO DE VECINOS
            </h1>
          </div>
        </div>
        <div className=" md:px-[70px] flex justify-start my-5 items-center">
          <div>
            <h1 className=" px-5 text-left text-[12px] font-semibold text-[#8f0e2a]">
              Completa el formulario con la información correspondiente del
              vecino a ingresar.
            </h1>
          </div>
        </div>
        <div className=" md:px-[70px] flex justify-center my-5 items-center">
          <div className=" block">
            <div className=" flex justify-center items-center">
              <h1 className=" py-2 px-5 text-left text-sm font-bold text-[#8f0e2a]">
                Selecciona el rol del vecino nuevo
              </h1>
            </div>
            <div className=" grid grid-cols-2">
              {roles.map((role) => (
                <div
                  className=" group relative flex justify-center items-center"
                  key={role.role_id}
                  onClick={() => {
                    setRoleId(role.role_id);
                  }}
                >
                  <span
                    className={` absolute top-0 bottom-0 duration-300 left-0 right-0  hidden lg:flex scale-0 transition-all w-full rounded-lg bg-gray-800 p-2 text-xs text-white ${
                      role.role_id === roleId
                        ? "scale-100"
                        : "group-hover:scale-100"
                    }`}
                  >
                    <h1 className=" text-center">{role.role_name}</h1>
                  </span>
                  <RoleCard
                    roleTitle={role.role_id === 1 ? "P" : "A"}
                    roleColor={
                      role.role_id === roleId
                        ? "fill-[#852655]"
                        : role.role_id === 1
                        ? "fill-[#8f0e2a]"
                        : "fill-[#0e668f]"
                    }
                  >
                    <h1>Propietario</h1>
                  </RoleCard>
                </div>
              ))}
            </div>
          </div>
        </div>
        {roleId !== "" && (
          <div className=" mt-10 md:px-[70px] flex justify-center items-center">
            <div className=" block">
              <div className=" flex justify-center items-center">
                {" "}
                <h1 className=" py-2 px-5 text-left text-sm font-bold text-[#8f0e2a]">
                  Registro de datos
                </h1>
              </div>

              <div className=" mt-2 flex justify-center items-center">
                <svg
                  className=" h-[100px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
                      d="M14.5 8.5C14.5 9.88071 13.3807 11 12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5Z"
                      className={`${
                        roleId === 1 ? "fill-[#8f0e2a]" : "fill-[#0e668f]"
                      }`}
                    ></path>{" "}
                    <path
                      d="M15.5812 16H8.50626C8.09309 16 7.87415 15.5411 8.15916 15.242C9.00598 14.3533 10.5593 13 12.1667 13C13.7899 13 15.2046 14.3801 15.947 15.2681C16.2011 15.5721 15.9774 16 15.5812 16Z"
                      className={`${
                        roleId === 1 ? "fill-[#8f0e2a]" : "fill-[#0e668f]"
                      } ${
                        roleId === 1 ? "stroke-[#8f0e2a]" : "stroke-[#0e668f]"
                      }`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      className={` transition duration-300 ${
                        roleId === 1 ? "stroke-[#8f0e2a]" : "stroke-[#0e668f]"
                      }`}
                      strokeWidth="2"
                    ></circle>{" "}
                  </g>
                </svg>
              </div>
              <div className=" mt-5 w-full flex justify-center items-center">
                <div className="  mx-10">
                  <form className=" block sm:grid sm:gap-3 grid-cols-2">
                    <div className=" flex justify-center items-center">
                      <div className=" md:mx-5 grid grid-cols-1">
                        <label className=" text-left text-sm font-bold text-[#8f0e2a]">
                          Nombres
                        </label>
                        <input
                          type="text"
                          {...register("neighbor_name", {
                            required: true,
                          })}
                          className=" w-[250px] lg:w-[300px] bg-gray-200 text-[#8f0e2a] border border-[#8f0e2a] rounded py-2 px-4 mb-3"
                        />
                      </div>
                    </div>
                    <div className=" flex justify-center items-center">
                      <div className="  md:mx-5 grid grid-cols-1">
                        <label className=" text-left text-sm font-bold text-[#8f0e2a]">
                          Apellidos
                        </label>
                        <input
                          type="text"
                          {...register("neighbor_lastname", {
                            required: true,
                          })}
                          className=" w-[250px] lg:w-[300px] bg-gray-200 text-[#8f0e2a] border border-[#8f0e2a] rounded py-2 px-4 mb-3"
                        />
                      </div>
                    </div>

                    <div className=" flex justify-center items-center">
                      <div className="  md:mx-5 grid grid-cols-1">
                        <label className=" text-left text-sm font-bold text-[#8f0e2a]">
                          Documento de identidad
                        </label>
                        <input
                          type="text"
                          {...register("identity_document", {
                            required: true,
                          })}
                          className=" w-[250px] lg:w-[300px] bg-gray-200 text-[#8f0e2a] border border-[#8f0e2a] rounded py-2 px-4 mb-3"
                        />
                      </div>
                    </div>

                    <div className=" flex justify-center items-center">
                      <div className="  md:mx-5 grid grid-cols-1">
                        <label className=" text-left text-sm font-bold text-[#8f0e2a]">
                          Teléfono
                        </label>
                        <input
                          type="text"
                          {...register("neighbor_phone", {
                            required: true,
                          })}
                          className=" w-[250px] lg:w-[300px] bg-gray-200 text-[#8f0e2a] border border-[#8f0e2a] rounded py-2 px-4 mb-3"
                        />
                      </div>
                    </div>
                    <div className=" flex justify-center col-span-2 items-center">
                      <div className="  md:mx-5 grid grid-cols-1">
                        <label className=" text-left text-sm font-bold text-[#8f0e2a]">
                          Correo electrónico
                        </label>
                        <input
                          type="text"
                          {...register("neighbor_email", {
                            required: true,
                          })}
                          className=" w-[250px] lg:w-[300px] bg-gray-200 text-[#8f0e2a] border border-[#8f0e2a] rounded py-2 px-4 mb-3"
                        />
                      </div>
                    </div>
                  </form>
                  <div className=" my-10 flex justify-center items-center">
                    <button
                      onClick={onSubmit}
                      className=" group hover:text-white bg-transparent flex items-center hover:bg-[#852655] transition duration-300 text-[#852655] p-2 border-[1px] rounded-lg border-[#852655]"
                    >
                      <svg
                        className=" h-[25px] mr-[7px] w-auto"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g id="Edit / Add_Plus_Circle">
                            {" "}
                            <path
                              id="Vector"
                              d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                              className=" stroke-[#852655] group-hover:stroke-white transition duration-300 "
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                      <h1 className="   font-semibold ">Registrar</h1>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Toaster position="top-center" richColors />
      </div>
    </ContentComponent>
  );
}

export default RegisterNeighbor;
