import { createAction } from "typesafe-actions";
import { SET_ACCESS } from "./interface";

export const setAccess = createAction(SET_ACCESS)<any>();

export type AccessTypeAction =
    | ReturnType<typeof setAccess>;