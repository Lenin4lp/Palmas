import React, { useEffect, useState } from "react";
import ContentComponent from "../../components/ContentComponent";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Modal from "../../components/Modal";
import { deletePlace } from "../../api/places";

function Houses() {
  const placesData = useLoaderData();
  const places = placesData.places.data;
  const types = placesData.types.data;
  const navigation = useNavigation();
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [search, setSearch] = useState("");
  const [placesTable, setPlacesTable] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [open, setOpen] = useState(false);

  const originalPlaces = [...places];
  const originalPlacesTable = [...placesTable];

  console.log(places, types);
  console.log(selectedOrder);
  console.log(selectedType);
  console.log(selectedPlace);
  // TODO ES NECESARIO REVISAR EL FILTRO POR DEUDA PARA VER SI FUNCIONA CORRECTAMENTES

  const handleChange = (e) => {
    setSearch(e.target.value);
    searchedPlaces(e.target.value);
  };

  const removePlace = async (placeId) => {
    try {
      const res = await deletePlace(placeId);
      if (res.status === 204) {
        toast.success("inmueble eliminado con éxito");
        setTimeout(() => {
          window.location.href = `/inmuebles`;
        }, 2000);
      }
    } catch (error) {}
  };

  function sortByPendingValue(places) {
    return places.sort((a, b) => {
      const valueA = parseFloat(a.pending_value);
      const valueB = parseFloat(b.pending_value);
      if (valueA > valueB) {
        return -1;
      }
      if (valueA < valueB) {
        return 1;
      }
      return 0;
    });
  }

  const filteredPlaces =
    search === ""
      ? selectedOrder === ""
        ? places
        : sortByPendingValue(originalPlaces)
      : selectedOrder === ""
      ? placesTable
      : sortByPendingValue(originalPlacesTable);

  const filteredTypes =
    selectedType === ""
      ? filteredPlaces
      : filteredPlaces.filter((place) => place.placeType_id == selectedType);

  const searchedPlaces = (search) => {
    let results = places.filter((place) => {
      if (place.place_name.toLowerCase().includes(search.toLowerCase())) {
        return place;
      }
    });
    setPlacesTable(results);
  };

  const totalDebt = places.reduce(
    (acc, place) => acc + parseFloat(place.pending_value),
    0
  );
  const formattedTotalDebt = totalDebt.toFixed(2);
  console.log(formattedTotalDebt);

  const handleSelectedType = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSelectedOrder = (number) => {
    setSelectedOrder(number);
  };

  if (navigation.state === "loading") {
    return <div>Cargando</div>;
  }
  return (
    <ContentComponent>
      <div className=" w-full m-5 mb-0">
        <Modal open={open} onClose={() => setOpen(false)}>
          {Object.keys(selectedPlace).length != 0 &&
          selectedPlace.months.length === 0 ? (
            <div className=" block m-3">
              <div className=" my-3">
                <h1 className=" text-center text-white text-lg font-bold">
                  Confirmación
                </h1>
              </div>
              <div className=" my-3">
                <h1 className=" text-center text-white text-base font-medium">
                  ¿Estás seguro de eliminar el inmueble?
                </h1>
              </div>
              <div className=" flex justify-center items-center">
                <div className=" my-2 grid grid-cols-2">
                  <div className=" mx-4">
                    <button
                      onClick={() => removePlace(selectedPlace.place_id)}
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
          ) : (
            <div className=" block m-3">
              <div className=" my-3">
                <h1 className=" text-center text-white text-lg font-bold">
                  Confirmación
                </h1>
              </div>
              <div className=" py-3">
                <h1 className=" text-center text-white text-base font-medium">
                  ¿Estás seguro de eliminar el tipo de inmueble?
                </h1>
              </div>
              <div className=" pb-1">
                <h1 className=" text-center text-white text-base font-medium">
                  Se borrarán todas las deudas y registros de pagos
                  correspondientes
                </h1>
              </div>
              <div className=" pb-3">
                <h1 className=" text-center text-white text-base font-medium">
                  al inmueble
                </h1>
              </div>
              <div className=" flex justify-center items-center">
                <div className=" my-2 grid grid-cols-2">
                  <div className=" mx-4">
                    <button
                      onClick={() => removePlace(selectedPlace.place_id)}
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
          )}
        </Modal>
        <div className="block">
          <div className=" block md:flex mx-5 ">
            <div className=" flex justify-center ">
              <div className=" h-[120px] lg:h-[150px] w-[270px] lg:w-[300px] flex justify-center items-center border-[1px] bg-gradient-to-r from-[#852655] to-[#8f0e2a] border-[#852655] rounded-lg">
                <div className=" grid grid-cols-5">
                  <div className=" col-span-2 flex justify-center items-center">
                    <svg
                      className=" h-[70px] lg:h-[100px] w-auto"
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
                          d="M18.5 3H16C15.7239 3 15.5 3.22386 15.5 3.5V3.55891L19 6.35891V3.5C19 3.22386 18.7762 3 18.5 3Z"
                          className="fill-white"
                        ></path>{" "}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.75 9.5C10.75 8.80964 11.3097 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3097 10.75 10.75 10.1904 10.75 9.5Z"
                          className="fill-white"
                        ></path>{" "}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.75 10.9605L21.5315 11.5857C21.855 11.8444 22.3269 11.792 22.5857 11.4685C22.8444 11.1451 22.792 10.6731 22.4685 10.4143L14.3426 3.91362C12.9731 2.81796 11.027 2.81796 9.65742 3.91362L1.53151 10.4143C1.20806 10.6731 1.15562 11.1451 1.41438 11.4685C1.67313 11.792 2.1451 11.8444 2.46855 11.5857L3.25003 10.9605V21.25H2.00003C1.58581 21.25 1.25003 21.5858 1.25003 22C1.25003 22.4142 1.58581 22.75 2.00003 22.75H22C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25H20.75V10.9605ZM9.25003 9.5C9.25003 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25003 11.0188 9.25003 9.5ZM12.0494 13.25C12.7143 13.25 13.2871 13.2499 13.7459 13.3116C14.2375 13.3777 14.7088 13.5268 15.091 13.909C15.4733 14.2913 15.6223 14.7625 15.6884 15.2542C15.7462 15.6842 15.7498 16.2146 15.75 16.827C15.75 16.8679 15.75 16.9091 15.75 16.9506L15.75 21.25H14.25V17C14.25 16.2717 14.2484 15.8009 14.2018 15.454C14.1581 15.1287 14.0875 15.0268 14.0304 14.9697C13.9733 14.9126 13.8713 14.842 13.546 14.7982C13.1991 14.7516 12.7283 14.75 12 14.75C11.2717 14.75 10.8009 14.7516 10.4541 14.7982C10.1288 14.842 10.0268 14.9126 9.9697 14.9697C9.9126 15.0268 9.84199 15.1287 9.79826 15.454C9.75162 15.8009 9.75003 16.2717 9.75003 17V21.25H8.25003L8.25003 16.9506C8.24999 16.2858 8.24996 15.7129 8.31163 15.2542C8.37773 14.7625 8.52679 14.2913 8.90904 13.909C9.29128 13.5268 9.76255 13.3777 10.2542 13.3116C10.7129 13.2499 11.2858 13.25 11.9507 13.25H12.0494Z"
                          className="fill-white"
                        ></path>{" "}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.75 9.5C10.75 8.80964 11.3097 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3097 10.75 10.75 10.1904 10.75 9.5Z"
                          className="fill-white"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className=" col-span-3 flex justify-center items-center">
                    <div className=" block">
                      <div className=" flex justify-center items-center">
                        <h1 className=" text-left px-1 text-[14px] font-bold text-white">
                          N° de Inmuebles
                        </h1>
                      </div>
                      <div className=" flex justify-start items-center">
                        <h1 className=" text-left px-1 text-5xl font-medium text-white">
                          {places.length}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-center items-center md:mt-0 md:mx-5 ">
              <div className="  h-[120px] lg:h-[150px] w-[270px] lg:w-[300px] flex justify-center items-center border-[1px] bg-gradient-to-r from-[#852655] to-[#8f0e2a] border-[#852655] rounded-lg">
                <div className=" grid grid-cols-5">
                  <div className=" col-span-2 flex justify-center items-center">
                    <svg
                      className=" h-[70px] lg:h-[100px] w-auto "
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M694.3 511.92c-121.21 0-219.47 98.26-219.47 219.47s98.26 219.47 219.47 219.47 219.47-98.26 219.47-219.47c-0.01-121.21-98.27-219.47-219.47-219.47z m0 365.79c-80.69 0-146.33-65.64-146.33-146.33 0-80.69 65.64-146.33 146.33-146.33 80.68 0 146.33 65.64 146.33 146.33-0.01 80.69-65.65 146.33-146.33 146.33z"
                          className=" fill-white"
                        ></path>
                        <path
                          d="M199.72 814.55c-23.52-39.54-24.45-87.29-2.48-127.71L411.4 292.57h127.23l101.23 184.96 64.18-35.11-82.02-149.86H657v-73.14h-33.37l69.95-146.29H254.73l76.33 146.29h-39.77v73.14h36.85L132.95 651.91c-34.39 63.34-32.93 138.11 3.91 200.04s101.86 98.91 173.91 98.91h126.64v-73.14H310.78c-46.02-0.01-87.54-23.61-111.06-63.17zM375.4 146.29h202.14l-34.97 73.14h-129l-38.17-73.14zM667.44 621.61h54.86v138.46h-54.86zM667.44 786.05h54.86v55.5h-54.86z"
                          className="fill-white"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className=" col-span-3 flex justify-center items-center">
                    <div className=" block">
                      <div className=" flex justify-center items-center">
                        <h1 className=" text-left px-1 text-[14px] font-bold text-white">
                          Deuda total
                        </h1>
                      </div>
                      <div className=" flex justify-start items-center">
                        <h1 className=" text-left px-1 text-2xl font-medium text-white">
                          {`$${formattedTotalDebt}`}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="  mt-10 h-[70px] lg:h-[100px] w-screen  flex justify-start items-center">
            <div className=" h-full w-fit bg-gradient-to-r from-[#852655] to-[#8f0e2a] flex justify-center items-center">
              <h1 className=" text-xl lg:text-3xl font-bold px-5 text-white">
                Lista de Inmuebles
              </h1>
            </div>
          </div>
          <div>
            <div className=" w-full lg:w-screen grid lg:border-[1px] border-[#8f0e2a] grid-cols-1 lg:grid-cols-6">
              <div className=" md:col-span-2 w-full h-full lg:border-r-[1px] border-[#8f0e2a]">
                <div className=" ml-[25px]  block">
                  <div className=" relative mt-10 mb-5 flex justify-start rounded-lg bg-white ">
                    <div className="flex justify-center items-center">
                      <div className="flex space-x-1">
                        <input
                          onChange={handleChange}
                          type="text"
                          className="block w-full px-4 py-2 text-[#852655] bg-white border rounded-full focus:border-[#8f0e2a] focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Search..."
                        />
                        <button className="px-4 text-white bg-[#852655] rounded-full ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className=" h-4 md:w-5  w-4 md:h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className=" mr-[20px]">
                    <div className=" block">
                      <div className="flex items-center hover:cursor-pointer group transition duration-500 px-4 border w-full justify-center border-gray-200 rounded ">
                        <input
                          id="bordered-radio-1"
                          type="radio"
                          defaultChecked
                          onFocus={() => setSelectedOrder("")}
                          name="bordered-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 "
                        />
                        <label
                          htmlFor="bordered-radio-1"
                          className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Ordenar por numeración
                        </label>
                      </div>
                      <div className="flex items-center hover:cursor-pointer group px-4 border w-full justify-center border-gray-200 rounded ">
                        <input
                          type="radio"
                          id="bordered-radio-2"
                          onFocus={() => setSelectedOrder("debt")}
                          name="bordered-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 "
                        />
                        <label
                          htmlFor="bordered-radio-2"
                          className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Ordenar por deuda
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" m-5 md:col-span-4 flex justify-start items-center  w-full  ">
                <div className=" md:h-screen block">
                  <div className=" flex justify-start items-center">
                    <div className=" block">
                      <label
                        htmlFor="countries"
                        className="block mb-2 text-base font-semibold text-gray-900 "
                      >
                        Tipos de inmueble:
                      </label>
                      <select
                        value={selectedType}
                        onChange={handleSelectedType}
                        className="bg-gray-50 border border-[#8f0e2a] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      >
                        <option value="" defaultValue>
                          Todos
                        </option>
                        {types.map((type) => (
                          <option
                            key={type.placetype_id}
                            value={type.placetype_id}
                          >
                            {type.placetype_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {filteredTypes.length > 0 ? (
                    <div className=" flex justify-center items-center">
                      <div className=" mt-5 h-full md:h-[500px] overflow-x-auto overflow-y-auto w-[290px] sm:w-full">
                        <table className=" h-full  border-collapse text-[12px] lg:text-sm">
                          <thead className=" sticky top-0 ">
                            <tr>
                              <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[40px] py-2">
                                Inmueble
                              </th>

                              <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[100px] lg:px-[120px] py-2">
                                Propietario
                              </th>
                              <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[10px] py-2">
                                Monto pendiente
                              </th>
                              <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[15px] py-2">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredTypes.map((place) => (
                              <tr
                                key={place.place_id}
                                className=" text-[11px] lg:text-[12px]"
                              >
                                <th className="border border-slate-300 px-2 py-2">
                                  {place.place_name}
                                </th>
                                <th className="border border-slate-300 px-2 py-2">
                                  {place.neighbors.filter(
                                    (neighbor) => neighbor.role_id === 1
                                  ).length > 0
                                    ? `${
                                        place.neighbors.filter(
                                          (neighbor) => neighbor.role_id === 1
                                        )[0].neighbor_name
                                      } ${
                                        place.neighbors.filter(
                                          (neighbor) => neighbor.role_id === 1
                                        )[0].neighbor_lastname
                                      }`
                                    : "N/A"}
                                </th>
                                <th className="border border-slate-300 px-2 py-2">
                                  {place.pending_value}
                                </th>
                                <th className=" border grid grid-cols-2 h-full border-slate-300  py-2">
                                  <div className=" flex justify-center border-none items-center">
                                    <Link to={`/inmuebles/${place.place_id}`}>
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
                                    <svg
                                      onClick={() => {
                                        setSelectedPlace(place);
                                        setOpen(true);
                                      }}
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
                                  </div>
                                </th>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className=" flex justify-start items-start w-full h-full">
                      <h1 className=" text-[#852655] text-3xl font-bold text-center m-20">
                        No se encontraron inmuebles
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster position="top-center" richColors />
      </div>
    </ContentComponent>
  );
}

export default Houses;

{
  /* <Modal open={open} onClose={() => setOpen(false)}>
          <div className=" block m-3">
            <div className=" my-3">
              <h1 className=" text-center text-white text-lg font-bold">
                Confirmación
              </h1>
            </div>
            <div className=" py-3">
              <h1 className=" text-center text-white text-base font-medium">
                ¿Estás seguro de eliminar el tipo de inmueble?
              </h1>
            </div>
            <div className=" pb-1">
              <h1 className=" text-center text-white text-base font-medium">
                Se borrarán todas las deudas y registros de pagos
                correspondientes
              </h1>
            </div>
            <div className=" pb-3">
              <h1 className=" text-center text-white text-base font-medium">
                al inmueble
              </h1>
            </div>
            <div className=" flex justify-center items-center">
              <div className=" my-2 grid grid-cols-2">
                <div className=" mx-4">
                  <button
                    onClick={() => removeType(selectedType)}
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
        </Modal> */
}
