import React, { useState } from "react";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import { deleteNeighbor } from "../../api/neighbors";
import { toast, Toaster } from "sonner";
import Modal from "../../components/Modal";

function NeighborInfo() {
  const neighbordata = useLoaderData();
  const neighbor = neighbordata.data.neighbor;
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);

  const removeNeighbor = async (neighborId) => {
    try {
      const res = await deleteNeighbor(neighborId);
      if (res.status === 204) {
        toast.success("Vecino eliminado con éxito");
        setTimeout(() => {
          window.location.href = `/vecinos`;
        }, 2000);
      }
    } catch (error) {
      error.response.data.map((err) => toast.error(err));
    }
  };

  if (navigation.state === "loading") {
    return <div>Cargando</div>;
  }
  return (
    <div className="  h-fit min-h-screen w-screen md:pl-[70px] md:py-0 pb-[90px]">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className=" block m-3">
          <div className=" my-3">
            <h1 className=" text-center text-white text-lg font-bold">
              Confirmación
            </h1>
          </div>
          <div className=" my-3">
            <h1 className=" text-center text-white text-base font-medium">
              ¿Estás seguro de eliminar este vecino?
            </h1>
          </div>
          <div className=" flex justify-center items-center">
            <div className=" my-2 grid grid-cols-2">
              <div className=" mx-4">
                <button
                  onClick={() => removeNeighbor(neighbor.neighbor_id)}
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
        <div className=" w-full h-[100px] px-5 flex justify-start items-center bg-gradient-to-r border-[1px] border-[#8f0e2a] from-[#c2c2c2] to-[#e6e6e6]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=" h-[60px]"
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
                d="M8 13H16C17.7107 13 19.1506 14.2804 19.3505 15.9795L20 21.5M8 13C5.2421 12.3871 3.06717 10.2687 2.38197 7.52787L2 6M8 13V18C8 19.8856 8 20.8284 8.58579 21.4142C9.17157 22 10.1144 22 12 22C13.8856 22 14.8284 22 15.4142 21.4142C16 20.8284 16 19.8856 16 18V17"
                className=" stroke-[#8f0e2a]"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>{" "}
              <circle
                cx="12"
                cy="6"
                r="4"
                className=" stroke-[#8f0e2a]"
                strokeWidth="1.5"
              ></circle>{" "}
            </g>
          </svg>
          <div className=" flex justify-center items-center px-5">
            <div className=" block">
              <h1 className=" text-[#8f0e2a] text-xl sm:text-2xl lg:text-3xl font-bold">
                {`${neighbor.neighbor_lastname} ${neighbor.neighbor_name}`}
              </h1>
              <h1 className=" my-1 sm:text-base text-sm text-[#8f0e2a]">
                {neighbor.role_id == 1 ? "Propietario" : "Arrendatario"}
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full h-[60px] px-5 flex justify-around items-center bg-gradient-to-r from-[#852655] to-[#8f0e2a] flex-wrap">
          <div className=" flex justify-center items-center w-[200px]">
            <h1 className=" text-white">{`Deuda: $${neighbor.places.reduce(
              (acc, place) => acc + parseFloat(place.pending_value),
              0
            )}`}</h1>
          </div>
          <div className=" flex justify-center items-center w-[200px]">
            <h1 className=" text-white">{`N° de inmuebles: ${neighbor.places.length}`}</h1>
          </div>
        </div>

        <div className=" w-full min-h-screen grid-cols-1 grid md:grid-cols-2">
          <div className=" h-full p-5 ">
            <div className=" h-full w-full border-[1px] flex justify-center items-center rounded-lg border-[#8f0e2a]">
              <div className=" w-full h-full block ">
                <div className=" flex justify-center items-center">
                  <svg
                    viewBox="0 0 24 24"
                    className=" fill-none h-[100px] w-auto"
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
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
                        className=" fill-[#852655]"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className=" flex justify-center items-center">
                  <h1 className=" text-center text-[#8f0e2a] font-bold">
                    {neighbor.neighbor_name}
                  </h1>
                </div>
                <div className=" flex justify-center items-center">
                  <h1 className=" text-center text-[#8f0e2a] font-bold">
                    {neighbor.neighbor_lastname}
                  </h1>
                </div>
                <div className=" flex justify-center items-center my-5 ">
                  <h1 className="text-center text-[#8f0e2a] font-bold">
                    Información General
                  </h1>
                </div>
                <div className=" mt-10 m-5 grid grid-cols-1 sm:grid-cols-2">
                  <div className=" flex justify-start items-start">
                    <div className=" block">
                      <h1 className=" text-[#8f0e2a] font-bold">
                        Documento de identidad:
                      </h1>
                      <h1>{neighbor.identity_document}</h1>
                    </div>
                  </div>
                  <div className=" flex justify-start items-start">
                    <div className=" block">
                      <h1 className=" text-[#8f0e2a] font-bold">
                        Rol del vecino:
                      </h1>
                      <h1>
                        {neighbor.role_id === 1
                          ? "Propietario"
                          : "Arrendatario"}
                      </h1>
                    </div>
                  </div>
                  <div className=" mt-5 lg:mt-10 flex justify-start items-start">
                    <div className=" block">
                      <h1 className=" text-[#8f0e2a] font-bold">
                        N° de Teléfono:
                      </h1>
                      <h1>
                        {neighbor.neighbor_email !== null
                          ? `${neighbor.neighbor_email}`
                          : "No registrado"}
                      </h1>
                    </div>
                  </div>
                  <div className=" mt-5 lg:mt-10 flex justify-start items-start">
                    <div className=" block">
                      <h1 className=" text-[#8f0e2a] font-bold">
                        Correo Electrónico:
                      </h1>
                      <h1>
                        {neighbor.neighbor_email !== null
                          ? `${neighbor.neighbor_email}`
                          : "No registrado"}
                      </h1>
                    </div>
                  </div>
                  <div className=" mt-10 mb-5  sm:col-span-2 flex justify-center items-center">
                    <Link to={`/vecinos/modificar/${neighbor.neighbor_id}`}>
                      <button className=" group hover:bg-[#8f0e2a] transition duration-300 p-3 border-[1px] border-[#8f0e2a] rounded-lg flex justify-center items-center">
                        <h1 className=" text-center group-hover:text-white text-sm lg:text-base transition duration-300 text-[#8f0e2a]">
                          Modificar usuario
                        </h1>
                      </button>
                    </Link>
                  </div>
                  <div className=" mb-10 mt-5 sm:col-span-2 flex justify-center items-center">
                    <button
                      onClick={() => setOpen(true)}
                      className=" group hover:bg-[#a32b2b] bg-[#8b1e1e] transition duration-300 p-3 border-[1px] border-[#8f0e2a] rounded-lg flex justify-center items-center"
                    >
                      <h1 className=" text-center group-hover:text-white text-sm lg:text-base transition duration-300 text-white">
                        Eliminar usuario
                      </h1>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" p-2 h-full bg-gradient-to-r py-5 from-[#852655] to-[#8f0e2a]">
            <div className=" block">
              <div className=" flex justify-center items-center">
                <h1 className=" text-white font-bold text-lg">
                  Inmuebles relacionados
                </h1>
              </div>
              <div className=" my-10 flex justify-start items-start flex-wrap">
                {neighbor.places.map((place) => (
                  <Link
                    key={place.place_id}
                    className=" h-fit w-fit group rounded-full"
                    to={`/inmuebles/${place.place_id}`}
                  >
                    <div
                      key={place.place_id}
                      className=" m-3 lg:m-5 group-hover:scale-105 transition duration-300 bg-white rounded-full flex justify-center items-center h-[120px] w-[120px]"
                    >
                      <h1 className=" text-[#8f0e2a] font-semibold text-center">
                        {place.place_name}
                      </h1>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default NeighborInfo;
