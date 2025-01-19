import { useState } from 'react';
import useStore from '../store';
import { materiales } from '../data/lecturas';

export default function MaterialLectura() {
  const [seccionActual, setSeccionActual] = useState('comprension');
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [justificacion, setJustificacion] = useState('');
  const [lecturaCompletada, setLecturaCompletada] = useState(false);
  
  const nivelLectura = useStore((state) => state.nivelLectura);
  const lecturaActual = useStore((state) => state.lecturaActual);
  const setLecturaActual = useStore((state) => state.setLecturaActual);
  const actualizarProgreso = useStore((state) => state.actualizarProgreso);

  const materialesNivel = materiales[nivelLectura] || [];
  const lecturaActualData = materialesNivel[lecturaActual] || materialesNivel[0];

  if (!lecturaActualData) {
    return <div>No hay lecturas disponibles</div>;
  }

  const preguntasActuales = lecturaActualData.preguntas[seccionActual];
  const preguntaActualData = preguntasActuales[preguntaActual];

  const handleRespuesta = (index) => {
    if (preguntaActualData.requiereJustificacion && !justificacion) {
      alert("Por favor, justifica tu respuesta");
      return;
    }

    const esCorrecta = preguntaActualData.correcta === index;
    const nuevaRespuesta = {
      seccion: seccionActual,
      pregunta: preguntaActualData.pregunta,
      respuestaUsuario: preguntaActualData.opciones[index],
      correcta: esCorrecta,
      explicacion: preguntaActualData.explicacion,
      justificacion: justificacion
    };

    setRespuestas([...respuestas, nuevaRespuesta]);
    setMostrarFeedback(true);

    actualizarProgreso({
      [seccionActual]: calcularProgresoSeccion(seccionActual, esCorrecta)
    });

    setTimeout(() => {
      setMostrarFeedback(false);
      setJustificacion('');
      
      if (preguntaActual < preguntasActuales.length - 1) {
        setPreguntaActual(preguntaActual + 1);
      } else if (seccionActual === 'comprension') {
        setSeccionActual('vocabulario');
        setPreguntaActual(0);
      } else if (seccionActual === 'vocabulario') {
        setSeccionActual('pensamiento_critico');
        setPreguntaActual(0);
      } else {
        setLecturaCompletada(true);
      }
    }, 2000);
  };

  const calcularProgresoSeccion = (seccion, esCorrecta) => {
    const respuestasSeccion = respuestas.filter(r => r.seccion === seccion);
    const correctasSeccion = respuestasSeccion.filter(r => r.correcta).length + (esCorrecta ? 1 : 0);
    const totalPreguntas = lecturaActualData.preguntas[seccion].length;
    return Math.round((correctasSeccion / totalPreguntas) * 100);
  };

  if (lecturaCompletada) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">¡Lectura Completada!</h2>
          
          <div className="mb-6">
            <div className="text-xl mb-4">
              Resultados por sección:
            </div>
            {Object.keys(lecturaActualData.preguntas).map(seccion => (
              <div key={seccion} className="mb-2">
                <div className="font-bold">
                  {seccion.charAt(0).toUpperCase() + seccion.slice(1).replace('_', ' ')}:
                  <span className="ml-2 text-blue-600">
                    {calcularProgresoSeccion(seccion, false)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Repaso de respuestas:</h3>
            {respuestas.map((respuesta, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                respuesta.correcta ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <p className="font-bold mb-2">{respuesta.pregunta}</p>
                <p className="mb-2">Tu respuesta: {respuesta.respuestaUsuario}</p>
                {respuesta.justificacion && (
                  <p className="mb-2 text-gray-600">
                    Tu justificación: {respuesta.justificacion}
                  </p>
                )}
                <p className="text-sm">{respuesta.explicacion}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => {
              const nuevaLectura = (lecturaActual + 1) % materialesNivel.length;
              setLecturaActual(nuevaLectura);
              setPreguntaActual(0);
              setRespuestas([]);
              setMostrarFeedback(false);
              setLecturaCompletada(false);
              setSeccionActual('comprension');
            }}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Siguiente lectura
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{lecturaActualData.titulo}</h2>
          <div className="flex space-x-4">
            {['comprension', 'vocabulario', 'pensamiento_critico'].map((seccion) => (
              <span
                key={seccion}
                className={`px-3 py-1 rounded ${
                  seccionActual === seccion 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200'
                }`}
              >
                {seccion.replace('_', ' ').charAt(0).toUpperCase() + seccion.slice(1)}
              </span>
            ))}
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          {lecturaActualData.contenido.split('\n\n').map((parrafo, i) => (
            <p key={i} className="mb-4">{parrafo}</p>
          ))}
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-4">
            {seccionActual.charAt(0).toUpperCase() + seccionActual.slice(1).replace('_', ' ')} - 
            Pregunta {preguntaActual + 1} de {preguntasActuales.length}
          </h3>
          
          <p className="mb-4 text-lg">{preguntaActualData.pregunta}</p>
          
          {preguntaActualData.requiereJustificacion && (
            <textarea
              value={justificacion}
              onChange={(e) => setJustificacion(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Justifica tu respuesta..."
              rows="3"
            />
          )}

          <div className="space-y-3">
            {preguntaActualData.opciones.map((opcion, i) => (
              <button
                key={i}
                onClick={() => handleRespuesta(i)}
                className="w-full text-left p-3 rounded border hover:bg-blue-100 transition-colors duration-200"
                disabled={mostrarFeedback}
              >
                {opcion}
              </button>
            ))}
          </div>
          
          {mostrarFeedback && (
            <div className={`mt-4 p-4 rounded ${
              respuestas[respuestas.length - 1].correcta 
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              <p className="font-bold">
                {respuestas[respuestas.length - 1].correcta 
                  ? '¡Correcto!' 
                  : 'Incorrecto'}
              </p>
              <p>{preguntaActualData.explicacion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
