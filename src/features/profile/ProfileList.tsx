import React, { useState } from 'react';
import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ProfileLineItem } from "./ProfileLineItem";
import { profileList, setActiveProfile } from "./profileSlice";
import { ProfileShow } from "./ProfileShow";
import { Profile } from "./profileUtils"; // Import the Profile type

const ProfileList = () => {
  const profiles = useSelector(profileList);
  const dispatch = useDispatch();
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);

  const trySetProfile = (data: number) => {
    setSelectedProfileId(data); // Set the selected profile ID
    dispatch(setActiveProfile(data));
  };

  return (
    <Stack spacing={1} sx={{textAlign: 'left'}}>
      {selectedProfileId ? (
        <ProfileShow profileId={selectedProfileId} />
      ) : (
        profiles.length > 0 && profiles.map((profile: Profile) => ( // Add type annotation for profile
          <Box sx={{ backgroundColor: 'white', 
                     borderRadius: '4px', 
                     overflow: 'hidden', 
                     boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, .1)',
                     cursor: 'pointer'
                    }} 
               key={profile.id} 
               onClick={() => trySetProfile(profile.id)}>
            <ProfileLineItem profile={profile} />
          </Box>
        ))
      )}
    </Stack>
  );
};

export { ProfileList };