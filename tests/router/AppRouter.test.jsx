import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock('../../src/hooks/useAuthStore');

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

});