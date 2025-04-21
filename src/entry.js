import './App.css';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import React, { useState, useEffect } from "react";

function Entry() {
  const history = useHistory();

  useEffect(() => {
    axios.post("https://kannada-koota-tickets.vercel.app/auth/status/", { cookies: document.cookie })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        history.replace('/login');
      });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    universityId: "",
    email: "",
    contact: "",
    paymentMethod: "Online",
    ttype: "general",
    cookies: document.cookie,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [setlogout, setlogoutmsg] = useState("Logout");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmissionMessage("");
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogout = () => {
    setlogoutmsg("Logging out...");
    axios
      .post("https://kannada-koota-tickets.vercel.app/auth/logout/", { cookies: document.cookie }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        history.replace('/login');
      })
      .catch((error) => {
        setlogoutmsg("Logout");
        console.error("Error sending POST request:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
      
      if (window.confirm(`\nPlease verify your email address:\n${formData.email}\n`)) {
        setIsSubmitting(true); // Start the submission state
        setSubmissionMessage("");
      
        axios
          .post("https://kannada-koota-tickets.vercel.app/ticket/submit/", formData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setFormData({
              name: "",
              universityId: "",
              email: "",
              contact: "",
              ttype: "general",
              paymentMethod: "Online",
              cookies: document.cookie,
            });
            setIsSubmitting(false); // Reset the submission state
            setSubmissionMessage("Data successfully submitted");
            console.log("Response:", response.data);
          })
          .catch((error) => {
            setIsSubmitting(false);
            setSubmissionMessage("Error occurred. Please try again");
            console.error("Error sending POST request:", error);
          });

      }
    
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        {setlogout}
      </button>

      <h2>ಕನ್ನಡ ಕೂಟ</h2>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name"
              autoComplete="off"
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="universityId"
              value={formData.universityId}
              onChange={handleChange}
              required
              placeholder="University ID"
              autoComplete="off"
            />
          </div>
          <div className="form-control">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              autoComplete="off"
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder="Contact"
              autoComplete="off"
            />
          </div>


<div clasName="radiodiv">
  <div>
    <div className="form-control">
      <div className="radio-option">
        <input
          type="radio"
          name="paymentMethod"
          value="Online"
          checked={formData.paymentMethod === "Online"}
          onChange={handleChange}
        />
        <label htmlFor="online">Online</label>
      </div>
      <div className="radio-option">
        <input
          type="radio"
          name="paymentMethod"
          value="Cash"
          checked={formData.paymentMethod === "Cash"}
          onChange={handleChange}
        />
        <label htmlFor="cash">Cash</label>
      </div>
    </div>
  </div>
  
  
  <div>
  <div className="form-control">
    <div className="radio-option">
      <input
        type="radio"
        name="ttype"
        value="general"
        checked={formData.ttype === "general"}
        onChange={handleChange}
      />
      <label htmlFor="general">General</label>
    </div>
    <div className="radio-option">
      <input
        type="radio"
        name="ttype"
        value="VIP"
        checked={formData.ttype === "VIP"}
        onChange={handleChange}
      />
      <label htmlFor="vip">VIP</label>
    </div>
    </div>
  </div>
</div>



    
          {/* Rest of your form elements */}
          {/* ... */}

          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {submissionMessage && <p>{submissionMessage} </p>}
        </form>
      </div>
    </div>
  );
}

export default Entry;

          
          