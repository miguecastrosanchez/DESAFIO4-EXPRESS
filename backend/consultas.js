const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "dobby7",
  database: "likeme",
  allowExitOnIdle: true,
});


//probamos la conexion
// const probarConexion = async () => {
  
//     const resultado = await pool.query("SELECT NOW()");
//   console.log(resultado.rows);
// };

// probarConexion();

//funcion para consultar los POST
const obtenerPosts = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM posts ORDER BY id"
  );

  return rows;
};

//funcion para guardar un POST
const agregarPost = async (titulo, url, descripcion) => {
  
    const consulta = `
    
    INSERT INTO posts (titulo, img, descripcion, likes)
    VALUES ($1, $2, $3, $4)
    RETURNING *

  `;

  const valores = [titulo, url, descripcion, 0];

  const { rows } = await pool.query(consulta, valores);

  return rows[0];
};

module.exports = { obtenerPosts, agregarPost };