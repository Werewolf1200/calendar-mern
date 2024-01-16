import { useDispatch, useSelector } from 'react-redux';
import { onCloseModalDate, onOpenModalDate } from '../store/ui/uiSlice';

export const useUiStore = () => {

    const dispatch = useDispatch();
    
    const {
        isDateModalOpen
    } = useSelector(state => state.ui);

    const openDateModal = () => {
        dispatch( onOpenModalDate())
    }

    const closeDateModal = () => {
        dispatch(onCloseModalDate());
    }

    return {
        // Propiedades
        isDateModalOpen,

        // Métodos
        openDateModal,
        closeDateModal
    }
    
}
