
const express = require("express");
const cors = require("cors");

//estamos usando, importando, las funcioes que creamos en consultas.js
const {
  obtenerPosts,
  agregarPost,
} = require("./consultas");

const app = express();

app.use(cors()); //react se comunica con express
app.use(express.json());



app.get("/posts", async (req, res) => {
  
    const posts = await obtenerPosts();

  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body;

  const nuevoPost = await agregarPost(
    titulo,
    url,
    descripcion
  );

  res.json(nuevoPost);
});

app.listen(3000, () => {
  console.log("Servidor encendido en el puerto 3000");
});