// import React, { useState } from "react";
// import { auth, googleProvider, facebookProvider,signInWithPopup } from "../provider/firebase";

// import { Link, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
// import { CircularProgress, Typography } from "@mui/material";
// import { styled } from "@mui/system";

// const SignupContainer = styled("div")({
//   backgroundColor: "#0f0f0e",
//   minHeight: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   color: "white",
//   padding: "20px",
// });

// const SignupBox = styled("div")({
//   width: "100%",
//   maxWidth: 400,
//   textAlign: "center",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
// });

// const Logo = styled("img")({
//   width: "60px",
//   marginBottom: "20px",
// });

// const Heading = styled(Typography)({
//   maxWidth: 300,
//   fontSize: 35,
//   fontWeight: 700,
//   marginBottom: "20px",
//   fontFamily: "SpotifyMixUITitle, sans-serif",
//   textAlign: "center",
// });

// const StyledTextField = styled("input")({
//   width: "80%",
//   padding: "14px",
//   marginBottom: "15px",
//   border: "1px solid #fff",
//   borderRadius: "6px",
//   backgroundColor: "#0f0f0e",
//   color: "white",
//   fontSize: "16px",
//   outline: "none",
// });

// const SubmitButton = styled("button")(({ disabled }) => ({
//   width: "80%",
//   padding: "14px",
//   backgroundColor: disabled ? "#444" : "#1ed760",
//   color: disabled ? "#aaa" : "#111",
//   borderRadius: "50px",
//   fontWeight: 700,
//   fontSize: "16px",
//   border: "none",
//   cursor: disabled ? "not-allowed" : "pointer",
//   marginBottom: "20px",
//   "&:hover": disabled ? {} : { backgroundColor: "#1db954" },
//   marginTop: 10,
// }));

// const AuthButton = styled("button")(({ disabled }) => ({
//   width: "80%",
//   padding: "12px 0",
//   borderRadius: "50px",
//   border: "1px solid #fff",
//   backgroundColor: "#0f0f0e",
//   color: "white",
//   marginBottom: "10px",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   gap: "10px",
//   fontSize: "16px",
//   cursor: disabled ? "not-allowed" : "pointer",
//   "&:hover": disabled ? {} : { backgroundColor: "#222" },
// }));

// const Separator = styled("div")({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   width: "100%",
//   maxWidth: "300px",
//   margin: "20px auto",
//   color: "#ccc",
// });

// const Line = styled("div")({
//   flex: 1,
//   height: "1px",
//   backgroundColor: "#ccc",
//   maxWidth: "150px",
// });

// const SeparatorText = styled("span")({
//   margin: "0 10px",
//   fontSize: "14px",
//   fontWeight: 500,
//   color: "#ccc",
// });

// const LoginText = styled(Typography)({
//   marginTop: "20px",
//   color: "#8d8989",
//   fontSize: "14px",
//   textAlign: "center",
// });

// const Entrance: React.FC = () => {
//   const [step,setStep] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState(""); 
//   const [username,setUsername] = useState("");
//   const [dob,setDob] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); 
//     if (!email || !password) return;
  
//     setIsLoading(true);
  
//     try {
//       const newUser = {
//         id: Math.random().toString(16).slice(2, 6), 
//         email,
//         password,
//         username
//       };
  
//       const response = await fetch("http://localhost:5000/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newUser),
//       });
  
//       if (!response.ok) throw new Error("Ошибка добавления пользователя");
  
//       console.log("Пользователь добавлен:", newUser);
//       navigate("/login"); 
//     } catch (error) {
//       console.error("Ошибка:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const handleGoogleSignIn = async () => {
//     try {
//         const result = await signInWithPopup(auth, googleProvider);
//         console.log('User:', result.user);
//     } catch (error) {
//         console.error('Google Sign-in error:', error);
//     }
//   };

//   const handleFacebookSignIn = async () => {
//     try {
//         const result = await signInWithPopup(auth, facebookProvider);
//         console.log('User:', result.user);
//     } catch (error) {
//         console.error('Facebook Sign-in error:', error);
//     }
//   };
//   const handleNext = () => {
//     if(step === 1 && email){
//       setStep(2);
//     }else if(step === 2 && username && password && dob){
//       handleSubmit();
//     }
//   };

//   return (
//     <SignupContainer>
//       <SignupBox>
//         <Logo
//           src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
//           alt="Spotify Logo"
//         />
//         <Heading variant="h5">Sign up to start listening</Heading>
//         <form onSubmit={handleSubmit}>
//           <StyledTextField
//             type="email"
//             placeholder="Email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//           />
//           <SubmitButton type="submit" disabled={isLoading}>
//             {isLoading ? <CircularProgress size={24} /> : "Next"}
//           </SubmitButton>
//         </form>
//         <Separator>
//           <Line />
//           <SeparatorText>or</SeparatorText>
//           <Line />
//         </Separator>
//         <AuthButton onClick={handleGoogleSignIn} disabled={isLoading}>
//           <FcGoogle size={22} /> Sign up with Google
//         </AuthButton>
//         <AuthButton onClick={handleFacebookSignIn} disabled={isLoading}>
//           <FaFacebook color="#1877F2" size={22} /> Sign up with Facebook
//         </AuthButton>
//         <LoginText>
//           Already have an account? <Link to="/login">Log in here</Link>
//         </LoginText>
//       </SignupBox>
//     </SignupContainer>
//   );
// };

// export default Entrance;
import React, { useState } from "react";
import { auth, googleProvider, facebookProvider } from "../provider/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { CircularProgress, Typography,LinearProgress } from "@mui/material";
import { styled } from "@mui/system";
import { IoIosArrowBack } from "react-icons/io";
import { signInWithPopup } from "firebase/auth";

const SignupContainer = styled("div")({
  backgroundColor: "#0f0f0e",
  minHeight: "95.8vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  padding: "20px",
  overflow: "hidden", 
});

const SignupBox = styled("div")({
  width: "100%",
  maxWidth: 400,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  maxHeight: "90vh", 
  overflowY: "auto", 
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
  appearance: "none", // Убирает стандартные стрелки
  "-webkit-appearance": "none",
  "-moz-appearance": "none",
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
const ProgressBar = styled(LinearProgress)({
    width:"100%",
    height:2,
    borderRadius:3,
    marginBottom:20,
    backgroundColor: "#444", // Цвет фона прогресс-бара
    "& .MuiLinearProgress-bar": {
      backgroundColor: "#1ed760", // Цвет заполненной части
    },
});
const BackButton = styled("button")({
  // display: "none", // Временное скрытие
  position: "absolute",
  left: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  gap: "5px",
});

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
const DateContainer = styled("div")({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  justifyContent: "center", // Теперь элементы по центру
  width: "100%",
});

const StyledInput = styled("input")({
  width: "40px", 
  minWidth: "50px", 
  height: "30px",
  textAlign: "center",
  border: "1px solid #727272",
  borderRadius: "4px",
  backgroundColor: "black",
  color: "white",
  fontSize: "16px",
  outline: "none",
  padding: "10px",
  "&:focus": {
    borderColor: "#1ed760",
  },
});


const StyledSelected = styled("select")({
  width: "130px",
  height: "48px",
  textAlign: "center",
  border: "1px solid #727272",
  borderRadius: "4px",
  backgroundColor: "black",
  color: "white",
  fontSize: "16px",
  outline: "none",
  padding: "10px",
  cursor: "pointer",
  "&:focus": {
    borderColor: "#1ed760",
  },
});

const StepIndicator = styled("p")({
  textAlign: "center",
  color: "white",
  fontSize: "14px",
  marginTop: "5px",
  opacity: 0.8,
});
const ErrorText = styled("p")({
  color: "#ff4d4d",
  fontSize: "14px",
  marginTop: "5px",
  textAlign: "center",
});
const PasswordValidator = styled("div")(({ theme }) => ({
  marginTop: "10px",
  fontSize: "14px",
  color: "#b3b3b3",

  "& > div": {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "5px",
  },

  "& .valid": {
    color: "#1db954",
  },

  "& .invalid": {
    color: "#f44336",
  },
  
}));
const Label = styled("label")({
  fontSize: "16px",
  fontWeight: "bold",
  color: "#fff",
  marginTop: "20px",
  display: "block",
});
const SubText = styled("p")(() => ({
  fontSize: "12px",
  color: "#b3b3b3",
  marginBottom: "5px",
  maxWidth: "350px",
  textAlign: "center", // Исправлено
}));


const GenderContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap", 
  justifyContent: "center", 
  gap: "20px",
  maxWidth: "400px", 
});

const GenderOption = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  whiteSpace: "nowrap", // Чтобы текст не переносился

  "& input": {
    appearance: "none",
    width: "18px",
    height: "18px",
    flexShrink: 0, // Не позволяет кнопкам сжиматься
    border: "2px solid #b3b3b3",
    borderRadius: "50%",
    cursor: "pointer",
    "&:checked": {
      border: "6px solid #1db954",
    },
  },

  "& label": {
    fontSize: "14px",
    color: "#fff",
    cursor: "pointer",
  },
});


const Entrance: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [gender, setGender] = useState<string>("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasLetter: false,
    hasNumberOrSpecial: false,
    hasMinLength: false,
  });
  const navigate = useNavigate();
  const months = [
    "Januar","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const validateEmail = (value: string) => {
    const regex = /^[a-zA-Z0-9@.]+$/;
    setEmailError(regex.test(value) ? "" : "This email is invalid. Make sure it's written like example@email.com ");
  };

  const validatePassword = (value: string) => {
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumberOrSpecial = /[\d!@#$%^&*()_+=-]/.test(value);
    const hasMinLength = value.length >= 10;
  
    setPasswordCriteria({ hasLetter, hasNumberOrSpecial, hasMinLength });
  
    if (!hasLetter || !hasNumberOrSpecial || !hasMinLength) {
      setPasswordError("Password does not meet the requirements.");
    } else {
      setPasswordError("");
    }
  };

  const validateUsername = (value: string) => {
    const regex = /^[a-zA-Z0-9_]+$/;
    setUsernameError(regex.test(value) ? "" : "Username must be in qwerty");
  };

  const validateAge = () => {
    const currentYear = new Date().getFullYear();
    setDobError(year && currentYear - parseInt(year) < 14 ? "Minimum age 14 years" : "");
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && emailError) return;
    if (step === 2 && passwordError) return;
    if (step === 3 && (usernameError || dobError)) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateAge();
    if (!password || !username || !day || !month || !year || dobError) return;
    setIsLoading(true);
    try {
      const newUser = {
        id: crypto.randomUUID(),
        email,
        password,
        username,
        dob: `${day}-${month}-${year}`,
      };
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Error adding user");
      navigate("/login");
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User:", result.user);
    } catch (error) {
      console.error("Google Sign-in error:", error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("User:", result.user);
    } catch (error) {
      console.error("Facebook Sign-in error:", error);
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
        <ProgressBar variant="determinate" value={step === 1 ? 33 : step === 2 ? 66 : 100} />
        {step > 1 && (
          <BackButton onClick={handleBack}>
            <IoIosArrowBack /> 
          </BackButton>
          )}
        <StepIndicator>Step {step} of 3</StepIndicator>
        {step === 1 && (
          <form onSubmit={handleNext}>
            <StyledTextField
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
            {emailError && <ErrorText>{emailError}</ErrorText>}
            <SubmitButton type="submit" disabled={!email || isLoading}>
              {isLoading ? <CircularProgress size={24} /> : "Next"}
            </SubmitButton>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNext}>
            <BackButton onClick={handleBack} type="button">
              <IoIosArrowBack />
            </BackButton>
            
            <StyledTextField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              disabled={isLoading}
            />
            
            {passwordError && <ErrorText>{passwordError}</ErrorText>}

            {/* Валидатор пароля */}
            <PasswordValidator>
              <div className={passwordCriteria.hasLetter ? "valid" : "invalid"}>
                {passwordCriteria.hasLetter ? "✔" : "✖"} At least 1 letter
              </div>
              <div className={passwordCriteria.hasNumberOrSpecial ? "valid" : "invalid"}>
                {passwordCriteria.hasNumberOrSpecial ? "✔" : "✖"} 1 number or special character
              </div>
              <div className={passwordCriteria.hasMinLength ? "valid" : "invalid"}>
                {passwordCriteria.hasMinLength ? "✔" : "✖"} Minimum 10 characters
              </div>
            </PasswordValidator>

            <SubmitButton type="submit" disabled={!password || isLoading}>
              {isLoading ? <CircularProgress size={24} /> : "Next"}
            </SubmitButton>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <StyledTextField
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateUsername(e.target.value);
              }}
              disabled={isLoading}
            />
            {usernameError && <ErrorText>{usernameError}</ErrorText>}

            <DateContainer>
              <StyledInput
                type="number"
                placeholder="dd"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                disabled={isLoading}
              />
              <StyledSelected value={month} onChange={(e) => setMonth(e.target.value)} disabled={isLoading}>
                {months.map((m, index) => (
                  <option key={index} value={m}>
                    {m}
                  </option>
                ))}
              </StyledSelected>
              <StyledInput
                type="number"
                placeholder="yyyy"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                disabled={isLoading}
              />
            </DateContainer>
            {dobError && <ErrorText>{dobError}</ErrorText>}
            <Label> Gender </Label>
            <SubText>We use your gender to help personalize our content recommendations and ads for you.</SubText>
            <GenderContainer>
              {["Man", "Woman", "Non-binary"].map((option) => (
                <GenderOption key={option}>
                  <input
                    type="radio"
                    id={option}
                    name="gender"
                    value={option}
                    checked={gender === option}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor={option}>{option}</label>
                </GenderOption>
              ))}
            </GenderContainer>      
            <SubmitButton type="submit" disabled={!username || !day || !month || !year || isLoading}>
              {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
            </SubmitButton>
          </form>
        )}
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
