import { Request, Response } from "express";
import { Place } from "../models/place.model";
import { NeighborPlace } from "../models/neighborPlace.model";
import { Neighbor } from "../models/neighbor.model";
import { Payment } from "../models/payment.model";
import { Month } from "../models/month.model";

// ? Obtain all places
export const getPlaces = async (req: Request, res: Response) => {
  try {
    const places = await Place.findAll();
    res.json(places);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los lugares"]);
  }
};

// ? Obtain a place
export const getPlace = async (req: Request, res: Response) => {
  const place = await Place.findByPk(req.params.id);
  if (!place) return res.status(404).json(["Lugar no encontrado"]);
  res.json({ place });
};

// ? Create a place
export const createPlace = async (req: Request, res: Response) => {
  const { pending_value, placeType_id } = req.body;
  try {
    const newPlace = await Place.create({
      pending_value: pending_value ?? 0,
      placeType_id,
    });
    res.json(newPlace);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el lugar"]);
  }
};

// ? Update a place
export const updatePlace = async (req: Request, res: Response) => {
  const { place_name, pending_value, placeType_id } = req.body;
  const place = await Place.findByPk(req.params.id);
  if (place) {
    await place.update({
      place_name,
      pending_value,
      placeType_id,
    });
  } else {
    return res.status(404).json(["Lugar no encontrado"]);
  }
  res.json({ place });
};

// ? Delete a place
export const deletePlace = async (req: Request, res: Response) => {
  const place = await Place.findByPk(req.params.id);
  if (place) {
    await place.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json(["Lugar no encontrado"]);
  }
};
