import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { CalendarPage } from "../../src/calendar/pages/CalendarPage";
import { MemoryRouter } from "react-router-dom";

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/calendar/pages/CalendarPage', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))

describe('Pruebas en AppRouter', () => {

    const mockCheckAuthToken = jest.fn();

    test('Debe de mostrar la pantalla de carga y llamar checkAuthStore', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render(<AppRouter />);

        expect(screen.getByText('Cargando...')).toBeTruthy();
        expect(mockCheckAuthToken).toHaveBeenCalled();

    });

    test('Debe de mostrar el login en caso de no estar autenticado', () => {

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.getByText('Ingreso')).toBeTruthy();
        expect(container).toMatchSnapshot();

    });

    test('Debe de mostrar el Calendario si estamos autenticados', () => {

        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.getByText('CalendarPage')).toBeTruthy();
        

    });

});