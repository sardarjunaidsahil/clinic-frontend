export const validators = {
  required: (value) => {
    if (!value || (typeof value === "string" && !value.trim()))
      return "This field is required";
    return null;
  },

  email: (value) => {
    if (!value) return "Email is required";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) return "Please enter a valid email";
    return null;
  },

  phone: (value) => {
    if (!value) return "Phone is required";
    const cleaned = value.replace(/\s+/g, "");
    if (cleaned.length < 10) return "Please enter a valid phone number";
    return null;
  },

  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return null;
  },

  confirmPassword: (value, original) => {
    if (!value) return "Please confirm your password";
    if (value !== original) return "Passwords do not match";
    return null;
  },

  minLength: (min) => (value) => {
    if (!value || value.length < min)
      return `Minimum ${min} characters required`;
    return null;
  },

  validateForm: (fields) => {
    const errors = {};
    let hasErrors = false;
    Object.entries(fields).forEach(([key, { value, rules }]) => {
      for (const rule of rules) {
        const error = rule(value);
        if (error) {
          errors[key] = error;
          hasErrors = true;
          break;
        }
      }
    });
    return { errors, isValid: !hasErrors };
  },
};
