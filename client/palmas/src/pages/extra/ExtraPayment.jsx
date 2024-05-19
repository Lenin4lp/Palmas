import React, { useState } from "react";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import { createExtraPayment } from "../../api/extraPayment";
import Loader from "../../components/Loader";
import { Toaster, toast } from "sonner";

function ExtraPayment() {
  const extraPaymentData = useLoaderData();
  const extraPayments = extraPaymentData.extraPayments.data;
  const extraPTypes = extraPaymentData.extraPTypes.data;
  const monthlyDebts = extraPaymentData.monthlyDebts.data;
  const place = extraPaymentData.place.data.place;
  const navigation = useNavigation();
  const { register, handleSubmit } = useForm();
  const [content, setContent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedExtraPType, setSelectedExtraPType] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [waiting, setWaiting] = useState(false);

  const filteredExtraPayments = extraPayments.filter(
    (extraPayment) => extraPayment.monthlyDebt.place_id === place.place_id
  );
  const registerExtraPayment = async (data) => {
    try {
      const res = await createExtraPayment(data);
      if (res.status === 200) {
        toast.success("Pago extra registrado con éxito");
        setTimeout(() => {
          window.location.href = `/inmuebles/${place.place_id}`;
        }, 2000);
      }
    } catch (error) {
      error.response.data.map((err) => toast.error(err));
      setWaiting(false);
    }
  };

  const handleSelectedExtraPType = (e) => {
    setSelectedExtraPType(e.target.value);
  };

  const handleSelectedMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {};

    if (selectedExtraPType !== "") {
      data.extraPType_id = selectedExtraPType;
    }

    if (selectedMonth !== "") {
      data.monthlyDebt_id = selectedMonth;
    }

    if (data.value === null) {
      data.value = "";
    } else {
      data.value = parseFloat(data.value);
    }

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }

    if (modifiedData.value == 0) {
      toast.error("El valor debe ser mayor a 0");
    } else {
      registerExtraPayment(modifiedData);
    }
  });

  if (navigation.state === "loading") {
    return <Loader />;
  }
  function translateAbreviations(month) {
    if (month.startsWith("JAN")) {
      return "ENE" + month.substring(3);
    } else if (month.startsWith("APR")) {
      return "ABR" + month.substring(3);
    } else if (month.startsWith("AUG")) {
      return "AGO" + month.substring(3);
    } else if (month.startsWith("DEC")) {
      return "DIC" + month.substring(3);
    } else {
      return month;
    }
  }

  return (
    <>
      <div
        className={`h-screen w-screen bg-black opacity-70 fixed top-0 z-50 flex justify-center items-center ${
          waiting === true ? "visible" : "invisible"
        }`}
      >
        <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-gradient-to-tr from-white to-[#8f0e2a] animate-spin">
          <div className="h-[60px] w-[60px] rounded-full bg-black"></div>
        </div>
      </div>
      <div className="  pb-[90px] md:py-0 md:pl-[70px] w-full  mb-0 min-h-screen h-fit">
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div className=" block m-3">
            <div className=" my-3">
              <h1 className=" text-center text-white text-lg font-bold">
                Confirmación
              </h1>
            </div>
            <div className=" my-3">
              <h1 className=" text-center text-white text-base font-medium">
                ¿Estás seguro de registrar el pago extra?
              </h1>
            </div>
            <div className=" flex justify-center items-center">
              <div className=" my-2 grid grid-cols-2">
                <div className=" mx-4">
                  <button
                    onClick={() => {
                      setWaiting(true);
                      onSubmit();
                    }}
                    className=" p-2 active:transform active:scale-90 border border-white bg-[#384c85]  rounded-lg hover:bg-[#146898] text-white hover:text-white text-[12px] md:text-sm lg:text-base duration-500"
                  >
                    Aceptar
                  </button>
                </div>
                <div className=" mx-4">
                  <button
                    onClick={() => setOpenModal(false)}
                    className=" p-2 text-white active:transform active:scale-90 border border-gray-400 rounded-lg bg-[#ad2c2c] hover:bg-[#b94d4d]  text-[12px] md:text-sm lg:text-base duration-500"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {content === "" && (
          <div className=" block">
            <div className=" flex p-3 lg:p-5 bg-gradient-to-bl from-[#8f0e2a] to-[#852655] justify-start items-center border-[1px] border-gray-300">
              <div>
                <h1 className=" text-white text-lg sm:text-2xl font-bold">{`Pagos extra - ${place.place_name}`}</h1>
              </div>
            </div>
            <div className=" m-5 flex justify-start items-center">
              <button
                onClick={() => window.history.back()}
                className=" p-3 mr-5 hover:bg-white text-sm sm:text-base bg-gradient-to-br from-[#8f0e2a] to-[#852655] hover:text-[#8f0e2a] hover:border-[1px] hover:border-[#8f0e2a] hover:from-gray-300 hover:to-white transition duration-300 text-white rounded-lg "
              >
                <h1>Regresar</h1>
              </button>
              <button
                onClick={() => setContent(1)}
                className=" p-3 hover:bg-white text-sm sm:text-base bg-gradient-to-br from-[#8f0e2a] to-[#852655] hover:text-[#8f0e2a] hover:border-[1px] hover:border-[#8f0e2a] hover:from-gray-300 hover:to-white transition duration-300 text-white rounded-lg "
              >
                <h1>Registrar pago extra</h1>
              </button>
            </div>
            {filteredExtraPayments.length == 0 && (
              <div className=" h-full flex justify-center items-center">
                <h1 className=" my-20 text-center text-[#8f0e2a] font-semibold text-xl">
                  No hay pagos extra registrados
                </h1>
              </div>
            )}
            {filteredExtraPayments.length > 0 && (
              <div className=" w-full mb-10 block ">
                {filteredExtraPayments.map((extraPayment) => (
                  <div
                    className=" flex justify-start items-center mx-2"
                    key={extraPayment.extra_payment_id}
                  >
                    <div className=" block">
                      <div className="">
                        <h1 className=" text-[#8f0e2a] font-bold text-lg md:text-xl">
                          {extraPayment.date}
                        </h1>
                      </div>
                      <div className=" my-1 bg-[#8f0e2a] h-[2px] w-screen"></div>
                      <div className=" my-1 flex justify-evenly  items-center">
                        <div className=" hidden md:block">
                          <h1 className=" my-1 text-sm md:text-base text-[#8f0e2a] font-bold">
                            Mes de adeudo:
                          </h1>
                          <h1 className=" my-1 text-sm md:text-base text-black font-medium">
                            {translateAbreviations(
                              extraPayment.monthlyDebt_id.substring(0, 8)
                            )}
                          </h1>
                        </div>
                        <div className=" block">
                          <h1 className=" my-1 text-sm md:text-base text-[#8f0e2a] font-bold">
                            Tipo de pago extra:
                          </h1>
                          <h1 className=" my-1 text-sm md:text-base text-black font-medium">
                            {extraPayment.extraPType.extraPType}
                          </h1>
                        </div>
                        <div className=" block">
                          <h1 className=" my-1 text-sm md:text-base text-[#8f0e2a] font-bold">
                            Valor:
                          </h1>
                          <h1 className=" my-1 text-sm md:text-base text-black font-medium">
                            {`$${extraPayment.value}`}
                          </h1>
                        </div>
                      </div>
                      <div className="  flex">
                        <h1 className=" my-1 text-sm md:text-base text-[#8f0e2a] font-bold">
                          Descripción:
                        </h1>
                        <h1 className=" mx-3 my-1 text-sm md:text-base text-black font-medium">
                          {extraPayment.description}
                        </h1>
                      </div>
                      <div className=" mb-5 bg-[#8f0e2a] h-[1px] w-screen"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {content === 1 && (
          <div className=" block">
            <div className=" flex p-3 lg:p-5 bg-gradient-to-bl from-[#8f0e2a] to-[#852655] justify-start items-center border-[1px] border-gray-300">
              <div>
                <h1 className=" text-white text-lg sm:text-2xl font-bold">{`Pagos extra - ${place.place_name}`}</h1>
              </div>
            </div>
            <div className=" mx-5 my-5 flex justify-start items-center">
              <button
                onClick={() => setContent("")}
                className=" p-3 hover:bg-white  bg-gradient-to-br from-[#8f0e2a] to-[#852655] hover:text-[#8f0e2a] hover:border-[1px] hover:border-[#8f0e2a] hover:from-gray-300 hover:to-white transition duration-300 text-white rounded-lg "
              >
                <h1>Regresar</h1>
              </button>
            </div>

            <div className=" my-5 flex justify-center items-center">
              <svg
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                className=" h-[100px] w-auto fill-[#8f0e2a] "
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    className="fill-[#8f0e2a]"
                    d="M298.9 24.31c-14.9.3-25.6 3.2-32.7 8.4l-97.3 52.1-54.1 73.59c-11.4 17.6-3.3 51.6 32.3 29.8l39-51.4c49.5-42.69 150.5-23.1 102.6 62.6-23.5 49.6-12.5 73.8 17.8 84l13.8-46.4c23.9-53.8 68.5-63.5 66.7-106.9l107.2 7.7-1-112.09-194.3-1.4zM244.8 127.7c-17.4-.3-34.5 6.9-46.9 17.3l-39.1 51.4c10.7 8.5 21.5 3.9 32.2-6.4 12.6 6.4 22.4-3.5 30.4-23.3 3.3-13.5 8.2-23 23.4-39zm-79.6 96c-.4 0-.9 0-1.3.1-3.3.7-7.2 4.2-9.8 12.2-2.7 8-3.3 19.4-.9 31.6 2.4 12.1 7.4 22.4 13 28.8 5.4 6.3 10.4 8.1 13.7 7.4 3.4-.6 7.2-4.2 9.8-12.1 2.7-8 3.4-19.5 1-31.6-2.5-12.2-7.5-22.5-13-28.8-4.8-5.6-9.2-7.6-12.5-7.6zm82.6 106.8c-7.9.1-17.8 2.6-27.5 7.3-11.1 5.5-19.8 13.1-24.5 20.1-4.7 6.9-5.1 12.1-3.6 15.2 1.5 3 5.9 5.9 14.3 6.3 8.4.5 19.7-1.8 30.8-7.3 11.1-5.5 19.8-13 24.5-20 4.7-6.9 5.1-12.2 3.6-15.2-1.5-3.1-5.9-5.9-14.3-6.3-1.1-.1-2.1-.1-3.3-.1zm-97.6 95.6c-4.7.1-9 .8-12.8 1.9-8.5 2.5-13.4 7-15 12.3-1.7 5.4 0 11.8 5.7 18.7 5.8 6.8 15.5 13.3 27.5 16.9 11.9 3.6 23.5 3.5 32.1.9 8.6-2.5 13.5-7 15.1-12.3 1.6-5.4 0-11.8-5.8-18.7-5.7-6.8-15.4-13.3-27.4-16.9-6.8-2-13.4-2.9-19.4-2.8z"
                  ></path>
                </g>
              </svg>
            </div>
            <div className=" w-full flex justify-center items-center">
              <h1 className=" text-xl font-bold text-center text-[#8f0e2a]">
                Registro de pago extra
              </h1>
            </div>
            <div className=" flex mx-5 justify-start sm:justify-center items-center">
              <div className=" my-5 w-fit sm:w-[400px] flex justify-center items-start h-fit">
                <form className=" grid grid-cols-1 md:grid-cols-2 gap-x-5 sm:gap-x-10 gap-y-5">
                  <div className=" flex justify-start items-center">
                    <div className=" block">
                      <div className=" mb-2 flex justify-start items-center">
                        <label>Fecha:</label>
                      </div>
                      <div className=" flex justify-start items-center">
                        <input
                          type="date"
                          {...register("date")}
                          className=" border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" flex justify-center items-center">
                    <div className=" block">
                      <div className=" mb-2 flex justify-start items-center">
                        <label>Monto:</label>
                      </div>
                      <div className=" flex justify-start items-center">
                        <input
                          type="number"
                          {...register("value")}
                          className=" px-2 border-[1px] border-[#8f0e2a] rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" w-full flex justify-start items-center">
                    <div className="block">
                      <div className=" mb-2 flex justify-start items-center">
                        <label>Tipo de pago extra:</label>
                      </div>
                      <select
                        className="bg-gray-50 border border-[#8f0e2a] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[180px] p-1"
                        onChange={handleSelectedExtraPType}
                        value={selectedExtraPType}
                      >
                        <option value="">Selecciona un tipo</option>
                        {extraPTypes.map((type) => (
                          <option value={type.extraPType_id}>
                            {type.extraPType}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className=" w-full flex justify-start items-center">
                    <div className="block">
                      <div className=" mb-2 flex justify-start items-center">
                        <label>Mes:</label>
                      </div>
                      <select
                        onChange={handleSelectedMonth}
                        value={selectedMonth}
                        className=" border-[#8f0e2a] bg-gray-50 border  overflow-x-auto overflow-y-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[170px] p-1 "
                      >
                        <option value="" defaultValue>
                          Selecciona un mes
                        </option>
                        {place.months
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
                            (month) => month.MonthlyDebt.month_status !== null
                          )
                          .map((month) => (
                            <option
                              value={month.MonthlyDebt.monthlyDebt_id}
                              key={month.month_id}
                            >
                              {month.month_id.substring(0, 3).includes("JAN") &&
                                `ENE-${month.month_year}`}
                              {month.month_id.substring(0, 3).includes("FEB") &&
                                `FEB-${month.month_year}`}
                              {month.month_id.substring(0, 3).includes("MAR") &&
                                `MAR-${month.month_year}`}
                              {month.month_id.substring(0, 3).includes("APR") &&
                                `ABR-${month.month_year}`}
                              {month.month_id.substring(0, 3).includes("MAY") &&
                                `MAY-${month.month_year}`}
                              {month.month_id.substring(0, 3).includes("JUN") &&
                                `JUN-${month.month_year}`}
                              {month.month_id.substring(0, 3).includes("JUL") &&
                                `JUL-${month.month_year}`}
                              {month.month_id.substring(0, 3).includes("AUG") &&
                                `AGO-${month.month_year}`}
                              {month.month_id.substring(0, 3).includes("SEP") &&
                                `SEP-${month.month_year}`}
                              {month.month_id.substring(0, 3).includes("OCT") &&
                                `OCT-${month.month_year}`}
                              {month.month_id.substring(0, 3).includes("NOV") &&
                                `NOV-${month.month_year}`}
                              {month.month_id.substring(0, 3).includes("DEC") &&
                                `DIC-${month.month_year}`}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className=" w-full flex justify-start items-center sm:col-span-2">
                    <div className="block">
                      <div className=" mb-2 flex justify-start items-center">
                        <label>Descripción:</label>
                      </div>
                      <div className=" flex justify-start items-center">
                        <textarea
                          style={{ resize: "none" }}
                          {...register("description")}
                          className=" p-2 w-full md:w-[415px] border-[1px] h-[100px] border-[#8f0e2a] rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className=" mb-5 w-full flex justify-center items-center">
              <button
                onClick={() => setOpenModal(true)}
                className=" p-2 w-fit border-[1px] border-[#8f0e2a] rounded-lg bg-[#8f0e2a] hover:bg-white hover:text-[#8f0e2a] transition duration-300 text-white"
              >
                <h1>Guardar</h1>
              </button>
            </div>
          </div>
        )}
        <Toaster position="top-center" richColors />
      </div>
    </>
  );
}

export default ExtraPayment;
