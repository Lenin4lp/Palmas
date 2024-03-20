import React from "react";
import { useLoaderData, useParams, useNavigation } from "react-router-dom";
import ContentComponent from "../../components/ContentComponent";

function NeighborInfo() {
  const { id } = useParams();
  const neighbordata = useLoaderData();
  const neighbor = neighbordata.data;
  const navigation = useNavigation();

  console.log(neighbor);

  if (navigation.state === "loading") {
    return <div>Cargando</div>;
  }
  return (
    <ContentComponent>
      <div className=" m-5 block"></div>
    </ContentComponent>
  );
}

export default NeighborInfo;
