import useStore from '../store';

export default function Progress() {
  const progress = useStore((state) => state.progress);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
      <div className="space-y-4">
        {Object.entries(progress).map(([skill, value]) => (
          <div key={skill} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between mb-2">
              <span className="capitalize">{skill.replace('_', ' ')}</span>
              <span>{value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
