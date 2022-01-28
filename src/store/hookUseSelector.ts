import { TypedUseSelectorHook, useSelector } from "react-redux";

import { mainState } from './reducers/mainReducer'

export const typeUseSelector: TypedUseSelectorHook<mainState> = useSelector