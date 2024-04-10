import React, { useState } from "react";
import ContentComponent from "../../components/ContentComponent";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createVehicleType } from "../../api/vehicles";
import { Toaster, toast } from "sonner";

function VehicleTypes() {
  const typesData = useLoaderData();
  const types = typesData.data;
  const navigation = useNavigation();
  const { handleSubmit, register } = useForm();
  console.log(types);
  const [content, setContent] = useState("");

  const registerType = async (data) => {
    try {
      const res = await createVehicleType(data);
      if (res.status === 200) {
        toast.success("Tipo de vehículo registrado con éxito");
        setTimeout(() => {
          window.location.href = `/inmuebles/config/tipos_de_vehiculo`;
        }, 2000);
      }
    } catch (error) {
      error.response.data.map((err) => toast.error(err));
    }
  };

  const onSubmit = handleSubmit((data) => {
    registerType(data);
  });

  return (
    <ContentComponent>
      <div className=" flex min-h-fit justify-center items-center bg-gradient-to-br from-[#852655] to-[#8f0e2a] w-screen">
        <div className=" block">
          <div className=" flex   transition duration-700  group justify-center items-center w-screen md:pl-[70px] border-[1px] border-white h-fit bg-gradient-to-br from-[#852655] to-[#8f0e2a]">
            <div
              onClick={() => (content === 1 ? setContent("") : setContent(1))}
              className={` block w-full h-full ${
                content === 1
                  ? " cursor-default"
                  : "group-hover:bg-white cursor-pointer"
              }  bg-transparent p-10 sm:p-14 lg:p-20 group-hover:bg-opacity-30 transition duration-300`}
            >
              <div className=" flex h-full justify-center items-center">
                <h1 className=" text-white text-center text-sm sm:text-lg font-semibold">
                  Visualiza los tipos de vehículo
                </h1>
              </div>
              <div className=" py-2 flex justify-center items-center">
                <svg
                  className=" fill-white h-[100px] lg:h-[120px] "
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 45.393 45.393"
                  xml:space="preserve"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M43.518,12.709L25.178,0.728c-1.511-0.978-3.458-0.968-4.96,0.021L1.859,12.719c-1.14,0.751-1.455,2.284-0.705,3.424 c0.751,1.14,2.283,1.456,3.424,0.704L22.715,5.021L40.83,16.857c0.416,0.269,0.881,0.396,1.341,0.396 c0.812,0,1.604-0.397,2.077-1.127C44.99,14.98,44.662,13.452,43.518,12.709z"></path>{" "}
                        <path d="M38.879,27.616c-0.151-0.865-0.903-1.505-1.78-1.505h-1.008l-0.383-3.987c-0.409-4.264-3.948-7.49-8.232-7.49H17.92 c-4.285,0-7.823,3.227-8.233,7.49l-0.382,3.987H8.296c-0.878,0-1.629,0.64-1.782,1.505l-1.5,8.504 c-0.186,1.054,0.112,2.139,0.8,2.957c0.662,0.788,1.637,1.258,2.657,1.293v1.412c0,1.999,1.602,3.61,3.603,3.61h1.138 c1.999,0,3.625-1.611,3.625-3.61v-1.389h11.732v1.386c0,2,1.613,3.613,3.612,3.613h1.139c1.999,0,3.614-1.613,3.614-3.613V40.37 c1.02-0.035,1.989-0.501,2.649-1.288c0.688-0.82,0.982-1.899,0.798-2.955L38.879,27.616z M11.642,37.113 c-1.687,0-3.055-1.367-3.055-3.056c0-1.689,1.368-3.057,3.055-3.057c1.688,0,3.057,1.367,3.057,3.057 C14.699,35.746,13.33,37.113,11.642,37.113z M12.404,26.111l0.353-3.678c0.257-2.674,2.476-4.688,5.163-4.688h0.551v1.156 c0,1.003,0.797,1.802,1.799,1.802h4.856c1.002,0,1.813-0.799,1.813-1.802v-1.155h0.537c2.687,0,4.906,2.014,5.162,4.688 l0.354,3.678L12.404,26.111L12.404,26.111z M33.75,37.113c-1.687,0-3.055-1.367-3.055-3.056c0-1.689,1.368-3.057,3.055-3.057 c1.688,0,3.057,1.367,3.057,3.057C36.807,35.746,35.438,37.113,33.75,37.113z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
              <div className=" flex justify-center items-center">
                <div
                  className={` ${
                    content === 1 ? "flex" : "hidden"
                  }  h-fit transition duration-300 w-fit bg-white mt-[30px] sm:mt-[50px] rounded-lg justify-center items-center`}
                >
                  {types.length > 0 ? (
                    <div className=" flex h-full justify-center items-start">
                      <div className=" m-1 w-[280px] sm:w-full overflow-x-auto overflow-y-auto   ">
                        <table className=" h-full  border-collapse text-[12px] lg:text-sm">
                          <thead className="">
                            <tr>
                              <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[25px] py-2">
                                ID
                              </th>
                              <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[70px] lg:px-[70px] py-2">
                                Tipo de vehículo
                              </th>
                              <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[10px] py-2">
                                N° de vehículos
                              </th>
                              <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[15px] py-2">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {types.map((type) => (
                              <tr
                                key={type.vehicleType_id}
                                className="text-[11px] lg:text-[12px]"
                              >
                                <th className="border border-slate-300 px-2 py-2">
                                  {type.vehicleType_id}
                                </th>
                                <th className="border border-slate-300 px-2 py-2">
                                  {type.vehicleType}
                                </th>
                                <th className="border border-slate-300 px-2 py-2">
                                  {type.vehicles.length}
                                </th>
                                <th className=" border  h-full border-slate-300  py-2">
                                  <div className=" flex justify-center items-center">
                                    <Link
                                      to={`/inmuebles/modificar/${type.vehicleType_id}`}
                                    >
                                      <svg
                                        viewBox="-3 0 32 32"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        xmlnsSketch="http://www.bohemiancoding.com/sketch/ns"
                                        className=" h-[19px] hover:cursor-pointer fill-[#831818]"
                                      >
                                        <g
                                          id="SVGRepo_bgCarrier"
                                          strokeWidth="0"
                                        ></g>
                                        <g
                                          id="SVGRepo_tracerCarrier"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                          {" "}
                                          <title>trash</title>{" "}
                                          <desc>Created with Sketch Beta.</desc>{" "}
                                          <defs> </defs>{" "}
                                          <g
                                            id="Page-1"
                                            stroke="none"
                                            strokeWidth="1"
                                            fill="none"
                                            fillRule="evenodd"
                                            sketchType="MSPage"
                                          >
                                            {" "}
                                            <g
                                              id="Icon-Set"
                                              sketchType="MSLayerGroup"
                                              transform="translate(-259.000000, -203.000000)"
                                              className=" fill-[#831818]"
                                            >
                                              {" "}
                                              <path
                                                d="M282,211 L262,211 C261.448,211 261,210.553 261,210 C261,209.448 261.448,209 262,209 L282,209 C282.552,209 283,209.448 283,210 C283,210.553 282.552,211 282,211 L282,211 Z M281,231 C281,232.104 280.104,233 279,233 L265,233 C263.896,233 263,232.104 263,231 L263,213 L281,213 L281,231 L281,231 Z M269,206 C269,205.447 269.448,205 270,205 L274,205 C274.552,205 275,205.447 275,206 L275,207 L269,207 L269,206 L269,206 Z M283,207 L277,207 L277,205 C277,203.896 276.104,203 275,203 L269,203 C267.896,203 267,203.896 267,205 L267,207 L261,207 C259.896,207 259,207.896 259,209 L259,211 C259,212.104 259.896,213 261,213 L261,231 C261,233.209 262.791,235 265,235 L279,235 C281.209,235 283,233.209 283,231 L283,213 C284.104,213 285,212.104 285,211 L285,209 C285,207.896 284.104,207 283,207 L283,207 Z M272,231 C272.552,231 273,230.553 273,230 L273,218 C273,217.448 272.552,217 272,217 C271.448,217 271,217.448 271,218 L271,230 C271,230.553 271.448,231 272,231 L272,231 Z M267,231 C267.552,231 268,230.553 268,230 L268,218 C268,217.448 267.552,217 267,217 C266.448,217 266,217.448 266,218 L266,230 C266,230.553 266.448,231 267,231 L267,231 Z M277,231 C277.552,231 278,230.553 278,230 L278,218 C278,217.448 277.552,217 277,217 C276.448,217 276,217.448 276,218 L276,230 C276,230.553 276.448,231 277,231 L277,231 Z"
                                                id="trash"
                                                sketchType="MSShapeGroup"
                                              >
                                                {" "}
                                              </path>{" "}
                                            </g>{" "}
                                          </g>{" "}
                                        </g>
                                      </svg>
                                    </Link>
                                  </div>
                                </th>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div>No hay datos</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className=" cursor-pointer flex  transition duration-700  group justify-center items-center w-screen md:pl-[70px] border-[1px] border-white h-fit bg-gradient-to-br from-[#852655] to-[#8f0e2a]">
            <div
              onClick={() => setContent(2)}
              className={` block w-full h-full ${
                content === 2
                  ? " cursor-default"
                  : "group-hover:bg-white cursor-pointer"
              }  bg-transparent p-10 sm:p-14 lg:p-20 group-hover:bg-opacity-30 transition duration-300`}
            >
              <div className=" flex h-full justify-center items-center">
                <h1 className=" text-white text-center text-sm sm:text-lg font-semibold">
                  Crea un nuevo tipo de vehículo
                </h1>
              </div>
              <div className=" py-2 flex justify-center items-center">
                <svg
                  className=" fill-white h-[100px] lg:h-[120px] "
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 381.592 381.592"
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
                      <path d="M325.707,55.884c-36.035-36.036-83.949-55.883-134.91-55.883c-50.965,0-98.877,19.847-134.914,55.883 C19.848,91.921,0,139.833,0,190.796s19.848,98.876,55.883,134.913c36.037,36.035,83.949,55.882,134.914,55.882 c50.961,0,98.875-19.847,134.91-55.882c36.037-36.036,55.885-83.95,55.885-134.913S361.744,91.921,325.707,55.884z M317.91,135.754 c1.975,0.805,3.526,2.388,4.297,4.375c2.178,5.634,4.008,11.463,5.438,17.328c0.5,2.043,0.146,4.203-0.981,5.979 c-1.125,1.777-2.926,3.02-4.986,3.442l-74.967,15.349c-0.523,0.106-1.045,0.158-1.562,0.158c-3.29,0-6.305-2.109-7.358-5.352 c-1.218-3.748,0.573-7.813,4.162-9.443l69.83-31.718C313.723,134.991,315.939,134.949,317.91,135.754z M235.756,118.963 l5.492-48.738c0.281-2.5,1.762-4.708,3.965-5.919c2.207-1.212,4.863-1.276,7.123-0.174c15.441,7.527,29.254,17.712,41.059,30.271 c1.711,1.82,2.439,4.353,1.955,6.803c-0.483,2.452-2.119,4.518-4.395,5.551l-44.301,20.123c-1.023,0.465-2.117,0.693-3.203,0.693 c-1.609,0-3.205-0.501-4.551-1.479C236.645,124.456,235.443,121.732,235.756,118.963z M176.16,53.011 c1.359-1.624,3.324-2.62,5.436-2.758c6.113-0.4,12.287-0.4,18.4,0c2.111,0.138,4.076,1.134,5.436,2.758 c1.357,1.624,1.992,3.732,1.754,5.836l-8.695,77.167c-0.44,3.917-3.752,6.877-7.692,6.877c-3.943,0-7.254-2.96-7.695-6.877 l-8.697-77.167C174.168,56.744,174.803,54.635,176.16,53.011z M190.797,167.474c12.879,0,23.322,10.442,23.322,23.322 s-10.443,23.322-23.322,23.322c-12.881,0-23.322-10.442-23.322-23.322S177.916,167.474,190.797,167.474z M88.195,94.401 C100,81.842,113.814,71.657,129.256,64.13c2.258-1.103,4.918-1.038,7.121,0.175c2.205,1.212,3.686,3.418,3.967,5.918l5.49,48.739 c0.313,2.769-0.887,5.493-3.141,7.131c-1.348,0.978-2.945,1.479-4.555,1.479c-1.086,0-2.178-0.229-3.201-0.693l-44.303-20.123 c-2.273-1.034-3.91-3.1-4.395-5.551C85.758,98.755,86.484,96.221,88.195,94.401z M53.945,157.457 c1.43-5.863,3.26-11.693,5.441-17.329c0.768-1.987,2.322-3.569,4.295-4.375c1.971-0.805,4.188-0.763,6.129,0.12l69.824,31.716 c3.588,1.63,5.381,5.695,4.162,9.443c-1.053,3.241-4.066,5.352-7.359,5.352c-0.516,0-1.037-0.051-1.559-0.158l-74.963-15.348 c-2.061-0.422-3.861-1.664-4.988-3.441C53.803,161.66,53.447,159.502,53.945,157.457z M73.998,262.299 c-0.307,0-0.615-0.019-0.926-0.055c-2.48-0.298-4.664-1.777-5.867-3.97c-7.967-14.554-13.252-30.248-15.703-46.651 c-0.375-2.5,0.496-5.025,2.33-6.765c1.836-1.739,4.408-2.475,6.881-1.967l46.438,9.508c2.73,0.559,4.951,2.541,5.811,5.192 c0.861,2.651,0.232,5.562-1.648,7.617l-31.598,34.569C78.238,261.396,76.158,262.299,73.998,262.299z M122.166,311.134 c-0.625,0.157-1.262,0.235-1.895,0.235c-1.443,0-2.873-0.404-4.117-1.185c-4.988-3.132-9.834-6.615-14.402-10.354 c-1.646-1.348-2.666-3.312-2.818-5.434c-0.154-2.123,0.572-4.213,2.006-5.785l50.543-55.295c2.66-2.907,7.08-3.356,10.268-1.039 c3.189,2.315,4.129,6.658,2.184,10.086l-36.928,65.08C125.963,309.285,124.215,310.616,122.166,311.134z M220.527,325.256 c-1.078,2.278-3.197,3.892-5.683,4.319c-7.889,1.367-15.979,2.059-24.051,2.059s-16.162-0.691-24.051-2.059 c-2.482-0.43-4.602-2.041-5.68-4.319c-1.076-2.278-0.979-4.938,0.266-7.132l22.73-40.061c1.375-2.424,3.947-3.922,6.736-3.922 c2.787,0,5.357,1.498,6.734,3.922l22.729,40.061C221.506,320.317,221.604,322.978,220.527,325.256z M282.658,294.399 c-0.154,2.121-1.175,4.086-2.82,5.434c-4.57,3.74-9.416,7.222-14.402,10.352c-1.243,0.781-2.674,1.187-4.114,1.187 c-0.636,0-1.271-0.078-1.896-0.236c-2.049-0.516-3.799-1.849-4.842-3.687l-36.926-65.08c-1.945-3.428-1.006-7.771,2.184-10.086 c3.189-2.318,7.607-1.868,10.268,1.039l50.542,55.295C282.086,290.187,282.812,292.276,282.658,294.399z M314.385,258.274 c-1.199,2.193-3.385,3.672-5.867,3.971c-0.309,0.037-0.616,0.055-0.926,0.055c-2.16,0-4.238-0.904-5.715-2.52l-31.598-34.569 c-1.882-2.058-2.513-4.968-1.65-7.618c0.861-2.65,3.082-4.634,5.813-5.193l46.436-9.506c2.479-0.508,5.045,0.228,6.881,1.967 c1.836,1.738,2.707,4.264,2.332,6.765C327.637,228.026,322.354,243.722,314.385,258.274z"></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
              <div
                className={` ${
                  content === 2 ? "flex" : "hidden"
                }  h-fit transition duration-300 w-full mt-[10px] justify-center items-center`}
              >
                <div className=" block w-full">
                  <div className=" flex justify-center items-center">
                    <h1 className=" text-white text-center text-sm sm:text-base font-semibold">
                      Registro de datos
                    </h1>
                  </div>
                  <div className=" flex justify-center items-center">
                    <form action="" className=" my-5">
                      <label className=" text-left text-sm font-bold text-white">
                        Tipo de vehículo
                      </label>
                      <div className=" flex justify-center  items-center">
                        <input
                          {...register("vehicleType", {
                            required: true,
                            minLength: 3,
                            maxLength: 30,
                          })}
                          className=" w-[250px] lg:w-[300px] bg-gray-200 text-[#8f0e2a] border border-[#8f0e2a] rounded py-2 px-4 mb-3"
                          type="text"
                        />
                      </div>
                    </form>
                  </div>
                  <div className=" flex justify-center items-center">
                    <button
                      onClick={onSubmit}
                      className=" text-white hover:text-[#8f0e2a] flex justify-center items-center p-2 border-[1px] border-white rounded-lg hover:bg-white transition duration-300"
                    >
                      <h1>Registrar</h1>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/inmuebles/config">
            <div className=" flex  transition duration-700  group justify-center items-center w-screen md:pl-[70px] border-[1px] border-white h-fit bg-gradient-to-br from-[#852655] to-[#8f0e2a]">
              <div className=" block w-full h-full group-hover:bg-white bg-transparent p-20 group-hover:bg-opacity-30 transition duration-300">
                <div className=" flex h-full justify-center items-center">
                  <h1 className=" text-white text-center text-sm sm:text-lg font-semibold">
                    Regresar a configuración
                  </h1>
                </div>
                <div className=" py-2 flex justify-center items-center">
                  <svg
                    className=" fill-white h-[100px] lg:h-[120px]"
                    viewBox="0 -4 36.809 36.809"
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
                      <g
                        id="Lager_85"
                        dataName="Lager 85"
                        transform="translate(0.809 0.809)"
                      >
                        {" "}
                        <path
                          id="Path_93"
                          dataName="Path 93"
                          d="M26,10H20.037v0c-.012,0-.024,0-.037,0H16.791l6.637-6.637a1.954,1.954,0,0,0,0-2.763L23.4.572a1.954,1.954,0,0,0-2.763,0L10.8,10.407a1.854,1.854,0,0,0-.2.165l-.01.01-.008.008-.01.01a2.125,2.125,0,0,0-.177.217c-.017.023-.038.043-.054.067A1.938,1.938,0,0,0,10,11.991v.018a1.94,1.94,0,0,0,.34,1.107c.015.024.036.043.053.066a2.019,2.019,0,0,0,.178.218l.011.01.007.007.01.011a1.854,1.854,0,0,0,.2.165l9.834,9.835a1.954,1.954,0,0,0,2.763,0l.028-.028a1.954,1.954,0,0,0,0-2.763L16.791,14H20c.013,0,.025,0,.037,0v0H26a6.007,6.007,0,0,1,6,6v5.994a2,2,0,1,0,4,0V20A10,10,0,0,0,26,10Z"
                          className=" fill-white"
                        ></path>{" "}
                        <g id="Group_38" dataName="Group 38">
                          {" "}
                          <rect
                            id="Rectangle_43"
                            dataName="Rectangle 43"
                            width="18.141"
                            height="3.947"
                            rx="1.954"
                            transform="translate(-0.809 12.019) rotate(-45)"
                            className=" fill-white"
                          ></rect>{" "}
                        </g>{" "}
                        <g id="Group_39" dataName="Group 39">
                          {" "}
                          <rect
                            id="Rectangle_44"
                            dataName="Rectangle 44"
                            width="3.947"
                            height="18.141"
                            rx="1.954"
                            transform="translate(-0.809 11.981) rotate(-45)"
                            className=" fill-white"
                          ></rect>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </Link>
          <Toaster position="top-center" richColors />
        </div>
      </div>
    </ContentComponent>
  );
}

export default VehicleTypes;
