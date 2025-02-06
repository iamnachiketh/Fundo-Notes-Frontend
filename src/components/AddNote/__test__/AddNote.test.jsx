import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddNote from "../AddNote";
import { vi } from "vitest";

var baseUrl = "http://localhost:4000/api/v1/";

// Mock dependencies
vi.mock(`${baseUrl}notes`, () => ({
    addNote: vi.fn(() =>
        Promise.resolve({
            data: {
                message: "Note added successfully",
                data: {
                    noteId: "NOTE1234",
                    userEmail: "rachel.green@example.com",
                    title: "Test Note",
                    desc: "This is a test note"
                }
            }
        })
    )
}));

vi.mock(`${baseUrl}/notes/NOTES1234`, () => ({
    updateNotes: vi.fn(() =>
        Promise.resolve({
            data: { status: 200, message: "Note updated successfully" }
        })
    )
}));


const localStorageMock = (() => {
    let store = { userEmail: "rachel.green@example.com", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhY2hlbC5ncmVlbkBleGFtcGxlLmNvbSIsImlhdCI6MTczODgyOTQ3NSwiZXhwIjoxNzM5MDg4Njc1fQ.OABo0Z-JzyiKHXN87MHQFFK3Y3CDEkCxrlMwhPsl0Pw" };
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => (store[key] = value),
        clear: () => (store = {})
    };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("AddNote Component", () => {
    test("renders the component with 'Take a note...' placeholder", () => {
        render(<AddNote handleUpdateList={vi.fn()} setOpenModal={vi.fn()} />);
        expect(screen.getByText("Take a note...")).toBeInTheDocument();
    });

    test("opens input fields when clicked", () => {
        render(<AddNote handleUpdateList={vi.fn()} setOpenModal={vi.fn()} />);
        fireEvent.click(screen.getByText("Take a note..."));
        expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Take a note...")).toBeInTheDocument();
    });

    test("updates input fields on change", () => {
        render(<AddNote handleUpdateList={vi.fn()} setOpenModal={vi.fn()} />);
        fireEvent.click(screen.getByText("Take a note..."));

        const titleInput = screen.getByPlaceholderText("Title");
        const descInput = screen.getByPlaceholderText("Take a note...");

        fireEvent.change(titleInput, { target: { value: "New Note Title" } });
        fireEvent.change(descInput, { target: { value: "New Note Description" } });

        expect(titleInput.value).toBe("New Note Title");
        expect(descInput.value).toBe("New Note Description");
    });

    test("shows error when trying to add an empty note", async () => {
        render(<AddNote handleUpdateList={vi.fn()} setOpenModal={vi.fn()} />);
        fireEvent.click(screen.getByText("Take a note..."));
        fireEvent.click(screen.getByText("close"));

        await waitFor(() => expect(screen.getByText("Please enter title and description")).toBeInTheDocument());
    });

    test("sends add note request with token", async () => {
        const mockUpdateList = vi.fn();
        render(<AddNote handleUpdateList={mockUpdateList} setOpenModal={vi.fn()} />);

        fireEvent.click(screen.getByText("Take a note..."));
        fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "Test Note" } });
        fireEvent.change(screen.getByPlaceholderText("Take a note..."), { target: { value: "This is a test note" } });
        fireEvent.click(screen.getByText("close"));

        await waitFor(() => expect(screen.getByText("Note added successfully")).toBeInTheDocument());
        expect(mockUpdateList).toHaveBeenCalledWith("addNote", expect.objectContaining({ title: "Test Note" }));
    });

    test("handles edit mode correctly", async () => {
        const mockUpdateList = vi.fn();
        render(
            <AddNote
                handleUpdateList={mockUpdateList}
                setOpenModal={vi.fn()}
                editMode={true}
                noteDetails={{ noteId: "NOTE1234", title: "Old Title", desc: "Old Desc" }}
            />
        );

        expect(screen.getByPlaceholderText("Title").value).toBe("Old Title");
        expect(screen.getByPlaceholderText("Take a note...").value).toBe("Old Desc");

        fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "Updated Title" } });
        fireEvent.click(screen.getByText("close"));

        await waitFor(() => expect(screen.getByText("Note has been edited")).toBeInTheDocument());
        expect(mockUpdateList).toHaveBeenCalledWith("edit", expect.objectContaining({ title: "Updated Title" }));
    });
});
