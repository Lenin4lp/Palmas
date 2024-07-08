import React, { useEffect, useState } from "react";
import ContentComponent from "../../components/ContentComponent";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import "jspdf-autotable";
import jsPDF from "jspdf";

function Calendar() {
  const yearsData = useLoaderData();
  const years = yearsData.years.data;
  const places = yearsData.places.data;
  const monthlyDebts = yearsData.monthlyDebts.data;
  const types = yearsData.types.data;
  const navigation = useNavigation();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [reportType, setReportType] = useState(0);

  console.log(monthlyDebts);
  console.log(places);

  const handleSelectedType = (e) => {
    setSelectedType(e.target.value);
  };

  const handleReportType = (e) => {
    setReportType(e.target.value);
  };

  const handleSelectedMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  function translateAbreviations(month) {
    if (month == "January") {
      return "Enero";
    } else if (month == "February") {
      return "Febrero";
    } else if (month == "March") {
      return "Marzo";
    } else if (month == "April") {
      return "Abril";
    } else if (month == "May") {
      return "Mayo";
    } else if (month == "June") {
      return "Junio";
    } else if (month == "July") {
      return "Julio";
    } else if (month == "August") {
      return "Agosto";
    } else if (month == "September") {
      return "Septiembre";
    } else if (month == "October") {
      return "Octubre";
    } else if (month == "November") {
      return "Noviembre";
    } else if (month == "December") {
      return "Diciembre";
    }
  }
  console.log(selectedMonth);

  const year =
    selectedYear !== "" && years.find((year) => year.year == selectedYear);

  const selectedMonthObject =
    selectedMonth !== "" &&
    year.months.find((month) => month.month == selectedMonth);

  console.log(selectedMonthObject);

  const filteredPlaces =
    selectedType == ""
      ? places
      : places.filter((place) => place.placeType_id == selectedType);

  const monthlyDebtArray =
    selectedMonth !== "" &&
    monthlyDebts.filter(
      (monthlyDebt) => monthlyDebt.month_id == selectedMonthObject.month_id
    );

  const anualDebtArray =
    selectedYear !== "" &&
    monthlyDebts.filter((monthlyDebt) =>
      monthlyDebt.month_id.includes(selectedYear)
    );

  console.log(anualDebtArray);

  const anualDebt =
    anualDebtArray.length > 0 &&
    anualDebtArray.reduce((acc, curr) => acc + parseFloat(curr.debt), 0);

  console.log(monthlyDebtArray);

  console.log(anualDebt);

  const totalDebt =
    monthlyDebtArray.length > 0 &&
    monthlyDebtArray.reduce((acc, curr) => acc + parseFloat(curr.debt), 0);

  const placesDebt = places.reduce(
    (acc, curr) => acc + parseFloat(curr.pending_value),
    0
  );

  function obtainMonthNumber(monthN) {
    const date = new Date(`2030-${monthN}-01`);
    const monthNumber = date
      .toLocaleString("en-US", { month: "numeric" })
      .padStart(2, "0");
    return monthNumber;
  }

  const monthNumber = selectedMonth !== "" && obtainMonthNumber(selectedMonth);

  useEffect(() => {
    setReportContent("");
    setReportType(0);
  }, [selectedYear]);

  const generatePDF = async () => {
    const doc = new jsPDF();

    let fontSize = 11;
    const pageWidth = doc.internal.pageSize.getWidth();

    // Punto central en el eje X
    const centerX = pageWidth / 2;

    // Posición de inicio del texto
    function textStartX(textWidth) {
      return centerX - textWidth / 2;
    }
    doc.setFontSize(11);
    doc.text(
      `${
        reportType == ""
          ? `Reporte Anual ${selectedYear}`
          : `Reporte Mensual ${translateAbreviations(
              selectedMonth
            )} ${selectedYear}`
      }`,
      textStartX(
        (doc.getStringUnitWidth(
          `${
            reportType == ""
              ? `Reporte Anual ${selectedYear}`
              : `Reporte Mensual ${translateAbreviations(
                  selectedMonth
                )} ${selectedYear}`
          }`
        ) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      15
    );

    doc.text(
      "Cjto. Habitacional Casa Club Las Palmas",
      textStartX(
        (doc.getStringUnitWidth(`Cjto. Habitacional Casa Club Las Palmas`) *
          fontSize) /
          doc.internal.scaleFactor
      ),
      23
    );

    doc.text(
      `Obtenido el ${new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}`,
      40,
      40
    );

    reportType != "" &&
      doc.autoTable({
        head: [
          [
            {
              content: `Valor por recuperar ${translateAbreviations(
                selectedMonth
              )} ${selectedYear}`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
            {
              content: `Total por recuperar a la fecha`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
          ],
        ],
        body: [
          [
            {
              content: `$${totalDebt.toFixed(2)}`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
            {
              content: `$${placesDebt.toFixed(2)}`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
          ],
        ],
        theme: "plain",
        margin: { left: 50, right: 50 },
        startY: 50,
        tableWidth: 100,
        headStyles: {
          halign: "center",
          lineWidth: 0.2,
          lineColor: [0, 0, 0],
          fontSize: 7,
        },
        bodyStyles: {
          halign: "center",
          fontSize: 7,
          lineWidth: 0.05,
          lineColor: [0, 0, 0],
        },
      });

    reportType == "" &&
      doc.autoTable({
        head: [
          [
            {
              content: `Valor por recuperar año ${selectedYear}`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
            {
              content: `Total por recuperar a la fecha`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
          ],
        ],
        body: [
          [
            {
              content: `$${anualDebt.toFixed(2)}`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
            {
              content: `$${placesDebt.toFixed(2)}`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
          ],
        ],
        theme: "plain",
        margin: { left: 50, right: 50 },
        startY: 50,
        tableWidth: 100,
        headStyles: {
          halign: "center",
          lineWidth: 0.2,
          lineColor: [0, 0, 0],
          fontSize: 7,
        },
        bodyStyles: {
          halign: "center",
          fontSize: 7,
          lineWidth: 0.05,
          lineColor: [0, 0, 0],
        },
      });

    doc.text(
      `Registro de deudas por casa`,
      textStartX(
        (doc.getStringUnitWidth(`Registro de deudas por casa`) * fontSize) /
          doc.internal.scaleFactor
      ),
      75
    );

    reportType != "" &&
      doc.autoTable({
        head: [
          [
            {
              content: `Inmueble`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
            {
              content: `Propietario`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 5,
            },
            {
              content: `Deuda mensual`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
            {
              content: `Deuda extras`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
            {
              content: `Total Mensual`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
            {
              content: `Total`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
          ],
        ],

        body: places.map((place) => {
          const monthlyDebt =
            reportType != "" &&
            place.months.find(
              (month) =>
                month.month == selectedMonth && month.month_year == selectedYear
            ).MonthlyDebt.debt;
          const extraDebt =
            reportType != "" && place.extraPayments.length > 0
              ? place.extraPayments.filter(
                  (extraPayment) =>
                    extraPayment.status == true &&
                    extraPayment.date.substring(0, 4) === selectedYear &&
                    extraPayment.date.substring(5, 7) === monthNumber
                )
              : 0;
          console.log(extraDebt);
          const extraDebtTotal =
            extraDebt != 0
              ? extraDebt.reduce((acc, curr) => acc + parseFloat(curr.value), 0)
              : "0.00";

          return [
            {
              content: `${place.place_name}`,
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 25,
              },
              colSpan: 3,
            },
            {
              content: `${
                place.neighbors.filter((neighbor) => neighbor.role_id === 1)
                  .length > 0
                  ? `${
                      place.neighbors
                        .filter((neighbor) => neighbor.role_id === 1)[0]
                        .neighbor_name.split(" ")[0] || ""
                    } ${
                      place.neighbors
                        .filter((neighbor) => neighbor.role_id === 1)[0]
                        .neighbor_lastname.split(" ")[0] || ""
                    }`
                  : "N/A"
              }`,
              styles: {
                halign: "left",
                valign: "middle",
                cellWidth: 30,
              },
              colSpan: 5,
            },
            {
              content: `${monthlyDebt}`,
              colSpan: 3,
              cellWidth: 20,
            },
            {
              content: `${parseFloat(extraDebtTotal).toFixed(2)}`,
              colSpan: 3,
              cellWidth: 20,
            },
            {
              content: `${(
                parseFloat(monthlyDebt) + parseFloat(extraDebtTotal)
              ).toFixed(2)}`,
              colSpan: 3,
              cellWidth: 20,
            },
            {
              content: `${place.pending_value}`,
              colSpan: 3,
              cellWidth: 20,
            },
          ];
        }),
        theme: "plain",
        margin: { left: 38, right: 38 },
        startY: 85,
        tableWidth: 125,
        headStyles: {
          halign: "center",
          lineWidth: 0.2,
          lineColor: [0, 0, 0],
          fontSize: 7,
        },
        bodyStyles: {
          halign: "center",
          fontSize: 7,
          lineWidth: 0.05,
          lineColor: [0, 0, 0],
        },
      });

    reportType == "" &&
      doc.autoTable({
        head: [
          [
            {
              content: `Inmueble`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
            {
              content: `Propietario`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 5,
            },
            {
              content: `Deuda anual`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
            {
              content: `Deuda extras`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
            {
              content: `Total Anual`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
            {
              content: `Total`,
              styles: {
                halign: "center",
                valign: "middle",
              },
              colSpan: 3,
            },
          ],
        ],

        body: places.map((place) => {
          const monthlyDebt =
            reportType == "" &&
            place.months
              .filter((month) => month.month_year == selectedYear)
              .reduce(
                (acc, curr) => acc + parseFloat(curr.MonthlyDebt.debt),
                0
              );
          const extraDebt =
            reportType == "" && place.extraPayments.length > 0
              ? place.extraPayments.filter(
                  (extraPayment) =>
                    extraPayment.status == true &&
                    extraPayment.date.substring(0, 4) === selectedYear
                )
              : 0;
          console.log(extraDebt);
          const extraDebtTotal =
            extraDebt != 0
              ? extraDebt.reduce((acc, curr) => acc + parseFloat(curr.value), 0)
              : "0.00";

          return [
            {
              content: `${place.place_name}`,
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 25,
              },
              colSpan: 3,
            },
            {
              content: `${
                place.neighbors.filter((neighbor) => neighbor.role_id === 1)
                  .length > 0
                  ? `${
                      place.neighbors
                        .filter((neighbor) => neighbor.role_id === 1)[0]
                        .neighbor_name.split(" ")[0] || ""
                    } ${
                      place.neighbors
                        .filter((neighbor) => neighbor.role_id === 1)[0]
                        .neighbor_lastname.split(" ")[0] || ""
                    }`
                  : "N/A"
              }`,
              styles: {
                halign: "left",
                valign: "middle",
                cellWidth: 30,
              },
              colSpan: 5,
            },
            {
              content: `${parseFloat(monthlyDebt).toFixed(2)}`,
              colSpan: 3,
              cellWidth: 20,
            },
            {
              content: `${parseFloat(extraDebtTotal).toFixed(2)}`,
              colSpan: 3,
              cellWidth: 20,
            },
            {
              content: `${(
                parseFloat(monthlyDebt) + parseFloat(extraDebtTotal)
              ).toFixed(2)}`,
              colSpan: 3,
              cellWidth: 20,
            },
            {
              content: `${place.pending_value}`,
              colSpan: 3,
              cellWidth: 20,
            },
          ];
        }),
        theme: "plain",
        margin: { left: 38, right: 38 },
        startY: 85,
        tableWidth: 125,
        headStyles: {
          halign: "center",
          lineWidth: 0.2,
          lineColor: [0, 0, 0],
          fontSize: 7,
        },
        bodyStyles: {
          halign: "center",
          fontSize: 7,
          lineWidth: 0.05,
          lineColor: [0, 0, 0],
        },
      });

    doc.save(`Reporte_${selectedMonth}_${selectedYear}.pdf`);
  };

  if (navigation.state === "loading") {
    return <Loader />;
  }
  return (
    <ContentComponent>
      <div className=" flex justify-center items-center w-screen">
        <div className=" block">
          <div className=" md:pl-[70px] w-screen h-[70px] md:h-[100px] flex justify-start items center bg-gradient-to-r from-[#852655] to-[#8f0e2a]">
            <div className=" flex justify-center items-center">
              <svg
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                className=" fill-white h-[35px] md:h-[60px] px-5 w-auto"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <style type="text/css"> </style>{" "}
                  <g>
                    {" "}
                    <rect
                      x="119.256"
                      y="222.607"
                      className="st0"
                      width="50.881"
                      height="50.885"
                    ></rect>{" "}
                    <rect
                      x="341.863"
                      y="222.607"
                      className="st0"
                      width="50.881"
                      height="50.885"
                    ></rect>{" "}
                    <rect
                      x="267.662"
                      y="222.607"
                      className="st0"
                      width="50.881"
                      height="50.885"
                    ></rect>{" "}
                    <rect
                      x="119.256"
                      y="302.11"
                      className="st0"
                      width="50.881"
                      height="50.885"
                    ></rect>{" "}
                    <rect
                      x="267.662"
                      y="302.11"
                      className="st0"
                      width="50.881"
                      height="50.885"
                    ></rect>{" "}
                    <rect
                      x="193.46"
                      y="302.11"
                      className="st0"
                      width="50.881"
                      height="50.885"
                    ></rect>{" "}
                    <rect
                      x="341.863"
                      y="381.612"
                      className="st0"
                      width="50.881"
                      height="50.885"
                    ></rect>{" "}
                    <rect
                      x="267.662"
                      y="381.612"
                      className="st0"
                      width="50.881"
                      height="50.885"
                    ></rect>{" "}
                    <rect
                      x="193.46"
                      y="381.612"
                      className="st0"
                      width="50.881"
                      height="50.885"
                    ></rect>{" "}
                    <path
                      className="st0"
                      d="M439.277,55.046h-41.376v39.67c0,14.802-12.195,26.84-27.183,26.84h-54.025 c-14.988,0-27.182-12.038-27.182-26.84v-39.67h-67.094v39.297c0,15.008-12.329,27.213-27.484,27.213h-53.424 c-15.155,0-27.484-12.205-27.484-27.213V55.046H72.649c-26.906,0-48.796,21.692-48.796,48.354v360.246 c0,26.661,21.89,48.354,48.796,48.354h366.628c26.947,0,48.87-21.692,48.87-48.354V103.4 C488.147,76.739,466.224,55.046,439.277,55.046z M453.167,462.707c0,8.56-5.751,14.309-14.311,14.309H73.144 c-8.56,0-14.311-5.749-14.311-14.309V178.089h394.334V462.707z"
                    ></path>{" "}
                    <path
                      className="st0"
                      d="M141.525,102.507h53.392c4.521,0,8.199-3.653,8.199-8.144v-73.87c0-11.3-9.27-20.493-20.666-20.493h-28.459 c-11.395,0-20.668,9.192-20.668,20.493v73.87C133.324,98.854,137.002,102.507,141.525,102.507z"
                    ></path>{" "}
                    <path
                      className="st0"
                      d="M316.693,102.507h54.025c4.348,0,7.884-3.513,7.884-7.826V20.178C378.602,9.053,369.474,0,358.251,0H329.16 c-11.221,0-20.349,9.053-20.349,20.178v74.503C308.81,98.994,312.347,102.507,316.693,102.507z"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            <div className=" flex justify-center items-center">
              <h1 className=" text-xl md:text-2xl lg:text-3xl text-white">
                Calendario de deuda
              </h1>
            </div>
          </div>
          <div className=" md:pl-[70px] gap-5 m-5 h-fit flex justify-center lg:justify-normal items-center flex-wrap">
            <button
              onClick={() => setSelectedYear("")}
              className={` h-[50px] md:h-[60px] w-[120px] md:w-[150px] hover:to-[#339494] hover:from-[#286868] transition duration-300 rounded-lg ${
                selectedYear === ""
                  ? "bg-gradient-to-b from-[#286868] to-[#339494]"
                  : "bg-gradient-to-b from-[#852655] to-[#8f0e2a]"
              } flex justify-center items-center`}
            >
              <h1 className=" text-white text-base font-medium md:text-lg md:font-semibold">
                Todos
              </h1>
            </button>
            {years.map((year) => (
              <button
                onClick={() => setSelectedYear(year.year)}
                className={` h-[50px] md:h-[60px] w-[120px] md:w-[150px] hover:to-[#339494] hover:from-[#286868] transition duration-300 rounded-lg ${
                  selectedYear === year.year
                    ? "bg-gradient-to-b from-[#286868] to-[#339494]"
                    : "bg-gradient-to-b from-[#852655] to-[#8f0e2a]"
                } flex justify-center items-center`}
              >
                <h1 className=" text-white text-base font-medium md:text-lg md:font-semibold">
                  {year.year}
                </h1>
              </button>
            ))}
          </div>
          <div className=" flex justify-center items-center">
            <div className=" block">
              <div className=" my-5 block">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm sm:text-base font-semibold text-gray-900 "
                >
                  Tipos de inmueble:
                </label>
                <select
                  onChange={handleSelectedType}
                  value={selectedType}
                  className="bg-gray-50 border border-[#8f0e2a] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 "
                >
                  <option value="" defaultValue>
                    Todos
                  </option>
                  {types.map((type) => (
                    <option key={type.placetype_id} value={type.placetype_id}>
                      {type.placetype_name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedYear === "" ? (
                <div className=" my-5  border-[2px]  h-[500px]  overflow-x-auto overflow-y-auto w-[280px] sm:w-[500px] md:w-[680px] lg:w-fit max-w-[1200px]  ">
                  <table className="  h-full border-collapse w-fit text-[12px] lg:text-sm">
                    <thead className=" sticky top-0 ">
                      <tr>
                        <th
                          colSpan={2}
                          className=" border border-slate-300  text-white bg-[#8f0e2a]  px-[40px] py-2"
                        ></th>
                        <th
                          colSpan={years.length}
                          className=" border border-slate-300  text-white bg-[#8f0e2a]  px-[40px] py-1"
                        >
                          <div>Deuda Anual</div>
                        </th>
                        <th
                          colSpan={1}
                          className=" border border-slate-300  text-white bg-[#8f0e2a]  px-[40px] py-2"
                        ></th>
                      </tr>
                      <tr>
                        <th className=" border border-slate-300  text-white bg-[#8f0e2a]  px-[40px] py-2">
                          Inmueble
                        </th>
                        <th className=" border border-slate-300  text-white bg-[#8f0e2a]  px-[100px] lg:px-[120px] py-2">
                          Propietario
                        </th>
                        {years.map((year) => (
                          <th className=" border border-slate-300  text-white bg-[#8f0e2a]  px-[30px]  py-2">
                            {year.year}
                          </th>
                        ))}
                        <th className=" border border-slate-300  text-white bg-[#8f0e2a]   px-[30px]  py-2">
                          Total
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredPlaces.map((place) => (
                        <tr className=" text-[12px]" key={place.place_id}>
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
                          {years.map((year) => (
                            <th
                              className={`border ${
                                place.months
                                  .filter(
                                    (month) => month.month_year === year.year
                                  )
                                  .reduce(
                                    (acc, month) =>
                                      acc + parseFloat(month.MonthlyDebt?.debt),
                                    0
                                  )
                                  .toFixed(2) == 0
                                  ? "bg-white"
                                  : "bg-[#b34c51] text-white"
                              } border-slate-300 px-2 py-2`}
                            >
                              {`$${place.months
                                .filter(
                                  (month) => month.month_year === year.year
                                )
                                .reduce(
                                  (acc, month) =>
                                    acc + parseFloat(month.MonthlyDebt?.debt),
                                  0
                                )
                                .toFixed(2)}`}
                            </th>
                          ))}
                          <th
                            className={`border ${
                              place.pending_value == 0
                                ? "bg-white"
                                : "bg-[#b42e35] text-white"
                            } border-slate-300 px-2 py-2`}
                          >
                            {`$${place.pending_value}`}
                          </th>
                        </tr>
                      ))}
                      <tr className=" text-[12px] sticky bottom-0">
                        <th
                          colSpan={2}
                          className="border bg-[#8f0e2a] text-white border-slate-300 px-2 py-2"
                        >
                          Total
                        </th>
                        {years.map((year) => (
                          <th className="border bg-[#cfcfcf] text-black border-slate-300 px-2 py-2">
                            {`$${filteredPlaces
                              .map((place) => {
                                const filteredMonths = place.months.filter(
                                  (month) => month.month_year === year.year
                                );
                                const totalDebt = filteredMonths
                                  .reduce(
                                    (acc, month) =>
                                      acc + parseFloat(month.MonthlyDebt?.debt),
                                    0
                                  )
                                  .toFixed(2);
                                return totalDebt;
                              })
                              .reduce((acc, debt) => acc + parseFloat(debt), 0)
                              .toFixed(2)}
                            `}
                          </th>
                        ))}
                        <th className="border border-slate-300 bg-[#cfcfcf] px-2 py-2">
                          {`$${filteredPlaces
                            .reduce(
                              (acc, place) =>
                                acc + parseFloat(place.pending_value),
                              0
                            )
                            .toFixed(2)}`}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="  my-5 h-[500px] overflow-x-auto overflow-y-auto w-[280px] sm:w-[500px] md:w-[680px] lg:w-fit max-w-[1000px]  ">
                  <table className=" h-full border-collapse w-fit text-[12px] lg:text-sm">
                    <thead className=" sticky top-0 ">
                      <tr>
                        <th
                          colSpan={2}
                          className=" border border-slate-300  text-white bg-[#8f0e2a]  px-[40px] py-2"
                        ></th>
                        <th
                          colSpan={
                            years.find((year) => year.year === selectedYear)
                              .months.length
                          }
                          className=" border border-slate-300  text-white bg-[#8f0e2a]  px-[40px] py-1"
                        >
                          <div>{`Año ${selectedYear}`}</div>
                        </th>
                        <th
                          colSpan={1}
                          className=" border border-slate-300  text-white bg-[#8f0e2a]  px-[40px] py-2"
                        ></th>
                      </tr>
                      <tr>
                        <th className=" border border-slate-300  text-white bg-[#8f0e2a]  px-[40px] py-2">
                          Inmueble
                        </th>
                        <th className=" border border-slate-300  text-white bg-[#8f0e2a]  px-[100px] lg:px-[120px] py-2">
                          Propietario
                        </th>
                        {years
                          .find((year) => year.year === selectedYear)
                          .months.sort((a, b) => {
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
                          .map((month) => (
                            <th className=" border border-slate-300  text-[#8f0e2a] bg-[#cecece] px-[30px] py-2">
                              {month.month === "January" && "ENE"}
                              {month.month === "February" && "FEB"}
                              {month.month === "March" && "MAR"}
                              {month.month === "April" && "ABR"}
                              {month.month === "May" && "MAY"}
                              {month.month === "June" && "JUN"}
                              {month.month === "July" && "JUL"}
                              {month.month === "August" && "AGO"}
                              {month.month === "September" && "SEP"}
                              {month.month === "October" && "OCT"}
                              {month.month === "November" && "NOV"}
                              {month.month === "December" && "DIC"}
                            </th>
                          ))}
                        <th className=" border border-slate-300  text-white bg-[#8f0e2a]   px-[30px]  py-2">
                          Total
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredPlaces.map((place) => (
                        <tr className=" text-[12px]" key={place.place_id}>
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
                          {place.months
                            .filter(
                              (month) => month.month_year === selectedYear
                            )
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
                            .map((month) => (
                              <th
                                className={`border ${
                                  month.MonthlyDebt?.debt == 0
                                    ? ""
                                    : "bg-[#b34c51] text-white"
                                } border-slate-300 px-2 py-2`}
                              >
                                {month.MonthlyDebt?.debt}
                              </th>
                            ))}
                          <th
                            className={` ${
                              place.months
                                .filter(
                                  (month) => month.month_year === selectedYear
                                )
                                .reduce(
                                  (acc, month) =>
                                    acc + parseFloat(month.MonthlyDebt?.debt),
                                  0
                                ) == 0
                                ? ""
                                : "bg-[#b42e35] text-white"
                            } border border-slate-300 px-2 py-2`}
                          >
                            {place.months
                              .filter(
                                (month) => month.month_year === selectedYear
                              )
                              .reduce(
                                (acc, month) =>
                                  acc + parseFloat(month.MonthlyDebt?.debt),
                                0
                              )
                              .toFixed(2)}
                          </th>
                        </tr>
                      ))}
                      <tr className=" text-[12px] sticky bottom-0">
                        <th
                          colSpan={2}
                          className="border bg-[#8f0e2a] text-white border-slate-300 px-2 py-2"
                        >
                          Total
                        </th>
                        {years
                          .find((year) => year.year === selectedYear)
                          .months.map((month) => (
                            <th className="border bg-[#cfcfcf] text-black border-slate-300 px-2 py-2">
                              {selectedType == ""
                                ? monthlyDebts
                                    .filter(
                                      (debt) => debt.month_id === month.month_id
                                    )
                                    .reduce(
                                      (acc, debt) =>
                                        acc + parseFloat(debt.debt),
                                      0
                                    )
                                    .toFixed(2)
                                : month.places
                                    .filter(
                                      (place) =>
                                        place.placeType_id == selectedType
                                    )
                                    .reduce(
                                      (acc, place) =>
                                        acc +
                                        parseFloat(place.MonthlyDebt?.debt),
                                      0
                                    )
                                    .toFixed(2)}
                            </th>
                          ))}
                        <th className="border bg-[#cfcfcf] text-black border-slate-300 px-2 py-2">
                          {`$${
                            selectedType == ""
                              ? monthlyDebts
                                  .filter((debt) =>
                                    debt.month_id.includes(selectedYear)
                                  )
                                  .reduce(
                                    (acc, debt) => acc + parseFloat(debt.debt),
                                    0
                                  )
                                  .toFixed(2)
                              : filteredPlaces
                                  .map((place) => {
                                    const filteredMonths = place.months.filter(
                                      (month) =>
                                        month.month_year === selectedYear
                                    );
                                    const totalDebt = filteredMonths
                                      .reduce(
                                        (acc, month) =>
                                          acc +
                                          parseFloat(month.MonthlyDebt?.debt),
                                        0
                                      )
                                      .toFixed(2);
                                    return totalDebt;
                                  })
                                  .reduce(
                                    (acc, debt) => acc + parseFloat(debt),
                                    0
                                  )
                                  .toFixed(2)
                          }
                          `}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {selectedYear != "" && reportContent == "" && (
                <div className=" p-10 w-full h-fit flex justify-center items-center">
                  <button
                    onClick={() => setReportContent(1)}
                    className=" bg-gradient-to-b from-[#286868] to-[#339494] rounded-lg"
                  >
                    <h1 className=" p-3 text-center text-white text-base font-medium">
                      Obtener reporte
                    </h1>
                  </button>
                </div>
              )}
              {selectedYear != "" && reportContent == 1 && (
                <div className=" m-10 w-full h-fit flex justify-center items-center">
                  <div className=" block w-full">
                    <div className=" flex justify-start w-full items-center">
                      <button
                        onClick={() => setReportContent("")}
                        className=" p-3 bg-gradient-to-b from-[#852655] rounded-lg to-[#8f0e2a]"
                      >
                        <h1 className=" font-medium text-white">Cancelar</h1>
                      </button>
                    </div>
                    <div className=" block mt-10">
                      <div className=" mb-3 flex justify-start items-center">
                        <h1 className=" text-center text-[#8f0e2a] text-base font-medium">
                          Año:
                        </h1>
                        <select
                          disabled
                          className=" p-1 mx-2 rounded-lg border-[1px] border-[#339494]"
                        >
                          <option defaultValue value={0}>
                            {selectedYear}
                          </option>
                        </select>
                      </div>
                      <div className=" mb-3 flex justify-start items-center">
                        <h1 className=" text-center text-[#8f0e2a] text-base font-medium">
                          Tipo:
                        </h1>
                        <select
                          onChange={handleReportType}
                          value={reportType}
                          className=" p-1 mx-2 rounded-lg border-[1px] border-[#8f0e2a]"
                        >
                          <option defaultValue value="">
                            Anual
                          </option>
                          <option value={1}>Mensual</option>
                        </select>
                      </div>
                      {reportType == 1 && (
                        <div className=" mb-3 flex justify-start items-center">
                          <h1 className=" text-center text-[#8f0e2a] text-base font-medium">
                            Mes:
                          </h1>
                          <select
                            onChange={handleSelectedMonth}
                            value={selectedMonth}
                            className=" p-1 mx-2 rounded-lg border-[1px] border-[#8f0e2a]"
                          >
                            <option defaultValue value={""}>
                              Selecciona un mes
                            </option>
                            {year.months.map((month) => (
                              <option key={month.month_id} value={month.month}>
                                {translateAbreviations(month.month)}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                    <div className=" w-full flex justify-center items-center">
                      <button
                        disabled={reportType == 1 && selectedMonth == ""}
                        onClick={() => generatePDF()}
                        className=" text-white p-2 m-5 bg-gradient-to-b from-[#852655] rounded-lg to-[#8f0e2a]"
                      >
                        Obtener reporte
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ContentComponent>
  );
}

export default Calendar;
