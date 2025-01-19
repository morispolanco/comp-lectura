import useStore from '../store';

export default function Progreso() {
  const progreso = useStore((state) => state.progreso);

  const nombreHabilidad = {
    comprension: 'Comprensión',
    vocabulario: 'Vocabulario',
    pensamiento_critico: 'Pensamiento Crítico'
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Tu Progreso</h2>
      <div className="space-y-4">
        {Object.entries(progreso).map(([habilidad, valor]) => (
          <div key={habilidad} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between mb-2">
              <span>{nombreHabilidad[habilidad]}</span>
              <span>{valor}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${valor}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
