import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import { createPayment } from "../../api/payment";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

// ! Falta dar funcionalidad a botón de pago
function Aliquot() {
  const aliquotData = useLoaderData();
  const aliquots = aliquotData.monthlyFees.data;
  const places = aliquotData.places.data;
  const monthlyDebts = aliquotData.monthlyDebts.data;
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [placesTable, setPlacesTable] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedPay, setSelectedPay] = useState("");

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setSelectedCustomer("");
    setSelectedMonth("");
    setSelectedPay("");
  }, [placeId]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    searchedPlaces(e.target.value);
  };

  const handleSelectedCustomer = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handleSelectedMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleSelectedPay = (e) => {
    setSelectedPay(e.target.value);
  };

  const searchedPlaces = (search) => {
    let results = places.filter((place) => {
      if (place.place_name.toLowerCase().includes(search.toLowerCase())) {
        return place;
      }
    });
    setPlacesTable(results);
  };

  const selectedPlace =
    placeId !== "" && places.find((place) => place.place_id === placeId);

  const filteredPlaces = search === "" ? places : placesTable;

  const registerPayment = async (data) => {
    try {
      const res = await createPayment(data);
      if (res.status === 200) {
        toast.success("Pago registrado con éxito");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      error.response.data.map((err) => toast.error(err));
    }
  };

  const monthDebt =
    selectedMonth !== "" &&
    monthlyDebts.find((monthlyDebt) => {
      return (
        monthlyDebt.month_id == selectedMonth && monthlyDebt.place_id == placeId
      );
    });

  console.log(monthlyDebts[0].month_id);

  console.log(monthDebt);
  console.log(selectedCustomer);
  console.log(selectedPlace);
  console.log(selectedMonth);

  if (navigation.state === "loading") {
    return <div>Cargando</div>;
  }
  return (
    <div className=" pb-[90px] md:py-0 w-screen h-fit min-h-screen md:pl-[70px]">
      <div className=" block">
        <div className=" px-5 w-full h-[70px] md:h-[100px] bg-gradient-to-r flex justify-start items-center from-[#852655] to-[#8f0e2a]">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white h-[35px] md:h-[60px] px-5 w-auto"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path d="M31,7H1A1,1,0,0,0,0,8V24a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V8A1,1,0,0,0,31,7ZM25.09,23H6.91A6,6,0,0,0,2,18.09V13.91A6,6,0,0,0,6.91,9H25.09A6,6,0,0,0,30,13.91v4.18A6,6,0,0,0,25.09,23ZM30,11.86A4,4,0,0,1,27.14,9H30ZM4.86,9A4,4,0,0,1,2,11.86V9ZM2,20.14A4,4,0,0,1,4.86,23H2ZM27.14,23A4,4,0,0,1,30,20.14V23Z"></path>{" "}
              <path d="M7.51.71a1,1,0,0,0-.76-.1,1,1,0,0,0-.61.46l-2,3.43a1,1,0,0,0,1.74,1L7.38,2.94l5.07,2.93a1,1,0,0,0,1-1.74Z"></path>{" "}
              <path d="M24.49,31.29a1,1,0,0,0,.5.14.78.78,0,0,0,.26,0,1,1,0,0,0,.61-.46l2-3.43a1,1,0,1,0-1.74-1l-1.48,2.56-5.07-2.93a1,1,0,0,0-1,1.74Z"></path>{" "}
              <path d="M16,10a6,6,0,1,0,6,6A6,6,0,0,0,16,10Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,16,20Z"></path>{" "}
            </g>
          </svg>
          <h1 className=" text-2xl md:text-3xl text-white font-semibold">
            Alicuotas
          </h1>
        </div>
        <div className="m-5 flex justify-start  items-center">
          <Link to={`/alicuotas/registrar`}>
            <button className=" bg-[#852655] hover:bg-[#8f0e2a] shadow-lg shadow-[#9b9b9b] transition duration-300 active:shadow-transparent active:border-[1px] active:border-black p-3 rounded-lg">
              <h1 className=" text-white text-sm md:text-base ">
                Crear alicuota
              </h1>
            </button>
          </Link>
        </div>
        <div className=" flex justify-center items-center h-fit w-full">
          <div className=" flex-wrap my-5 flex justify-center">
            {aliquots.length > 0 &&
              aliquots.map((aliquot) => (
                <div className=" m-3 h-[110px] md:h-[120px] w-[200px] md:w-[220px] rounded-lg relative bg-[#8f0e2a] hover:bg-[#852655] flex justify-center items-center transition duration-300  ">
                  <div className=" m-1 absolute top-0 right-0">
                    <Link to={`/alicuotas/${aliquot.monthlyFee_id}`}>
                      <svg
                        className=" h-[19px] cursor-pointer"
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
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                            className=" fill-white"
                          ></path>{" "}
                        </g>
                      </svg>
                    </Link>
                  </div>
                  <div className="block">
                    <div className=" m-1 flex justify-center items-center">
                      <h1 className=" text-white text-sm md:text-base lg:text-lg font-semibold">{`Alicuota N° ${aliquot.monthlyFee_id}`}</h1>
                    </div>
                    <div className=" m-1 flex justify-center items-center">
                      <h1 className=" text-white text-base font-medium">{`c/mensual`}</h1>
                    </div>
                    <div className=" m-1 flex justify-center items-center">
                      <p className=" text-white text-lg md:text-xl">{`$${aliquot.monthlyFee_value}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            {aliquots.length === 0 && (
              <div className="flex justify-center items-center">
                <h1>No hay alicuotas registradas</h1>
              </div>
            )}
          </div>
        </div>
        <div className=" flex justify-center items-center bg-gradient-to-r from-white to-[#cccccc] mt-5 w-full h-[70px] md:h-[100px] border-[1px] border-[#8f0e2a] ">
          <h1 className=" text-xl md:text-2xl text-[#8f0e2a] font-bold">
            Registro de pago
          </h1>
        </div>
        <div className=" flex justify-center items-start bg-gradient-to-bl from-[#852655] to-[#8f0e2a] w-full h-fit min-h-screen">
          <div className=" w-full flex justify-center items-center">
            <div className=" block w-full">
              <div className=" flex  justify-start items-center p-5">
                <div className="relative group">
                  <button
                    onClick={toggleDropDown}
                    id="dropdown-button"
                    className="inline-flex justify-between w-[200px] md:w-[230px] px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-[#8f0e2a]"
                  >
                    <span className="mr-2">Inmuebles</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 ml-2 -mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    id="dropdown-menu"
                    className={` ${
                      isOpen == true ? "" : "hidden"
                    } absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1`}
                  >
                    <div className=" overflow-x-auto overflow-y-auto h-fit max-h-[300px] relative">
                      <input
                        onChange={handleChange}
                        id="search-input"
                        className="block w-full sticky top-0 px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
                        type="text"
                        placeholder="Search items"
                        autocomplete="off"
                      />
                      {filteredPlaces.map((place) => (
                        <div
                          onClick={() => {
                            setPlaceId(place.place_id);
                            setIsOpen(false);
                          }}
                          key={place.place_id}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                        >
                          {place.place_name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {placeId === "" && (
                <div className=" h-fit py-[40vh] flex justify-center items-center">
                  <div className=" flex  justify-center items-center w-full">
                    <h1 className=" text-white text-xl font-bold">
                      Selecciona un inmueble
                    </h1>
                  </div>
                </div>
              )}
              {placeId !== "" && (
                <div className=" my-5 block w-full">
                  <div className=" flex justify-center items-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className=" h-[80px] md:h-[100px] w-auto"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M14 21.0001V15.0001H10V21.0001M19 9.77818V16.2001C19 17.8802 19 18.7203 18.673 19.362C18.3854 19.9265 17.9265 20.3855 17.362 20.6731C16.7202 21.0001 15.8802 21.0001 14.2 21.0001H9.8C8.11984 21.0001 7.27976 21.0001 6.63803 20.6731C6.07354 20.3855 5.6146 19.9265 5.32698 19.362C5 18.7203 5 17.8802 5 16.2001V9.77753M21 12.0001L15.5668 5.96405C14.3311 4.59129 13.7133 3.9049 12.9856 3.65151C12.3466 3.42894 11.651 3.42899 11.0119 3.65165C10.2843 3.90516 9.66661 4.59163 8.43114 5.96458L3 12.0001"
                          className=" stroke-white"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className="  flex justify-center items-center">
                    <h1 className=" text-white text-xl md:text-2xl font-bold">
                      {selectedPlace.place_name}
                    </h1>
                  </div>
                  <div className="flex flex-wrap justify-center items-center">
                    <div className=" my-3 md:my-10 bg-gradient-to-b h-[100px] w-[200px] p-3 from-white rounded-lg to-[#cccccc] flex justify-center mx-5 items-center">
                      <div className=" w-full block">
                        <div className=" flex justify-center items-center">
                          <h1 className=" py-2 text-[#8f0e2a] font-bold">
                            Monto pendiente:
                          </h1>
                        </div>

                        <div className=" flex justify-center items-center">
                          <h1 className=" text-lg text-[#8f0e2a]">
                            {`$${selectedPlace.pending_value}`}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className=" my-3 md:my-10 bg-gradient-to-b h-[100px] w-[200px] p-3 from-white rounded-lg to-[#cccccc] flex justify-center mx-5 items-center">
                      <div className=" w-full block">
                        <div className=" flex justify-center items-center">
                          <h1 className=" py-2 text-[#8f0e2a] font-bold">
                            Propietario:
                          </h1>
                        </div>

                        <div className=" flex justify-center items-center">
                          <h1 className=" text-[12px] text-center text-[#8f0e2a]">
                            {`${
                              selectedPlace.neighbors.filter(
                                (neighbor) => neighbor.role_id === 1
                              ).length > 0
                                ? `${
                                    selectedPlace.neighbors.filter(
                                      (neighbor) => neighbor.role_id === 1
                                    )[0].neighbor_name
                                  } ${
                                    selectedPlace.neighbors.filter(
                                      (neighbor) => neighbor.role_id === 1
                                    )[0].neighbor_lastname
                                  }`
                                : "No se ha registrado propietario"
                            }`}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  {selectedPlace.pending_value == 0 && (
                    <div className=" my-10 flex justify-center items-center">
                      <h1 className=" text-center text-white">
                        El inmueble no posee deudas pendientes
                      </h1>
                    </div>
                  )}
                  {selectedPlace.pending_value > 0 && (
                    <div className=" my-5 flex justify-center items-center">
                      <div className=" w-full md:w-fit block md:min-w-[700px] rounded-md bg-white min-h-[350px]">
                        <div className=" m-5 block md:flex justify-start items-center flex-wrap ">
                          <h1 className=" mr-2">Fecha de emisión:</h1>
                          <input
                            type="date"
                            className=" border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                          />
                        </div>
                        <div className=" m-5 block md:flex justify-start items-center flex-wrap ">
                          <h1 className=" mr-2">Cliente:</h1>

                          <select
                            onChange={handleSelectedCustomer}
                            value={selectedCustomer}
                            className="bg-gray-50 border border-[#8f0e2a] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[270px] md:w-[350px] p-1 "
                          >
                            <option value="" defaultValue>
                              Selecciona un cliente
                            </option>
                            {selectedPlace.neighbors.map((neighbor) => (
                              <option
                                key={neighbor.neighbor_id}
                                value={neighbor.neighbor_id}
                              >
                                {`${neighbor.neighbor_lastname} ${neighbor.neighbor_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="m-5 block md:flex justify-start  items-center flex-wrap">
                          <h1 className=" mr-2">Mes:</h1>
                          <select
                            onChange={handleSelectedMonth}
                            value={selectedMonth}
                            className=" border-[#8f0e2a] bg-gray-50 border  overflow-x-auto overflow-y-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[170px] p-1 "
                          >
                            <option value="" defaultValue>
                              Selecciona un mes
                            </option>
                            {selectedPlace.months
                              .sort((a, b) => {
                                const monthNames = [
                                  "January",
                                  "February",
                                  "March",
                                  "April",
                                  "May",
                                  "June",
                                  "July",
                                  "August",
                                  "September",
                                  "October",
                                  "November",
                                  "December",
                                ];
                                return (
                                  monthNames.indexOf(a.month) -
                                  monthNames.indexOf(b.month)
                                );
                              })
                              .filter(
                                (month) =>
                                  month.MonthlyDebt.month_status == false ||
                                  month.MonthlyDebt.month_status == null
                              )
                              .map((month) => (
                                <option
                                  value={month.month_id}
                                  key={month.month_id}
                                >
                                  {month.month_id
                                    .substring(0, 3)
                                    .includes("JAN") &&
                                    `ENE-${month.month_year}`}
                                  {month.month_id
                                    .substring(0, 3)
                                    .includes("FEB") &&
                                    `FEB-${month.month_year}`}
                                  {month.month_id
                                    .substring(0, 3)
                                    .includes("MAR") &&
                                    `MAR-${month.month_year}`}
                                  {month.month_id
                                    .substring(0, 3)
                                    .includes("APR") &&
                                    `ABR-${month.month_year}`}
                                  {month.month_id
                                    .substring(0, 3)
                                    .includes("MAY") &&
                                    `MAY-${month.month_year}`}
                                  {month.month_id
                                    .substring(0, 3)
                                    .includes("JUN") &&
                                    `JUN-${month.month_year}`}
                                  {month.month_id
                                    .substring(0, 3)
                                    .includes("JUL") &&
                                    `JUL-${month.month_year}`}
                                  {month.month_id
                                    .substring(0, 3)
                                    .includes("AUG") &&
                                    `AGO-${month.month_year}`}
                                  {month.month_id
                                    .substring(0, 3)
                                    .includes("SEP") &&
                                    `SEP-${month.month_year}`}
                                  {month.month_id
                                    .substring(0, 3)
                                    .includes("OCT") &&
                                    `OCT-${month.month_year}`}
                                  {month.month_id
                                    .substring(0, 3)
                                    .includes("NOV") &&
                                    `NOV-${month.month_year}`}
                                  {month.month_id
                                    .substring(0, 3)
                                    .includes("DEC") &&
                                    `DIC-${month.month_year}`}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className=" m-5 block md:flex justify-start items-center flex-wrap ">
                          <h1 className=" mr-2">Forma de pago:</h1>

                          <select
                            onChange={handleSelectedPay}
                            value={selectedPay}
                            className="bg-gray-50 border border-[#8f0e2a] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] p-1 "
                          >
                            <option value="" defaultValue>
                              Selecciona la forma de pago
                            </option>
                            <option value={1}>Depósito</option>
                            <option value={2}>Transferencia</option>
                            <option value={3}>Efectivo</option>
                          </select>
                        </div>
                        {selectedPay === "" && (
                          <div className=" px-3 my-20 flex justify-center items-center">
                            <h1 className=" text-lg text-center font-bold text-[#8f0e2a]">
                              Selecciona una forma de pago
                            </h1>
                          </div>
                        )}
                        {selectedPay == 1 && (
                          <div className=" m-5 block">
                            <div className=" block md:flex justify-between items-center flex-wrap">
                              <div className=" flex flex-wrap">
                                <h1 className=" mr-2">N° de comprobante:</h1>
                                <input
                                  type="number"
                                  className=" w-[160px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                                />
                              </div>
                              <div className=" flex flex-wrap">
                                <h1 className=" mr-2">CI/RUC:</h1>
                                <input
                                  type="number"
                                  placeholder={
                                    selectedCustomer != "" &&
                                    selectedPlace.neighbors.find((neighbor) => {
                                      return (
                                        neighbor.neighbor_id == selectedCustomer
                                      );
                                    }).identity_document
                                  }
                                  className=" w-[160px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                                />
                              </div>
                            </div>
                            <div className=" rounded-lg min-h-[100px] mt-5 p-5 border-[1px] border-[#8f0e2a] flex justify-center items-center flex-wrap">
                              <div className=" block">
                                <h1 className=" my-3 text-[#8f0e2a]">
                                  Deuda del mes: ${monthDebt.debt}
                                </h1>
                                <div className=" flex flex-wrap">
                                  <h1 className=" mr-2">Valor total: $</h1>
                                  <input
                                    type="number"
                                    className=" w-[100px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {selectedPay == 2 && (
                          <div className=" m-5 block">
                            <div className=" block md:flex justify-between items-center flex-wrap">
                              <div className=" flex flex-wrap">
                                <h1 className=" mr-2">N° de comprobante:</h1>
                                <input
                                  type="number"
                                  className=" w-[160px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                                />
                              </div>
                              <div className=" flex flex-wrap">
                                <h1 className=" mr-2">CI/RUC:</h1>
                                <input
                                  type="number"
                                  placeholder={
                                    selectedCustomer != "" &&
                                    selectedPlace.neighbors.find((neighbor) => {
                                      return (
                                        neighbor.neighbor_id == selectedCustomer
                                      );
                                    }).identity_document
                                  }
                                  className=" w-[160px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                                />
                              </div>
                            </div>
                            <div className=" rounded-lg min-h-[100px] mt-5 p-5 border-[1px] border-[#8f0e2a] flex justify-center items-center flex-wrap">
                              <div className=" block">
                                <h1 className=" my-3 text-[#8f0e2a]">
                                  Deuda del mes: ${monthDebt.debt}
                                </h1>
                                <div className=" flex flex-wrap">
                                  <h1 className=" mr-2">Valor total: $</h1>
                                  <input
                                    type="number"
                                    className=" w-[100px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {selectedPay == 3 && (
                          <div className=" m-5 block">
                            <div className=" block md:flex justify-start items-center flex-wrap">
                              <h1 className=" mr-2">CI/RUC:</h1>
                              <input
                                type="number"
                                placeholder={
                                  selectedCustomer != "" &&
                                  selectedPlace.neighbors.find((neighbor) => {
                                    return (
                                      neighbor.neighbor_id == selectedCustomer
                                    );
                                  }).identity_document
                                }
                                className=" w-[160px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                              />
                            </div>
                            <div className=" rounded-lg min-h-[100px] mt-5 p-5 border-[1px] border-[#8f0e2a] flex justify-center items-center flex-wrap">
                              <div className=" block">
                                <h1
                                  className={`my-3 ${
                                    monthDebt.month_status == null
                                      ? "text-[#3e864a]"
                                      : "text-[#8f0e2a]"
                                  }`}
                                >
                                  {monthDebt.month_status == null
                                    ? `Pago por adelantado`
                                    : `Deuda del mes: ${monthDebt.debt}`}
                                </h1>
                                <div className=" flex flex-wrap">
                                  <h1 className=" mr-2">Valor total: $</h1>
                                  <input
                                    type="number"
                                    className=" w-[100px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aliquot;
