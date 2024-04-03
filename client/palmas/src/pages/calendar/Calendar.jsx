import React, { useState } from "react";
import ContentComponent from "../../components/ContentComponent";
import { useLoaderData, useNavigation, Link } from "react-router-dom";

function Calendar() {
  const yearsData = useLoaderData();
  const years = yearsData.years.data;
  const places = yearsData.places.data;
  const monthlyDebts = yearsData.monthlyDebts.data;
  const types = yearsData.types.data;
  const navigation = useNavigation();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");

  console.log(years);
  console.log(places);
  console.log(selectedYear);
  console.log(monthlyDebts);
  console.log(types);

  const handleSelectedType = (e) => {
    setSelectedType(e.target.value);
  };

  const filteredPlaces =
    selectedType == ""
      ? places
      : places.filter((place) => place.placeType_id == selectedType);

  if (navigation.state === "loading") {
    return <div>Cargando</div>;
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
            </div>
          </div>
        </div>
      </div>
    </ContentComponent>
  );
}

export default Calendar;
