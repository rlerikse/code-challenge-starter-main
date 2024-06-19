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
      <h1>{profile.name}</h1>
      <p>{profile.bio}</p>
      {/* Add more profile details here */}
    </div>
  );
};

export default ProfileShow;