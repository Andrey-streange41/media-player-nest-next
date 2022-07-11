import {useSelector, TypedUseSelectorHook} from 'react-redux';
import { RootState } from '../store/reducers/index';

// Делаем типизированый хук useSelector
export const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;

 