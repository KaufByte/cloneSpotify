import React, { useState } from "react";
import 'firebase/compat/auth';
import firebase, { googleProvider, facebookProvider } from "../provider/firebase";
import './Login.css';
import { Link, useNavigate } from "react-router-dom"; 
import { FcGoogle } from "react-icons/fc"; 
import { FaFacebook } from "react-icons/fa";
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate(); 

  const checkUserInJSON = async(email:string,password:string)=>{
    try{
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const user = users.find((u:any)=>u.email === email && u.password === password);
      return user? true:false;
    }catch(error){
      console.error("Error checking user in JSON:",error);
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
      const result = await firebase.auth().signInWithPopup(googleProvider);
      if(result.user)
      {
        localStorage.setItem("userEmail", result.user.email || "");      
        navigate("/main-page1"); 
      }else{
        setErrorMessage("User not found. Please try again.");
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
      const result = await firebase.auth().signInWithPopup(facebookProvider);
     if(result.user){
      localStorage.setItem("userEmail", result.user.email || "");      
      navigate("/main-page1"); 
     }else{
      setErrorMessage("User not found. Please try again.");
     }  
    } catch (error) {
      console.error("Error with Facebook sign in:", error);
      setErrorMessage("Error with Facebook sign in. Please try again."); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png" alt="Spotify Logo" />
      <h1 className="login-title">Log in to Spotify</h1>
      <div className="auth-buttons">
        <button className="btn-google" onClick={signInWithGoogle} disabled={isLoading}>
          <FcGoogle style={{ marginRight: '8px' }} className="google-icon"/> Continue with Google
        </button>
        <button className="btn-facebook" onClick={signInWithFacebook} disabled={isLoading}>
            <FaFacebook style={{ marginRight: '8px' }}  className="facebook-icon" />
            Continue with Facebook        
        </button>
      </div>
      <div className="thin-divider2"></div>
      <form onSubmit={handleSubmit}>
        <div className="input-group2">
          <input
            type="email"
            placeholder="Email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="input-group2">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn-login" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <div className="signup-link">
        Don’t have an account? <Link to="/signup">Sign up for Spotify</Link>
      </div>
    </div>
  );
};

export default Login;
