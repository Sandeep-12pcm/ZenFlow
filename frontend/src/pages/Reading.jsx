import { useState, useEffect } from "react";
import axios from "axios";
import { Sun, Moon, Upload, Trash2 } from "lucide-react";

const Reading = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [books, setBooks] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");

  // Fetch books from server
  useEffect(() => {
    axios.get("/api/books").then((res) => setBooks(res.data));
  }, []);

  // Upload book function
  const uploadBook = async (e) => {
    e.preventDefault();
    if (!selectedFile || !title) return alert("Please add a title and select a file");

    const formData = new FormData();
    formData.append("book", selectedFile);
    formData.append("title", title);

    axios.post("/api/upload", formData);

    setTitle("");
    setSelectedFile(null);
    window.location.reload(); // Refresh to show uploaded books
  };

  // Delete book function
  const deleteBook = async (id) => {
    await axios.delete(`/api/books/${id}`);
    setBooks(books.filter((book) => book._id !== id));
  };


  return (
    <div className={`p-6 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📖 Reading Mode</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>

      {/* Upload Book Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold">📂 Upload a Book (PDF)</h2>
        <form onSubmit={uploadBook} className="mt-3 space-y-3">
          <input
            type="text"
            placeholder="Enter book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="w-full p-2 border rounded-md"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Upload className="w-5 h-5" /> Upload
          </button>
        </form>
      </div>

      {/* Uploaded Books List */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">📚 Uploaded Books</h2>
        {books.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {books.map((book) => (
              <li key={book._id} className="flex justify-between p-2 bg-gray-200 dark:bg-gray-700 rounded-md">
                <a href={`/api/uploads/${book.filename}`} target="_blank" rel="noopener noreferrer">
                  {book.title}
                </a>

                <button onClick={() => deleteBook(book._id)} className="text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-3">No books uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Reading;
