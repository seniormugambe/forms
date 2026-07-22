import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";

// Zod Schema
const studentSchema = z
  .object({
    fullname: z
      .string()
      .min(3, "Full name must contain at least 3 characters"),

    email: z
      .string()
      .email("Please enter a valid email address"),

    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits"),

    course: z
      .string()
      .min(1, "Please select a course"),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function StudentRegistration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = (data) => {
    console.log(data);

    alert("Registration Successful!");

    reset();
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 4,
        boxShadow: 4,
        borderRadius: 3,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "var(--text-h)" }}>
        Student Registration
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>

        <TextField
          label="Full Name"
          fullWidth
          margin="normal"
          {...register("fullname")}
          error={!!errors.fullname}
          helperText={errors.fullname?.message}
          sx={{ backgroundColor: "#fff" }}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ backgroundColor: "#fff" }}
        />

        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          sx={{ backgroundColor: "#fff" }}
        />

        <TextField
          select
          label="Course"
          fullWidth
          margin="normal"
          defaultValue=""
          {...register("course")}
          error={!!errors.course}
          helperText={errors.course?.message}
          sx={{ backgroundColor: "#fff" }}
        >
          <MenuItem value="">Select Course</MenuItem>
          <MenuItem value="React">React</MenuItem>
          <MenuItem value="Node.js">Node.js</MenuItem>
          <MenuItem value="Python">Python</MenuItem>
          <MenuItem value="Django">Django</MenuItem>
        </TextField>

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ backgroundColor: "#fff" }}
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          sx={{ backgroundColor: "#fff" }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: 'var(--accent)',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgba(170, 59, 255, 0.9)',
            },
          }}
          type="submit"
        >
          Register
        </Button>

      </form>
    </Box>
  );
}