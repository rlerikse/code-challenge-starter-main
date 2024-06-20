import React, { useState, useEffect, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createProfile, updateProfile, fetchProfileById, currentProfile } from '../profile/profileSlice';
import { AnyAction } from '@reduxjs/toolkit';
import { Profile } from '../profile/profileUtils';

const EditProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const existingProfile = useSelector(currentProfile);

  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    photo: '',
    notes: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProfileById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (existingProfile) {
      setProfile(existingProfile);
    }
  }, [existingProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(updateProfile({ ...profile, id: String(id) }));
    } else {
      dispatch(createProfile(profile as Profile));
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Edit Profile' : 'Add New Profile'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" value={profile.first_name} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="last_name" value={profile.last_name} onChange={handleChange} placeholder="Last Name" required />
        <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" required />
        <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="address" value={profile.address} onChange={handleChange} placeholder="Address" required />
        <input type="text" name="city" value={profile.city} onChange={handleChange} placeholder="City" required />
        <input type="text" name="state" value={profile.state} onChange={handleChange} placeholder="State" required />
        <input type="text" name="zip" value={profile.zip} onChange={handleChange} placeholder="Zip" required />
        <input type="text" name="photo" value={profile.photo} onChange={handleChange} placeholder="Photo URL" />
        <textarea name="notes" value={profile.notes} onChange={handleChange} placeholder="Notes"></textarea>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default EditProfile;
