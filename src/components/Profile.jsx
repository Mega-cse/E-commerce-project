import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { useAuth } from './AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth(); // Assuming there's an updateUser function
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobileNo: user?.mobileNo || '',
    address: user?.address || '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
   
  //   updateUser(formData);
  //   alert('Profile updated successfully!');
  // };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <form className="profile-form" >
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className='profilename'
            value={formData.name}
           
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
              className='profilename'
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Phone:</label>
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
             className='profilename'
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
             className='profilename'
          />
        </div>
         </form>
    </div>
  );
};

export default Profile;
