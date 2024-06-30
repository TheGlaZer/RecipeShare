import { useState } from "react";

export const useFormValidationError = (email, password) => {

    const [errors, setErrors] = useState([]);

    const validateForm = () => {
        const errors = []

        if (!email.trim()) {
            errors.push("Email is requierd")
        }
        if (!password.trim()) {
            errors.push("Password is requierd")
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push("Email is not valid")
        }

        setErrors(errors)
        return errors.length === 0
    }

    return { errors, validateForm }

}