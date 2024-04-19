import React from "react";
import ContentComponent from "../../components/ContentComponent";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

function Wallet() {
  const walletData = useLoaderData();
  const places = walletData.places.data;
  const debts = walletData.monthlyDebts.data;
  const navigation = useNavigation();

  const totalDebt = places.reduce(
    (acc, place) => acc + parseFloat(place.pending_value),
    0
  );
  const formattedTotalDebt = totalDebt.toFixed(2);

  if (navigation.state === "loading") {
  }
  return (
    <div className=" md:pl-[70px] pb-[90px] md:py-0 w-screen h-fit min-h-screen bg-gradient-to-bl from-[#852655] to-[#8f0e2a] ">
      <div className="  block">
        <div className=" p-5 flex justify-start items-center">
          <svg
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className=" h-[50px] fill-white"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <path
                  className="st0"
                  d="M502.469,280.563H380.594c-11.375,0-21.547,4.563-29,12c-7.438,7.453-12.016,17.625-12.016,29 c0,11.344,4.578,21.531,12.016,28.984c7.453,7.453,17.625,12,29,12.016h121.875c5.25,0,9.531-4.281,9.531-9.547v-62.922 C512,284.813,507.719,280.563,502.469,280.563z M381.281,335.219c-7.547,0-13.656-6.125-13.656-13.656 c0-7.563,6.109-13.688,13.656-13.688s13.672,6.125,13.672,13.688C394.953,329.094,388.828,335.219,381.281,335.219z"
                ></path>{" "}
                <path
                  className="st0"
                  d="M314.344,321.563c0.031-36.594,29.656-66.234,66.25-66.25H490v-78.719c0-32.781-25.25-59.656-57.375-62.297 v-0.25H78.031c-9.375,0-17-7.609-17-16.984c0-9.406,7.625-17,17-17h354.563c-0.469-34.141-28.281-61.688-62.531-61.688H100.094 c-53.781,0-97.531,42.453-99.875,95.672H0v4.422v72.813v202.25c0,55.281,44.813,100.094,100.094,100.094h327.359 C462,493.625,490,465.609,490,431.063v-43.281H380.594C344,387.781,314.375,358.125,314.344,321.563z M244.531,371.547 c-3.469,6.5-8.25,11.922-14.281,16.375c-6.063,4.422-13.297,7.734-21.719,9.906c-3.688,0.922-7.547,1.578-11.469,2.109v24.531 h-29.281v-24.031c-8.344-0.719-16.313-2.031-23.813-4.078c-11.469-3.141-26.484-15.813-26.484-15.813 c-1.281-0.75-2.141-2.078-2.328-3.547c-0.156-1.469,0.328-2.938,1.375-4l14.672-14.656c1.594-1.578,4.047-1.875,5.953-0.719 c0,0,10.969,9.531,19.313,11.813c8.313,2.266,16.563,3.406,24.797,3.406c10.391,0,18.984-1.844,25.797-5.5 c6.813-3.703,10.219-9.406,10.219-17.219c0-5.625-1.656-10.047-5.047-13.313c-3.344-3.219-9.016-5.266-17.016-6.156l-26.281-2.25 c-15.563-1.531-27.594-5.859-36-13c-8.469-7.125-12.656-17.953-12.656-32.422c0-8.016,1.609-15.141,4.859-21.422 c3.25-6.266,7.672-11.563,13.297-15.875c5.625-4.328,12.172-7.594,19.625-9.75c3.125-0.906,6.406-1.5,9.719-2.031v-21.141h29.281 v20.703c6.844,0.688,13.344,1.781,19.406,3.438c10.266,2.813,21.063,11.25,21.063,11.25c1.344,0.688,2.281,2.016,2.5,3.516 c0.234,1.516-0.266,3.016-1.344,4.125l-13.75,13.969c-1.469,1.484-3.734,1.859-5.609,0.906c0,0-8.141-5.813-15.188-7.641 c-7.047-1.844-14.422-2.766-22.234-2.766c-10.156,0-17.688,1.953-22.531,5.828c-4.875,3.906-7.297,9-7.297,15.25 c0,5.641,1.703,9.969,5.203,12.969c3.438,3.047,9.281,5,17.5,5.844l23.031,1.969c17.094,1.5,30,6.031,38.766,13.609 s13.141,18.609,13.141,33.078C249.719,357.5,247.984,365.063,244.531,371.547z"
                ></path>{" "}
              </g>{" "}
            </g>
          </svg>
          <div className=" flex justify-center items-center px-5">
            <h1 className=" text-white text-3xl font-bold">Billetera</h1>
          </div>
        </div>
        <div className=" flex m-5 justify-start items-center flex-wrap">
          <div className=" p-2 h-[120px] w-[270px] flex justify-around items-center bg-gradient-to-t from-[#c4c4c4] rounded-lg to-[#e2e2e2]">
            <svg
              viewBox="0 0 24 24"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              className=" fill-none h-[60px] px-3"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <defs>
                  <style></style>
                </defs>
                <circle
                  className="cls-1 stroke-[#8f0e2a]"
                  cx="12"
                  cy="12"
                  r="9.58"
                ></circle>
                <line
                  className="cls-1 stroke-[#8f0e2a]"
                  x1="12"
                  y1="0.5"
                  x2="12"
                  y2="5.29"
                ></line>
                <line
                  className="cls-1 stroke-[#8f0e2a]"
                  x1="12"
                  y1="18.71"
                  x2="12"
                  y2="23.5"
                ></line>
                <line
                  className="cls-1 stroke-[#8f0e2a]"
                  x1="23.5"
                  y1="12"
                  x2="18.71"
                  y2="12"
                ></line>
                <line
                  className="cls-1 stroke-[#8f0e2a]"
                  x1="5.29"
                  y1="12"
                  x2="0.5"
                  y2="12"
                ></line>
                <path
                  className="cls-1 stroke-[#8f0e2a]"
                  d="M9.12,14.87h3.36a1.44,1.44,0,0,0,1.44-1.43h0A1.44,1.44,0,0,0,12.48,12h-1a1.44,1.44,0,0,1-1.44-1.44h0a1.45,1.45,0,0,1,1.44-1.44h3.35"
                ></path>
                <line
                  className="cls-1 stroke-[#8f0e2a]"
                  x1="12"
                  y1="7.21"
                  x2="12"
                  y2="9.13"
                ></line>
                <line
                  className="cls-1 stroke-[#8f0e2a]"
                  x1="12"
                  y1="14.88"
                  x2="12"
                  y2="16.79"
                ></line>
              </g>
            </svg>
            <div className=" block">
              <div className=" flex justify-center items-center flex-wrap ">
                <h1 className=" text-[#8f0e2a] font-semibold">
                  Valor por cobrar
                </h1>
              </div>
              <div className=" flex justify-start items-center flex-wrap ">
                <h1 className=" text-[#8f0e2a] text-lg">{`$${formattedTotalDebt}`}</h1>
              </div>
            </div>
          </div>
          <div className=" mx-10 p-2 h-[120px] w-[270px] flex justify-around items-center bg-gradient-to-t from-[#c4c4c4] rounded-lg to-[#e2e2e2]">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className=" fill-none h-[60px] px-3"
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
                  d="M19 16.0001V18.0001M19 21.0001H19.01M12 12.0001V16.0001M14 14.0001H10M5 9.77753V16.2001C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3855 6.63803 20.6731C7.27976 21.0001 8.11984 21.0001 9.8 21.0001H14M21 12.0001L15.5668 5.96405C14.3311 4.59129 13.7133 3.9049 12.9856 3.65151C12.3466 3.42894 11.651 3.42899 11.0119 3.65165C10.2843 3.90516 9.66661 4.59163 8.43114 5.96458L3 12.0001"
                  className=" stroke-[#8f0e2a]"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <div className=" block">
              <div className=" flex justify-center items-center flex-wrap ">
                <h1 className=" text-[#8f0e2a] font-semibold">
                  Inmuebles con mora
                </h1>
              </div>
              <div className=" flex justify-start items-center flex-wrap ">
                <h1 className=" text-[#8f0e2a] text-lg">
                  {places.filter((place) => place.pending_value != 0).length}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-center items-end">
          <div className=" mt-5 h-[350px] md:h-[500px] overflow-x-auto overflow-y-auto w-[280px] sm:w-[600px] md:w-[680px]  lg:w-fit ">
            <table className=" h-[500px]  border-collapse text-[12px] lg:text-sm">
              <tr>
                <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a]   px-[40px] py-2">
                  N°
                </th>
                <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a] px-[100px] lg:px-[120px] py-2">
                  Cliente
                </th>
                <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a] px-[100px] py-2">
                  Tipo de pago
                </th>
                <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a] px-[100px] py-2">
                  N° comprobante
                </th>
                <th className=" border border-slate-300 bg-opacity-80 text-white bg-[#8f0e2a] px-[100px] py-2">
                  CI/PA/RUC
                </th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
