
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

export const ConvertKitForm = ({ 
  className = "", 
  inputClassName = "", 
  buttonClassName = "", 
  buttonText = "Join the Community",
  placeholder = "Enter your email address...",
  successMessage = "You are in! Welcome to the community."
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Attempting ConvertKit submission...");

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      console.log("Error: Invalid email format");
      return;
    }
    
    setStatus("loading");
    
    try {
      const formId = import.meta.env.VITE_CONVERTKIT_FORM_ID;
      const apiKey = import.meta.env.VITE_CONVERTKIT_API_KEY;

      console.log(`API Key present: ${!!apiKey}`);
      console.log(`Form ID present: ${!!formId}`);

      const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          email: email,
        }),
      });
      
      console.log(`Response status: ${response.status}`);

      if (response.ok) {
        setStatus("success");
        console.log("Success");
      } else {
        setStatus("error");
        console.log(`Error: API returned status ${response.status}`);
      }
    } catch (error: any) {
      setStatus("error");
      console.log(`Error: ${error.message || "Network error"}`);
    }
  };

  if (status === "success") {
    return (
      <div className={`text-brand-cyan font-bold font-mono text-center py-4 text-lg ${className}`}>
        {successMessage}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <form className={className} onSubmit={handleSubmit}>
        <input 
          id="email-input"
          name="email"
          type="email" 
          placeholder={placeholder}
          className={inputClassName}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
        />
        <button 
          type="submit" 
          className={`${buttonClassName} ${status === "loading" ? "animate-pulse opacity-80" : ""}`}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Joining..." : buttonText}
        </button>
      </form>
      {status === "error" && (
        <div className="text-red-500 text-sm mt-2 font-mono text-center absolute -bottom-6 left-0 right-0">
          Something went wrong. Please try again.
        </div>
      )}
    </div>
  );
};
