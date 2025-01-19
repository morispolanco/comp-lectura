import { useState } from 'react';
import useStore from '../store';

const TUTOR_RESPUESTAS = {
  BIENVENIDA: {
    mensaje: "¡Hola! Soy tu tutor virtual de lectura. Puedo ayudarte con:",
    opciones: [
      "Explicar palabras difíciles",
      "Resumir el texto actual",
      "Dar consejos de comprensión lectora",
      "Responder preguntas sobre el texto"
    ]
  },
  CONSEJOS: [
    "Intenta visualizar lo que estás leyendo, como si fuera una película en tu mente.",
    "Subraya o anota las ideas principales mientras lees.",
    "Relaciona el texto con tus experiencias personales.",
    "Si encuentras palabras difíciles, trata de entender su significado por el contexto.",
    "Después de cada párrafo, trata de resumir mentalmente lo que has leído."
  ],
  VOCABULARIO: {
    "método científico": "Es un proceso sistemático para investigar y entender fenómenos, que incluye observación, hipótesis y experimentación.",
    "hipótesis": "Es una posible explicación o respuesta a una pregunta de investigación que puede ser probada.",
    "sistemática": "Que sigue un método o sistema ordenado y organizado.",
    "fenómeno": "Un hecho o evento que puede ser observado y estudiado.",
    "rigurosa": "Que se hace con mucho cuidado, exactitud y precisión.",
    "variables": "Factores o elementos que pueden cambiar o variar en un experimento."
  }
};

export default function Chat() {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([
    { rol: 'tutor', contenido: TUTOR_RESPUESTAS.BIENVENIDA.mensaje }
  ]);
  const [mostrarOpciones, setMostrarOpciones] = useState(true);

  const agregarMensaje = (nuevoMensaje) => {
    setMensajes(prev => [...prev, nuevoMensaje]);
  };

  const procesarPregunta = (pregunta) => {
    // Convertir a minúsculas para facilitar la búsqueda
    const preguntaLower = pregunta.toLowerCase();
    
    // Buscar palabras del vocabulario
    for (const [palabra, definicion] of Object.entries(TUTOR_RESPUESTAS.VOCABULARIO)) {
      if (preguntaLower.includes(palabra)) {
        return `"${palabra}": ${definicion}`;
      }
    }

    // Respuestas para diferentes tipos de preguntas
    if (preguntaLower.includes('consejo') || preguntaLower.includes('ayuda')) {
      const consejo = TUTOR_RESPUESTAS.CONSEJOS[
        Math.floor(Math.random() * TUTOR_RESPUESTAS.CONSEJOS.length)
      ];
      return consejo;
    }

    if (preguntaLower.includes('resumen')) {
      return "Para hacer un buen resumen, identifica la idea principal de cada párrafo y conéctalas de manera coherente. ¿Quieres que practiquemos con el texto actual?";
    }

    return "¿Podrías ser más específico con tu pregunta? Puedo ayudarte con vocabulario, comprensión del texto, o darte consejos de lectura.";
  };

  const handleOpcion = (opcion) => {
    agregarMensaje({ rol: 'usuario', contenido: opcion });
    
    let respuesta = '';
    switch (opcion) {
      case "Explicar palabras difíciles":
        respuesta = "¿Qué palabra te gustaría que te explique? Puedes preguntarme por cualquier palabra del texto.";
        break;
      case "Resumir el texto actual":
        respuesta = "¿Qué parte del texto te gustaría que te ayude a resumir? Podemos hacerlo párrafo por párrafo.";
        break;
      case "Dar consejos de comprensión lectora":
        respuesta = TUTOR_RESPUESTAS.CONSEJOS[
          Math.floor(Math.random() * TUTOR_RESPUESTAS.CONSEJOS.length)
        ];
        break;
      case "Responder preguntas sobre el texto":
        respuesta = "Adelante, ¿qué te gustaría saber sobre el texto que estás leyendo?";
        break;
    }
    
    setTimeout(() => {
      agregarMensaje({ rol: 'tutor', contenido: respuesta });
    }, 500);
    
    setMostrarOpciones(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;
    
    agregarMensaje({ rol: 'usuario', contenido: mensaje });
    const respuesta = procesarPregunta(mensaje);
    
    setTimeout(() => {
      agregarMensaje({ rol: 'tutor', contenido: respuesta });
    }, 500);
    
    setMensaje('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-4 h-[500px] overflow-y-auto">
        <div className="space-y-4">
          {mensajes.map((msg, i) => (
            <div key={i} className={`flex ${msg.rol === 'usuario' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                msg.rol === 'usuario' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100'
              }`}>
                {msg.contenido}
              </div>
            </div>
          ))}
          
          {mostrarOpciones && (
            <div className="grid grid-cols-1 gap-2 mt-4">
              {TUTOR_RESPUESTAS.BIENVENIDA.opciones.map((opcion, i) => (
                <button
                  key={i}
                  onClick={() => handleOpcion(opcion)}
                  className="text-left p-2 rounded border hover:bg-blue-50 transition-colors duration-200"
                >
                  {opcion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Haz una pregunta sobre el texto..."
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
