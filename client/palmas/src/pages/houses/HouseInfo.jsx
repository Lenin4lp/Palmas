import React from "react";
import {
  useLoaderData,
  useParams,
  useNavigation,
  Link,
} from "react-router-dom";

function HouseInfo() {
  const { id } = useParams();
  const placeData = useLoaderData();
  const place = placeData.data.place;
  const navigation = useNavigation();

  console.log(place);

  if (navigation.state === "loading") {
    return <div>Cargando</div>;
  }
  return (
    <div className=" p-5 md:m-5 md:px-[70px] pb-[90px] md:py-0 w-screen min-h-screen h-fit">
      <div className="block">
        <div className=" flex justify-around lg:justify-between items-center flex-wrap">
          <div className=" flex justify-center items-center">
            <svg
              className=" h-[60px] w-auto"
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
            <div className="mx-5">
              <h1 className=" text-4xl text-[#8f0e2a] font-bold">
                {place.place_name}
              </h1>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <button className=" group hover:bg-[#8f0e2a] transition duration-300 p-3 border-[1px] border-[#8f0e2a] rounded-lg flex justify-center items-center">
              <h1 className=" text-center group-hover:text-white text-sm lg:text-base transition duration-300 text-[#8f0e2a]">
                Recibos de pago
              </h1>
            </button>
          </div>
        </div>
        <div className=" my-5 h-[1px] w-full bg-[#8f0e2a]"></div>
        <div className=" flex justify-around gap-5 items-center flex-wrap">
          <div className=" border-[1px] border-[#8f0e2a] rounded-lg h-[250px] w-[250px]">
            <div className=" w-full h-full grid grid-rows-3">
              <div className=" row-span-2 rounded-lg rounded-b-none flex justify-center items-center bg-gradient-to-r from-[#852655] to-[#8f0e2a]">
                <svg
                  viewBox="0 0 24 24"
                  id="Layer_1"
                  dataName="Layer 1"
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
                  <h1 className=" text-3xl font-bold text-[#8f0e2a]">
                    {place.placeType.placetype_name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className=" border-[1px] border-[#8f0e2a] rounded-lg h-[250px] w-[250px]">
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
                  <h1 className=" text-3xl font-bold text-[#8f0e2a]">{`$${place.pending_value}`}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className=" border-[1px] border-[#8f0e2a] rounded-lg h-[250px] w-[250px]">
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
                  <h1 className=" text-3xl font-bold text-[#8f0e2a]">
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
        <div className=" mt-14 mb-5 flex justify-center w-full items-center">
          <h1 className=" text-xl font-bold text-[#8f0e2a]">
            Vecinos relacionados
          </h1>
        </div>
        <div className=" flex justify-center items-center">
          <div>
            <table className=" border-[1px] border-collapse text-[12px] border-[#8f0e2a] rounded-lg">
              <thead className=" sticky top-0">
                <tr>
                  <th className=" border border-slate-300 p-2 w-[50px] text-white bg-[#8f0e2a]">
                    N°
                  </th>
                  <th className=" border border-slate-300 text-white bg-[#8f0e2a]  px-[100px] lg:px-[120px] py-2">
                    Nombres
                  </th>
                  <th className=" border border-slate-300 p-2 w-[150px] text-white bg-[#8f0e2a]">
                    Rol
                  </th>
                  <th className=" border border-slate-300 p-2 w-[200px] text-white bg-[#8f0e2a]">
                    Correo
                  </th>
                  <th className=" border border-slate-300 text-white bg-[#8f0e2a]  px-[15px] py-2">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {place.neighbors.map((neighbor, index) => (
                  <tr key={index} className=" text-[11px] lg:text-[12px]">
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
                        <Link to={`/inmuebles/${place.place_id}`}>
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
                        <Link to={`/inmuebles/modificar/${place.place_id}`}>
                          <svg
                            viewBox="-3 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xmlnsSketch="http://www.bohemiancoding.com/sketch/ns"
                            className=" h-[19px] hover:cursor-pointer fill-[#831818]"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
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
      </div>
    </div>
  );
}

export default HouseInfo;
