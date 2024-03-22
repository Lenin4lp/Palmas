import React from "react";
import ContentComponent from "../../components/ContentComponent";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

function Houses() {
  const placesData = useLoaderData();
  const places = placesData.data;
  const navigation = useNavigation();
  console.log(places);
  return (
    <ContentComponent>
      <div className=" flex justify-center items-center">
        <div className=" block"></div>
      </div>
    </ContentComponent>
  );
}

export default Houses;
