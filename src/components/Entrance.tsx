import React, { useState } from "react";
import { auth, googleProvider, facebookProvider,signInWithPopup } from "../provider/firebase";

import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";

const SignupContainer = styled("div")({
  backgroundColor: "#0f0f0e",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  padding: "20px",
});

const SignupBox = styled("div")({
  width: "100%",
  maxWidth: 400,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Logo = styled("img")({
  width: "60px",
  marginBottom: "20px",
});

const Heading = styled(Typography)({
  maxWidth: 300,
  fontSize: 35,
  fontWeight: 700,
  marginBottom: "20px",
  fontFamily: "SpotifyMixUITitle, sans-serif",
  textAlign: "center",
});

const StyledTextField = styled("input")({
  width: "80%",
  padding: "14px",
  marginBottom: "15px",
  border: "1px solid #fff",
  borderRadius: "6px",
  backgroundColor: "#0f0f0e",
  color: "white",
  fontSize: "16px",
  outline: "none",
});

const SubmitButton = styled("button")(({ disabled }) => ({
  width: "80%",
  padding: "14px",
  backgroundColor: disabled ? "#444" : "#1ed760",
  color: disabled ? "#aaa" : "#111",
  borderRadius: "50px",
  fontWeight: 700,
  fontSize: "16px",
  border: "none",
  cursor: disabled ? "not-allowed" : "pointer",
  marginBottom: "20px",
  "&:hover": disabled ? {} : { backgroundColor: "#1db954" },
  marginTop: 10,
}));

const AuthButton = styled("button")(({ disabled }) => ({
  width: "80%",
  padding: "12px 0",
  borderRadius: "50px",
  border: "1px solid #fff",
  backgroundColor: "#0f0f0e",
  color: "white",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  fontSize: "16px",
  cursor: disabled ? "not-allowed" : "pointer",
  "&:hover": disabled ? {} : { backgroundColor: "#222" },
}));

const Separator = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "300px",
  margin: "20px auto",
  color: "#ccc",
});

const Line = styled("div")({
  flex: 1,
  height: "1px",
  backgroundColor: "#ccc",
  maxWidth: "150px",
});

const SeparatorText = styled("span")({
  margin: "0 10px",
  fontSize: "14px",
  fontWeight: 500,
  color: "#ccc",
});

const LoginText = styled(Typography)({
  marginTop: "20px",
  color: "#8d8989",
  fontSize: "14px",
  textAlign: "center",
});

const Entrance: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Новый state для пароля
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // предотвращаем перезагрузку страницы
    if (!email || !password) return;
  
    setIsLoading(true);
  
    try {
      const newUser = {
        id: Math.random().toString(16).slice(2, 6), // генерируем случайный ID
        email,
        password,
      };
  
      // Отправляем данные в JSON (если используешь json-server)
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) throw new Error("Ошибка добавления пользователя");
  
      console.log("Пользователь добавлен:", newUser);
      navigate("/login"); // перенаправляем на страницу входа
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('User:', result.user);
    } catch (error) {
        console.error('Google Sign-in error:', error);
    }
};

const handleFacebookSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        console.log('User:', result.user);
    } catch (error) {
        console.error('Facebook Sign-in error:', error);
    }
};


  return (
    <SignupContainer>
      <SignupBox>
        <Logo
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
          alt="Spotify Logo"
        />
        <Heading variant="h5">Sign up to start listening</Heading>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          {/* Новое поле для пароля */}
          <StyledTextField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Next"}
          </SubmitButton>
        </form>
        <Separator>
          <Line />
          <SeparatorText>or</SeparatorText>
          <Line />
        </Separator>
        <AuthButton onClick={handleGoogleSignIn} disabled={isLoading}>
          <FcGoogle size={22} /> Sign up with Google
        </AuthButton>
        <AuthButton onClick={handleFacebookSignIn} disabled={isLoading}>
          <FaFacebook color="#1877F2" size={22} /> Sign up with Facebook
        </AuthButton>
        <LoginText>
          Already have an account? <Link to="/login">Log in here</Link>
        </LoginText>
      </SignupBox>
    </SignupContainer>
  );
};

export default Entrance;
