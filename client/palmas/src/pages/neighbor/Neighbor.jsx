import React, { useState } from "react";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import ContentComponent from "../../components/ContentComponent";

function Neighbor() {
  const neighborsData = useLoaderData();
  const neighbors = neighborsData.data;
  const navigation = useNavigation();
  const [neighborsTable, setNeighborsTable] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    searchedNeighbors(e.target.value);
  };

  const searchedNeighbors = (search) => {
    let results = neighbors.filter((neighbor) => {
      if (
        neighbor.neighbor_name.toLowerCase().includes(search.toLowerCase()) ||
        neighbor.neighbor_lastname
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        neighbor.places.some((place) =>
          place.place_name.toLowerCase().includes(search.toLowerCase())
        )
      ) {
        return neighbor;
      }
    });
    setNeighborsTable(results);
  };

  function getDebt(neighbor) {
    if (neighbor.places?.length === 0) return "N/A";

    const totalDebt = neighbor.places?.reduce(
      (acc, place) => acc + parseFloat(place.pending_value),
      0
    );
    const formattedTotalDebt = totalDebt.toFixed(2);
    const statusText =
      formattedTotalDebt > 0 ? `Deuda: $${formattedTotalDebt}` : "Al día";
    return statusText;
  }

  function getColor(neighbor) {
    if (neighbor.places?.length === 0) return "";

    const totalDebt = neighbor.places?.reduce(
      (acc, place) => acc + place.pending_value,
      0
    );
    const statusColor =
      totalDebt != 0
        ? `bg-red-100 text-red-700`
        : "bg-green-100 text-green-700";
    return statusColor;
  }

  if (navigation.state === "loading") {
    return <div>Cargando</div>;
  }
  return (
    <ContentComponent>
      <div className=" flex justify-center items-center w-screen">
        <div className=" md:pl-[70px] w-screen">
          <div className="   mt-0 block  relative ">
            <div className=" py-5 w-screen md:pr-[70px] bg-gradient-to-r from-[#852655] to-[#8f0e2a]">
              <div className=" block">
                <div className="  mb-5 flex justify-center items-center">
                  <svg
                    className=" h-[60px] md:h-[80px] w-auto fill-white"
                    version="1.1"
                    id="_x32_"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
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
                      <style type="text/css"> </style>{" "}
                      <g>
                        {" "}
                        <rect
                          x="207.086"
                          y="496.19"
                          className="st0"
                          width="140.908"
                          height="15.81"
                        ></rect>{" "}
                        <path
                          className="st0"
                          d="M472.271,113.106c-13.991-49.444-54.964-70.478-101.933-62.483c-43.254,7.362-65.847,61.281-76.372,93.978 c3.124-43.308-4.871-103.534-56.541-131.656C158.477-30.028,108.51,46.922,103.513,56.915c-4.997,9.994-5.013,11.906,8.994,10.993 c4.169-0.273,40.505-10.5,76.153-4.052l16.786-15.474l7.776,21.806c29.544,10.352,53.247,36.882,57.51,76.661 c-23.968-29.466-60.929-48.437-102.558-48.437c-72.39,0-131.055,57.079-131.055,127.487c0,5.668,0.11,1.6,0.11,1.6 c0.203,2.67,1.951,4.974,4.466,5.888c2.514,0.906,5.34,0.257,7.198-1.663c0,0,1.467-2.272,8.026-8.268 c11.555-10.572,24.265-19.885,37.881-27.826l12.446-23.242l16.801,8.924c25.218-10.048,52.716-15.591,81.51-15.591 c19.003,0,37.443,2.413,55.026,6.933c-40.552-2.685-101.684,18.457-125.886,70.071c-29.98,63.958-0.468,114.722,3.794,118.696 c3.498,3.256,7.729,0.719,8.869-4.958c2.514-12.406,9.4-35.594,22.048-61.6l-5.106-20.626l14.053,3.598 c17.629-31.073,43.425-63.7,79.932-85.678c-21.877,48.196-40.63,113.715-31.495,197.012H52.546v15.81H228.79 c2.17,14.522,5.231,29.582,9.228,45.142h-87.536v15.81h91.752h86.896h58.196v-15.81h-71.063 c-7.136-10.127-16.145-25.186-24.046-45.142h176.26v-15.81H286.58c-13.741-42.964-20.705-104.088,0.188-183.894 c9.962,12.874,22.641,31.557,33.212,54.316l13.382,1.687l-5.981,16.005c7.324,19.597,12.601,41.489,13.335,64.918 c0.187,5.981,3.794,10.408,5.637,6.489c28.231-60.164,19.346-121.741-20.221-157.67c24.952,8.229,45.346,28.294,61.226,51.247 l18.956,4.068l-3.529,21.361c13.288,25.28,21.455,50.311,24.359,64.661c1.156,5.652,4.154,9.338,7.761,2.905 c21.548-38.335,24.327-111.896-14.6-152.166c-30.184-31.214-83.446-33.268-116.237-24.617 c21.533-36.203,79.136-38.897,79.136-38.897s9.119-20.986,11.118-23.984c1.999-2.998,12.992,20.44,12.992,20.44l58.008,23.695 c0,0,7.449,5.091,8.9-3.56C475.097,130.945,475.628,122.896,472.271,113.106z"
                        ></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </div>
                <h1 className="  text-center font-bold text-lg text-white md:text-2xl">
                  Vecinos del Conjunto Habitacional
                </h1>
                <h1 className=" text-center font-bold text-lg text-white md:text-2xl">
                  "Las Palmas"
                </h1>
              </div>
            </div>

            <div className=" block md:mx-10">
              <div className=" mx-10 mt-10 flex justify-start items-center ">
                <div className=" ">
                  <Link to={"/vecinos/registrar"}>
                    <button className=" group rounded grid grid-cols-5 px-1 py-2 hover:bg-[#852655] bg-transparent border border-[#852655] transition duration-500">
                      <div className=" flex justify-center col-span-1 items-center ">
                        <svg
                          className=" h-[20px] md:h-[25px] w-auto"
                          viewBox="-0.03 0 20.052 20.052"
                          xmlns="http://www.w3.org/2000/svg"
                          fill=""
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <g id="add-user-9" transform="translate(-2 -1.948)">
                              {" "}
                              <path
                                id="secondary"
                                className=" fill-[#8f0e2a]  transition duration-500"
                                d="M15.94,14.22a1,1,0,0,1-.28-1.45,5.91,5.91,0,0,0,.88-1.47,5.5,5.5,0,0,1-4-5.3,5.37,5.37,0,0,1,.65-2.58A5.85,5.85,0,0,0,11.73,3,6,6,0,0,0,5,9a5.94,5.94,0,0,0,1.34,3.77,1,1,0,0,1-.28,1.45A7,7,0,0,0,3,20a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,7,7,0,0,0-3.06-5.78Z"
                              ></path>{" "}
                              <path
                                className=" stroke-[#852655] group-hover:stroke-white transition duration-500"
                                id="primary"
                                d="M17,5h4M19,3V7"
                                fill="none"
                                stroke="#000000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              ></path>{" "}
                              <path
                                id="primary-2"
                                className=" stroke-[#852655] group-hover:stroke-white transition duration-500"
                                dataName="primary"
                                d="M16.65,11a5.71,5.71,0,0,1-1,1.77,1,1,0,0,0,.28,1.45A7,7,0,0,1,19,20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1,7,7,0,0,1,3.06-5.78,1,1,0,0,0,.28-1.45A5.94,5.94,0,0,1,5,9a6,6,0,0,1,6.73-6A5.47,5.47,0,0,1,13,3.3"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              ></path>{" "}
                            </g>{" "}
                          </g>
                        </svg>
                      </div>

                      <div className=" pr-2 col-span-4 flex justify-center items-center">
                        <h1 className=" text-center font-semibold text-sm md:text-base text-[#852655] group-hover:text-white transition duration-500">
                          Registrar vecino
                        </h1>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
              <div className=" mx-10 relative mt-10 mb-5 flex justify-center sm:justify-end rounded-lg bg-white ">
                <div className="flex items-center">
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
              <div className="  flex justify-center items-center">
                <div className="  mt-5 h-[350px] md:h-[500px] overflow-x-auto overflow-y-auto w-[280px] sm:w-[600px] md:w-[680px]  lg:w-fit ">
                  <table className=" h-[500px]  border-collapse text-[12px] lg:text-sm">
                    <thead className=" sticky top-0 ">
                      <tr className="">
                        <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]   px-[40px] py-2">
                          ID
                        </th>
                        <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a] px-[100px] lg:px-[120px] py-2">
                          Nombres
                        </th>
                        <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[40px] py-2">
                          Inmueble
                        </th>
                        <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[60px] py-2">
                          Correo
                        </th>
                        <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[40px] py-2">
                          Estado
                        </th>
                        <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]  px-[15px] py-2">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {search === ""
                        ? neighbors.map((neighbor) => (
                            <tr
                              key={neighbor.neighbor_id}
                              className=" text-[11px] lg:text-[12px]"
                            >
                              <th className=" border border-slate-300 px-2 py-2">
                                {neighbor.neighbor_id}
                              </th>
                              <th className=" text-left border border-slate-300 px-3 py-2">
                                {`${neighbor.neighbor_lastname} ${neighbor.neighbor_name}`}
                              </th>
                              <th className=" border border-slate-300  py-2">
                                {neighbor.places.length > 0
                                  ? neighbor.places.length > 1
                                    ? `${neighbor.places
                                        .map((place) =>
                                          place.place_name.match(/\d+/)
                                            ? place.place_name.charAt(0) +
                                              place.place_name.match(/\d+/)[0]
                                            : ""
                                        )
                                        .join(", ")}`
                                    : `${neighbor.places[0].place_name}`
                                  : "Sin inmueble"}
                              </th>
                              <th className=" border border-slate-300  py-2">
                                {neighbor.neighbor_email === null
                                  ? "-"
                                  : neighbor.neighbor_email}
                              </th>
                              <th
                                className={`${getColor(
                                  neighbor
                                )} border text-[11px] border-slate-300  py-2`}
                              >
                                {getDebt(neighbor)}
                              </th>
                              <th className=" border grid grid-cols-2 border-slate-300  py-2">
                                <div className=" flex justify-center border-none items-center">
                                  <Link to={`/vecinos/${neighbor.neighbor_id}`}>
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
                                    to={`/vecinos/modificar/${neighbor.neighbor_id}`}
                                  >
                                    <svg
                                      className=" h-[19px] cursor-pointer"
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
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                                          fill="#852655"
                                        ></path>{" "}
                                      </g>
                                    </svg>
                                  </Link>
                                </div>
                              </th>
                            </tr>
                          ))
                        : neighborsTable.map((neighbor) => (
                            <tr
                              key={neighbor.neighbor_id}
                              className=" text-[12px]"
                            >
                              <th className=" border  border-slate-300  py-2">
                                {neighbor.neighbor_id}
                              </th>
                              <th className=" text-left border border-slate-300 px-3 py-2">
                                {`${neighbor.neighbor_lastname} ${neighbor.neighbor_name}`}
                              </th>
                              <th className=" border border-slate-300  py-2">
                                {neighbor.places.length > 0
                                  ? neighbor.places.length > 1
                                    ? `${neighbor.places
                                        .map((place) =>
                                          place.place_name.match(/\d+/)
                                            ? place.place_name.charAt(0) +
                                              place.place_name.match(/\d+/)[0]
                                            : ""
                                        )
                                        .join(", ")}`
                                    : `${neighbor.places[0].place_name}`
                                  : "Sin inmueble"}
                              </th>
                              <th className=" border border-slate-300  py-2">
                                {neighbor.neighbor_email === null
                                  ? "-"
                                  : neighbor.neighbor_email}
                              </th>
                              <th
                                className={`${getColor(
                                  neighbor
                                )} border border-slate-300  py-2`}
                              >
                                {getDebt(neighbor)}
                              </th>
                              <th className=" h-full border grid grid-cols-2 border-slate-300  py-2">
                                <div className=" flex justify-center border-none items-center">
                                  <Link>
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
                                  <Link>
                                    <svg
                                      className=" h-[19px] cursor-pointer"
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
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                                          fill="#852655"
                                        ></path>{" "}
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
            </div>
          </div>
        </div>
      </div>
    </ContentComponent>
  );
}

export default Neighbor;
