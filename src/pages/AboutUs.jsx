import Layout from "../components/Layout"


const AboutUs = () => {
  return (
    <Layout>
      <div className="page-banner">Sobre Nosotros</div>

      <section className="page-section">

        <h2>Nuestra Historia</h2>
        <p>
          Este proyecto nació con la idea de construir una plataforma moderna y fácil de usar,
          centrada en la gestión de datos y la conexión entre un frontend intuitivo y un backend
          sólido. A lo largo del desarrollo, fuimos incorporando buenas prácticas, seguridad y una
          estructura escalable capaz de crecer junto con las necesidades del sistema.
        </p>

        <h2>La Base de Datos</h2>
        <p>
          Nuestro sistema utiliza una base de datos NoSQL construida sobre MongoDB, diseñada para
          almacenar información de manera eficiente, flexible y segura. Cada registro se guarda como
          un documento independiente, lo que permite consultas rápidas y una estructura adaptable
          a futuros cambios o nuevas funcionalidades.
        </p>

        <h2>Backend</h2>
        <p>
          El backend está desarrollado con Node.js y Express, implementando rutas protegidas,
          validaciones y controladores responsables del manejo de usuarios y recursos.
          También incorpora middlewares personalizados, logs automáticos y un sistema de autenticación
          basado en tokens JWT para garantizar la seguridad de cada operación.
        </p>

        <h2>Misión</h2>
        <p>
          Brindar una plataforma confiable que permita gestionar información de manera clara,
          organizada y segura, utilizando herramientas modernas y estándares profesionales.
        </p>

        <h2>Visión</h2>
        <p>
          Convertirnos en un proyecto de referencia educativa y técnica, demostrando cómo integrar
          frontend, backend y base de datos en un sistema completo, escalable y orientado a buenas prácticas.
        </p>

      </section>
    </Layout>
  )
}

export default AboutUs
