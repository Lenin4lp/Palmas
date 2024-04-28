import React from "react";

function Error() {
  return (
    <div className=" flex justify-center items-center w-screen h-screen bg-gradient-to-tl from-[#882121] to-[#5f0a1d]">
      <div className=" block">
        <div className=" flex justify-center items-center m-5">
          <img
            src="https://softdeveral.com/AliQuo/minilogo.png"
            className=" h-[100px] w-auto"
            alt=""
          />
        </div>
        <div className=" flex justify-center items-center">
          <div className=" m-10">
            <div className=" block">
              <h1 className=" text-center text-xl font-semibold text-white">
                Oops, Algo salió mal
              </h1>
              <h1 className=" text-center mt-5 text-base font-normal text-white">
                Reporta el error al correo{" "}
                <a
                  className=" underline underline-offset-4"
                  href="mailto:aliquot@softdeveral.com"
                >
                  aliquot@softdeveral.com
                </a>
              </h1>
              <h1 className=" text-center my-10 text-base font-normal text-white">
                O
              </h1>
              <div className=" flex justify-center items-center">
                <a href="/">
                  <button className=" p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-white text-white hover:text-[#5f0a1d] text-[13px] duration-500">
                    Regresa al menu de Inicio
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
