import React, { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles, profileList, setActiveProfile } from '../profile/profileSlice';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import { Profile } from '../profile/profileUtils';

const ProfileList: React.FC = () => {
  const dispatch = useDispatch();
  const profiles = useSelector(profileList);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  return (
    <div>
      <h1>Employee Directory</h1>
      <Link to="/create">Add New Employee</Link>
      <ul>
        {profiles.map((profile: any) => (
          <li key={profile.id}>
            <Link to={`/profile/${profile.id}`} onClick={() => dispatch(setActiveProfile(profile))}>
              {profile.first_name} {profile.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
