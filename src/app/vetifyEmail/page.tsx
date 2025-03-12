"use client";
import { Box, Container } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPaage() {
    const [token, setToken] = useState("");
    const [vertified, setVertified] = useState(false);
    const [error, setError] = useState(false);

    const vetifyUserEmail = async () => {
        try {
            
          await axios.post('/api/users/vetifyemail', { token });
          setVertified(true);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };

    useEffect(() => {

        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            vetifyUserEmail();
        }
    }, [token]);


  return (
    <Container style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}}>
     <h1 style={{fontSize: "50px", color: "green"}}>Verify email</h1>
     <h2 style={{fontSize: "30px", color: "brown"}}>{token ? `Token: ${token}` : "No token provided"}</h2>
     {vertified && (
        <Box>
            <h2 style={{fontSize: "30px"}}>Email vertified successfully</h2>
            <h2 style={{fontSize: "30px"}}><Link href="/login">Login</Link></h2>
        </Box>
     )}
     {error && (
        <Box>
            <h2 style={{fontSize: "30px", color: "red"}}>Error</h2>
    
        </Box>
     )}
    </Container>
  );
}
