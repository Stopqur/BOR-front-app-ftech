import { TypedUseSelectorHook, useSelector } from "react-redux";

import { mainState } from '../store/reducers/rootReducer'

export const UseSelectorType: TypedUseSelectorHook<mainState> = useSelector