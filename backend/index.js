
const express = require("express");
const cors = require("cors");

//estamos usando, importando, las funcioes que creamos en consultas.js
const {
  obtenerPosts,
  agregarPost,
  agregarLike,
  eliminarPost,
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

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const postActualizado = await agregarLike(id);

    if (!postActualizado) {
      return res.status(404).json({
        mensaje: "Post no encontrado",
      });
    }

    res.json(postActualizado);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al agregar el like",
    });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const postEliminado = await eliminarPost(id);

    if (!postEliminado) {
      return res.status(404).json({
        mensaje: "Post no encontrado",
      });
    }

    res.json({
      mensaje: "Post eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar el post",
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor encendido en el puerto 3000");
});