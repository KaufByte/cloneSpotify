import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button, TextField, CircularProgress } from "@mui/material";
import { auth, googleProvider, facebookProvider, signInWithPopup } from "../provider/firebase";

const LoginPage = styled.div`
   background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 1) 100%);
   min-height: 100vh; 
   display: flex; 
   justify-content: center; 
   align-items: center; 
   color: white;
`;

const LoginContainer = styled.div`
  max-width: 400px;
  width: 100%;
  background-color: #121212;
  padding: 50px 40px;
  border-radius: 8px;
  text-align: center;
`;

const Logo = styled.img`
  width: 50px;
  margin-bottom: 20px;
`;

const LoginTitle = styled.h1`
  maxWidth: 300,
  fontSize: 35,
  fontWeight: 700,
  marginBottom: "20px",
  fontFamily: "SpotifyMixUITitle, sans-serif",
  textAlign: "center",
`;

const AuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const AuthButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  border-radius: 30px !important;
  text-transform: none !important;
  font-weight: bold !important;
  font-size: 14px !important;
  color: white !important;
  border: 1px solid #ffffff !important;
  background-color: transparent !important;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
`;

const ThinDivider = styled.div`
  width: 100%;
  border-bottom: 1px solid #3d3b3b;
  margin: 20px 0;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    background-color: #242424;
    color: white;
  }
  & label {
    color: #b3b3b3;
  }
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root fieldset {
    border-color: #535353;
  }
  & .MuiOutlinedInput-root:hover fieldset {
    border-color: white;
  }
  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border-color: white;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  padding: 12px;
  border-radius: 30px !important;
  font-weight: bold !important;
  font-size: 16px !important;
  background-color: #1ed760 !important;
  color: black !important;
  text-transform: none !important;
  margin-top: 20px !important;
  &:hover {
    background-color: #1db954 !important;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const checkUserInJSON = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const user = users.find((u: any) => u.email === email && u.password === password);
      return user ? true : false;
    } catch (error) {
      console.error("Error checking user in JSON:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const isValidUser = await checkUserInJSON(email, password);
      if (isValidUser) {
        localStorage.setItem("userEmail", email);
        navigate("/main-page1");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        localStorage.setItem("userEmail", result.user.email || "");
        navigate("/main-page1");
      }
    } catch (error) {
      console.error("Error with Google sign in:", error);
      setErrorMessage("Error with Google sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      if (result.user) {
        localStorage.setItem("userEmail", result.user.email || "");
        navigate("/main-page1");
      }
    } catch (error) {
      console.error("Error with Facebook sign in:", error);
      setErrorMessage("Error with Facebook sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginPage>
      <LoginContainer>
        <Logo src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png" alt="Spotify Logo" />
        <LoginTitle>Log in to Spotify</LoginTitle>
        <AuthButtons>
          <AuthButton startIcon={<FcGoogle />} onClick={signInWithGoogle}>
            Continue with Google
          </AuthButton>
          <AuthButton startIcon={<FaFacebook />} onClick={signInWithFacebook}>
            Continue with Facebook
          </AuthButton>
        </AuthButtons>
        <ThinDivider />
        <form onSubmit={handleSubmit}>
          <StyledTextField label="Email or username" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
          <StyledTextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
          </LoginButton>
        </form>
        <p><StyledLink to="#">Forgot your password?</StyledLink></p>
        <p>Don’t have an account? <StyledLink to="/signup">Sign up for Spotify</StyledLink></p>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
