import { onCloseModalDate, onOpenModalDate, uiSlice } from "../../../src/store/ui/uiSlice";


describe('Pruebas en uiSlice', () => {
    
    test('Debe de regresar el Estado por Defecto', () => {

        expect(uiSlice.getInitialState()).toEqual({isDateModalOpen: false})
    });

    test('Depe de cambiar el isDateModalOpen correctamente', () => {
        
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onOpenModalDate());
        expect(state.isDateModalOpen).toBeTruthy();

        state = uiSlice.reducer(state, onCloseModalDate());
        expect(state.isDateModalOpen).toBeFalsy();

    });
    
});