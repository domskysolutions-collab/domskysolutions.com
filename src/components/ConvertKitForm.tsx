
import React, { useId, useState } from 'react';

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
  buttonText = "Get the Weekly Edge",
  placeholder = "Enter your email address...",
  successMessage = "You are in! Look out for The Weekly Edge in your inbox.",
  onSuccess,
}: ConvertKitFormProps) => {
  const emailId = useId();
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
      <div role="status" className={`text-brand-cyan font-bold font-mono text-center py-4 text-lg ${className}`}>
        {successMessage}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <label htmlFor={emailId} className="block text-sm text-gray-300 mb-2">Email address</label>
      <form className={className} onSubmit={handleSubmit}>
        <input 
          id={emailId}
          autoComplete="email"
          aria-describedby={`${emailId}-privacy`}
          aria-invalid={status === "error"}
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
      <p id={`${emailId}-privacy`} className="text-xs text-gray-400 mt-3">Get The Weekly Edge by email. Unsubscribe anytime. <a href="/privacy" className="underline">Privacy policy</a>.</p>
      {status === "error" && (
        <div role="alert" className="text-red-400 text-sm mt-2 font-mono text-center">
          Something went wrong. Please try again.
        </div>
      )}
    </div>
  );
};

