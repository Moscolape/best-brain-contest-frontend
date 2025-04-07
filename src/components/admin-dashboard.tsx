import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className='font-Montserrat'>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin panel. Use the links on the left to manage questions or publish this week's quiz.</p>
      <div className="mt-6 space-x-4">
        <Link to="/admin/questions" className="px-4 py-2  bg-[#be9611] text-white rounded">Manage Questions</Link>
      </div>
    </div>
  );
}
