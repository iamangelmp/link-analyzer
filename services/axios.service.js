const axios = require("axios");

const getData = async (url) => {
  try {
    const response = await axios.get(url); // Reemplaza con la URL que deseas leer
    return response.data; // Envía el HTML como respuesta al cliente
  } catch (error) {
    console.error(error);
    return "Error al leer la URL"; // Manejo de error en caso de fallo en la solicitud
  }
};

module.exports = getData;
