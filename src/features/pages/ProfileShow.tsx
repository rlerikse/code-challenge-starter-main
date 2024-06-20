import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProfileById, currentProfile } from '../profile/profileSlice';

const ProfileShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const profile = useSelector(currentProfile);

  useEffect(() => {
    dispatch(fetchProfileById(id!) as any);
  }, [dispatch, id]);

  return (
    <div>
      {profile && (
        <div>
          <h2>{profile.first_name} {profile.last_name}</h2>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          <p>Address: {profile.address}, {profile.city}, {profile.state} {profile.zip}</p>
          <p>Notes: {profile.notes}</p>
          <img src={profile.photo} alt={`${profile.first_name} ${profile.last_name}`} />
          <Link to={`/edit/${profile.id}`}>Edit Profile</Link>
        </div>
      )}
    </div>
  );
};

export default ProfileShow;
