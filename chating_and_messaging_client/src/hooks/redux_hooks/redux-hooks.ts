import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { RootState,AppDispatch  } from '../../app_state_area/redux/configurer_store/configurer-store'
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
//export const useAppDispatch: () =>useDispatch<AppDispatch>(); 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
