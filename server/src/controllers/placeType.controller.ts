import { Request, Response } from "express";
import { PlaceType } from "../models/placeType.model";
import { Place } from "../models/place.model";

// ? Obtain all placeTypes
export const getPlaceTypes = async (req: Request, res: Response) => {
  try {
    const placeTypes = await PlaceType.findAll({
      include: [
        {
          model: Place,
        },
      ],
      order: [["placetype_id", "ASC"]],
    });
    res.json(placeTypes);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los tipos de inmueble"]);
  }
};

// ? Obtain a placeType
export const getPlaceType = async (req: Request, res: Response) => {
  const placeType = await PlaceType.findByPk(req.params.id, {
    include: [
      {
        model: Place,
      },
    ],
  });
  if (!placeType)
    return res.status(404).json(["Tipo de inmueble no encontrado"]);
  res.json({ placeType });
};

// ? Create a placeType
export const createPlaceType = async (req: Request, res: Response) => {
  const { placetype_id, placetype_name } = req.body;
  try {
    const placeTypeFound = await PlaceType.findOne({
      where: {
        placetype_name: placetype_name,
      },
    });
    if (placeTypeFound) {
      return res
        .status(400)
        .json(["Ya existe un tipo de inmueble con este id"]);
    }
    const newPlaceType = await PlaceType.create({
      placetype_name,
    });
    res.json(newPlaceType);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el tipo de inmueble"]);
  }
};

// ? Update a placeType
export const updatePlaceType = async (req: Request, res: Response) => {
  const { placetype_name } = req.body;
  try {
    const placeType = await PlaceType.findByPk(req.params.id);
    if (!placeType) {
      return res.status(404).json(["Tipo de inmueble no encontrado"]);
    }
    await placeType.update({ placetype_name });
    res.json({ placeType });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al actualizar el tipo de inmueble"]);
  }
};

// ? Delete a placeType
export const deletePlaceType = async (req: Request, res: Response) => {
  try {
    const placeType = await PlaceType.findByPk(req.params.id);
    if (!placeType) {
      return res.status(404).json(["Tipo de inmueble no encontrado"]);
    }
    await placeType.destroy();
    res.json({ placeType });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al eliminar el tipo de inmueble"]);
  }
};
