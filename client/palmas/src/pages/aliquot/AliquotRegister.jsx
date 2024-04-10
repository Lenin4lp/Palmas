import React, { useState } from "react";
import { createMonthlyFee } from "../../api/debt";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigation, Link } from "react-router-dom";
import Modal from "../../components/Modal";

function AliquotRegister() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigation = useNavigation();

  const registerAliquot = async (data) => {
    try {
      const res = await createMonthlyFee(data);
      if (res.status === 200) {
        toast.success("Alicuota registrada con éxito");
        setTimeout(() => {
          window.location.href = `/alicuotas`;
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
    modifiedData.monthlyFee_value = parseFloat(modifiedData.monthlyFee_value);

    registerAliquot(modifiedData);
  });

  if (navigation.state === "loading") {
    return <div>Cargando</div>;
  }
  return (
    <div className=" md:pl-[70px] h-fit min-h-screen w-screen md:py-0 pb-[90px] flex justify-center items-start">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className=" block m-3">
          <div className=" my-3">
            <h1 className=" text-center text-white text-lg font-bold">
              Confirmación
            </h1>
          </div>
          <div className=" my-3">
            <h1 className=" text-center text-white text-base font-medium">
              ¿Estás seguro de registrar la alicuota?
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
      <div className=" w-full block">
        <div className=" w-full h-[70px] md:h-[100px] bg-gradient-to-r flex justify-start items-center from-[#ececec] to-[#cacaca] border-[1px] border-[#8f0e2a] ">
          <svg
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className=" h-[50px] md:h-[60px] px-3"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>Money</title>{" "}
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                {" "}
                <g id="Money">
                  {" "}
                  <rect
                    id="Rectangle"
                    fillRule="nonzero"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    {" "}
                  </rect>{" "}
                  <rect
                    id="Rectangle"
                    className=" stroke-[#8f0e2a]"
                    strokeWidth="2"
                    strokeLinecap="round"
                    x="4"
                    y="6"
                    width="14"
                    height="10"
                    rx="2"
                  >
                    {" "}
                  </rect>{" "}
                  <path
                    d="M21,9 L21,17 C21,18.1046 20.1046,19 19,19 L7,19"
                    id="Path"
                    className=" stroke-[#8f0e2a]"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    {" "}
                  </path>{" "}
                  <circle
                    id="Oval"
                    className=" stroke-[#8f0e2a]"
                    strokeWidth="2"
                    strokeLinecap="round"
                    cx="11"
                    cy="11"
                    r="2"
                  >
                    {" "}
                  </circle>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
          <h1 className=" text-[#8f0e2a] text-xl md:text-2xl lg:text-3xl font-bold">
            Registrar alicuota
          </h1>
        </div>
        <div className=" w-full p-3 h-full flex justify-center items-center">
          <h1 className=" text-center text-base font-semibold text-[#8f0e2a]">
            Introduce la alicuota a registrar
          </h1>
        </div>
        <div className=" flex justify-center py-5 md:py-10 items-center w-full">
          <svg
            className=" h-[100px] md:h-[150px] w-auto fill-[#8f0e2a] px-3"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 295.24 295.24"
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
                    <rect
                      x="185.714"
                      y="0.001"
                      width="9.524"
                      height="9.524"
                    ></rect>{" "}
                    <rect
                      x="185.714"
                      y="19.049"
                      width="9.524"
                      height="9.524"
                    ></rect>{" "}
                    <rect
                      x="195.238"
                      y="9.525"
                      width="9.524"
                      height="9.524"
                    ></rect>{" "}
                    <path d="M266.667,238.096v-28.571H152.381v-28.814c34.538-2.457,61.905-31.271,61.905-66.424 c0-25.914-14.848-49.219-38.095-60.233V38.096h-23.81v-6.757c0-5.3,3.376-9.986,8.4-11.657c1.262-0.419,2.571-0.633,3.89-0.633 h11.519V9.525h-11.519c-2.338,0-4.657,0.376-6.895,1.119c-8.924,2.971-14.919,11.286-14.919,20.695v6.757h-23.81v15.957 C95.8,65.068,80.952,88.372,80.952,114.287c0,35.152,27.367,63.967,61.905,66.424v28.814H28.571v28.571H0v57.143h66.667v-57.143 H38.095v-19.048h104.762v19.048h-28.571v57.143h66.667v-57.143h-28.571v-19.048h104.762v19.048h-28.571v57.143h66.667v-57.143 H266.667z M57.143,247.62v38.095H9.524V247.62H57.143z M90.476,114.287c0-23.133,13.805-43.838,35.167-52.748l2.929-1.224V47.62 h38.095v12.695l2.929,1.224c21.362,8.91,35.167,29.614,35.167,52.748c0,29.905-23.1,54.467-52.381,56.9v-9.281h-9.524v9.281 C113.576,168.753,90.476,144.191,90.476,114.287z M171.429,247.62v38.095H123.81V247.62H171.429z M285.714,285.715h-47.619 V247.62h47.619V285.715z"></path>{" "}
                    <path d="M152.381,152.382v-9.524c7.876,0,14.286-6.41,14.286-14.286v-4.762c0-7.876-6.41-14.286-14.286-14.286h-9.524 c-2.624,0-4.762-2.133-4.762-4.762v-4.761c0-2.629,2.138-4.762,4.762-4.762h9.524c2.624,0,4.762,2.133,4.762,4.762h9.524 c0-7.876-6.41-14.286-14.286-14.286v-9.524h-9.524v9.524c-7.876,0-14.286,6.41-14.286,14.286v4.762 c0,7.876,6.41,14.286,14.286,14.286h9.524c2.624,0,4.762,2.133,4.762,4.762v4.762c0,2.629-2.138,4.762-4.762,4.762h-9.524 c-2.624,0-4.762-2.133-4.762-4.762h-9.524c0,7.876,6.41,14.286,14.286,14.286v9.523H152.381z"></path>{" "}
                    <rect
                      x="19.048"
                      y="261.906"
                      width="9.524"
                      height="9.524"
                    ></rect>{" "}
                    <rect
                      x="38.095"
                      y="261.906"
                      width="9.524"
                      height="9.524"
                    ></rect>{" "}
                    <rect
                      x="133.333"
                      y="261.906"
                      width="9.524"
                      height="9.524"
                    ></rect>{" "}
                    <rect
                      x="152.381"
                      y="261.906"
                      width="9.524"
                      height="9.524"
                    ></rect>{" "}
                    <rect
                      x="247.619"
                      y="261.906"
                      width="9.524"
                      height="9.524"
                    ></rect>{" "}
                    <rect
                      x="266.667"
                      y="261.906"
                      width="9.524"
                      height="9.524"
                    ></rect>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </div>
        <div className=" m-5 flex justify-center items-center">
          <h1 className=" text-center text-[#8f0e2a]">
            Introduce el valor de la nueva alicuota
          </h1>
        </div>
        <form className=" flex justify-center items-center" action="">
          <h1 className=" px-2 text-3xl text-[#8f0e2a]">$</h1>
          <input
            type="number"
            {...register("monthlyFee_value", { required: true })}
            className=" border-[1px] text-lg p-2 border-[#8f0e2a] h-[40px] rounded-lg w-[200px]"
          />
        </form>
        <div className=" m-9 flex justify-center items-center">
          <button
            onClick={() => setOpen(true)}
            className=" hover:bg-[#8f0e2a] hover:text-white duration-300 transition border-[1px] border-[#8f0e2a] p-2 text-[#8f0e2a] rounded-lg"
          >
            Registrar
          </button>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default AliquotRegister;
