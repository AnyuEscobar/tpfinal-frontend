import { useState } from "react";
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const responseData = await response.json()

      if (!responseData.success) {
        alert(responseData.error)
      }

      alert(`✅ Usuario creado con éxito: ${responseData.data._id}`)
      navigate("/login")
    } catch (error) {
      console.log("Error al registrar el usuario", error)
    }
  }

  return (
    <>
      <div className="div-register">
        <form onSubmit={handleSubmit}>
          <h3> Crear una cuenta</h3>
          <input type="email" placeholder="Email" required name="email" onChange={handleChange} />
          <input type="password" name="password" required placeholder="Contraseña" onChange={handleChange} />
          <button type="submit"> Registrarse </button>
        </form>
      </div>

    </>
  )
}

export default Register