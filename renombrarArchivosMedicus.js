const fs = require('fs'); // Importa el módulo 'fs' para trabajar con el sistema de archivos.
const path = require('path'); // Importa el módulo 'path' para manejar rutas de archivos.

// Ruta del directorio local
const directorio = 'C:/Users/mcobos/Desktop/Medicus';

// Función para renombrar archivos en el directorio
function renombrarArchivos() {
    // Lee el contenido del directorio
    fs.readdir(directorio, (err, archivos) => {
        if (err) { // Si hay un error al leer el directorio, muestra un mensaje de error.
            console.error('Error al leer el directorio:', err);
            return;
        }

        archivos.forEach((archivo) => { // Itera sobre cada archivo encontrado en el directorio.
            const rutaArchivoAntiguo = path.join(directorio, archivo); // Obtiene la ruta completa del archivo antiguo.
            let nuevoNombre = archivo.toLowerCase(); // Convierte el nombre del archivo a minúsculas por defecto.

            // Verifica si el nombre del archivo es un archivo PDF y cumple con el formato esperado "sopfac-fac001..._26.pdf"
            if (archivo.endsWith('.pdf') && archivo.match(/^sopfac-fac001.*_26\.pdf$/)) {
                // Eliminar "sopfac-fac001" del principio y "_26.pdf" del final del nombre del archivo
                nuevoNombre = archivo.replace(/^sopfac-fac001/, '').replace(/_26\.pdf$/, '');
                // Agregar un guion medio después del cuarto carácter
                nuevoNombre = nuevoNombre.slice(0, 4) + '-' + nuevoNombre.slice(4);
                // Agregar la extensión .pdf al final
                nuevoNombre += '.pdf';
            }

            // Reemplaza espacios por guiones medios en el nombre del archivo
            nuevoNombre = nuevoNombre.replace(/\s+/g, '-');

            const rutaArchivoNuevo = path.join(directorio, nuevoNombre); // Obtiene la ruta completa del nuevo archivo.

            // Renombra el archivo antiguo con el nuevo nombre.
            fs.rename(rutaArchivoAntiguo, rutaArchivoNuevo, (err) => {
                if (err) { // Si hay un error al renombrar el archivo, muestra un mensaje de error.
                    console.error(`Error al renombrar ${archivo}:`, err);
                } else { // Si el archivo se renombró correctamente, muestra un mensaje de éxito.
                    console.log(`${archivo} renombrado a ${nuevoNombre}`);
                }
            });
        });
    });
}

// Llama a la función para renombrar archivos
renombrarArchivos();
