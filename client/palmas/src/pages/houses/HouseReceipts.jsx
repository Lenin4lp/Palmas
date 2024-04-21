import React, { useState } from "react";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

function HouseReceipts() {
  const placeData = useLoaderData();
  const place = placeData.place.data.place;
  const payments = placeData.payments.data;
  const navigation = useNavigation();
  console.log(placeData);

  const housePayments = payments.filter((payment) => {
    return payment.monthlyDebt.place_id === place.place_id;
  });
  console.log(housePayments);
  if (navigation.state === "loading") {
  }
  return (
    <div className=" md:pl-[70px] pb-[90px] md:py-0 w-screen h-fit min-h-screen bg-gradient-to-bl from-[#852655] to-[#8f0e2a] ">
      <div className="  block">
        <div className=" flex justify-start items-center p-5">
          {" "}
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className=" fill-none h-[40px] md:h-[60px] px-3"
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
                d="M17 13H21V19C21 20.1046 20.1046 21 19 21M17 13V19C17 20.1046 17.8954 21 19 21M17 13V5.75707C17 4.85168 17 4.39898 16.8098 4.13646C16.6439 3.90746 16.3888 3.75941 16.1076 3.72897C15.7853 3.69408 15.3923 3.91868 14.6062 4.36788L14.2938 4.54637C14.0045 4.7117 13.8598 4.79438 13.7062 4.82675C13.5702 4.85539 13.4298 4.85539 13.2938 4.82675C13.1402 4.79438 12.9955 4.7117 12.7062 4.54637L10.7938 3.45359C10.5045 3.28826 10.3598 3.20559 10.2062 3.17322C10.0702 3.14457 9.92978 3.14457 9.79383 3.17322C9.64019 3.20559 9.49552 3.28826 9.20618 3.4536L7.29382 4.54637C7.00448 4.71171 6.85981 4.79438 6.70617 4.82675C6.57022 4.85539 6.42978 4.85539 6.29383 4.82675C6.14019 4.79438 5.99552 4.71171 5.70618 4.54637L5.39382 4.36788C4.60772 3.91868 4.21467 3.69408 3.89237 3.72897C3.61123 3.75941 3.35611 3.90746 3.1902 4.13646C3 4.39898 3 4.85168 3 5.75707V16.2C3 17.8801 3 18.7202 3.32698 19.362C3.6146 19.9264 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H19M12 10.5C11.5 10.376 10.6851 10.3714 10 10.376C9.77091 10.3775 9.90941 10.3678 9.6 10.376C8.79258 10.4012 8.00165 10.7368 8 11.6875C7.99825 12.7003 9 13 10 13C11 13 12 13.2312 12 14.3125C12 15.1251 11.1925 15.4812 10.1861 15.5991C9.3861 15.5991 9 15.625 8 15.5M10 16V17M10 8.99998V9.99998"
                className=" stroke-white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <h1 className=" text-white text-xl md:text-3xl font-bold">{`Comprobantes de pago - ${place.place_name}`}</h1>
        </div>
        <div className=" w-full h-[2px] bg-white"></div>
        <div className=" flex py-5 md:py-10 justify-center items-center">
          {housePayments.length === 0 ? (
            <div className=" mx-5 flex justify-center items-center my-20">
              <h1 className=" text-center font-bold text-xl text-white">
                No se han registrado pagos
              </h1>
            </div>
          ) : (
            <div className=" mt-5 h-[350px] md:h-[500px] overflow-x-auto overflow-y-auto w-[280px] sm:w-[600px] md:w-[680px]  lg:w-fit">
              <table className=" h-[500px]  border-collapse text-[12px] lg:text-sm w-[280px] sm:w-[600px] md:w-[680px]  lg:w-fit">
                <thead className=" sticky top-0 ">
                  <tr>
                    <th className=" border border-slate-300 text-white bg-[#8f0e2a] w-[70px] py-2">
                      N°
                    </th>
                    <th className=" border border-slate-300 text-white bg-[#8f0e2a] w-[100px] py-2">
                      Fecha
                    </th>
                    <th className=" border border-slate-300 text-white bg-[#8f0e2a] w-[300px] py-2">
                      Cliente
                    </th>
                    <th className=" border border-slate-300 text-white bg-[#8f0e2a] w-[130px] py-2">
                      Tipo de pago
                    </th>
                    <th className=" border border-slate-300 text-white bg-[#8f0e2a] w-[100px] py-2">
                      Mes
                    </th>
                    <th className=" border border-slate-300  text-white bg-[#8f0e2a] w-[125px] py-2">
                      N° comprobante
                    </th>
                    <th className=" border border-slate-300  text-white bg-[#8f0e2a] w-[100px] py-2">
                      Monto
                    </th>
                    <th className=" border border-slate-300 text-white bg-[#8f0e2a] w-[120px] py-2">
                      Comprobante
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {housePayments.map((payment) => (
                    <tr
                      key={payment.payment_id}
                      className=" text-[11px] lg:text-[12px]"
                    >
                      <th className="border bg-gradient-to-t from-[#c4c4c4] to-[#e2e2e2] border-[#8f0e2a] px-2 py-2">
                        {payment.payment_id}
                      </th>
                      <th className="border bg-gradient-to-t from-[#c4c4c4] to-[#e2e2e2] border-[#8f0e2a] px-2 py-2">
                        {payment.date}
                      </th>
                      <th className="border bg-gradient-to-t from-[#c4c4c4] to-[#e2e2e2] border-[#8f0e2a] px-2 py-2">
                        {payment.customer}
                      </th>
                      <th className="border bg-gradient-to-t from-[#c4c4c4] to-[#e2e2e2] border-[#8f0e2a] px-2 py-2">
                        {payment.cash === null
                          ? payment.deposit !== null
                            ? "Deposito"
                            : "Transferencia"
                          : "Efectivo"}
                      </th>
                      <th className="border bg-gradient-to-t from-[#c4c4c4] to-[#e2e2e2] border-[#8f0e2a] px-2 py-2">
                        {payment.monthlyDebt.month_id}
                      </th>
                      <th className="border bg-gradient-to-t from-[#c4c4c4] to-[#e2e2e2] border-[#8f0e2a] px-2 py-2">
                        {payment.cash === null
                          ? payment.deposit !== null
                            ? payment.deposit
                            : payment.transfer
                          : `---`}
                      </th>
                      <th className="border bg-gradient-to-t from-[#c4c4c4] to-[#e2e2e2] border-[#8f0e2a] px-2 py-2">
                        {`$${payment.value}`}
                      </th>
                      <th className="border bg-gradient-to-t from-[#c4c4c4] to-[#e2e2e2] border-[#8f0e2a] px-2 py-2">
                        <a href={payment.file}>Ver PDF</a>
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
  );
}

export default HouseReceipts;
