import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from '../SideBar';
import { useNavigate } from 'react-router-dom';
import { vi } from "vitest";

vi.mock('react-router-dom', async () => {
    const actual = await import('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('SideBar Component', () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = vi.fn();
        useNavigate.mockImplementation(() => mockNavigate);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('renders SideBar component correctly', () => {
        render(
            <Router>
                <SideBar />
            </Router>
        );

        expect(screen.getByTestId('lightbulb-icon')).toBeInTheDocument();
        expect(screen.getByTestId('notifications-icon')).toBeInTheDocument();
        expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
        expect(screen.getByTestId('archive-icon')).toBeInTheDocument();
        expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
    });

    test('navigates to /home/notes when LightbulbOutlinedIcon is clicked', () => {
        render(
            <Router>
                <SideBar />
            </Router>
        );

        const lightbulbIcon = screen.getByTestId('lightbulb-icon');
        fireEvent.click(lightbulbIcon);

        expect(mockNavigate).toHaveBeenCalledWith('/home/notes');
    });

    test('navigates to /home/archive when ArchiveOutlinedIcon is clicked', () => {
        render(
            <Router>
                <SideBar />
            </Router>
        );

        const archiveIcon = screen.getByTestId('archive-icon');
        fireEvent.click(archiveIcon);

        expect(mockNavigate).toHaveBeenCalledWith('/home/archive');
    });

    test('navigates to /home/trash when DeleteOutlineOutlinedIcon is clicked', () => {
        render(
            <Router>
                <SideBar />
            </Router>
        );

        const deleteIcon = screen.getByTestId('delete-icon');
        fireEvent.click(deleteIcon);

        expect(mockNavigate).toHaveBeenCalledWith('/home/trash');
    });
});