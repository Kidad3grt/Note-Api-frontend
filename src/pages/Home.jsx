import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"


function Home() {

    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const res = await api.get("notes/");
            setNotes(res.data);
        } catch (err) {
            alert("Failed to load notes");
        }
    };

    const deleteNote = async (id) => {
        try {
            const res = await api.delete(`notes/delete/${id}/`);

            if (res.status === 204) {
                alert("Note deleted!");
                getNotes();
            }

        } catch (err) {
            alert("Error deleting note");
        }
    };

    const createNote = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("notes/", { title, content });

            if (res.status === 201) {
                alert("Note created!");
                setTitle("");
                setContent("");
                getNotes();
            }

        } catch (err) {
            alert("Error creating note");
        }
    };

    return (
        <div>

            <div>
                <h2>Notes</h2>

                {notes.map((note) => (
                    <Note
                        note={note}
                        onDelete={deleteNote}
                        key={note.id}
                    />
                ))}

            </div>

            <h2>Create a Note</h2>

            <form onSubmit={createNote}>

                <label htmlFor="title">Title:</label>
                <br />

                <input
                    type="text"
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="content">Content:</label>
                <br />

                <textarea
                    id="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <br />

                <input type="submit" value="Submit" />

            </form>

        </div>
    );
}

export default Home;