import React, { useState } from 'react';
import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ProfileLineItem } from "./ProfileLineItem";
import { selectAllProfiles, setActiveProfile } from "./profileSlice";
import ProfileShow from "./ProfileShow";

const ProfileList = () => {
  const profiles = useSelector(selectAllProfiles);
  const dispatch = useDispatch();
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);

  const trySetProfile = (profileId: number) => {
    setSelectedProfileId(profileId);
    dispatch(setActiveProfile(profileId));
  };

  return (
    <Stack spacing={1} sx={{ textAlign: 'left' }}>
      {selectedProfileId ? (
        <ProfileShow profileId={selectedProfileId} />
      ) : (
        profiles.length > 0 && profiles.map((profile) => (
          <Box key={profile.id} onClick={() => trySetProfile(profile.id)} sx={{ /* Styling here */ }}>
            <ProfileLineItem profile={profile} />
          </Box>
        ))
      )}
    </Stack>
  );
};

export { ProfileList };