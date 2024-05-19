import React, { useState } from "react";
import ContentComponent from "../../components/ContentComponent";
import { useLoaderData, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { createPlace } from "../../api/places";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";

function HouseRegister() {
  const typesdata = useLoaderData();
  const types = typesdata.data;
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState("");
  const [open, setOpen] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const { handleSubmit } = useForm();

  const registerPlace = async (data) => {
    try {
      const res = await createPlace(data);
      if (res.status === 200) {
        toast.success(`Inmueble ${res.data.place_name} registrado con éxito`);
        setTimeout(() => {
          window.location.href = `/inmuebles`;
        }, 2000);
      }
    } catch (error) {
      error.response.data.map((err) => toast.error(err));
      setWaiting(false);
    }
  };

  const onSubmit = handleSubmit((data) => {
    data.placeType_id = selectedType;

    if (data.placeType_id === "") {
      toast.error("Debes seleccionar un tipo de inmueble");
    } else if (data.placeType_id === "1") {
      data.placeType_id = 1;
    } else if (data.placeType_id === "2") {
      data.placeType_id = 2;
    } else if (data.placeType_id === "3") {
      data.placeType_id = 3;
    } else if (data.placeType_id === "4") {
      data.placeType_id = 4;
    } else if (data.placeType_id === "5") {
      data.placeType_id = 5;
    }

    registerPlace(data);
  });

  const handleSelectedType = (event) => {
    setSelectedType(event.target.value);
  };

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
      <ContentComponent>
        <div className=" w-full flex justify-center items-center">
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className=" block m-3">
              <div className=" my-3">
                <h1 className=" text-center text-white text-lg font-bold">
                  Confirmación
                </h1>
              </div>
              <div className=" my-3">
                <h1 className=" text-center text-white text-base font-medium">
                  ¿Estás seguro de registrar el inmueble?
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
                      onClick={() => setOpen(false)}
                      className=" p-2 text-white active:transform active:scale-90 border border-gray-400 rounded-lg bg-[#ad2c2c] hover:bg-[#b94d4d]  text-[12px] md:text-sm lg:text-base duration-500"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <div className=" block ">
            <div className=" mx-5 py-5 border-b-[1px] bg-gradient-to-r from-white to-[#cccccc] border-[#852655]">
              <div className=" h-[40px] md:h-[60px]  w-screen md:px-[70px]  flex justify-start items-center">
                <div className=" ml-5 my-10 flex justify-center items-center">
                  <svg
                    className=" h-[40px] md:h-[60px] mr-3 md:mr-5 w-auto"
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
                        d="M12.75 10.9998C12.75 10.5856 12.4142 10.2498 12 10.2498C11.5858 10.2498 11.25 10.5856 11.25 10.9998L11.25 13.2498H9C8.58579 13.2498 8.25 13.5856 8.25 13.9998C8.25 14.414 8.58579 14.7498 9 14.7498H11.25V16.9998C11.25 17.414 11.5858 17.7498 12 17.7498C12.4142 17.7498 12.75 17.414 12.75 16.9998L12.75 14.7498H15C15.4142 14.7498 15.75 14.414 15.75 13.9998C15.75 13.5856 15.4142 13.2498 15 13.2498H12.75V10.9998Z"
                        className=" fill-[#8f0e2a]"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 1.25C11.2919 1.25 10.6485 1.45282 9.95055 1.79224C9.27585 2.12035 8.49642 2.60409 7.52286 3.20832L5.45628 4.4909C4.53509 5.06261 3.79744 5.5204 3.2289 5.95581C2.64015 6.40669 2.18795 6.86589 1.86131 7.46263C1.53535 8.05812 1.38857 8.69174 1.31819 9.4407C1.24999 10.1665 1.24999 11.0541 1.25 12.1672V13.7799C1.24999 15.6837 1.24998 17.1866 1.4027 18.3616C1.55937 19.567 1.88856 20.5401 2.63236 21.3094C3.37958 22.0824 4.33046 22.4277 5.50761 22.5914C6.64849 22.75 8.10556 22.75 9.94185 22.75H14.0581C15.8944 22.75 17.3515 22.75 18.4924 22.5914C19.6695 22.4277 20.6204 22.0824 21.3676 21.3094C22.1114 20.5401 22.4406 19.567 22.5973 18.3616C22.75 17.1866 22.75 15.6838 22.75 13.7799V12.1672C22.75 11.0541 22.75 10.1665 22.6818 9.4407C22.6114 8.69174 22.4646 8.05812 22.1387 7.46263C21.8121 6.86589 21.3599 6.40669 20.7711 5.95581C20.2026 5.5204 19.4649 5.06262 18.5437 4.49091L16.4771 3.20831C15.5036 2.60409 14.7241 2.12034 14.0494 1.79224C13.3515 1.45282 12.7081 1.25 12 1.25ZM8.27953 4.50412C9.29529 3.87371 10.0095 3.43153 10.6065 3.1412C11.1882 2.85833 11.6002 2.75 12 2.75C12.3998 2.75 12.8118 2.85833 13.3935 3.14119C13.9905 3.43153 14.7047 3.87371 15.7205 4.50412L17.7205 5.74537C18.6813 6.34169 19.3559 6.76135 19.8591 7.1467C20.3487 7.52164 20.6303 7.83106 20.8229 8.18285C21.0162 8.53589 21.129 8.94865 21.1884 9.58104C21.2492 10.2286 21.25 11.0458 21.25 12.2039V13.725C21.25 15.6959 21.2485 17.1012 21.1098 18.1683C20.9736 19.2163 20.717 19.8244 20.2892 20.2669C19.8649 20.7058 19.2871 20.9664 18.2858 21.1057C17.2602 21.2483 15.9075 21.25 14 21.25H10C8.09247 21.25 6.73983 21.2483 5.71422 21.1057C4.71286 20.9664 4.13514 20.7058 3.71079 20.2669C3.28301 19.8244 3.02642 19.2163 2.89019 18.1683C2.75149 17.1012 2.75 15.6959 2.75 13.725V12.2039C2.75 11.0458 2.75076 10.2286 2.81161 9.58104C2.87103 8.94865 2.98385 8.53589 3.17709 8.18285C3.36965 7.83106 3.65133 7.52164 4.14092 7.1467C4.6441 6.76135 5.31869 6.34169 6.27953 5.74537L8.27953 4.50412Z"
                        className=" fill-[#8f0e2a]"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <h1 className=" text-xl md:text-3xl text-[#8f0e2a] font-bold">
                  Registro de Inmuebles
                </h1>
              </div>
            </div>
            <div className=" mx-5 md:mx-0 ">
              <div className=" md:px-[70px] my-2 text-[#8f0e2a] flex justify-center items-center">
                <div className=" block">
                  <h1 className=" px-1 text-sm md:text-base text-center">
                    Registra la información correspondiente al inmueble a
                    registrar
                  </h1>
                  <div className=" my-3 flex justify-center items-center">
                    <svg
                      className=" h-[100px] md:h-[150px] w-auto"
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
                          d="M22 22L2 22"
                          className=" stroke-[#8f0e2a]"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                        <path
                          d="M2 11L10.1259 4.49931C11.2216 3.62279 12.7784 3.62279 13.8741 4.49931L22 11"
                          className=" stroke-[#8f0e2a]"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                        <path
                          d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5"
                          className=" stroke-[#8f0e2a]"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                        <path
                          d="M4 22V9.5"
                          className=" stroke-[#8f0e2a]"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                        <path
                          d="M20 22V9.5"
                          className=" stroke-[#8f0e2a]"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                        <path
                          d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393C9 14.8787 9 15.5858 9 17V22"
                          className=" stroke-[#8f0e2a]"
                          strokeWidth="1.5"
                        ></path>{" "}
                        <path
                          d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z"
                          className=" stroke-[#8f0e2a]"
                          strokeWidth="1.5"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className=" flex justify-center text-base md:text-lg font-bold items-center">
                    <h1>Seleccione el tipo de inmueble</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className=" my-5 flex justify-center items-center">
              <select
                value={selectedType}
                onChange={handleSelectedType}
                className="bg-gray-50 border border-[#8f0e2a] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] p-2.5 "
              >
                <option value="" defaultValue>
                  Selecciona un tipo
                </option>
                {types.map((type) => (
                  <option key={type.placetype_id} value={type.placetype_id}>
                    {type.placetype_name}
                  </option>
                ))}
              </select>
            </div>
            <div className=" my-10 flex justify-center items-center">
              <button
                onClick={() => setOpen(true)}
                disabled={selectedType === "" ? true : false}
                className=" disabled:cursor-not-allowed disabled:opacity-50 group hover:text-white bg-transparent flex items-center hover:bg-[#852655] transition duration-300 text-[#852655] p-2 border-[1px] rounded-lg border-[#852655]"
              >
                <svg
                  className=" h-[25px] mr-[7px] w-auto"
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
                    <g id="Edit / Add_Plus_Circle">
                      {" "}
                      <path
                        id="Vector"
                        d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                        className=" stroke-[#852655] group-hover:stroke-white transition duration-300 "
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <h1 className="   font-semibold ">Registrar</h1>
              </button>
            </div>
          </div>
          <Toaster position="top-center" richColors />
        </div>
      </ContentComponent>
    </>
  );
}

export default HouseRegister;
