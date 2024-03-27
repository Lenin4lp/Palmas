import React, { useState } from "react";
import ContentComponent from "../../components/ContentComponent";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createPlaceType } from "../../api/places";
import { Toaster, toast } from "sonner";

function PlaceTypes() {
  const typesData = useLoaderData();
  const types = typesData.data;
  const navigation = useNavigation();
  const { handleSubmit, register } = useForm();
  console.log(types);
  const [content, setContent] = useState("");

  const registerType = async (data) => {
    try {
      const res = await createPlaceType(data);
      if (res.status === 200) {
        toast.success("Tipo de inmueble registrado con éxito");
        setTimeout(() => {
          window.location.href = `/inmuebles/config/tipos_de_inmueble`;
        }, 2000);
      }
    } catch (error) {
      error.response.data.map((err) => toast.error(err));
    }
  };

  const onSubmit = handleSubmit((data) => {
    registerType(data);
  });

  function getDebt(type) {
    if (type.places?.length === 0) return "N/A";

    const totalDebt = type.places?.reduce(
      (acc, place) => acc + parseFloat(place.pending_value),
      0
    );
    const formattedTotalDebt = totalDebt.toFixed(2);
    return formattedTotalDebt;
  }

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
                  Visualiza los tipos de inmueble
                </h1>
              </div>
              <div className=" py-2 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="Layer_1"
                  data-name="Layer 1"
                  className=" fill-white h-[100px] lg:h-[120px] w-auto"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="none"
                      className=" fill-none stroke-white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.91px"
                      d="M1.5,8.66v2.86A6.68,6.68,0,0,0,8.18,18.2h0V22l6.68-3.82h1a6.68,6.68,0,0,0,6.68-6.68V8.66A6.68,6.68,0,0,0,15.82,2H8.18A6.68,6.68,0,0,0,1.5,8.66Z"
                    ></path>
                    <rect
                      x="9.14"
                      y="9.61"
                      width="5.73"
                      height="4.77"
                      className=" fill-none stroke-white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.91px"
                    ></rect>
                    <polygon
                      points="12 5.79 8.18 9.61 15.82 9.61"
                      className=" fill-none stroke-white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.91px"
                    ></polygon>
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
                                Tipo de inmueble
                              </th>
                              <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[10px] py-2">
                                N° de inmuebles
                              </th>
                              <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[25px] py-2">
                                Deuda
                              </th>
                              <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[15px] py-2">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {types.map((type) => (
                              <tr
                                key={type.placetype_id}
                                className=" text-[11px] lg:text-[12px]"
                              >
                                <th className="border border-slate-300 px-2 py-2">
                                  {type.placetype_id}
                                </th>
                                <th className="border border-slate-300 px-2 py-2">
                                  {type.placetype_name}
                                </th>
                                <th className="border border-slate-300 px-2 py-2">
                                  {type.places.length}
                                </th>
                                <th className="border border-slate-300 px-2 py-2">
                                  {getDebt(type)}
                                </th>
                                <th className=" border grid grid-cols-2 h-full border-slate-300  py-2">
                                  <div className=" flex justify-center border-none items-center">
                                    <Link
                                      to={`/inmuebles/${type.placetype_id}`}
                                    >
                                      <svg
                                        className=" h-[19px] hover:cursor-pointer"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
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
                                          <circle
                                            cx="12"
                                            cy="12"
                                            r="3"
                                            stroke="#ababab"
                                            strokeWidth="2"
                                          ></circle>{" "}
                                          <path
                                            d="M21 12C21 12 20 4 12 4C4 4 3 12 3 12"
                                            stroke="#ababab"
                                            strokeWidth="2"
                                          ></path>{" "}
                                        </g>
                                      </svg>
                                    </Link>
                                  </div>
                                  <div className=" flex justify-center items-center">
                                    <Link
                                      to={`/inmuebles/modificar/${type.placetype_id}`}
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
                  Crea un nuevo tipo de inmueble
                </h1>
              </div>
              <div className=" py-2 flex justify-center items-center">
                <svg
                  className=" fill-none h-[100px] lg:h-[120px] "
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
                      d="M19 9.77818V16.2001C19 17.8802 19 18.7203 18.673 19.362C18.3854 19.9265 17.9265 20.3855 17.362 20.6731C16.7202 21.0001 15.8802 21.0001 14.2 21.0001H9.8C8.11984 21.0001 7.27976 21.0001 6.63803 20.6731C6.07354 20.3855 5.6146 19.9265 5.32698 19.362C5 18.7203 5 17.8802 5 16.2001V9.77753M21 12.0001L15.5668 5.96405C14.3311 4.59129 13.7133 3.9049 12.9856 3.65151C12.3466 3.42894 11.651 3.42899 11.0119 3.65165C10.2843 3.90516 9.66661 4.59163 8.43114 5.96458L3 12.0001M12 12.0001V16.0001M14 14.0001H10"
                      className=" stroke-white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
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
                        Tipo de inmueble
                      </label>
                      <div className=" flex justify-center  items-center">
                        <input
                          {...register("placetype_name", {
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

export default PlaceTypes;
