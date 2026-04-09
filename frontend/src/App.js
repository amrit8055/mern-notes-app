import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(`http://localhost:5000/api/notes/${editingId}`, {
        title,
        content,
      });
      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/api/notes", {
        title,
        content,
      });
    }

    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📝 Notes App</h1>

      {/* Form */}
      <div className="card p-4 mb-4 shadow">
        <input
          className="form-control mb-3"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleSubmit}>
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* Notes */}
      <div className="row">
        {notes.map((note) => (
          <div className="col-md-4" key={note.id}>
            <div className="card p-3 mb-3 shadow-sm">
              <h5>{note.title}</h5>
              <p>{note.content}</p>

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => editNote(note)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;