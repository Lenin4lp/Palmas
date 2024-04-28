import React, { useState, useEffect } from "react";
import ContentComponent from "../../components/ContentComponent";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import { addPlaceFromNeighbor } from "../../api/neighbors";
import { Toaster, toast } from "sonner";
import PlaceButton from "../../components/PlaceButton";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";

function NeighborPlaces() {
  const neighborData = useLoaderData();
  const neighbor = neighborData.neighbor.data.neighbor;
  const places = neighborData.places.data;
  const navigation = useNavigation();
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [placesTable, setPlacesTable] = useState([]);
  const [open, setOpen] = useState(false);

  const filteredPlaces = places.filter((place) => {
    return !place.neighbors.some(
      (neighborModel) => neighborModel.neighbor_id === neighbor.neighbor_id
    );
  });
  const handleChange = (e) => {
    setSearch(e.target.value);
    searchedPlaces(e.target.value);
  };

  const searchedPlaces = (search) => {
    let results = filteredPlaces.filter((place) => {
      if (place.place_name.toLowerCase().includes(search.toLowerCase())) {
        return place;
      }
    });
    setPlacesTable(results);
  };

  const togglePlaceSelection = (place) => {
    if (selectedPlaces.length < 10) {
      if (selectedPlaces.includes(place)) {
        setSelectedPlaces(selectedPlaces.filter((p) => p !== place));
      } else {
        setSelectedPlaces([...selectedPlaces, place]);
      }
    } else {
      if (selectedPlaces.includes(place)) {
        setSelectedPlaces(selectedPlaces.filter((p) => p !== place));
      } else {
        toast.error("No puedes seleccionar más de 10 lugares.");
      }
    }
  };
  const addPlace = async (neighborId, placeIds) => {
    try {
      const res = await addPlaceFromNeighbor(neighborId, placeIds);
      if (res.status !== 200) {
        toast.success("Inmueble(s) agregado(s) con éxito");
      }
    } catch (error) {
      error.response.data.map((err) => toast.error(err));
    }
  };

  if (navigation.state === "loading") {
    return <Loader />;
  }
  return (
    <ContentComponent>
      <div className=" flex  justify-center items-center">
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className=" block m-3">
            <div className=" my-3">
              <h1 className=" text-center text-white text-lg font-bold">
                Confirmación
              </h1>
            </div>
            <div className=" my-3">
              <h1 className=" text-center text-white text-base font-medium">
                ¿Estás seguro de agregar el/los inmueble(s)?
              </h1>
            </div>
            <div className=" flex justify-center items-center">
              <div className=" my-2 grid grid-cols-2">
                <div className=" mx-4">
                  <button
                    onClick={() =>
                      Promise.all(
                        selectedPlaces.map((selectedPlace) => {
                          return addPlace(
                            neighbor.neighbor_id,
                            `${selectedPlace}`
                          );
                        })
                      )
                        .then(() => {
                          toast.success("Se agregaron los inmuebles");
                          // Todas las operaciones se completaron con éxito
                          setTimeout(() => {
                            window.location.href = "/vecinos";
                          }, 2000); // Por ejemplo, redirigir después de 2 segundos (2000ms)
                        })
                        .catch((error) => {
                          toast.error(error);
                        })
                    }
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
        <div className=" block">
          <div className=" w-screen md:px-[70px] flex justify-start items-center">
            <svg
              className=" h-[80px] ml-5"
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
                  d="M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12"
                  stroke="#852655"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <div className=" block">
              <p className=" mx-5 mt-2 text-[#8f0e2a] text-sm md:text-lg">
                {neighbor.role_id === 1 ? "Propietario" : "Arrendatario"}
              </p>
              <h1 className=" mx-5 md:mb-2 text-left font-bold text-[#852655] text-xl md:text-3xl">{`${neighbor.neighbor_name} ${neighbor.neighbor_lastname}`}</h1>
            </div>
          </div>
          <div className=" mt-2 md:mt-5 w-screen h-fit bg-gradient-to-b from-[#852655] to-[#8f0e2a]">
            <div className=" md:mx-[70px] p-10">
              <h1 className=" text-center text-[13px] md:text-base text-white">
                Selecciona los inmuebles relacionados al vecino
              </h1>
            </div>
          </div>
          <div className="  md:ml-[70px] ">
            <div className=" grid grid-cols-1 md:grid-cols-6">
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
                  <div className=" flex justify-center">
                    <div className=" mr-5 h-fit border-[1px] pb-5 w-full border-[#8f0e2a] rounded-lg">
                      <div className=" m-2 flex justify-center items-center flex-wrap">
                        {selectedPlaces.length > 0 ? (
                          selectedPlaces.map((selectedPlace) => {
                            const choosenPlace = places.find(
                              (place) => place.place_id == selectedPlace
                            );
                            return (
                              <div
                                className=" h-[20px] mx-3 my-3 w-auto"
                                key={selectedPlace}
                              >
                                {choosenPlace && (
                                  <div className=" bg-[#8f0e2a] px-2 py-2 rounded-lg">
                                    <h1 className="text-center  text-white">
                                      {choosenPlace.place_name}
                                    </h1>
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <>No hay nada para mostrar</>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" flex justify-center my-5 items-center">
                    <button
                      onClick={() => setOpen(true)}
                      className=" hover:bg-[#852655] duration-300 transition hover:text-white p-2 rounded-lg bg-transparent border-[1px] border-[#8f0e2a]"
                    >
                      <h1>Guardar</h1>
                    </button>
                  </div>
                </div>
              </div>
              <div className="  md:col-span-4 h-[400px] md:h-screen  overflow-x-auto overflow-y-auto w-full  ">
                <div className=" h-[400px] md:h-screen mt-5 mx-5 lg:gap-y-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 text-[12px] lg:text-sm">
                  {search === "" ? (
                    filteredPlaces.map((place) => (
                      <div key={place.place_id}>
                        <div
                          onClick={() => togglePlaceSelection(place.place_id)}
                          className=" rounded-full h-[150px] w-[150px] transition duration-300 hover:scale-105 hover:cursor-pointer"
                        >
                          <PlaceButton
                            color={
                              selectedPlaces.includes(place.place_id)
                                ? "bg-[#4eba6d]"
                                : "bg-[#8f0e2a]"
                            }
                            svg={
                              selectedPlaces.includes(place.place_id) ? (
                                <svg
                                  className=" h-[50px] lg:h-[80px] w-auto"
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
                                    <g id="Navigation / House_Check">
                                      {" "}
                                      <path
                                        id="Vector"
                                        d="M15 11.0001L11 15.0001L9 13.0001M4 16.8002V11.4522C4 10.9179 4 10.6506 4.06497 10.4019C4.12255 10.1816 4.21779 9.97307 4.3457 9.78464C4.49004 9.57201 4.69064 9.39569 5.09277 9.04383L9.89436 4.84244C10.6398 4.19014 11.0126 3.86397 11.4324 3.73982C11.8026 3.63035 12.1972 3.63035 12.5674 3.73982C12.9875 3.86406 13.3608 4.19054 14.1074 4.84383L18.9074 9.04383C19.3096 9.39569 19.5102 9.57201 19.6546 9.78464C19.7825 9.97307 19.877 10.1816 19.9346 10.4019C19.9995 10.6506 20 10.9179 20 11.4522V16.8037C20 17.9216 20 18.4811 19.7822 18.9086C19.5905 19.2849 19.2837 19.5906 18.9074 19.7823C18.48 20.0001 17.921 20.0001 16.8031 20.0001H7.19691C6.07899 20.0001 5.5192 20.0001 5.0918 19.7823C4.71547 19.5906 4.40973 19.2849 4.21799 18.9086C4 18.4807 4 17.9203 4 16.8002Z"
                                        className=" stroke-white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>{" "}
                                    </g>{" "}
                                  </g>
                                </svg>
                              ) : (
                                <svg
                                  className=" h-[50px] lg:h-[80px] w-auto"
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
                                    <g id="Navigation / House_02">
                                      {" "}
                                      <path
                                        id="Vector"
                                        d="M4 11.4522V16.8002C4 17.9203 4 18.4807 4.21799 18.9086C4.40973 19.2849 4.71547 19.5906 5.0918 19.7823C5.5192 20.0001 6.07899 20.0001 7.19691 20.0001H16.8031C17.921 20.0001 18.48 20.0001 18.9074 19.7823C19.2837 19.5906 19.5905 19.2849 19.7822 18.9086C20 18.4811 20 17.9216 20 16.8037V11.4522C20 10.9179 19.9995 10.6506 19.9346 10.4019C19.877 10.1816 19.7825 9.97307 19.6546 9.78464C19.5102 9.57201 19.3096 9.39569 18.9074 9.04383L14.1074 4.84383C13.3608 4.19054 12.9875 3.86406 12.5674 3.73982C12.1972 3.63035 11.8026 3.63035 11.4324 3.73982C11.0126 3.86397 10.6398 4.19014 9.89436 4.84244L5.09277 9.04383C4.69064 9.39569 4.49004 9.57201 4.3457 9.78464C4.21779 9.97307 4.12255 10.1816 4.06497 10.4019C4 10.6506 4 10.9179 4 11.4522Z"
                                        className=" stroke-white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>{" "}
                                    </g>{" "}
                                  </g>
                                </svg>
                              )
                            }
                          >
                            <h1 className=" text-center text-white">
                              {place.place_name}
                            </h1>
                          </PlaceButton>
                        </div>
                      </div>
                    ))
                  ) : placesTable.length > 0 ? (
                    placesTable.map((place) => (
                      <div key={place.place_id}>
                        <div
                          onClick={() => togglePlaceSelection(place.place_id)}
                          className=" rounded-full h-[150px] w-[150px] transition duration-300 hover:scale-105 hover:cursor-pointer"
                        >
                          <PlaceButton
                            color={
                              selectedPlaces.includes(place.place_id)
                                ? "bg-[#4eba6d]"
                                : "bg-[#8f0e2a]"
                            }
                            svg={
                              selectedPlaces.includes(place.place_id) ? (
                                <svg
                                  className=" h-[50px] lg:h-[80px] w-auto"
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
                                    <g id="Navigation / House_Check">
                                      {" "}
                                      <path
                                        id="Vector"
                                        d="M15 11.0001L11 15.0001L9 13.0001M4 16.8002V11.4522C4 10.9179 4 10.6506 4.06497 10.4019C4.12255 10.1816 4.21779 9.97307 4.3457 9.78464C4.49004 9.57201 4.69064 9.39569 5.09277 9.04383L9.89436 4.84244C10.6398 4.19014 11.0126 3.86397 11.4324 3.73982C11.8026 3.63035 12.1972 3.63035 12.5674 3.73982C12.9875 3.86406 13.3608 4.19054 14.1074 4.84383L18.9074 9.04383C19.3096 9.39569 19.5102 9.57201 19.6546 9.78464C19.7825 9.97307 19.877 10.1816 19.9346 10.4019C19.9995 10.6506 20 10.9179 20 11.4522V16.8037C20 17.9216 20 18.4811 19.7822 18.9086C19.5905 19.2849 19.2837 19.5906 18.9074 19.7823C18.48 20.0001 17.921 20.0001 16.8031 20.0001H7.19691C6.07899 20.0001 5.5192 20.0001 5.0918 19.7823C4.71547 19.5906 4.40973 19.2849 4.21799 18.9086C4 18.4807 4 17.9203 4 16.8002Z"
                                        className=" stroke-white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>{" "}
                                    </g>{" "}
                                  </g>
                                </svg>
                              ) : (
                                <svg
                                  className=" h-[50px] lg:h-[80px] w-auto"
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
                                    <g id="Navigation / House_02">
                                      {" "}
                                      <path
                                        id="Vector"
                                        d="M4 11.4522V16.8002C4 17.9203 4 18.4807 4.21799 18.9086C4.40973 19.2849 4.71547 19.5906 5.0918 19.7823C5.5192 20.0001 6.07899 20.0001 7.19691 20.0001H16.8031C17.921 20.0001 18.48 20.0001 18.9074 19.7823C19.2837 19.5906 19.5905 19.2849 19.7822 18.9086C20 18.4811 20 17.9216 20 16.8037V11.4522C20 10.9179 19.9995 10.6506 19.9346 10.4019C19.877 10.1816 19.7825 9.97307 19.6546 9.78464C19.5102 9.57201 19.3096 9.39569 18.9074 9.04383L14.1074 4.84383C13.3608 4.19054 12.9875 3.86406 12.5674 3.73982C12.1972 3.63035 11.8026 3.63035 11.4324 3.73982C11.0126 3.86397 10.6398 4.19014 9.89436 4.84244L5.09277 9.04383C4.69064 9.39569 4.49004 9.57201 4.3457 9.78464C4.21779 9.97307 4.12255 10.1816 4.06497 10.4019C4 10.6506 4 10.9179 4 11.4522Z"
                                        className=" stroke-white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>{" "}
                                    </g>{" "}
                                  </g>
                                </svg>
                              )
                            }
                          >
                            <h1 className=" text-center text-white">
                              {place.place_name}
                            </h1>
                          </PlaceButton>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className=" flex w-fit justify-center items-center">
                      <h1 className=" text-left text-4xl px-10 medium text-[#8f0e2a]">
                        No se encontraron resultados
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

export default NeighborPlaces;
