import { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import UpdateBook from "../components/UpdateBook"
import ToastMessage from "../components/ToastMessage"
import genre from "../constants/genre"

const Home = () => {
  const initialErrorState = {
    success: null,
    notification: null,
    error: {
      fetch: null,
      delete: null
    }
  }

  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [filters, setFilters] = useState({
    title: "",
    genre: "",
    minYear: 0,
    maxYear: 0,
    author: ""
  })

  const [responseServer, setResponseServer] = useState(initialErrorState)
  const { user, token } = useAuth()

  const fetchingBooks = async (query = "") => {
    setResponseServer(initialErrorState)
    try {
      const response = await fetch(`https://backend-utn-4tf6.onrender.com/books?${query}`, {
        method: "GET"
      })
      const dataBooks = await response.json()
      setBooks(dataBooks.data.reverse())
      setResponseServer({
        success: true,
        notification: "Carga de libros exitosa",
        error: { ...responseServer.error, fetch: true }
      })
    } catch (e) {
      setResponseServer({
        success: false,
        notification: "Error al traer los datos",
        error: { ...responseServer.error, fetch: false }
      })
    }
  }

  useEffect(() => {
    fetchingBooks()
  }, [])

  const deleteBook = async (idBook) => {
    if (!confirm("¿Está seguro de que quieres borrar el libro?")) return
    try {
      const response = await fetch(`https://backend-utn-4tf6.onrender.com/books/${idBook}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      })
      const dataResponse = await response.json()
      if (dataResponse.error) {
        alert(dataResponse.error)
        return
      }
      setBooks(books.filter((b) => b._id !== idBook))
      alert(`${dataResponse.data.title} borrado con éxito.`)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateBook = (b) => setSelectedBook(b)

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = new URLSearchParams()
    if (filters.title) query.append("title", filters.title)
    if (filters.genre) query.append("genre", filters.genre)
    if (filters.minYear) query.append("minYear", filters.minYear)
    if (filters.maxYear) query.append("maxYear", filters.maxYear)
    if (filters.author) query.append("author", filters.author)
    fetchingBooks(query.toString())
  }

  const handleResetFilters = () => {
    setFilters({ title: "", genre: "", minYear: 0, maxYear: 0, author: "" })
  }

  return (
    <Layout>
      <div className="page-banner">El rincón de los libros</div>
      <section className="page-section">
        <p>Bienvenido a nuestra librería. Aquí encontrarás una amplia variedad de libros.</p>
      </section>

      <section>
        <form className="filters-form" onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Buscar por título" onChange={handleChange} value={filters.title} />
          <input type="text" name="author" placeholder="Buscar por autor" onChange={handleChange} value={filters.author} />
          <select name="genre" onChange={handleChange} value={filters.genre}>
            <option defaultValue>Todos los géneros</option>
            {genre.map((genre) => (
              <option key={genre.id} value={genre.value}>{genre.content}</option>
            ))}
          </select>
          <input type="number" name="minYear" placeholder="Año mínimo" onChange={handleChange} value={filters.minYear} />
          <input type="number" name="maxYear" placeholder="Año máximo" onChange={handleChange} value={filters.maxYear} />
          <button type="submit">Aplicar filtros</button>
          <button type="button" onClick={handleResetFilters}>Cancelar</button>
        </form>
      </section>

      {selectedBook && (
        <UpdateBook book={selectedBook} onClose={() => setSelectedBook(null)} onUpdate={fetchingBooks} />
      )}

      <section className="books-grid">
        {books.map((b, i) => (
          <div key={i} className="books-card">
            <h3>{b.title}</h3>
            <p>{b.genre}</p>
            <p><strong>Autor:</strong> {b.author}</p>
            <p>{b.publishedYear}</p>
            {user && (
              <div className="cont-btn">
                <button onClick={() => handleUpdateBook(b)}>Actualizar</button>
                <button onClick={() => deleteBook(b._id)}>Borrar</button>
              </div>
            )}
          </div>
        ))}
      </section>

      {!responseServer.error.fetch && <ToastMessage color="red" msg={responseServer.notification} />}
      {responseServer.success && <ToastMessage color="green" msg={responseServer.notification} />}
    </Layout>
  )
}

export default Home
