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
          <div className=" p-2 h-[120px] w-[270px] flex justify-around items-center bg-gradient-to-t from-[#c4c4c4] rounded-lg to-[#e2e2e2]">
            <svg
              className=" fill-[#8f0e2a] h-[60px] px-3"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
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
                  <g>
                    {" "}
                    <path d="M472.129,347.843c-5.396,0-9.77,4.375-9.77,9.77V460.29c0,17.739-14.432,32.169-32.169,32.169H81.811 c-17.738,0-32.169-14.432-32.169-32.169v-77.056c0-5.396-4.375-9.77-9.77-9.77s-9.77,4.375-9.77,9.77v77.056 c0,28.514,23.198,51.71,51.71,51.71h348.378c28.514,0,51.71-23.198,51.71-51.71V357.613 C481.899,352.217,477.525,347.843,472.129,347.843z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M472.129,259.691c-5.396,0-9.77,4.375-9.77,9.77v7.816c0,5.396,4.375,9.77,9.77,9.77s9.77-4.375,9.77-9.77v-7.816 C481.899,264.066,477.525,259.691,472.129,259.691z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M232.38,318.861l24.73-25.497c0.767-0.788,1.364-1.769,1.962-2.75c0.767-1.567,1.364-3.336,1.364-5.298 c0-6.086-4.903-10.99-11.192-10.99h-57.859c-6.097,0-11,4.903-11,10.99c0,6.278,4.903,11.181,11,11.181h31.764l-19.997,20.402 c-4.136,4.519-4.136,11.384,0.384,15.702c0,0.191,0,0.191,0.192,0.191c1.961,2.355,4.903,3.731,8.059,3.54 c6.864,0.191,13.538,2.547,18.633,7.845c5.286,5.095,7.845,11.768,7.845,18.633c0,6.876-2.559,13.538-7.845,18.835 c-5.309,5.104-11.96,7.652-18.846,7.652c-6.864,0-13.538-2.548-18.633-7.654c-4.307-4.307-11.385-4.307-15.69,0 c-4.328,4.317-4.328,11.384,0,15.702c9.423,9.412,21.98,14.326,34.323,14.326c12.557,0,25.114-4.914,34.536-14.326 c9.614-9.614,14.326-22.171,14.326-34.536c0-12.354-4.711-24.911-14.326-34.333C242.187,324.361,237.475,321.216,232.38,318.861z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M332.258,284.956c0-0.076,0-0.152,0-0.227l-0.013-0.018c-0.214-5.767-4.944-10.38-10.763-10.38 c-1.404,0-2.742,0.276-3.973,0.766c-0.051,0.007-0.103,0.017-0.103,0.017c-0.115,0.033-0.168,0.074-0.224,0.115 c-0.478,0.208-0.934,0.456-1.374,0.729c-0.073,0.03-0.138,0.068-0.192,0.116c-0.053,0.035-0.111,0.064-0.164,0.1l-23.997,14.247 c-5.095,2.942-6.864,9.807-3.517,14.71c1.961,3.528,5.479,5.49,9.209,5.49c1.769,0,3.731-0.384,5.5-1.567l7.845-4.509v96.53 c0,6.076,4.712,10.788,10.788,10.788c5.884,0,10.979-4.712,10.979-10.788v-115.76v-0.039c0.001-0.055,0.008-0.107,0.008-0.16 C332.266,285.062,332.258,285.01,332.258,284.956z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M430.189,63.605h-32.741V34.447C397.448,15.453,381.995,0,363.001,0c-18.995,0-34.447,15.453-34.447,34.447v29.159H183.02 V34.447C183.02,15.453,167.568,0,148.574,0s-34.447,15.453-34.447,34.447v29.159H81.811c-28.513,0-51.71,23.198-51.71,51.71 v200.175c0,5.396,4.375,9.77,9.77,9.77s9.77-4.375,9.77-9.77V214.185h412.717v7.512c0,5.396,4.375,9.77,9.77,9.77 s9.77-4.375,9.77-9.77v-106.38C481.899,86.802,458.703,63.605,430.189,63.605z M348.095,34.447 c0-8.219,6.687-14.906,14.906-14.906s14.906,6.687,14.906,14.906v69.775c0,8.219-6.687,14.906-14.906,14.906 c-8.22,0-14.906-6.687-14.906-14.906V34.447z M133.668,34.447c0-8.219,6.687-14.906,14.906-14.906s14.906,6.687,14.906,14.906 v69.775c0,8.219-6.687,14.906-14.906,14.906s-14.906-6.687-14.906-14.906V34.447z M462.358,194.644H49.642v-79.328 c0-17.739,14.432-32.169,32.169-32.169h32.317v21.075c0,18.994,15.453,34.447,34.447,34.447s34.447-15.453,34.447-34.447V83.146 h145.534v21.075c0,18.994,15.453,34.447,34.447,34.447c18.994,0,34.447-15.453,34.447-34.447V83.146h32.741 c17.739,0,32.169,14.432,32.169,32.169V194.644z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
            <div className=" block">
              <div className=" flex justify-center items-center flex-wrap ">
                <h1 className=" text-[#8f0e2a] font-semibold">
                  Año de mayor adeudo
                </h1>
              </div>
              <div className=" flex justify-start items-center flex-wrap ">
                <h1 className=" text-[#8f0e2a] text-lg"></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
