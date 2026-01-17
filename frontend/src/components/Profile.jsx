import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div className="container mx-auto p-4">Please login</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Username</label>
            <p className="text-gray-800 bg-gray-100 p-2 rounded">{user.username}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <p className="text-gray-800 bg-gray-100 p-2 rounded">{user.email}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Address</label>
            <p className="text-gray-800 bg-gray-100 p-2 rounded">{user.address}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Role</label>
            <p className="text-gray-800 bg-gray-100 p-2 rounded">{user.role || 'User'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;