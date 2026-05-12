
import React, { useState } from 'react';

type ConvertKitFormProps = {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  buttonText?: string;
  placeholder?: string;
  successMessage?: string;
  onSuccess?: (email: string) => void;
};

export const ConvertKitForm = ({
  className = "",
  inputClassName = "",
  buttonClassName = "",
  buttonText = "Join the Community",
  placeholder = "Enter your email address...",
  successMessage = "You are in! Welcome to the community.",
  onSuccess,
}: ConvertKitFormProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        onSuccess?.(email);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
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
