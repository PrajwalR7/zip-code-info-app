import { Action } from "redux"

export interface ActionType<T> extends Action<string> {
    type: string,
    payload: T
}