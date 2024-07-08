import { Request, Response } from "express";
import { AccountState } from "../models/accounState.model";

//? Obtain all account states
export const getAccountStates = async (req: Request, res: Response) => {
  try {
    const accounStates = await AccountState.findAll({
      order: [["accountState_id", "ASC"]],
    });
    res.json(accounStates);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los estados de cuenta"]);
  }
};

//? Obtain an account state
export const getAccountState = async (req: Request, res: Response) => {
  const accountState = await AccountState.findByPk(req.params.id);
  if (!accountState)
    return res.status(404).json(["Estado de cuenta no encontrado"]);
  res.json({ accountState });
};
