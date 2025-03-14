import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      program: 0,
      message: "",
      agree: false,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      email: Yup.string().required("Required.").email("Invalid email"),
      phone: Yup.number().integer().typeError("Please enter a valid number"),
      program: Yup.number().integer().typeError("Please select a program."),
      message: Yup.string()
        .required("Required.")
        .min(10, "Must be 10 characters or more"),
      agree: Yup.boolean().oneOf(
        [true],
        "The terms and conditions must be accepted."
      ),
    }),
  });

  return (
    <div className="contact-page">
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Contact Us
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            {formik.touched.name && formik.errors.name && (
              <Typography variant="caption" color="error">
                {formik.errors.name}
              </Typography>
            )}

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            {formik.touched.email && formik.errors.email && (
              <Typography variant="caption" color="error">
                {formik.errors.email}
              </Typography>
            )}

            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
            />
            {formik.touched.phone && formik.errors.phone && (
              <Typography variant="caption" color="error">
                {formik.errors.phone}
              </Typography>
            )}

            <FormControl fullWidth margin="normal">
              <InputLabel id="program-label">Program of Study</InputLabel>
              <Select
                labelId="program-label"
                id="program"
                name="program"
                value={formik.values.program}
                label="Program of Study"
                onChange={formik.handleChange}
                error={formik.touched.program && Boolean(formik.errors.program)}
              >
                <MenuItem value={0}>
                  <em>Please select</em>
                </MenuItem>
                <MenuItem value={1}>Software Engineering</MenuItem>
                <MenuItem value={2}>Information System</MenuItem>
                <MenuItem value={3}>Information Assurance</MenuItem>
                <MenuItem value={4}>Internet of Things</MenuItem>
                <MenuItem value={5}>Artificial Intelligence</MenuItem>
                <MenuItem value={6}>Digital Art & Design</MenuItem>
              </Select>
              {formik.touched.program && formik.errors.program && (
                <Typography variant="caption" color="error">
                  {formik.errors.program}
                </Typography>
              )}
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Message"
              name="message"
              multiline
              rows={4}
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
            />
            {formik.touched.message && formik.errors.message && (
              <Typography variant="caption" color="error">
                {formik.errors.message}
              </Typography>
            )}

            <FormControlLabel
              control={
                <Switch
                  name="agree"
                  checked={formik.values.agree}
                  onChange={formik.handleChange}
                />
              }
              label="Agree to terms and conditions"
              sx={{ mt: 2 }}
            />
            {formik.touched.agree && formik.errors.agree && (
              <Typography variant="caption" color="error" display="block">
                {formik.errors.agree}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 3, mb: 2, bgcolor: "#1976d2", color: "white", py: 1.5 }}
            >
              SEND
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Contact;
