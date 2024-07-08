import React, { useState } from "react";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import {
  createExtraPPayment,
  updateExtraPPayment,
} from "../../api/extraPayment";
import jsPDF from "jspdf";
import axios from "axios";

function DebtPayment() {
  const extraDebtData = useLoaderData();
  const extraDebt = extraDebtData.data.extraPayment;
  const navigation = useNavigation();
  const { register, handleSubmit } = useForm();
  const [selectedDate, setSelectedDate] = useState("");
  const [file, setFile] = useState();
  const [waiting, setWaiting] = useState(false);
  const [selectedPay, setSelectedPay] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSelectedPay = (e) => {
    setSelectedPay(e.target.value);
  };

  const handleSelectedCustomer = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handleSelectedDate = (e) => {
    setSelectedDate(e.target.value);
  };

  const selectedCostumerJSON =
    selectedCustomer != "" &&
    extraDebt.place.neighbors.find((neighbor) => {
      return neighbor.neighbor_id == selectedCustomer;
    });
  const modifyPayment = async (id, data) => {
    try {
      const res = await updateExtraPPayment(id, data);
      if (res.status === 200) {
        toast.success("Comprobante guardado con éxito");
        setTimeout(() => {
          window.location.href = `/inmuebles/${extraDebt.place.place_id}/pagoextra`;
        }, 2000);
      }
    } catch (error) {
      error.response.data.map((err) => toast.error(err));
      setWaiting(false);
    }
  };
  const registerPayment = async (data) => {
    try {
      const res = await createExtraPPayment(data);
      if (res.status === 200) {
        toast.success("Pago registrado con éxito");
        console.log(res.data);
        generatePDF(
          res.data.extraPPayment_id,
          res.data.id_document,
          res.data.value,
          res.data
        );
      }
    } catch (error) {
      console.log(error);
      error.response.data.map((err) => toast.error(err));
      setWaiting(false);
    }
  };

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {};

    if (data.id_document == "") {
      data.id_document = selectedCostumerJSON.identity_document;
    } else {
      data.id_document = data.id_document;
    }

    if (selectedPay == "3") {
      data.cash = 1;
    }

    data.customer = `${selectedCostumerJSON.neighbor_name} ${selectedCostumerJSON.neighbor_lastname}`;

    if (data.value === null) {
      data.value = "";
    } else {
      data.value = parseFloat(data.value);
    }

    data.date = selectedDate;

    data.extraPayment_id = extraDebt.extra_payment_id;

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }
    console.log(modifiedData);

    if (selectedPay == 1 && data.deposit == "") {
      toast.error("Se debe colocar el N° de comprobante del depósito");
      setWaiting(false);
    } else if (selectedPay == 2 && data.transfer == "") {
      toast.error("Se debe colocar el N° de comprobante de la transferencia");
      setWaiting(false);
    } else {
      registerPayment(modifiedData);
    }
  });

  const generatePDF = async (paymentId, clientId, value, receipt) => {
    const doc = new jsPDF({
      unit: "mm",
      format: [79, 50],
    });

    let fontSize = 8;
    const pageWidth = doc.internal.pageSize.getWidth();

    // Punto central en el eje X
    const centerX = pageWidth / 2;

    // Posición de inicio del texto
    function textStartX(textWidth) {
      return centerX - textWidth / 2;
    }

    doc.setFontSize(8);

    doc.text(
      "Cjto. Habitacional",
      textStartX(
        (doc.getStringUnitWidth(`Cjto. Habitacional`) * fontSize) /
          doc.internal.scaleFactor
      ),
      4
    );
    doc.text(
      "Casa Club Las Palmas",
      textStartX(
        (doc.getStringUnitWidth(`Casa Club Las Palmas`) * fontSize) /
          doc.internal.scaleFactor
      ),
      8
    );

    doc.setFontSize(7);
    fontSize = 7;

    doc.text(
      "RUC: 1792386772001",
      textStartX(
        (doc.getStringUnitWidth(`RUC:1792386772001`) * fontSize) /
          doc.internal.scaleFactor
      ),
      12
    );
    doc.text("Dirección: Sangolquí", 2, 17);
    doc.text("Calle 10 de diciembre y 10 de agosto", 2, 21);
    doc.text(`Fecha: ${selectedDate}`, 2, 25);
    doc.text(
      `Cliente: ${selectedCostumerJSON?.neighbor_name} ${selectedCostumerJSON?.neighbor_lastname}`,
      2,
      29
    );
    doc.text(`CI/PA/RUC: ${clientId} / ${extraDebt.place.place_name}`, 2, 33);

    doc.text(
      `Comprobante de Pago Extra N°${paymentId}`,
      textStartX(
        (doc.getStringUnitWidth(`Comprobante de Pago Extra N°${paymentId}`) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      37
    );
    doc.text(
      "________________________________________",
      textStartX(
        (doc.getStringUnitWidth(`________________________________________`) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      39
    );
    doc.text("Cant.                 Detalle                  V.Total", 2, 42);

    doc.text(
      "________________________________________",
      textStartX(
        (doc.getStringUnitWidth(`________________________________________`) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      43
    );
    doc.text("1", 3, 47);

    doc.text(
      `Pago ${extraDebt.extraPType.extraPType}`,
      textStartX(
        (doc.getStringUnitWidth(`Pago ${extraDebt.extraPType.extraPType}`) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      47
    );

    doc.text(`$${value}`, 42, 47);

    doc.text(
      "____________________________________________",
      textStartX(
        (doc.getStringUnitWidth(
          `____________________________________________`
        ) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      52
    );
    doc.text(
      "____________________________________________",
      textStartX(
        (doc.getStringUnitWidth(
          `____________________________________________`
        ) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      53
    );
    doc.text("Forma de pago:", 2, 57);
    let pay = "";
    if (selectedPay == 1) {
      pay = "Depósito";
    } else if (selectedPay == 2) {
      pay = "Transferencia";
    } else if (selectedPay == 3) {
      pay = "Efectivo";
    } else {
      pay = "";
    }

    doc.text("Subtotal:", 26, 57);
    doc.text(`$${value}`, 42, 57);

    doc.text("Valor total:", 26, 61);
    doc.text(`$${value}`, 42, 61);

    doc.setFontSize(6);
    fontSize = 6;
    const receiptObject = receipt;

    doc.text(pay, 2, 60);
    if (selectedPay == 1) {
      doc.text(`N° ${receiptObject.deposit}`, 2, 63);
    } else if (selectedPay == 2) {
      doc.text(`N° ${receiptObject.transfer}`, 2, 63);
    }

    doc.text(
      ` _________________           _________________`,
      textStartX(
        (doc.getStringUnitWidth(
          ` _________________           _________________`
        ) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      70
    );

    doc.text(
      `  Recibí conforme                  Firma autorizada`,
      textStartX(
        (doc.getStringUnitWidth(
          `  Recibí conforme                  Firma autorizada`
        ) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      73
    );

    doc.text(
      `    Copropietario                      Administración`,
      textStartX(
        (doc.getStringUnitWidth(
          `    Copropietario                      Administración`
        ) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      76
    );
    const pdfBlob = doc.output("blob");

    const formData = new FormData();
    formData.append("myFile", pdfBlob, `Comprobante_extra_N°_${paymentId}.pdf`);

    axios
      .post("http://localhost:8081/api/extraUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const fileLocation = res.data.location;
          const data = {
            file: fileLocation,
          };

          doc.save(`Comprobante_N°_${paymentId}.pdf`);
          modifyPayment(paymentId, data);
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(extraDebt);
  if (navigation.state === "loading") {
    return <Loader />;
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
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className=" block m-3">
          <div className=" my-3">
            <h1 className=" text-center text-white text-lg font-bold">
              Confirmación
            </h1>
          </div>
          <div className=" my-3">
            <h1 className=" text-center text-white text-base font-medium">
              ¿Estás seguro de registrar el pago?
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
      <div className=" pb-[90px] px-0 md:pl-[70px] flex bg-gradient-to-br from-[#852655] to-[#8f0e2a] w-full min-h-screen h-fit justify-center items-start p-3">
        <div className=" block w-full">
          <div className=" ml-4 flex justify-start items-center p-2 gap-x-5">
            <div>
              <svg
                className=" w-auto h-[50px] md:h-[70px]  fill-white"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M75.249 184.32h92.805c11.311 0 20.48-9.169 20.48-20.48s-9.169-20.48-20.48-20.48H75.249c-11.311 0-20.48 9.169-20.48 20.48s9.169 20.48 20.48 20.48z"></path>
                  <path d="M188.534 256.645V163.84c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48v92.805c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48z"></path>
                  <path d="M178.331 844.362c-87.4-87.4-137.372-205.543-137.372-331.641 0-119.519 44.857-231.97 124.29-318.029 7.672-8.312 7.153-21.268-1.159-28.94s-21.268-7.153-28.94 1.159C48.801 260.463-.001 382.804-.001 512.721c0 137.072 54.364 265.599 149.369 360.604 7.998 7.998 20.965 7.998 28.963 0s7.998-20.965 0-28.963zm769.796-5.999h-92.805c-11.311 0-20.48 9.169-20.48 20.48s9.169 20.48 20.48 20.48h92.805c11.311 0 20.48-9.169 20.48-20.48s-9.169-20.48-20.48-20.48z"></path>
                  <path d="M834.842 766.038v92.805c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48v-92.805c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48z"></path>
                  <path d="M845.045 178.322c87.4 87.4 137.372 205.543 137.372 331.641 0 119.519-44.857 231.97-124.29 318.029-7.672 8.312-7.153 21.268 1.159 28.94s21.268 7.153 28.94-1.159c86.349-93.552 135.151-215.893 135.151-345.81 0-137.072-54.364-265.599-149.369-360.604-7.998-7.998-20.965-7.998-28.963 0s-7.998 20.965 0 28.963zm-87.918 495.217c16.962 0 30.72-13.758 30.72-30.72V379.047c0-16.968-13.754-30.72-30.72-30.72H268.351c-16.966 0-30.72 13.752-30.72 30.72v263.772c0 16.962 13.758 30.72 30.72 30.72h488.776zm0 40.96H268.351c-39.583 0-71.68-32.097-71.68-71.68V379.047c0-39.591 32.094-71.68 71.68-71.68h488.776c39.586 0 71.68 32.089 71.68 71.68v263.772c0 39.583-32.097 71.68-71.68 71.68z"></path>
                  <path d="M586.34 510.932c0-40.651-32.952-73.605-73.605-73.605-40.644 0-73.595 32.956-73.595 73.605s32.951 73.605 73.595 73.605c40.653 0 73.605-32.954 73.605-73.605zm40.96 0c0 63.272-51.29 114.565-114.565 114.565-63.267 0-114.555-51.295-114.555-114.565s51.288-114.565 114.555-114.565c63.276 0 114.565 51.293 114.565 114.565z"></path>
                </g>
              </svg>
            </div>
            <h1 className=" text-lg md:text-2xl text-white font-semibold">
              Pago de extras
            </h1>
          </div>
          <div className=" bg-white p-2 md:p-5 w-screen md:w-full h-fit items-center ">
            <div className=" block">
              <div className=" flex justify-start items-center pb-5">
                <button
                  onClick={() => window.history.back()}
                  className=" p-2 group hover:bg-[#8f0e2a] border-[#8f0e2a] duration-300 border-2 rounded-lg"
                >
                  <h1 className="  text-[#8f0e2a] duration-300 group-hover:text-white text-[13px] md:text-base font-medium">
                    Regresar
                  </h1>
                </button>
              </div>
              <div className=" block md:flex justify-start items-center">
                <h1 className=" text-[#8f0e2a] text-base md:text-lg font-semibold">
                  Tipo de pago:
                </h1>
                <h1 className=" md:px-2 text-[13px] md:text-base font-medium">
                  {extraDebt.extraPType.extraPType}
                </h1>
              </div>
              <div className=" block md:flex justify-start items-center py-2">
                <h1 className=" text-[#8f0e2a] text-base md:text-lg font-semibold">
                  Fecha de registro:
                </h1>
                <h1 className=" md:px-2 text-[13px] md:text-base font-medium">
                  {extraDebt.date}
                </h1>
              </div>
              <div className=" block md:flex justify-start items-center pb-2">
                <h1 className=" text-[#8f0e2a] text-base md:text-lg font-semibold">
                  Descripción:
                </h1>
                <div className=" ">
                  <h1 className=" md:px-2 text-[13px] md:text-base font-medium">
                    {extraDebt.description}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <form className=" my-5 h-full w-screen md:w-full pt-5 md:pt-10 pb-5 px-2 md:px-24 flex justify-center items-center">
            <div className=" w-full block">
              <div className=" mb-5 w-full block md:flex justify-start items-center flex-wrap ">
                <h1 className=" mr-2 text-white">Fecha de emisión:</h1>
                <input
                  value={selectedDate}
                  onChange={handleSelectedDate}
                  type="date"
                  className=" border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                />
              </div>
              <div className="  w-full block md:flex justify-start items-center flex-wrap ">
                <h1 className=" mr-2 text-white">Cliente:</h1>

                <select
                  onChange={handleSelectedCustomer}
                  value={selectedCustomer}
                  className="bg-gray-50 border border-[#8f0e2a] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[270px] md:w-[350px] p-1 "
                >
                  <option value="" defaultValue>
                    Selecciona un cliente
                  </option>
                  {extraDebt.place.neighbors.map((neighbor) => (
                    <option
                      key={neighbor.neighbor_id}
                      value={neighbor.neighbor_id}
                    >
                      {`${neighbor.neighbor_lastname} ${neighbor.neighbor_name}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className=" my-5 block md:flex justify-start items-center flex-wrap ">
                <h1 className=" mr-2 text-white">Forma de pago:</h1>

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
                <div className=" my-10 block md:flex justify-center items-center">
                  <h1 className=" text-base text-center font-bold text-white">
                    Selecciona una forma de pago
                  </h1>
                </div>
              )}
              {selectedPay == 1 && (
                <div className=" block">
                  <div className=" block md:flex justify-between items-center flex-wrap gap-y-5">
                    <div className=" flex flex-wrap">
                      <h1 className=" text-white mr-2">N° de comprobante:</h1>
                      <input
                        type="number"
                        className=" w-[160px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                        {...register("deposit")}
                      />
                    </div>
                    <div className=" my-5 md:my-0 flex flex-wrap">
                      <h1 className=" text-white mr-2">CI/RUC:</h1>
                      <input
                        type="number"
                        placeholder={
                          selectedCustomer != "" &&
                          selectedCostumerJSON.identity_document
                        }
                        {...register("id_document")}
                        className=" w-[160px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                      />
                    </div>
                  </div>
                  <div className=" mb-5 rounded-lg min-h-[100px] mt-5 p-5 border-[1px] border-white flex justify-center items-center flex-wrap">
                    <div className=" block">
                      <h1 className=" my-3 text-white">
                        Deuda: ${extraDebt.value}
                      </h1>
                      <div className=" flex flex-wrap">
                        <h1 className=" mr-2 text-white">Valor total: $</h1>
                        <input
                          type="number"
                          {...register("value")}
                          className=" w-[100px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {selectedPay == 2 && (
                <div className=" block">
                  <div className=" block md:flex justify-between items-center flex-wrap gap-y-5">
                    <div className=" flex flex-wrap">
                      <h1 className=" text-white mr-2">N° de comprobante:</h1>
                      <input
                        type="number"
                        {...register("transfer")}
                        className=" w-[160px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                      />
                    </div>
                    <div className=" my-5 md:my-0 flex flex-wrap">
                      <h1 className=" text-white mr-2">CI/RUC:</h1>
                      <input
                        type="number"
                        placeholder={
                          selectedCustomer != "" &&
                          selectedCostumerJSON.identity_document
                        }
                        {...register("id_document")}
                        className=" w-[160px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                      />
                    </div>
                  </div>
                  <div className=" mb-5 rounded-lg min-h-[100px] mt-5 p-5 border-[1px] border-white flex justify-center items-center flex-wrap">
                    <div className=" block">
                      <h1 className=" my-3 text-white">
                        Deuda: ${extraDebt.value}
                      </h1>
                      <div className=" flex flex-wrap">
                        <h1 className=" mr-2 text-white">Valor total: $</h1>
                        <input
                          type="number"
                          {...register("value")}
                          className=" w-[100px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {selectedPay == 3 && (
                <div className=" block">
                  <div className=" block md:flex justify-between items-center flex-wrap gap-y-5">
                    <div className=" flex flex-wrap">
                      <h1 className=" text-white mr-2">CI/RUC:</h1>
                      <input
                        type="number"
                        placeholder={
                          selectedCustomer != 0 &&
                          selectedCostumerJSON.identity_document
                        }
                        {...register("id_document")}
                        className=" w-[160px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                      />
                    </div>
                  </div>
                  <div className=" mb-5 rounded-lg min-h-[100px] mt-5 p-5 border-[1px] border-white flex justify-center items-center flex-wrap">
                    <div className=" block">
                      <h1 className=" my-3 text-white">
                        Deuda: ${extraDebt.value}
                      </h1>
                      <div className=" flex flex-wrap">
                        <h1 className=" mr-2 text-white">Valor total: $</h1>
                        <input
                          type="number"
                          {...register("value")}
                          className=" w-[100px] border-[1px] border-[#8f0e2a] rounded-lg pl-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
          {selectedPay != "" && (
            <div className=" flex justify-center items-center mb-5">
              <button
                onClick={() => setOpenModal(true)}
                className=" p-2 border-[1px] group border-white hover:text-[#8f0e2a] hover:bg-white transition duration-300 text-white rounded-lg"
              >
                <h1 className=" text-white text-sm md:text-base group-hover:text-[#8f0e2a] duration-300 transition">
                  Registrar pago
                </h1>
              </button>
            </div>
          )}
        </div>
        <Toaster position="top-center" richColors />
      </div>
    </>
  );
}

export default DebtPayment;
