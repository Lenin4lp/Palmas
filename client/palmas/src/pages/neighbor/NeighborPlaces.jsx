import React, { useState, useEffect } from "react";
import ContentComponent from "../../components/ContentComponent";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import { addPlaceFromNeighbor } from "../../api/neighbors";
import { Toaster, toast } from "sonner";

function NeighborPlaces() {
  const neighborData = useLoaderData();
  const neighbor = neighborData.neighbor.data.neighbor;
  const places = neighborData.places.data;
  console.log(neighborData);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const togglePlaceSelection = (place) => {
    if (selectedPlaces.includes(place)) {
      setSelectedPlaces(selectedPlaces.filter((p) => p !== place));
    } else {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };
  const addPlace = async (neighborId, placeId) => {
    try {
      const res = await addPlaceFromNeighbor(neighborId, placeId);
      if (res.status === 200) {
        toast.success("Inmueble agregado con éxito");
        setTimeout(() => {
          window.location.href = `/vecinos`;
        }, 2000);
      }
    } catch (error) {
      error.response.data.map((err) => toast.error(err));
    }
  };

  return (
    <ContentComponent>
      <div className=" flex  justify-center items-center">
        <div className=" block">
          <div className=" w-screen md:px-[70px] flex justify-start items-center">
            <svg
              className=" h-[80px] ml-5"
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
                  d="M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12"
                  stroke="#852655"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <div className=" block">
              <p className=" mx-5 mt-2 text-[#8f0e2a] text-lg">
                {neighbor.role_id === 1 ? "Propietario" : "Arrendatario"}
              </p>
              <h1 className=" mx-5 mb-2 text-left font-bold text-[#852655] text-3xl">{`${neighbor.neighbor_name} ${neighbor.neighbor_lastname}`}</h1>
            </div>
          </div>
          <div className=" mt-5 w-screen h-fit bg-gradient-to-b from-[#852655] to-[#8f0e2a]">
            <div className=" md:mx-[70px] p-10">
              <h1 className=" text-center text-white">
                Selecciona los inmuebles relacionados al vecino
              </h1>
            </div>
          </div>
        </div>
      </div>
    </ContentComponent>
  );
}

export default NeighborPlaces;
