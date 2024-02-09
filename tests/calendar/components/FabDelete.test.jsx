import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { store } from '../../../src/store';
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock('../../../src/hooks/useCalendarStore');


describe('Pruebas en <FabDelete />', () => {

    const mockStartDeletingEvent = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('Debe de motrar el componente correctamente', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        })

        render(
                <FabDelete />
        );

        const btn = screen.getByLabelText('btn-delete');

        expect(btn.classList).toContain('btn');
        expect(btn.classList).toContain('btn-danger');
        expect(btn.classList).toContain('fab-danger');
        expect(btn.style.display).toBe('none');
    });

    test('Debe de motrar el botón si hay un evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        })

        render(
                <FabDelete />
        );

        const btn = screen.getByLabelText('btn-delete');

        expect(btn.style.display).toBe('');

    });

    test('Debe de lamar startDeleteEvent si hay un evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeleteEvent: mockStartDeletingEvent
        })

        render(
                <FabDelete />
        );

        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click(btn);

        expect(mockStartDeletingEvent).toHaveBeenCalled();
    });


});