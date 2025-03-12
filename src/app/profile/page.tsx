"use client";

import React from 'react'
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function  Profile  ()  {
  const router = useRouter();
  const [data, setData] = React.useState(null);

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout")

      toast.success("Logout successful");

      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);

      toast.error("Logout failed");
    }
  };

  const getuserDetails = async () => {
    try {
      const response = await axios.get("/api/users/self");
      setData(response.data.user._id);
      console.log(response.data.user._id);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  return (
   <>
   <Box>

   <Typography variant="body1" color="initial">HEY IT PROFILE</Typography>
   <Typography variant="body1" color="initial">{data === "nothing" ? "nothing" : <Link href={`/profile/${data}`}></Link> }{data}</Typography>
  <Button onClick={getuserDetails} style={{margin:"10px" }}>getuserDetails</Button>
   <Button onClick={handleLogout} style={{margin:"10px" }}>logout</Button>
   </Box>
   </>
  )
}

