import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
// import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
// import ColorModeSelect from "../shared-theme/ColorModelSelect";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { SitemarkIcon } from "./signupComponents/Customicons";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

// export default function SignUp(props: { disableCustomTheme?: boolean }) {
//   const [emailError, setEmailError] = React.useState(false);
//   const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
//   const [passwordError, setPasswordError] = React.useState(false);
//   const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
//   const [nameError, setNameError] = React.useState(false);
//   const [nameErrorMessage, setNameErrorMessage] = React.useState("");

//   const apiUrl = "http://localhost:3000/api/auth/register";
// const navigate = useNavigate();
// const [formdata, setFormData] = useState({
//     username: "",
//      email: "",
//      password: "",
//   });
// //    const handelChange = (e: any) => {
// // setFormData({...formdata, [e.target.name]: e.target.value})

// //   };
//   const validateInputs = () => {
//     const email = document.getElementById("email") as HTMLInputElement;
//     const password = document.getElementById("password") as HTMLInputElement;
//     const name = document.getElementById("name") as HTMLInputElement;

//     let isValid = true;

//     if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
//       setEmailError(true);
//       setEmailErrorMessage("Please enter a valid email address.");
//       isValid = false;
//     } else {
//       setEmailError(false);
//       setEmailErrorMessage("");
//     }

//     if (!password.value || password.value.length < 6) {
//       setPasswordError(true);
//       setPasswordErrorMessage("Password must be at least 6 characters long.");
//       isValid = false;
//     } else {
//       setPasswordError(false);
//       setPasswordErrorMessage("");
//     }

//     if (!name.value || name.value.length < 1) {
//       setNameError(true);
//       setNameErrorMessage("Name is required.");
//       isValid = false;
//     } else {
//       setNameError(false);
//       setNameErrorMessage("");
//     }

//     return isValid;
//   };

// //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

// const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault(); // Verhindert Standard-Formular-Verhalten

//   // 1. Validierung (falls nameError, emailError etc. definiert sind)
//   if (nameError || emailError || passwordError) {
//     console.error("Validation failed");
//     return;
//   }

//   // 2. Formulardaten sammeln
//   const formData = new FormData(event.currentTarget);
//   const payload = {
//     username: formData.get("username") as string,
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   console.log("Sending data:", payload); // Debugging

//   try {
//     // 3. API-Request
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     // 4. Response verarbeiten
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Registration failed");
//     }

//     const data = await response.json();
//     console.log("Success:", data);
//     // Weiterleitung oder Erfolgsmeldung hier einfügen
//   } catch (error) {
//     console.error("Error:", error);
//     // Fehlermeldung anzeigen (z.B. setError(error.message))
//   }
// };
// //     if (nameError || emailError || passwordError) {
// //       event.preventDefault();
// //       return;
// //     }
// //     try{
// //         const response = await fetch(apiUrl, {
// //         method: "POST",
// //         credentials: "include",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           username: formData.get("email"),
// //           password: formData.get("password"),
// //         }),
// //          const data = new FormData(event.currentTarget);
// //     console.log({
// //       username: data.get("username"),

// //       email: data.get("email"),
// //       password: data.get("password"),
// //     });
// //       });}catch(error){}

// //   };

//   return (
//     <AppTheme {...props}>
//       {/* <CssBaseline enableColorScheme /> */}
//       {/* <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} /> */}
//       <SignUpContainer>
//         {/* <CheckCircleIcon color="primary" fontSize="large" /> */}
//         <Card variant="outlined">
//           <SitemarkIcon />
//           <Typography
//             component="h1"
//             variant="h4"
//             sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
//           >
//             Sign up
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//           >
//             <FormControl>
//               <FormLabel htmlFor="name">Full name</FormLabel>
//               <TextField
//                 autoComplete="name"
//                 name="name"
//                 required
//                 fullWidth
//                 id="name"
//                 placeholder="Jon Snow"
//                 error={nameError}
//                 helperText={nameErrorMessage}
//                 color={nameError ? "error" : "primary"}
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel htmlFor="email">Email</FormLabel>
//               <TextField
//                 required
//                 fullWidth
//                 id="email"
//                 placeholder="your@email.com"
//                 name="email"
//                 autoComplete="email"
//                 variant="outlined"
//                 error={emailError}
//                 helperText={emailErrorMessage}
//                 color={passwordError ? "error" : "primary"}
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel htmlFor="password">Password</FormLabel>
//               <TextField
//                 required
//                 fullWidth
//                 name="password"
//                 placeholder="••••••"
//                 type="password"
//                 id="password"
//                 autoComplete="new-password"
//                 variant="outlined"
//                 error={passwordError}
//                 helperText={passwordErrorMessage}
//                 color={passwordError ? "error" : "primary"}
//               />
//             </FormControl>
//             <FormControlLabel
//               control={<Checkbox value="allowExtraEmails" color="primary" />}
//               label="I want to receive updates via email."
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               onClick={validateInputs}
//             >
//               Sign up
//             </Button>
//           </Box>
//           <Divider>
//             <Typography sx={{ color: "text.secondary" }}>or</Typography>
//           </Divider>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             <Button
//               fullWidth
//               variant="outlined"
//               onClick={() => alert("Sign up with Google")}
//               startIcon={<GoogleIcon />}
//             >
//               Sign up with Google
//             </Button>
//             <Button
//               fullWidth
//               variant="outlined"
//               onClick={() => alert("Sign up with Facebook")}
//               startIcon={<FacebookIcon />}
//             >
//               Sign up with Facebook
//             </Button>
//             <Typography
//               onClick={() => navigate("/")}
//               sx={{ textAlign: "center" }}
//             >
//               Already have an account?{" "}
//               <Link
//                 component="button"
//                 variant="body2"
//                 sx={{ alignSelf: "center" }}
//               >
//                 Sign in
//               </Link>
//             </Typography>
//           </Box>
//         </Card>
//       </SignUpContainer>
//     </AppTheme>
//   );
// }
export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [submitError, setSubmitError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const apiUrl = "http://localhost:3000/api/auth/register";
  const navigate = useNavigate();

  const validateInputs = () => {
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const password = (document.getElementById("password") as HTMLInputElement)
      ?.value;
    const name = (document.getElementById("name") as HTMLInputElement)?.value;

    let isValid = true;

    // Email Validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    // Password Validation
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    // Name Validation
    if (!name || name.trim().length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    // Validate inputs first
    if (!validateInputs()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = {
        username: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // Registration successful - redirect to login
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppTheme {...props}>
      {/* <CssBaseline enableColorScheme /> */}
      {/* <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} /> */}
      <SignUpContainer>
        {/* <CheckCircleIcon color="primary" fontSize="large" /> */}
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>
            <Typography
              onClick={() => navigate("/")}
              sx={{ textAlign: "center" }}
            >
              Already have an account?{" "}
              <Link
                component="button"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
