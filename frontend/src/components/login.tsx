// import * as React from "react";
// import { AppProvider } from "@toolpad/core/AppProvider";
// import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
// import { useTheme } from "@mui/material/styles";
// import { useState   } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from './UserContext';

// // preview-start
// const providers = [{ id: "credentials", name: "Email and Password" }];
// // preview-end

// const signIn: (provider: AuthProvider, formData: FormData) => void = async (
//   provider,
//   formData
// ) => {
//   const promise = new Promise<void>((resolve) => {
//     setTimeout(() => {
//       alert(
//         `Signing in with "${provider.name}" and credentials: ${formData.get("email")}, ${formData.get("password")}`
//       );
//       resolve();
//     }, 300);
//   });
//   return promise;
// };

// export default function CredentialsSignInPage() {
//      const apiUrl = "http://localhost:3000/api/auth/login";
//      const navigate = useNavigate();
//      const formData = {
//         username: "",
//         password: "",
//      }
//      const [formSuccess, setFormSuccess] = useState(false);
//      const [formError, setFormError] = useState(false);
//          const { setUser } = useUser();
//  const handelchange = (e:any) => {
//       setFormData({ ...formdata, [e.target.name]: e.target.value });
//     };
//     const handleSubmit = async (e:any) => {
//       e.preventDefault();
//       try {
//         const response = await fetch(`${apiUrl}/auth/login`, {
//           method: "POST",credentials: 'include',
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formdata),
//         });
//         if (response.ok) {
//           const data = await response.json();
//           console.log(data);

//           if (data.token) {
//             // document.cookie = `jwt=${data.token}; path=/; secure; samesite=lax`;

//             const userId = data.user._id;

//             const user = setUser(data.user);
//                  console.log(user);
//             setFormSuccess(true);
//             navigate(`/home/${userId}`);
//           } else {
//             setFormError("Login failed: No token received");
//           }
//         } else {
//           const errorData = await response.json();
//           setFormError(errorData.message || "Login failed");
//         }
//       } catch (err) {
//         setFormError("An error occurred during login");
//         console.error(err);
//       } finally {
//         setFormData({
//           username: "",
//           password: "",
//         });
//       }
//       const handleToRegister = () => {
//         navigate("/register");
//     };
//     };

//   const theme = useTheme();
//   return (
//     // preview-start
//     <AppProvider theme={theme}>
//       <SignInPage
//         signIn={signIn}
//         providers={providers}
//         slotProps={{
//           emailField: { autoFocus: false },
//           form: { noValidate: true },
//         }}
//       />
//     </AppProvider>
//     // preview-end
//   );
// }
import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/useUser";
import { Box, Link, Typography } from "@mui/material";
import { useState } from "react";

const providers = [{ id: "credentials", name: "Email and Password" }];

export default function CredentialsSignInPage() {
  const apiUrl = "http://localhost:3000/api/auth/login";
  const navigate = useNavigate();
  const [formSuccess, setFormSuccess] = useState(false);
  // const [formData, setFormData] = useState({
  //     username: "",
  //     password: "",
  // });
  // const [formError, setFormError] = useState<string | false>(false);
  const { setUser } = useUser();
  const theme = useTheme();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (provider: AuthProvider, formData: FormData) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          const userId = data.user._id;
          const user = setUser(data.user);
          console.log(user);
          setFormSuccess(true);
          navigate(`/home/${userId}`);
          setUser(data.user);
          return { redirectTo: `/home/${data.user._id}` };
        } else {
          return { error: "Login failed: No token received" };
        }
      } else {
        const errorData = await response.json();
        return { error: errorData.message || "Login failed" };
      }
    } catch (err) {
      console.error(err);
      return { error: "An error occurred during login" };
    }
  };

  const handleToRegister = () => {
    navigate("/register");
  };

  return (
    <AppProvider theme={theme}>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SignInPage
          signIn={handleSubmit}
          providers={providers}
          slotProps={{
            emailField: { autoFocus: false },
            form: { noValidate: true },
          }}
        />{" "}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1, // Abstand zwischen den Elementen
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Typography
            variant="body2"
            onClick={() => navigate("/")}
            sx={{ textAlign: "center" }}
          >
            <h3>Noch kein Konto?</h3>
          </Typography>
          <Link
            component="button"
            onClick={handleToRegister}
            sx={{
              color: theme.palette.primary.main,
              "&:hover": {
                color: theme.palette.secondary.main,
                cursor: "pointer",
              },
            }}
          >
            Registrieren
          </Link>
        </Box>
      </div>
    </AppProvider>
  );
}
