import React, { useEffect, useState } from "react";
import {
  useLoaderData,
  useParams,
  useNavigation,
  Link,
} from "react-router-dom";
import { createVehicle, deleteVehicle } from "../../api/vehicles";
import { createPayment } from "../../api/payment";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import Plate from "../../components/Plate";
import Modal from "../../components/Modal";
import { deletePlaceFromNeighbor } from "../../api/neighbors";
import jsPDF from "jspdf";
import "jspdf-autotable";

// ! Falta dar funcionalidad a botón de pago
function HouseInfo() {
  const { id } = useParams();
  const placeData = useLoaderData();
  const place = placeData.place.data.place;
  const vehicleTypes = placeData.vehicleTypes.data;
  const monthlyDebts = placeData.monthlyDebts.data;
  const navigation = useNavigation();
  const [open, setOpen] = useState("");
  const [selectedPay, setSelectedPay] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [vehicleType, setVehicleType] = useState();
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit } = useForm();
  const [openModal2, setOpenModal2] = useState(false);
  const [selectedNeighbor, setSelectedNeighbor] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [open2, setOpen2] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);

  const handleVehicleType = (e) => {
    setVehicleType(e.target.value);
  };

  const handleSelectedPay = (e) => {
    setSelectedPay(e.target.value);
  };

  const handleSelectedCustomer = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const removeNeighbor = async (neighborId, place_id) => {
    try {
      const res = await deletePlaceFromNeighbor(neighborId, place_id);
      if (res.status === 204) {
        toast.success("Vecino desvinculado con éxito");
        setTimeout(() => {
          window.location.href = `/inmuebles/${place.place_id}`;
        }, 2000);
      }
    } catch (error) {
      error.responde.data.map((err) => toast.error(err));
    }
  };

  const removeVehicle = async (vehicleId) => {
    try {
      const res = await deleteVehicle(vehicleId);
      if (res.status === 204) {
        toast.success("Vehículo eliminado con éxito");
        setTimeout(() => {
          window.location.href = `/inmuebles/${id}`;
        }, 2000);
      }
    } catch (error) {
      toast.error("No se pudo eliminar el vehículo");
    }
  };

  const registerVehicle = async (data) => {
    try {
      const res = await createVehicle(data);
      if (res.status === 200) {
        toast.success("Vehículo registrado con éxito");
        setTimeout(() => {
          window.location.href = `/inmuebles/${id}`;
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

    modifiedData.vehicleType_id = vehicleType;
    modifiedData.place_id = place.place_id;

    if (modifiedData.vehicleType_id === "1") {
      modifiedData.vehicleType_id = 1;
    } else if (modifiedData.vehicleType_id === "2") {
      modifiedData.vehicleType_id = 2;
    } else if (modifiedData.vehicleType_id === "3") {
      modifiedData.vehicleType_id = 3;
    } else if (modifiedData.vehicleType_id === "4") {
      modifiedData.vehicleType_id = 4;
    } else if (modifiedData.vehicleType_id === "5") {
      modifiedData.vehicleType_id = 5;
    }

    console.log(modifiedData);

    registerVehicle(modifiedData);
  });

  const handleSelectedMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleSelectedDate = (e) => {
    setSelectedDate(e.target.value);
  };

  console.log(selectedDate);

  useEffect(() => {
    setSelectedCustomer("");
    setSelectedMonth("");
    setSelectedPay("");
  }, [open]);

  const monthDebt =
    selectedMonth !== "" &&
    monthlyDebts.find((monthlyDebt) => {
      return (
        monthlyDebt.month_id == selectedMonth &&
        monthlyDebt.place_id == place.place_id
      );
    });

  const selectedCostumerJSON =
    selectedCustomer != "" &&
    place.neighbors.find((neighbor) => {
      return neighbor.neighbor_id == selectedCustomer;
    });

  console.log(place);
  console.log(selectedPay);

  const registerPayment = async (data) => {
    try {
      const res = await createPayment(data);
      if (res.status === 200) {
        toast.success("Pago registrado con éxito");
        console.log(res.data);
        generatePDF(
          res.data.payment_id,
          res.data.id_document,
          res.data.value,
          res.data
        );
        setTimeout(() => {
          window.location.href = `/inmuebles/${place.place_id}`;
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      error.response.data.map((err) => toast.error(err));
    }
  };

  const onSubmit2 = handleSubmit((data) => {
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

    data.monthlyDebt_id = monthDebt.monthlyDebt_id;

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }
    console.log(modifiedData);

    if (selectedPay == 1 && data.deposit == "") {
      toast.error("Se debe colocar el N° de comprobante del depósito");
    } else if (selectedPay == 2 && data.transfer == "") {
      toast.error("Se debe colocar el N° de comprobante de la transferencia");
    } else {
      registerPayment(modifiedData);
    }
  });

  const generatePDF = async (paymentId, clientId, value, receipt) => {
    const doc = new jsPDF({
      unit: "mm",
      format: [79, 70],
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
    doc.text("Dirección: Sangolquí", 5, 17);
    doc.text("Calle 10 de diciembre y 10 de agosto", 5, 21);
    doc.text(`Fecha: ${selectedDate}`, 5, 25);
    doc.text(
      `Cliente: ${selectedCostumerJSON?.neighbor_name} ${selectedCostumerJSON?.neighbor_lastname} / ${place.place_name}`,
      5,
      29
    );
    doc.text(`CI/PA/RUC: ${clientId}`, 5, 33);

    function translateAbreviations(selectedMonth) {
      if (selectedMonth.startsWith("JAN")) {
        return "ENE" + selectedMonth.substring(3);
      } else if (selectedMonth.startsWith("APR")) {
        return "ABR" + selectedMonth.substring(3);
      } else if (selectedMonth.startsWith("AUG")) {
        return "AGO" + selectedMonth.substring(3);
      } else if (selectedMonth.startsWith("DEC")) {
        return "DIC" + selectedMonth.substring(3);
      } else {
        return selectedMonth;
      }
    }

    doc.text(
      `Comprobante de Pago N°${paymentId}`,
      textStartX(
        (doc.getStringUnitWidth(`Comprobante de Pago N°${paymentId}`) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      37
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
      39
    );
    doc.text(
      "Cant.                          Detalle                            V.Total",
      5,
      42
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
      43
    );
    doc.text("1", 7, 47);

    if (monthDebt && monthDebt.debt != 0) {
      doc.text(`Pago alicuota ${translateAbreviations(selectedMonth)}`, 20, 47);
    } else {
      doc.text(
        `Abono alicuota ${translateAbreviations(selectedMonth)}`,
        19,
        47
      );
    }

    doc.text(`$${value}`, 55, 47);

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
    doc.text("Forma de pago:", 5, 57);
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

    doc.text("Subtotal:", 36, 57);
    doc.text(`$${value}`, 55, 57);

    doc.text("Valor total:", 36, 61);
    doc.text(`$${value}`, 55, 61);

    doc.setFontSize(6);
    fontSize = 6;
    const receiptObject = receipt;

    doc.text(pay, 5, 60);
    if (selectedPay == 1) {
      doc.text(`N° ${receiptObject.deposit}`, 5, 63);
    } else if (selectedPay == 2) {
      doc.text(`N° ${receiptObject.transfer}`, 5, 63);
    }

    doc.text(
      `_________________                _________________`,
      textStartX(
        (doc.getStringUnitWidth(
          `_________________                _________________`
        ) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      70
    );

    doc.text(
      `  Recibí conforme                        Firma autorizada`,
      textStartX(
        (doc.getStringUnitWidth(
          `  Recibí conforme                        Firma autorizada`
        ) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      73
    );

    doc.text(
      `   Copropietario                              Administración`,
      textStartX(
        (doc.getStringUnitWidth(
          `   Copropietario                              Administración`
        ) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      76
    );

    doc.save("report.pdf");
  };

  console.log(selectedCostumerJSON);

  if (navigation.state === "loading") {
    return <div>Cargando</div>;
  }
  return (
    <div className="  md:pl-[70px] pb-[90px] md:py-0 w-screen min-h-screen h-fit">
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        {Object.keys(selectedNeighbor).length > 0 && (
          <div className=" block m-3">
            <div className=" my-3">
              <h1 className=" text-center text-white text-lg font-bold">
                Confirmación
              </h1>
            </div>
            <div className=" my-3">
              <h1 className=" text-center text-white text-base font-medium">
                ¿Estás seguro de desvincular al vecino?
              </h1>
            </div>
            <div className=" flex justify-center items-center">
              <div className=" my-2 grid grid-cols-2">
                <div className=" mx-4">
                  <button
                    onClick={() =>
                      removeNeighbor(
                        selectedNeighbor.neighbor_id,
                        place.place_id
                      )
                    }
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
        )}
      </Modal>
      <Modal open={openModal2} onClose={() => setOpenModal2(false)}>
        <div className=" block m-3">
          <div className=" my-3">
            <h1 className=" text-center text-white text-lg font-bold">
              Confirmación
            </h1>
          </div>
          <div className=" my-3">
            <h1 className=" text-center text-white text-base font-medium">
              ¿Estás seguro de eliminar el vehículo?
            </h1>
          </div>
          <div className=" flex justify-center items-center">
            <div className=" my-2 grid grid-cols-2">
              <div className=" mx-4">
                <button
                  onClick={() => removeVehicle(selectedVehicle.plate)}
                  className=" p-2 active:transform active:scale-90 border border-white bg-[#384c85]  rounded-lg hover:bg-[#146898] text-white hover:text-white text-[12px] md:text-sm lg:text-base duration-500"
                >
                  Aceptar
                </button>
              </div>
              <div className=" mx-4">
                <button
                  onClick={() => setOpenModal2(false)}
                  className=" p-2 text-white active:transform active:scale-90 border border-gray-400 rounded-lg bg-[#ad2c2c] hover:bg-[#b94d4d]  text-[12px] md:text-sm lg:text-base duration-500"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={openModal3} onClose={() => setOpenModal3(false)}>
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
                  onClick={onSubmit2}
                  className=" p-2 active:transform active:scale-90 border border-white bg-[#384c85]  rounded-lg hover:bg-[#146898] text-white hover:text-white text-[12px] md:text-sm lg:text-base duration-500"
                >
                  Aceptar
                </button>
              </div>
              <div className=" mx-4">
                <button
                  onClick={() => setOpenModal3(false)}
                  className=" p-2 text-white active:transform active:scale-90 border border-gray-400 rounded-lg bg-[#ad2c2c] hover:bg-[#b94d4d]  text-[12px] md:text-sm lg:text-base duration-500"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={openModal4} onClose={() => setOpenModal4(false)}>
        <div className=" block m-3">
          <div className=" my-3">
            <h1 className=" text-center text-white text-lg font-bold">
              Confirmación
            </h1>
          </div>
          <div className=" my-3">
            <h1 className=" text-center text-white text-base font-medium">
              ¿Estás seguro de registrar el vehículo?
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
                  onClick={() => setOpenModal4(false)}
                  className=" p-2 text-white active:transform active:scale-90 border border-gray-400 rounded-lg bg-[#ad2c2c] hover:bg-[#b94d4d]  text-[12px] md:text-sm lg:text-base duration-500"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="block">
        <div className=" flex p-3 lg:p-5 pb-1 lg:pb-3 justify-around lg:justify-between items-center flex-wrap">
          <div className=" flex justify-center items-center">
            <svg
              className=" h-[40px] md:h-[50px] lg:h-[60px] w-auto"
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
                  className="fill-[#8f0e2a]"
                ></path>{" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.75 9.5C10.75 8.80964 11.3097 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3097 10.75 10.75 10.1904 10.75 9.5Z"
                  className="fill-[#8f0e2a]"
                ></path>{" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.75 10.9605L21.5315 11.5857C21.855 11.8444 22.3269 11.792 22.5857 11.4685C22.8444 11.1451 22.792 10.6731 22.4685 10.4143L14.3426 3.91362C12.9731 2.81796 11.027 2.81796 9.65742 3.91362L1.53151 10.4143C1.20806 10.6731 1.15562 11.1451 1.41438 11.4685C1.67313 11.792 2.1451 11.8444 2.46855 11.5857L3.25003 10.9605V21.25H2.00003C1.58581 21.25 1.25003 21.5858 1.25003 22C1.25003 22.4142 1.58581 22.75 2.00003 22.75H22C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25H20.75V10.9605ZM9.25003 9.5C9.25003 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25003 11.0188 9.25003 9.5ZM12.0494 13.25C12.7143 13.25 13.2871 13.2499 13.7459 13.3116C14.2375 13.3777 14.7088 13.5268 15.091 13.909C15.4733 14.2913 15.6223 14.7625 15.6884 15.2542C15.7462 15.6842 15.7498 16.2146 15.75 16.827C15.75 16.8679 15.75 16.9091 15.75 16.9506L15.75 21.25H14.25V17C14.25 16.2717 14.2484 15.8009 14.2018 15.454C14.1581 15.1287 14.0875 15.0268 14.0304 14.9697C13.9733 14.9126 13.8713 14.842 13.546 14.7982C13.1991 14.7516 12.7283 14.75 12 14.75C11.2717 14.75 10.8009 14.7516 10.4541 14.7982C10.1288 14.842 10.0268 14.9126 9.9697 14.9697C9.9126 15.0268 9.84199 15.1287 9.79826 15.454C9.75162 15.8009 9.75003 16.2717 9.75003 17V21.25H8.25003L8.25003 16.9506C8.24999 16.2858 8.24996 15.7129 8.31163 15.2542C8.37773 14.7625 8.52679 14.2913 8.90904 13.909C9.29128 13.5268 9.76255 13.3777 10.2542 13.3116C10.7129 13.2499 11.2858 13.25 11.9507 13.25H12.0494Z"
                  className="fill-[#8f0e2a]"
                ></path>{" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.75 9.5C10.75 8.80964 11.3097 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3097 10.75 10.75 10.1904 10.75 9.5Z"
                  className="fill-[#8f0e2a]"
                ></path>{" "}
              </g>
            </svg>
            <div className=" mx-3 md:mx-5">
              <h1 className=" text-2xl sm:text-3xl md:text-4xl text-[#8f0e2a] font-bold">
                {place.place_name}
              </h1>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <button className=" group hover:bg-[#8f0e2a] transition duration-300 p-2 md:p-3 border-[1px] border-[#8f0e2a] rounded-lg flex justify-center items-center">
              <h1 className=" text-center group-hover:text-white text-[12px] md:text-sm lg:text-base transition duration-300 text-[#8f0e2a]">
                Recibos de pago
              </h1>
            </button>
          </div>
        </div>
        <div className=" my-5 h-[1px] w-full bg-[#8f0e2a]"></div>
        <div className=" flex justify-around gap-5 items-center flex-wrap">
          <div className=" border-[1px] border-[#8f0e2a] rounded-lg h-[220px] w-[220px] lg:h-[250px] lg:w-[250px]">
            <div className=" w-full h-full grid grid-rows-3">
              <div className=" row-span-2 rounded-lg rounded-b-none flex justify-center items-center bg-gradient-to-r from-[#852655] to-[#8f0e2a]">
                <svg
                  viewBox="0 0 24 24"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  className=" fill-white h-[100px] w-auto"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <defs>
                      <style>
                        .cls-1
                        {`fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px;`}
                      </style>
                    </defs>
                    <path
                      className="cls-1 fill-none stroke-white stroke-[1.91px]"
                      d="M1.5,8.66v2.86A6.68,6.68,0,0,0,8.18,18.2h0V22l6.68-3.82h1a6.68,6.68,0,0,0,6.68-6.68V8.66A6.68,6.68,0,0,0,15.82,2H8.18A6.68,6.68,0,0,0,1.5,8.66Z"
                    ></path>
                    <rect
                      className="cls-1 fill-none stroke-white stroke-[1.91px]"
                      x="9.14"
                      y="9.61"
                      width="5.73"
                      height="4.77"
                    ></rect>
                    <polygon
                      className="cls-1 fill-none stroke-white stroke-[1.91px]"
                      points="12 5.79 8.18 9.61 15.82 9.61 12 5.79"
                    ></polygon>
                  </g>
                </svg>
              </div>
              <div className="block">
                <div className=" my-1 mx-2 flex justify-start items-center">
                  <h1 className=" text-[#8f0e2a] font-bold">
                    Tipo de inmueble:
                  </h1>
                </div>
                <div className=" flex justify-center items-center">
                  <h1 className=" text-2xl lg:text-3xl font-bold text-[#8f0e2a]">
                    {place.placeType.placetype_name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="  border-[1px] border-[#8f0e2a] rounded-lg h-[220px] w-[220px] lg:h-[250px] lg:w-[250px]">
            <div className=" w-full h-full grid grid-rows-3">
              <div className=" row-span-2 rounded-lg rounded-b-none flex justify-center items-center bg-gradient-to-r from-[#852655] to-[#8f0e2a]">
                <svg
                  className=" cf-icon-svg fill-white h-[100px] w-auto"
                  viewBox="-1 0 19 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M5.212 10.418a2.975 2.975 0 0 0-.217.827h-3.92a.474.474 0 0 1-.473-.472v-.409a.474.474 0 0 1 .472-.473h4.357a.481.481 0 0 1 .066.004 2.998 2.998 0 0 0-.285.523zM16.35 9.316v3.995a.476.476 0 0 1-.475.475h-1.063a2.777 2.777 0 0 1-2.556 1.411H3.195a.474.474 0 0 1-.473-.473v-.409a.474.474 0 0 1 .473-.473h2.797a3.01 3.01 0 1 0 .076-4.572H1.67a.474.474 0 0 1-.472-.473v-.409a.474.474 0 0 1 .472-.472h5.988l.001-.001h1.76a.356.356 0 0 0 0-.713H7.101a.474.474 0 0 1-.473-.473V6.2a.474.474 0 0 1 .472-.473h2.512q.023 0 .047.003l.002-.003h.212a4.944 4.944 0 0 1 4.39 3.114h1.611a.476.476 0 0 1 .475.475zM5.457 13.22H1.67a.474.474 0 0 1-.472-.472v-.408a.474.474 0 0 1 .472-.473h3.318a2.982 2.982 0 0 0 .468 1.353zM8.38 9.373v.324a1.9 1.9 0 0 1 .335.117 1.35 1.35 0 0 1 .394.271.396.396 0 0 1-.558.56.556.556 0 0 0-.16-.11 1.08 1.08 0 0 0-.206-.071l-.022-.005a1.035 1.035 0 0 0-.168-.028.942.942 0 0 0-.478.127.305.305 0 0 0-.172.25.295.295 0 0 0 .07.175.482.482 0 0 0 .155.124.77.77 0 0 0 .212.068 1.237 1.237 0 0 0 .208.016 1.745 1.745 0 0 1 .366.038 1.623 1.623 0 0 1 .4.145 1.405 1.405 0 0 1 .39.31 1.054 1.054 0 0 1 .26.692 1.028 1.028 0 0 1-.516.89 1.644 1.644 0 0 1-.51.212v.325a.396.396 0 0 1-.791 0v-.32a1.828 1.828 0 0 1-.328-.103 1.17 1.17 0 0 1-.45-.33l-.008-.009a.396.396 0 1 1 .606-.509.391.391 0 0 0 .146.113 1.048 1.048 0 0 0 .2.064 1.568 1.568 0 0 0 .215.027.96.96 0 0 0 .49-.135c.155-.101.155-.185.155-.225a.265.265 0 0 0-.065-.172.617.617 0 0 0-.162-.13.834.834 0 0 0-.2-.072.947.947 0 0 0-.199-.02 2.014 2.014 0 0 1-.338-.027 1.549 1.549 0 0 1-.436-.14 1.265 1.265 0 0 1-.415-.334 1.073 1.073 0 0 1-.247-.674 1.087 1.087 0 0 1 .54-.919 1.628 1.628 0 0 1 .495-.203v-.312a.396.396 0 0 1 .792 0z"></path>
                  </g>
                </svg>
              </div>
              <div className="block">
                <div className=" my-1 mx-2 flex justify-start items-center">
                  <h1 className=" text-[#8f0e2a] font-bold">Deuda:</h1>
                </div>
                <div className=" flex justify-center items-center">
                  <h1 className=" text-2xl lg:text-3xl font-bold text-[#8f0e2a]">{`$${place.pending_value}`}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className=" border-[1px] border-[#8f0e2a] rounded-lg h-[220px] w-[220px] lg:h-[250px] lg:w-[250px]">
            <div className=" w-full h-full grid grid-rows-3">
              <div className=" row-span-2 rounded-lg rounded-b-none flex justify-center items-center bg-gradient-to-r from-[#852655] to-[#8f0e2a]">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className=" fill-none h-[100px] w-auto"
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
                      d="M2 9V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.0799 19 5.2 19H13M2 9V8.2C2 7.0799 2 6.51984 2.21799 6.09202C2.40973 5.71569 2.71569 5.40973 3.09202 5.21799C3.51984 5 4.0799 5 5.2 5H13.8C14.9201 5 15.4802 5 15.908 5.21799C16.2843 5.40973 16.5903 5.71569 16.782 6.09202C17 6.51984 17 7.0799 17 8.2V9M2 9H17M17 9V11M5 3V5M14 3V5M17 11C14.2386 11 12 13.2386 12 16C12 18.7614 14.2386 21 17 21C19.7614 21 22 18.7614 22 16C22 13.2386 19.7614 11 17 11ZM17 14V15.5M17 18H17.01"
                      className=" stroke-white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <div className="block">
                <div className=" my-1 mx-2 flex justify-start items-center">
                  <h1 className=" text-[#8f0e2a] font-bold">
                    Meses pendientes:
                  </h1>
                </div>
                <div className=" flex justify-center items-center">
                  <h1 className=" text-2xl lg:text-3xl font-bold text-[#8f0e2a]">
                    {
                      place.months.filter(
                        (month) => month.MonthlyDebt.debt != 0
                      ).length
                    }
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex w-full bg-gradient-to-br from-[#852655] h-fit to-[#8f0e2a] justify-center items-center mt-5">
          <div className=" block">
            <div className=" mt-14  flex justify-center w-full items-center">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className=" fill-none h-[80px] lg:h-[100px] w-auto"
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
                    d="M19 9.77806V16.2C19 17.8801 19 18.7202 18.673 19.3619C18.3854 19.9264 17.9265 20.3854 17.362 20.673C17.2111 20.7499 17.0492 20.8087 16.868 20.8537M5 9.7774V16.2C5 17.8801 5 18.7202 5.32698 19.3619C5.6146 19.9264 6.07354 20.3854 6.63803 20.673C6.78894 20.7499 6.95082 20.8087 7.13202 20.8537M21 12L15.5668 5.96393C14.3311 4.59116 13.7133 3.90478 12.9856 3.65138C12.3466 3.42882 11.651 3.42887 11.0119 3.65153C10.2843 3.90503 9.66661 4.59151 8.43114 5.96446L3 12M7.13202 20.8537C7.65017 18.6447 9.63301 17 12 17C14.367 17 16.3498 18.6447 16.868 20.8537M7.13202 20.8537C7.72133 21 8.51495 21 9.8 21H14.2C15.485 21 16.2787 21 16.868 20.8537M14 12C14 13.1045 13.1046 14 12 14C10.8954 14 10 13.1045 10 12C10 10.8954 10.8954 9.99996 12 9.99996C13.1046 9.99996 14 10.8954 14 12Z"
                    className=" stroke-white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <div className="  my-3 flex justify-center w-full items-center">
              <h1 className=" text-xl font-bold text-white">
                Vecinos relacionados
              </h1>
            </div>

            {place.neighbors.length === 0 && (
              <div className=" flex justify-center items-center">
                <h1 className=" py-5 text-base text-white">
                  No hay vecinos registrados
                </h1>
              </div>
            )}
            {place.neighbors.length > 0 && (
              <div className=" flex justify-center items-center">
                <div className=" overflow-x-auto overflow-y-auto w-[280px] sm:w-[400px] md:w-[680px] flex justify-center items-center lg:w-full max-h-[500px]">
                  <table className=" border-[1px] border-collapse text-[12px] border-[#8f0e2a] rounded-lg">
                    <thead className=" sticky top-0">
                      <tr>
                        <th className=" border border-slate-400 p-2 w-[50px] text-[#8f0e2a] bg-white">
                          N°
                        </th>
                        <th className=" border border-slate-400 text-[#8f0e2a] bg-white px-[100px] lg:px-[120px] py-2">
                          Nombres
                        </th>
                        <th className=" border border-slate-400 p-2 w-[150px] text-[#8f0e2a] bg-white">
                          Rol
                        </th>
                        <th className=" border border-slate-400 p-2 w-[200px] text-[#8f0e2a] bg-white">
                          Correo
                        </th>
                        <th className=" border border-slate-400 text-[#8f0e2a] bg-white  px-[15px] py-2">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {place.neighbors.map((neighbor, index) => (
                        <tr
                          key={index}
                          className=" text-[11px] text-white lg:text-[12px]"
                        >
                          <th className="border border-slate-300 px-2 py-2">
                            {index + 1}
                          </th>
                          <th className="border border-slate-300 px-2 py-2">
                            {`${neighbor.neighbor_name} ${neighbor.neighbor_lastname}`}
                          </th>
                          <th className="border border-slate-300 px-2 py-2">
                            {neighbor.neighborRole.role_name}
                          </th>
                          <th className="border border-slate-300 px-2 py-2">
                            {neighbor.neighbor_email != null
                              ? `${neighbor.neighbor_email}`
                              : "---"}
                          </th>
                          <th className=" border grid grid-cols-2 h-full border-slate-300  py-2">
                            <div className=" flex justify-center border-none items-center">
                              <Link to={`/vecinos/${neighbor.neighbor_id}`}>
                                <svg
                                  className=" h-[19px] hover:cursor-pointer"
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
                                  setSelectedNeighbor(neighbor);
                                  setOpenModal(true);
                                }}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className=" h-[19px] hover:cursor-pointer fill-none"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <g id="Edit / Remove_Minus_Circle">
                                    {" "}
                                    <path
                                      id="Vector"
                                      d="M8 12H16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                                      className="stroke-white"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>{" "}
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
            )}
            <div className=" mt-8  flex justify-center w-full items-center">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512.001 512.001"
                xmlSpace="preserve"
                className=" fill-white h-[80px] lg:h-[100px] w-auto"
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
                    <g>
                      {" "}
                      <path d="M466.765,122.029H45.235C20.292,122.029,0,142.322,0,167.264v177.474c0,24.943,20.292,45.235,45.235,45.235h421.531 c24.942,0,45.235-20.292,45.235-45.235V167.264C512,142.322,491.708,122.029,466.765,122.029z M478.609,344.739 c0,6.53-5.313,11.844-11.844,11.844H45.235c-6.53,0-11.844-5.313-11.844-11.844v-2.477h445.217V344.739z M478.609,308.871H33.391 V203.132h445.217V308.871z M478.61,169.74H33.391v-2.477c0-6.53,5.313-11.844,11.844-11.844h421.531 c6.53,0,11.844,5.313,11.844,11.844V169.74z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M115.594,222.468H102.39l-22.146,59.336h17.299l3.511-11.617h15.795l3.593,11.617h17.217L115.594,222.468z M103.475,259.324l5.516-19.89l5.265,19.89H103.475z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M181.526,251.385c5.683-2.508,8.525-8.191,8.525-13.706c0-7.522-5.181-15.21-13.539-15.21H142.08v59.336h29.167 c11.7-0.001,21.31-4.513,21.31-15.211C192.558,258.322,188.296,253.39,181.526,251.385z M158.377,236.341h11.617 c2.089,0,3.928,1.253,3.928,4.512c0,3.677-2.257,4.597-4.43,4.597h-11.115V236.341z M171.247,268.099h-12.87v-9.945h13.456 c2.423,0,4.178,2.173,4.178,5.098C176.011,266.345,173.922,268.099,171.247,268.099z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M235.008,260.578c-1.672,5.348-6.351,7.27-10.112,7.27c-7.522,0-11.951-7.437-11.951-15.712 c0-7.437,3.594-15.545,11.784-15.545c3.677,0,8.608,1.588,10.53,7.355l12.452-8.859c-3.761-7.772-12.118-12.954-22.648-12.954 c-18.052,0-28.665,15.044-28.665,29.501c-0.001,15.21,11.616,30.671,28.163,30.671c9.444,0,20.392-5.014,23.735-13.789 L235.008,260.578z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <rect
                        x="253.473"
                        y="251.638"
                        width="26.159"
                        height="14.208"
                      ></rect>{" "}
                    </g>{" "}
                  </g>{" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M317.316,267.598v-45.547h-16.214c-0.167,0.335-7.772,7.939-13.789,7.939v14.541c4.514,0,11.952-4.596,13.791-7.187 v30.254h-11.867v14.208h38.694v-14.208H317.316z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M356.591,267.597c0-3.593,5.432-6.268,10.195-9.026c7.438-4.345,11.784-8.525,11.784-17.717 c0-12.201-7.771-19.054-21.31-19.054c-10.864,0-19.89,4.43-24.32,9.444l9.778,10.614c3.176-3.092,7.939-6.017,12.285-6.017 c2.842,0,5.432,1.253,5.432,5.265c0.001,6.101-6.016,9.026-12.954,12.285c-12.703,6.017-14.542,13.037-14.542,28.415h45.715 v-14.208H356.591z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M416.509,250.047c6.269-1.254,10.781-5.683,10.781-12.118c0-9.194-9.193-16.213-21.562-16.213 c-7.522,0-16.464,2.591-20.893,7.522l10.029,11.784c1.503-1.923,4.679-5.434,10.947-5.434c0.919,0,4.43,0.083,4.43,3.176 c0,4.178-6.601,5.6-13.956,5.6h-2.675v13.121h2.758c9.862,0,15.377,1.337,15.377,5.683c0,3.511-3.677,4.847-7.437,4.847 c-7.605,0-9.945-5.516-10.614-6.184l-8.106,11.031c3.844,6.686,10.195,9.695,19.055,9.695c11.115,0,23.651-4.764,23.651-17.215 C428.292,257.903,423.78,251.217,416.509,250.047z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            <div className="  my-2 flex justify-center w-full items-center">
              <h1 className=" text-xl font-bold text-white">
                Vehículos relacionados
              </h1>
            </div>
            {place.vehicles.length === 0 && (
              <div className=" flex justify-center items-center">
                <h1 className=" py-5 text-base text-white">
                  No hay vehículos registrados
                </h1>
              </div>
            )}
            {place.vehicles.length > 0 && (
              <div className=" flex justify-center items-center flex-wrap p-3">
                {place.vehicles.map((vehicle) => (
                  <div className=" m-3" key={vehicle.plate}>
                    {" "}
                    <Plate
                      vehicleType={vehicle.vehicleType.vehicleType}
                      plate={vehicle.plate}
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setOpenModal2(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className=" mt-10  w-screen md:px-[33px] grid grid-cols-1 lg:grid-cols-2 h-fit lg:min-h-[600px] border-[1px] border-white">
              <div className=" border-[1px] w-full flex justify-center items-center relative border-white">
                <div
                  onClick={() => setOpen(1)}
                  className={` hover:bg-[#a14272]  transition duration-300 bg-[#852655] w-full h-full hover:cursor-pointer absolute ${
                    open === 1 ? "hidden" : "flex"
                  } justify-center items-center`}
                >
                  <div className=" block">
                    <svg
                      className=" fill-white h-[250px] w-auto"
                      viewBox="0 0 32 32"
                      id="icon"
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
                        <defs>
                          {" "}
                          <style> .cls-1 {` fill: none; `} </style>{" "}
                        </defs>{" "}
                        <path
                          d="M28,11a1.9907,1.9907,0,0,0-.8247.1821L24.8337,9.51A3.45,3.45,0,0,0,25,8.5a3.45,3.45,0,0,0-.1663-1.01l2.3416-1.6723A1.9975,1.9975,0,1,0,26,4c0,.064.0129.124.0188.1865L23.7273,5.8232A3.4652,3.4652,0,0,0,21.5,5a3.5,3.5,0,0,0,0,7,3.4652,3.4652,0,0,0,2.2273-.8232l2.2915,1.6367C26.0129,12.876,26,12.936,26,13a2,2,0,1,0,2-2Zm-6.5-1A1.5,1.5,0,1,1,23,8.5,1.5017,1.5017,0,0,1,21.5,10Z"
                          transform="translate(0 0)"
                        ></path>{" "}
                        <path
                          d="M29.3379,19.9336l-7.7324-2.7783L18.374,13.0967A2.99,2.99,0,0,0,16.0537,12H8.0576a2.9982,2.9982,0,0,0-2.48,1.3115L2.8662,17.2949A4.9884,4.9884,0,0,0,2,20.1074V26a1,1,0,0,0,1,1H5.1421a3.9806,3.9806,0,0,0,7.7158,0h6.2842a3.9806,3.9806,0,0,0,7.7158,0H29a1,1,0,0,0,1-1V20.875A1,1,0,0,0,29.3379,19.9336ZM9,28a2,2,0,1,1,2-2A2.0027,2.0027,0,0,1,9,28Zm14,0a2,2,0,1,1,2-2A2.0025,2.0025,0,0,1,23,28Zm5-3H26.8579a3.9806,3.9806,0,0,0-7.7158,0H12.8579a3.9806,3.9806,0,0,0-7.7158,0H4V20.1074A2.9977,2.9977,0,0,1,4.52,18.4189l2.711-3.9814A.9992.9992,0,0,1,8.0576,14h7.9961a.9928.9928,0,0,1,.7647.3545l3.3994,4.2685a1.0007,1.0007,0,0,0,.4443.3184L28,21.5781Z"
                          transform="translate(0 0)"
                        ></path>{" "}
                        <rect
                          id="_Transparent_Rectangle_"
                          className="fill-none"
                          width="32"
                          height="32"
                        ></rect>{" "}
                      </g>
                    </svg>
                    <div className=" py-5 flex justify-center items-center">
                      <h1 className=" text-2xl font-bold text-white">
                        Añadir vehículo
                      </h1>
                    </div>
                  </div>
                </div>
                <div className=" flex justify-center items-center h-full w-full ">
                  <div className=" block">
                    <div className=" flex justify-center items-center">
                      <svg
                        className=" fill-white h-[100px] w-auto"
                        viewBox="-4 0 32 32"
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
                          {" "}
                          <title>car</title>{" "}
                          <path d="M19.938 7.188l3.563 7.156c0.063 0.094 0.094 0.219 0.125 0.313 0.219 0.563 0.375 1.344 0.375 1.844v3.406c0 1.063-0.719 1.938-1.719 2.188v2c0 0.969-0.781 1.719-1.719 1.719-0.969 0-1.719-0.75-1.719-1.719v-1.938h-13.688v1.938c0 0.969-0.75 1.719-1.719 1.719-0.938 0-1.719-0.75-1.719-1.719v-2c-1-0.25-1.719-1.125-1.719-2.188v-3.406c0-0.5 0.156-1.281 0.375-1.844 0.031-0.094 0.063-0.219 0.125-0.313l3.563-7.156c0.281-0.531 1.031-1.031 1.656-1.031h12.563c0.625 0 1.375 0.5 1.656 1.031zM5.531 9.344l-1.906 4.344c-0.094 0.156-0.094 0.344-0.094 0.469h16.938c0-0.125 0-0.313-0.094-0.469l-1.906-4.344c-0.25-0.563-1-1.063-1.594-1.063h-9.75c-0.594 0-1.344 0.5-1.594 1.063zM4.688 19.906c1 0 1.781-0.813 1.781-1.844 0-1-0.781-1.781-1.781-1.781s-1.844 0.781-1.844 1.781c0 1.031 0.844 1.844 1.844 1.844zM19.313 19.906c1 0 1.844-0.813 1.844-1.844 0-1-0.844-1.781-1.844-1.781s-1.781 0.781-1.781 1.781c0 1.031 0.781 1.844 1.781 1.844z"></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div className=" flex justify-center items-center">
                      <h1 className=" mb-5 text-lg font-bold text-white">
                        Registra un vehículo
                      </h1>
                    </div>
                    <form className=" my-5 h-full w-full block">
                      <div className=" px-5 flex flex-wrap">
                        <label
                          htmlFor=""
                          className=" px-2 text-white font-medium"
                        >
                          Tipo de vehículo:
                        </label>
                        <select
                          onChange={handleVehicleType}
                          value={vehicleType}
                          className=" text-sm p-1 rounded-lg"
                        >
                          <option className=" text-sm" defaultValue value={""}>
                            Selecciona un tipo de vehículo
                          </option>
                          {vehicleTypes.map((vehicleType) => (
                            <option
                              key={vehicleType.vehicleType_id}
                              className=" text-sm"
                              value={vehicleType.vehicleType_id}
                            >
                              {vehicleType.vehicleType}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className=" p-10 flex flex-wrap justify-center items-center">
                        <div className=" block">
                          <div className="flex justify-center items-center">
                            <label
                              htmlFor=""
                              className=" text-white font-medium"
                            >
                              Placa del vehículo:
                            </label>
                          </div>
                          <div className=" my-3 flex justify-center items-center">
                            <input
                              type="text"
                              {...register("plate")}
                              className=" p-2 rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className=" flex justify-center items-center mb-5">
                      <button
                        onClick={() => setOpenModal4(true)}
                        className=" p-2 border-[1px] group border-white hover:text-[#8f0e2a] hover:bg-white transition duration-300 text-white rounded-lg"
                      >
                        <h1 className=" text-white text-sm md:text-base group-hover:text-[#8f0e2a] duration-300 transition">
                          Registrar vehículo
                        </h1>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" border-[1px] w-full flex justify-center items-center relative border-white">
                <div
                  onClick={() => setOpen(2)}
                  className={` hover:bg-[#a14272]  transition duration-300 bg-[#852655] w-full h-full hover:cursor-pointer absolute ${
                    open === 2 ? "hidden" : "flex"
                  } justify-center items-center`}
                >
                  <div className=" block">
                    <svg
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                      className=" fill-white h-[250px] w-auto"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path d="M0 0h48v48H0z" fill="none"></path>{" "}
                        <g id="Shopicon">
                          {" "}
                          <path d="M40.228,21.494L30,11.267V8c0-2.2-1.8-4-4-4H10C7.8,4,6,5.8,6,8v23.955c0,2.2,1.8,4,4,4h3.992l0.121,0.799 c0.621,4.105,4.012,7.201,7.888,7.201h20v-17C42,23.483,40.656,21.907,40.228,21.494z M26,9.185c-0.198-0.019-0.398-0.03-0.6-0.03 c-1.605,0-3.112,0.623-4.24,1.751c-1.132,1.125-1.758,2.629-1.76,4.234c-0.003,1.611,0.621,3.123,1.756,4.259L26,24.243v7.712h-7V8 h7V9.185z M10,8h3v23.955h-3V8z M38,39.955H22c-1.915,0-3.605-1.633-3.933-3.799l-0.03-0.201H26c2.2,0,4-1.8,4-4v-3.712l2.12,2.12 l2.829-2.828l-4.663-4.663L25,17.587l-1.016-1.016c-0.378-0.378-0.585-0.884-0.584-1.424c0.001-0.534,0.207-1.033,0.584-1.408 c0.423-0.423,1.024-0.6,1.604-0.548c0.455,0.04,0.897,0.217,1.228,0.548L31,17.923l6.416,6.416l-0.072-0.022l0.109,0.072 C37.584,24.586,38,25.337,38,26.955V39.955z"></path>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                    <div className=" py-5 flex justify-center items-center">
                      <h1 className=" text-2xl font-bold text-white">
                        Realizar pago
                      </h1>
                    </div>
                  </div>
                </div>
                <div className=" flex justify-center items-center h-full w-full ">
                  <div className=" w-full p-5 block">
                    <div className=" flex justify-center items-center">
                      <svg
                        className=" fill-white h-[80px] w-auto"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 511.999 511.999"
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
                            <g>
                              {" "}
                              <g>
                                {" "}
                                <path d="M282.701,417.258c-0.801-2.99-3.714-4.902-6.776-4.445C170.016,428.644,73.038,346.171,73.038,237.85 c0-97.522,79.341-176.863,176.863-176.863c119.226,0,205.029,116.522,168.471,230.64c-1.066,3.326,0.839,6.868,4.213,7.772 l40.109,10.746c2.065,0.554,4.067,1.261,5.994,2.108c3.338,1.466,7.227-0.243,8.311-3.724C524.864,154.762,409.031,0,249.901,0 C118.75,0,12.051,106.7,12.051,237.85c0,151.181,137.666,259.523,278.547,234.509c3.525-0.626,5.762-4.139,4.836-7.597 L282.701,417.258z"></path>{" "}
                                <path d="M250.711,174.075c14.56,0,22.086,9.975,21.931,19.667c-0.165,10.324,8.224,18.729,18.54,18.593 c10.408-0.137,18.277-9.225,18.034-19.631c-0.588-25.217-17.769-46.391-41.02-53.038v-8.094c0-9.852-7.571-18.328-17.412-18.791 c-10.507-0.495-19.18,7.877-19.18,18.275v9.59c-24.297,8.159-41.532,30.828-41.025,57.321 c0.614,32.082,27.225,58.182,59.321,58.182c9.121,0,17.085,5.499,20.688,13.351c1.415,3.082,5.195,4.295,8.213,2.748 c6.565-3.364,13.878-4.925,21.133-4.623c4.337,0.18,7.397-4.196,5.95-8.289c-8.133-23.006-30.157-39.656-55.701-39.78 c-10.123-0.049-19.267-6.71-22.112-16.425C223.653,188.033,235.903,174.075,250.711,174.075z"></path>{" "}
                                <path d="M263.83,356.481c1.258-1.482,1.638-3.521,1.136-5.399c-8.469-31.599-9.829-34.283-9.344-43.045 c0.179-3.251-2.239-6.412-6.531-6.412c-14.56,0-22.086-9.976-21.931-19.667c0.165-10.324-8.224-18.729-18.54-18.593 c-10.408,0.138-18.277,9.225-18.034,19.631c0.588,25.218,17.769,46.391,41.02,53.038v8.106 C231.605,361.61,252.802,369.473,263.83,356.481z"></path>{" "}
                                <path d="M494.59,436.295l-50.98-50.993l20.976-20.983c9.937-9.943,5.389-26.967-8.206-30.608l-153.417-41.105 c-13.578-3.636-26.052,8.813-22.408,22.409c0.329,1.229,39.938,149.009,40.431,150.849c4.962,18.551,22.397,19.672,31.296,10.77 l20.977-20.977l50.984,50.983c7.145,7.146,18.73,7.144,25.874,0l44.472-44.472C501.734,455.024,501.736,443.442,494.59,436.295z"></path>{" "}
                              </g>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                    </div>
                    <div className=" flex justify-center items-center">
                      <h1 className=" mb-5 mt-2 text-lg font-bold text-white">
                        Registra un pago
                      </h1>
                    </div>
                    <form className=" my-5 h-full w-full flex justify-center items-center">
                      <div className=" w-full block">
                        <div className=" mb-5 w-full block md:flex justify-start items-center flex-wrap ">
                          <h1 className=" mr-2 text-white">
                            Fecha de emisión:
                          </h1>
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
                            {place.neighbors.map((neighbor) => (
                              <option
                                key={neighbor.neighbor_id}
                                value={neighbor.neighbor_id}
                              >
                                {`${neighbor.neighbor_lastname} ${neighbor.neighbor_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className=" my-5 block md:flex justify-start  items-center flex-wrap">
                          <h1 className=" text-white mr-2">Mes:</h1>
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
                        <div className=" mb-5 block md:flex justify-start items-center flex-wrap ">
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
                            <h1 className=" text-base font-bold text-white">
                              Selecciona una forma de pago
                            </h1>
                          </div>
                        )}
                        {selectedPay == 1 && (
                          <div className=" block">
                            <div className=" block md:flex justify-between items-center flex-wrap gap-y-5">
                              <div className=" flex flex-wrap">
                                <h1 className=" text-white mr-2">
                                  N° de comprobante:
                                </h1>
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
                                  Deuda del mes: ${monthDebt.debt}
                                </h1>
                                <div className=" flex flex-wrap">
                                  <h1 className=" mr-2 text-white">
                                    Valor total: $
                                  </h1>
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
                                <h1 className=" text-white mr-2">
                                  N° de comprobante:
                                </h1>
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
                                  Deuda del mes: ${monthDebt.debt}
                                </h1>
                                <div className=" flex flex-wrap">
                                  <h1 className=" mr-2 text-white">
                                    Valor total: $
                                  </h1>
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
                                  Deuda del mes: ${monthDebt.debt}
                                </h1>
                                <div className=" flex flex-wrap">
                                  <h1 className=" mr-2 text-white">
                                    Valor total: $
                                  </h1>
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
                    <div className=" flex justify-center items-center mb-5">
                      <button
                        onClick={() => setOpenModal3(true)}
                        className=" p-2 border-[1px] group border-white hover:text-[#8f0e2a] hover:bg-white transition duration-300 text-white rounded-lg"
                      >
                        <h1 className=" text-white text-sm md:text-base group-hover:text-[#8f0e2a] duration-300 transition">
                          Registrar pago
                        </h1>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default HouseInfo;
