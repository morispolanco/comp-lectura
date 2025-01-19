import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Reading Tutor</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Chat</Link>
          <Link to="/reading" className="hover:text-blue-200">Reading</Link>
          <Link to="/progress" className="hover:text-blue-200">Progress</Link>
        </div>
      </div>
    </nav>
  );
}
