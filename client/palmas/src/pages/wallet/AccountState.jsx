import React, { useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loader from "../../components/Loader";
import { Toaster, toast } from "sonner";
import Modal from "../../components/Modal";
import axios from "axios";

function AccountState() {
  const accountStateData = useLoaderData();
  const accountStates = accountStateData.data;
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState();
  const [waiting, setWaiting] = useState(false);

  const upload = () => {
    const formData = new FormData();

    formData.append("myFile", file);
    axios
      .post("http://localhost:8081/api/accountUpload", formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Contenido modificado con éxito");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((er) => console.log(er));
  };

  console.log(accountStates);

  if (navigation.state === "loading") {
    return <Loader />;
  }

  return (
    <>
      <div
        className={`h-screen w-screen bg-black opacity-70 fixed z-50 flex justify-center items-center ${
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
              ¿Estás seguro de subir el archivo?
            </h1>
          </div>
          <div className=" flex justify-center items-center">
            <div className=" my-2 grid grid-cols-2">
              <div className=" mx-4">
                <button
                  onClick={() => {
                    setWaiting(true);
                    upload();
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
      <div className=" md:pl-[70px] pb-[90px] md:py-0 w-screen h-fit min-h-screen bg-gradient-to-bl from-[#852655] to-[#8f0e2a] ">
        <div className=" block">
          <div className=" flex justify-start items-center p-5">
            <svg
              className=" fill-white h-[100px] w-auto"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M63.94,55.88h0A12.06,12.06,0,1,0,76,67.94,12.06,12.06,0,0,0,63.9,55.88Zm-.1,5.49h.06a1.8,1.8,0,1,1-1.8,1.8A1.77,1.77,0,0,1,63.84,61.37ZM66.9,74a.54.54,0,0,1-.56.54H61.5a.56.56,0,0,1-.6-.5V72.77a.65.65,0,0,1,.6-.66.56.56,0,0,0,.6-.5V69.17a.65.65,0,0,0-.6-.66.56.56,0,0,1-.6-.5V66.77a.65.65,0,0,1,.6-.66h3.6a.66.66,0,0,1,.6.66v4.8a.54.54,0,0,0,.56.54h0a.66.66,0,0,1,.6.66Z"></path>
                <path d="M63.55,51.55c1,0,2.78-.08,2.7-1.56-.07-1.15,0-6,0-8.08V22.39A2.39,2.39,0,0,0,63.86,20H26.43A2.39,2.39,0,0,0,24,22.35V72.09H46.13c1.38,0,1.73-1,1.65-2.43s-.61-7.82,3.73-12.85S62.51,51.55,63.55,51.55ZM53.48,28.31a2.46,2.46,0,0,1,2.14-2.41h3.05a2.46,2.46,0,0,1,2.14,2.41v2.45a2.45,2.45,0,0,1-2.44,2.44H55.92a2.45,2.45,0,0,1-2.44-2.44Zm0,12a2.45,2.45,0,0,1,2.44-2.44h2.45a2.45,2.45,0,0,1,2.44,2.44v2.45a2.45,2.45,0,0,1-2.44,2.44H55.92a2.45,2.45,0,0,1-2.44-2.44ZM36.81,66.76a2.45,2.45,0,0,1-2.44,2.44H31.92a2.45,2.45,0,0,1-2.44-2.44V64.31a2.45,2.45,0,0,1,2.44-2.44h2.45a2.45,2.45,0,0,1,2.44,2.44Zm0-12a2.45,2.45,0,0,1-2.44,2.44H31.92a2.45,2.45,0,0,1-2.44-2.44V52.31a2.45,2.45,0,0,1,2.44-2.44h2.45a2.45,2.45,0,0,1,2.44,2.44Zm0-12a2.45,2.45,0,0,1-2.44,2.44H31.92a2.45,2.45,0,0,1-2.44-2.44V40.31a2.45,2.45,0,0,1,2.44-2.44h2.45a2.45,2.45,0,0,1,2.44,2.44Zm0-12a2.45,2.45,0,0,1-2.44,2.44H31.92a2.45,2.45,0,0,1-2.44-2.44V28.31a2.46,2.46,0,0,1,2.14-2.41h3.05a2.46,2.46,0,0,1,2.14,2.41Zm12,24a2.45,2.45,0,0,1-2.44,2.44H43.92a2.45,2.45,0,0,1-2.44-2.44V52.31a2.45,2.45,0,0,1,2.44-2.44h2.45a2.45,2.45,0,0,1,2.44,2.44Zm0-12a2.45,2.45,0,0,1-2.44,2.44H43.92a2.45,2.45,0,0,1-2.44-2.44V40.31a2.45,2.45,0,0,1,2.44-2.44h2.45a2.45,2.45,0,0,1,2.44,2.44Zm0-12a2.45,2.45,0,0,1-2.44,2.44H43.92a2.45,2.45,0,0,1-2.44-2.44V28.31a2.46,2.46,0,0,1,2.14-2.41h3.05a2.46,2.46,0,0,1,2.14,2.41Z"></path>
              </g>
            </svg>
            <h1 className=" text-white text-xl md:text-3xl font-bold">
              Estados de cuenta
            </h1>
          </div>
          <button
            onClick={() => window.history.back()}
            className=" mb-5 mx-10 p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#1C274C] text-white hover:text-white text-[13px] duration-500"
          >
            Regresar
          </button>
          <div className=" flex justify-around items-start">
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className=" flex justify-start w-full items-start">
                <div className=" block w-full">
                  <h1 className=" text-white text-base font-semibold">
                    Modificar Contenido
                  </h1>

                  <div className=" mt-5">
                    <div className=" flex justify-start items-center">
                      <h1 className=" text-white text-sm">
                        Selecciona el archivo correspondiente
                      </h1>
                    </div>
                  </div>
                  <div className=" mt-5 text-white">
                    <input
                      accept="application/pdf"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <button
                    className=" text-white mt-10 p-2 hover:border-r-white bg-[#146898] hover:border-t-white duration-300 border-white border-b mb-3 rounded border-l border-r border-r-transparent border-t border-t-transparent hover:cursor-pointer"
                    type="button"
                    onClick={() => setOpenModal(true)}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
              <div className=" flex justify-center items-center">
                <div className=" mt-8 block">
                  <div className=" flex  justify-start items-center">
                    <h1 className=" text-white text-base font-semibold">
                      Estados de cuenta
                    </h1>
                  </div>
                  <div className=" flex py-3 justify-center items-center">
                    {accountStates.length === 0 ? (
                      <div className=" mx-5 flex justify-center items-center my-20">
                        <h1 className=" text-center font-bold text-xl text-white">
                          No se han emitido estados de cuenta
                        </h1>
                      </div>
                    ) : (
                      <div className=" mt-5 h-[350px] md:h-[500px] overflow-x-auto overflow-y-auto w-[280px] sm:w-[600px] md:w-[680px]  lg:w-fit">
                        <table className=" h-fit max-h-[500px]  border-collapse text-[12px] lg:text-sm w-[280px] sm:w-[600px] md:w-[680px]  lg:w-fit">
                          <thead className=" sticky top-0 ">
                            <tr>
                              <th className=" border border-slate-300 text-white bg-[#8f0e2a] w-[70px] py-2">
                                N°
                              </th>
                              <th className=" border border-slate-300 text-white bg-[#8f0e2a] w-[190px] py-2">
                                Periodo
                              </th>

                              <th className=" border border-slate-300  text-white bg-[#8f0e2a] w-[125px] py-2">
                                Archivo
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountStates.map((accountState) => (
                              <tr
                                key={accountState.accountState_id}
                                className=" text-[11px] lg:text-[12px]"
                              >
                                <th className="border bg-gradient-to-t from-[#c4c4c4] to-[#e2e2e2] border-[#8f0e2a] px-2 py-2">
                                  {accountState.accountState_id}
                                </th>
                                <th className="border bg-gradient-to-t from-[#c4c4c4] to-[#e2e2e2] border-[#8f0e2a] px-2 py-2">
                                  {accountState.accountState_name}
                                </th>
                                <th className="border bg-gradient-to-t from-[#c4c4c4] to-[#e2e2e2] border-[#8f0e2a] px-2 py-2">
                                  <a href={accountState.accountState_file}>
                                    Ver PDF
                                  </a>
                                </th>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Toaster position="top-center" richColors />
        </div>
      </div>
    </>
  );
}

export default AccountState;
