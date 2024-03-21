import React, { useState } from "react";
import { useLoaderData, useParams, useNavigation } from "react-router-dom";
import ContentComponent from "../../components/ContentComponent";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import RoleCard from "../../components/RoleCard";

function ModifyNeighbor() {
  const { id } = useParams();
  const neighborData = useLoaderData();
  const neighbor = neighborData.neighbor.data.neighbor;
  const roles = neighborData.roles.data;
  const navigation = useNavigation();
  const [roleId, setRoleId] = useState(neighbor.role_id);

  const { register, handleSubmit } = useForm();

  console.log(neighbor);
  const modifyNeighbor = async (id, data) => {
    try {
      const res = await modifyNeighbor(id, data);
      if (res.status === 200) {
        toast.success("Vecino modificado con éxito");
        setTimeout(() => {
          window.location.href = `/vecinos/`;
        });
      }
    } catch (error) {
      error.response.data.map((err) => toast.error(err));
    }
  };
  const onSubmit = handleSubmit((data) => {});

  if (navigation.state === "loading") {
    return <div>Cargando</div>;
  }
  return (
    <ContentComponent>
      <div className="block">
        <div className=" h-[70px] sm:h-[100px] w-screen md:px-[70px] bg-gradient-to-r from-[#852655] to-[#8f0e2a]">
          <div className=" flex h-full justify-start px-10 items-center">
            <svg
              className="  pr-4 h-[30px] md:h-[25px] w-auto fill-white"
              viewBox="0 0 20 20"
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
                <rect x="0" fill="none" width="20" height="20"></rect>{" "}
                <g>
                  {" "}
                  <path d="M10.2 3.28c3.53 0 6.43 2.61 6.92 6h2.08l-3.5 4-3.5-4h2.32c-.45-1.97-2.21-3.45-4.32-3.45-1.45 0-2.73.71-3.54 1.78L4.95 5.66C6.23 4.2 8.11 3.28 10.2 3.28zm-.4 13.44c-3.52 0-6.43-2.61-6.92-6H.8l3.5-4c1.17 1.33 2.33 2.67 3.5 4H5.48c.45 1.97 2.21 3.45 4.32 3.45 1.45 0 2.73-.71 3.54-1.78l1.71 1.95c-1.28 1.46-3.15 2.38-5.25 2.38z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
            <h1 className=" text-white text-lg sm:text-2xl font-semibold">
              MODIFICACIÓN DE VECINO
            </h1>
          </div>
        </div>
        <div className=" md:px-[70px] block md:flex justify-between my-5 items-center">
          <div className=" ">
            <h1 className=" px-5 text-left text-xl md:text-3xl font-bold text-[#8f0e2a]">
              {`${neighbor.neighbor_lastname} ${neighbor.neighbor_name}`}
            </h1>
          </div>
          <div className="  ">
            <button className=" p-2 mx-5 md:mx-0 my-3 md:my-0 text-sm md:text-base bg-[#8f0e2a] hover:bg-[#852655] transition duration-300 text-white rounded-lg">
              Modificar inmuebles
            </button>
          </div>
        </div>
        <div className=" h-[3px] w-screen bg-[#8f0e2a]"></div>
        <div className=" md:px-[70px] flex justify-start my-5 items-center">
          <div>
            <h1 className=" px-5 text-left text-[12px] font-semibold text-[#8f0e2a]">
              Completa el formulario con la información correspondiente del
              vecino a modificar.
            </h1>
          </div>
        </div>
        <div className=" mt-10 md:px-[70px] flex justify-center items-center">
          <div className=" block">
            <div className=" flex justify-center items-center">
              {" "}
              <h1 className=" py-2 px-5 text-left text-sm font-bold text-[#8f0e2a]">
                Modificación de datos
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
                        placeholder={neighbor.neighbor_name}
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
                        placeholder={neighbor.neighbor_lastname}
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
                        placeholder={neighbor.identity_document}
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
                        placeholder={
                          neighbor.neighbor_phone == null
                            ? "0999999999"
                            : neighbor.neighbor_phone
                        }
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
                        placeholder={
                          neighbor.neighbor_email == null
                            ? "ejemplo@gmail.com"
                            : neighbor.neighbor_email
                        }
                        type="text"
                        {...register("neighbor_email", {
                          required: true,
                        })}
                        className=" w-[250px] lg:w-[300px] bg-gray-200 text-[#8f0e2a] border border-[#8f0e2a] rounded py-2 px-4 mb-3"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className=" md:px-[70px] flex justify-center my-5 items-center">
          <div className=" block">
            <div className=" flex justify-center items-center">
              <h1 className=" py-2 px-5 text-left text-sm font-bold text-[#8f0e2a]">
                Selecciona el rol del vecino
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
        <div className=" my-10 flex justify-center items-center">
          <button
            onClick={onSubmit}
            className=" group hover:text-white bg-transparent flex items-center hover:bg-[#852655] transition duration-300 text-[#852655] p-2 border-[1px] rounded-lg border-[#852655]"
          >
            <svg
              className=" h-[25px] mr-[7px] w-auto fill-[#852655] transition duration-300 group-hover:fill-white"
              viewBox="0 0 20 20"
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
                <rect x="0" fill="none" width="20" height="20"></rect>{" "}
                <g>
                  {" "}
                  <path d="M10.2 3.28c3.53 0 6.43 2.61 6.92 6h2.08l-3.5 4-3.5-4h2.32c-.45-1.97-2.21-3.45-4.32-3.45-1.45 0-2.73.71-3.54 1.78L4.95 5.66C6.23 4.2 8.11 3.28 10.2 3.28zm-.4 13.44c-3.52 0-6.43-2.61-6.92-6H.8l3.5-4c1.17 1.33 2.33 2.67 3.5 4H5.48c.45 1.97 2.21 3.45 4.32 3.45 1.45 0 2.73-.71 3.54-1.78l1.71 1.95c-1.28 1.46-3.15 2.38-5.25 2.38z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
            <h1 className="   font-semibold ">Modificar</h1>
          </button>
        </div>
        <Toaster position="top-center" richColors />
      </div>
    </ContentComponent>
  );
}

export default ModifyNeighbor;
