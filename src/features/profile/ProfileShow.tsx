import React, { useEffect, useState } from 'react';

interface ProfileShowProps {
  profileId: number;
}

const ProfileShow: React.FC<ProfileShowProps> = ({ profileId }) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await fetch(`https://codechallenge.rivet.work/api/v1/profile/${profileId}`);
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile details:', error);
      }
    };
    fetchProfileDetails();
  }, [profileId]);

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>Profile not found.</div>;

  return (
    <div>
      <h1>{profile.username}</h1>
      <img src={profile.photo} alt={profile.username} />
      <p>Notes: {profile.notes}</p>
      <hr />
      <h2>Contact Info</h2>
      <p>First Name: {profile.first_name}</p>
      <p>Last Name: {profile.last_name}</p>

      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      <p>Address: {profile.address}</p>
      <p>City: {profile.city}</p>
      <p>State: {profile.state}</p>
      <p>Zip: {profile.zip}</p>

    </div>
  );
};

export default ProfileShow;