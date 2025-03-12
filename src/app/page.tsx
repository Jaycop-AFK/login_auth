'use client';

import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();

  return (
   <>
  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Button onClick={() => router.push('/login')}>Login</Button>
    <Button onClick={() => router.push('/register')}>Register</Button>
    <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
    
  </Box>
   </>
  );
}

