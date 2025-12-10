import { useState } from "react"
import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    available: true
  })

  const navigate = useNavigate()
  const { token } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:1000/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        alert(`❌ Error: ${data.error}`)
        return
      }

      alert("✅ Libro agregado correctamente")

      setFormData({
        title: "",
        author: "",
        genre: "",
        available: true
      })

      navigate("/")
    } catch (error) {
      console.log("Error al cargar el libro", error)
      alert("❌ Error inesperado")
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    })
  }

  return (
    <Layout>
      <div className="page-banner">Agregar Nuevo Libro</div>

      <section className="page-section">
        <form className="form-container" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Título"
            name="title"
            minLength={2}
            maxLength={100}
            onChange={handleChange}
            value={formData.title}
            required
          />

          <input
            type="text"
            placeholder="Autor"
            name="author"
            minLength={2}
            maxLength={100}
            onChange={handleChange}
            value={formData.author}
            required
          />

          <input
            type="text"
            placeholder="Género"
            name="genre"
            minLength={2}
            maxLength={50}
            onChange={handleChange}
            value={formData.genre}
            required
          />

          <label style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            Disponible
          </label>

          <button type="submit">Agregar Libro</button>
        </form>
      </section>
    </Layout>
  )
}

export default AddBook

