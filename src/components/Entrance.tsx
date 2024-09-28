import React, { useState } from "react";
import firebase, { auth, googleProvider, facebookProvider, firestore } from "../provider/firebase";
import './Entrance.css';
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  providerId: string;
}

const Entrance: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (!validateEmail(inputEmail)) {
      setIsEmailValid(false);
      setErrorMessage("This email is invalid. Make sure it's written like example@email.com");
    } else {
      setIsEmailValid(true);
      setErrorMessage("");
    }
  };

  const saveUserToJSON = async (email: string, password: string): Promise<void> => {
    const newUser = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Error saving user data');
      }

      console.log("User saved to JSON:", await response.json());
    } catch (error) {
      console.error("Error saving user to JSON:", error);
      setErrorMessage("Error while saving user data.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isEmailValid && email && password) {
      setIsLoading(true);
      await saveUserToJSON(email, password);
      navigate("/login");
      setIsLoading(false);
    } else {
      setErrorMessage("Please fill in all fields correctly.");
    }
  };

  const handleUserRegistration = async (user: firebase.User | null): Promise<void> => {
    if (user) {
      const newUser: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        providerId: user.providerData[0]?.providerId || "unknown",
      };

      const userRef = firestore.collection('users').doc(newUser.uid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        await userRef.set(newUser);
        console.log("User added to Firestore:", newUser);
      }
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await auth.signInWithPopup(googleProvider);
      console.log("Signed in with Google:", result.user);
      await handleUserRegistration(result.user);
      navigate("/login");
    } catch (error) {
      console.error("Error with Google sign in:", error);
      setErrorMessage("Error with Google sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithFacebook = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await auth.signInWithPopup(facebookProvider);
      console.log("Signed in with Facebook:", result.user);
      await handleUserRegistration(result.user);
      navigate("/login");
    } catch (error) {
      console.error("Error with Facebook sign in:", error);
      setErrorMessage("Error with Facebook sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png" alt="Spotify Logo" />
      <h1 className="Sign-up">Sign up to start listening</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={handleEmailChange}
            className={isEmailValid ? "" : "input-error"}
            disabled={isLoading}
          />
          {!isEmailValid && <p className="error-message">{errorMessage}</p>}
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="btn-submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Next"}
        </button>
      </form>
      <div className="auth-separator">
        <span>or</span>
      </div>
      <div className="auth-options">
      <button className="btn-google" onClick={signInWithGoogle} disabled={isLoading}>
          <FcGoogle style={{ marginRight: '8px' }} className="google-icon"/> Continue with Google
        </button>
        <button className="btn-facebook" onClick={signInWithFacebook} disabled={isLoading}>
            <FaFacebook style={{ marginRight: '8px' }}  className="facebook-icon" />
            Continue with Facebook        
        </button>
      </div>
      <div className="thin-divider"></div>
      <p className="login-text">
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
};

export default Entrance;
