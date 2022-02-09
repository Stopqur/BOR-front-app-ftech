import { TypedUseSelectorHook, useSelector } from "react-redux";

import { MainState } from '../store/reducers/rootReducer'

export const UseSelectorType: TypedUseSelectorHook<MainState> = useSelector