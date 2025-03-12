"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Box, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const validate = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(`/api/users/register`, values);
        console.log("Registration successful:", response.data);
        toast.success("Registration successful");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Registration failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h1" color="initial">
        {loading ? "Processing" : "Signup"}
      </Typography>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          sx={{ mb: 2 }}
          label="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          sx={{ mb: 2 }}
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          sx={{ mb: 2 }}
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
