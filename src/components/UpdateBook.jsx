import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import "../styles/updatebook.css"

const UpdateBook = ({ book, onClose, onUpdate }) => {
  const [loader, setLoader] = useState(false)

  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    publishedYear: Number(book.publishedYear),
    available: book.available
  })

  const { token } = useAuth()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dataToUpdate = {
      ...formData,
      publishedYear: Number(formData.publishedYear)
    }

    try {
      setLoader(true)
      const response = await fetch(`https://backend-utn-4tf6.onrender.com/books/${book._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dataToUpdate)
      })

      if (!response.ok) {
        console.error("Error en el update:", await response.json())
      }

      onUpdate()
      onClose()
    } catch (error) {
      console.log("Error al actualizar el libro :(", error)
    } finally {
      setLoader(false)
    }
  }

  return (
    <section className="modal-overlay">
      <div className="modal-box">
        <h2>Editar libro</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título"
          />
          <input
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            placeholder="Autor"
          />
          <input
            name="genre"
            type="text"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Género"
          />
          <input
            name="publishedYear"
            type="number"
            value={formData.publishedYear}
            onChange={handleChange}
            placeholder="Año de publicación"
          />
          <label>
            Disponible:
            <input
              name="available"
              type="checkbox"
              checked={formData.available}
              onChange={handleChange}
            />
          </label>
          <button type="submit">
            {loader ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
        <button className="close-btn" type="button" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </section>
  )
}

export default UpdateBook
