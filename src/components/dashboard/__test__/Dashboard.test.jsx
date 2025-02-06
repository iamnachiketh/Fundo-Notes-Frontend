import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { UpdateQueryContext } from '../../Search/Search';
import { vi } from "vitest";

const mockUpdateQuery = vi.fn();

const renderDashboard = () => {
    return render(
        <UpdateQueryContext.Provider value={mockUpdateQuery}>
            <Dashboard />
        </UpdateQueryContext.Provider>
    );
};

describe('Dashboard Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders Dashboard component correctly', () => {

        renderDashboard();
        expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
        const logo = screen.getByAltText('fundo-image');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', 'https://img.icons8.com/color/512/google-keep.png');
        expect(screen.getByText('Keep')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
        expect(screen.getByTestId('search-icon')).toBeInTheDocument();

    });

    test('updates search query on input change', () => {
        renderDashboard();

        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'test query' } });
        expect(searchInput).toHaveValue('test query'); 
        expect(mockUpdateQuery).toHaveBeenCalledWith('test query');

    });

    test('search input is empty initially', () => {
        renderDashboard();
        const searchInput = screen.getByPlaceholderText('Search');
        expect(searchInput).toHaveValue('');
    });
});