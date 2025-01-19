// Función para generar preguntas de comprensión básica
const generarPreguntasComprension = (contenido, tipo) => {
  return [
    {
      pregunta: "¿Cuál es la idea principal del texto?",
      opciones: [
        "La importancia del tema tratado",
        "Los aspectos secundarios",
        "Detalles específicos",
        "Elementos contextuales"
      ],
      correcta: 0,
      explicacion: "La idea principal se centra en la importancia del tema tratado en el texto."
    },
    {
      pregunta: "¿Qué conclusión se puede extraer del texto?",
      opciones: [
        "La relevancia actual del tema",
        "Aspectos históricos",
        "Detalles técnicos",
        "Elementos descriptivos"
      ],
      correcta: 0,
      explicacion: "La conclusión principal destaca la relevancia actual del tema discutido."
    },
    {
      pregunta: "¿Qué evidencia apoya la idea principal?",
      opciones: [
        "Los datos presentados",
        "Las opiniones personales",
        "Las referencias históricas",
        "Los ejemplos específicos"
      ],
      correcta: 0,
      explicacion: "Los datos presentados en el texto apoyan directamente la idea principal."
    }
  ];
};

const materiales = {
  principiante: [
    {
      titulo: "El Viaje a Casa",
      contenido: `María caminaba lentamente por la calle vacía, observando cómo las hojas otoñales danzaban con el viento. El cielo estaba teñido de naranja y púrpura mientras el sol se ponía en el horizonte. Había sido un largo día en la escuela, y aunque estaba cansada, disfrutaba de este momento tranquilo.

De repente, un pequeño gato negro apareció frente a ella. El felino la miró con curiosidad, maulló suavemente y comenzó a seguirla. María se detuvo y se agachó para acariciarlo. El gato ronroneó contento, y ella notó que no tenía collar. Después de pensarlo un momento, decidió llevarlo consigo. "Te llamaré Luna", susurró mientras lo levantaba con cuidado.

Cuando finalmente llegó a casa, su madre se sorprendió al verla con el gato, pero al escuchar la historia, sonrió comprensivamente. Esa noche, Luna encontró un nuevo hogar, y María descubrió que a veces los mejores encuentros suceden cuando menos los esperamos.`,
      preguntas: {
        comprension: [
          {
            pregunta: "¿En qué momento del día transcurre la historia?",
            opciones: ["Al amanecer", "Al atardecer", "Al mediodía", "En la noche"],
            correcta: 1,
            explicacion: "La historia transcurre al atardecer, como se evidencia en la descripción del cielo 'teñido de naranja y púrpura mientras el sol se ponía en el horizonte'."
          },
          {
            pregunta: "¿Qué encontró María en su camino?",
            opciones: ["Un perro", "Un gato negro", "Un pájaro", "Una ardilla"],
            correcta: 1,
            explicacion: "María encontró un gato negro que apareció frente a ella y comenzó a seguirla."
          },
          {
            pregunta: "¿Cómo reaccionó la madre de María?",
            opciones: [
              "Con enojo",
              "Con sorpresa y comprensión",
              "Con indiferencia",
              "Con miedo"
            ],
            correcta: 1,
            explicacion: "La madre de María reaccionó inicialmente con sorpresa, pero después de escuchar la historia, mostró comprensión."
          }
        ],
        vocabulario: [
          {
            pregunta: "¿Qué significa 'ronronear'?",
            opciones: [
              "Sonido que hace el gato cuando está contento",
              "Sonido de enojo",
              "Sonido de miedo",
              "Sonido de hambre"
            ],
            correcta: 0,
            explicacion: "Ronronear es el sonido característico que hacen los gatos cuando están contentos o relajados."
          }
        ],
        pensamiento_critico: [
          {
            pregunta: "¿Por qué crees que María decidió llevar el gato a casa?",
            opciones: [
              "Por compasión y responsabilidad",
              "Por impulso momentáneo",
              "Por presión social",
              "Por aburrimiento"
            ],
            correcta: 0,
            explicacion: "La decisión de María muestra compasión y responsabilidad hacia un animal sin hogar.",
            requiereJustificacion: true
          }
        ]
      }
    }
  ],
  intermedio: [
    {
      titulo: "El Método Científico",
      contenido: `El método científico es una forma sistemática y rigurosa de investigar fenómenos naturales y sociales. Este proceso, desarrollado a lo largo de siglos de investigación, permite a los científicos obtener conocimientos confiables y verificables sobre el mundo que nos rodea.

El proceso comienza con la observación de un fenómeno que despierta nuestra curiosidad. Por ejemplo, un científico podría notar que las plantas crecen de manera diferente bajo distintos tipos de luz. A partir de esta observación, se formula una pregunta específica: "¿Cómo afecta el color de la luz al crecimiento de las plantas?"

El siguiente paso es desarrollar una hipótesis, que es una posible explicación o respuesta a nuestra pregunta. En este caso, podríamos proponer que "las plantas crecen mejor bajo luz azul que bajo luz roja". Esta hipótesis debe ser comprobable mediante experimentos.`,
      preguntas: {
        comprension: [
          {
            pregunta: "¿Cuál es el primer paso del método científico?",
            opciones: [
              "Formular hipótesis",
              "Realizar experimentos",
              "La observación",
              "Analizar datos"
            ],
            correcta: 2,
            explicacion: "Según el texto, el método científico comienza con la observación de un fenómeno que despierta nuestra curiosidad."
          }
        ],
        vocabulario: [
          {
            pregunta: "¿Qué significa 'hipótesis'?",
            opciones: [
              "Una posible explicación que debe ser verificada",
              "Un resultado experimental",
              "Una conclusión final",
              "Una observación inicial"
            ],
            correcta: 0,
            explicacion: "Una hipótesis es una posible explicación o respuesta que debe ser verificada mediante experimentos."
          }
        ],
        pensamiento_critico: [
          {
            pregunta: "¿Por qué es importante que una hipótesis sea comprobable?",
            opciones: [
              "Para poder verificar si es correcta mediante experimentos",
              "Para hacerla más compleja",
              "Para publicarla inmediatamente",
              "Para evitar experimentos"
            ],
            correcta: 0,
            explicacion: "Una hipótesis debe ser comprobable para poder verificar su validez mediante experimentos científicos.",
            requiereJustificacion: true
          }
        ]
      }
    }
  ]
};

export { materiales };
