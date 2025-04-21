import './App.css';
import axios from 'axios';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
// import { toast } from "react-toastify";

function Login() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [submissionMessage, setSubmissionMessage] = useState(""); // State to display submission message

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cookies: document.cookie,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const setCookie = (name, value, options = {}) => {
    Cookies.set(name, value, options);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start the loading state
    axios
      .post("https://kannada-koota-tickets.vercel.app/auth/proxy/login/", formData, {
        withCredentials:true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // toast.success("login success... kindly handle data with care!!!");
        setCookie('sessionid',response.data['sessionid'],{expires:7});
        
        history.push("/");
        // Handle the successful response
        setIsLoading(false);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle any errors
        // toast.error("Try again!!")
        setFormData({
            email: "",
            password: "",
          })
          setIsLoading(false); // Reset the loading state
          setSubmissionMessage("Login failed try again!!")
        console.error("Error sending POST request:", error);
      });
    

  };
  return (
    <div>
    <h2 >ಕನ್ನಡ ಕೂಟ</h2>
    <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Username"
        />
      </div>
      <div className="form-control">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Password"
        />
      </div>
      {isLoading ? (
            <button className="btn" type="button" disabled>
              Authenticating...
            </button>
          ) : (
            <button className="btn" type="submit">
              Login
            </button>
          )}
          {submissionMessage && (
            <p>{submissionMessage} </p>
          )}
    </form>
    </div>
    </div>
);
}


export default Login;
