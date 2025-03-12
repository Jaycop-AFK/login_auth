'use client';

import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";


const validate = yup.object().shape({
  email: yup.string().required("email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validate,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setSubmitting(true);
                const response = await axios.post(`/api/users/login`, values);
                console.log("Login successful:", response.data);
                router.push('/profile');
            } catch (error) {
                console.error("Login failed:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    sx={{ mb: 2 }}
                    label="email"
                    name="email"
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
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? <CircularProgress size={20} /> : 'Login'}
                </Button>
                <Button onClick={() => router.push('/register')} sx={{ mt: 1 }} fullWidth>
                    Register
                </Button>
            </form>
        </Box>
    );
}
