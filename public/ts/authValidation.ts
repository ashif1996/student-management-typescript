document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm") as HTMLFormElement | null;
    const loginForm = document.getElementById("loginForm") as HTMLFormElement | null;
    const editProfileForm = document.getElementById("editProfileForm") as HTMLFormElement | null;

    const displayErrors = (fieldId: string, message: string): void => {
        const errorElement = document.getElementById(`${fieldId}Error`);
        if (errorElement instanceof HTMLSpanElement) {
            errorElement.textContent = message;
        }
        
        const inputElement = document.getElementById(fieldId);
        if (inputElement instanceof HTMLInputElement) {
            inputElement.classList.add("error-border");
        }
    };

    const clearErrors = (): void => {
        document.querySelectorAll<HTMLSpanElement>(".error-message").forEach((error) => {
            (error as HTMLSpanElement).textContent = "";
        });

        document.querySelectorAll<HTMLInputElement>(".error-border").forEach((input) => {
            (input as HTMLInputElement).classList.remove("error-border");
        });
    };

    const validateLoginForm = (): boolean => {
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        if (!(emailInput instanceof HTMLInputElement) || !(passwordInput instanceof HTMLInputElement)) {
            throw new Error("Login form fields are missing.");
        }

        const email: string = emailInput.value.trim();
        const password: string = passwordInput.value.trim();
        let isValid: boolean = true;

        clearErrors();

        // Validate email
        if (!email) {
            displayErrors("email", "Email is required.");
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            displayErrors("email", "Please enter a valid email address.");
            isValid = false;
        }

        // Validate password
        if (!password) {
            displayErrors("password", "Password is required.");
            isValid = false;
        } else if (password.length < 6) {
            displayErrors("password", "Password must be at least 6 characters long.");
            isValid = false;
        }
        
        return isValid;
    };

    const validateRegistrationForm = (isSignupForm: boolean): boolean => {
        const firstnameInput = document.getElementById("firstname");
        const lastnameInput = document.getElementById("lastname");
        const emailInput = document.getElementById("email");
        const passwordInput = isSignupForm ? document.getElementById("pwd") : null;
        const confirmPasswordInput = isSignupForm ? document.getElementById("pwdConf") : null;

        if (
            !(firstnameInput instanceof HTMLInputElement) ||
            !(lastnameInput instanceof HTMLInputElement) ||
            !(emailInput instanceof HTMLInputElement) ||
            (isSignupForm && (!(passwordInput instanceof HTMLInputElement) || !(confirmPasswordInput instanceof HTMLInputElement)))
        ) {
            throw new Error("Required fields are missing.");
        }

        const firstname: string = firstnameInput.value.trim();
        const lastname: string = lastnameInput.value.trim();
        const email: string = emailInput.value.trim();
        let isValid: boolean = true;

        clearErrors();

        // Validate firstname
        if (!firstname) {
            displayErrors("firstname", "First name is required.");
            isValid = false;
        } else if (firstname.length < 2) {
            displayErrors("firstname", "First name must be at least 2 characters.");
            isValid = false;
        } else if (/[^a-zA-Z]/.test(firstname)) { // Check for numbers or special characters
            displayErrors("firstname", "First name cannot contain numbers or special characters.");
            isValid = false;
        }

        // Validate lastname
        if (!lastname) {
            displayErrors("lastname", "Last name is required.");
            isValid = false;
        } else if (lastname.length < 2) {
            displayErrors("lastname", "Last name must be at least 2 characters.");
            isValid = false;
        } else if (/[^a-zA-Z]/.test(lastname)) { // Check for numbers or special characters
            displayErrors("lastname", "Last name cannot contain numbers or special characters.");
            isValid = false;
        }

        // Validate email
        if (!email) {
            displayErrors("email", "Email is required.");
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            displayErrors("email", "Please enter a valid email address.");
            isValid = false;
        }

        if (isSignupForm && passwordInput instanceof HTMLInputElement && confirmPasswordInput instanceof HTMLInputElement) {
            const password: string = passwordInput.value.trim();
            const confirmPassword: string = confirmPasswordInput.value.trim();

            // Validate password
            if (!password) {
                displayErrors("pwd", "Password is required.");
                isValid = false;
            } else if (password.length < 6) {
                displayErrors("pwd", "Password must be at least 6 characters long.");
                isValid = false;
            }

            // Validate password confirmation
            if (!confirmPassword) {
                displayErrors("pwdConf", "Please confirm your password.");
                isValid = false;
            } else if (password !== confirmPassword) {
                displayErrors("pwdConf", "Passwords do not match.");
                isValid = false;
            }
        }

        return isValid;
    };

    if (loginForm) {
        loginForm.addEventListener("submit", (event: SubmitEvent) => {
            event.preventDefault();

            const isValid: boolean = validateLoginForm();
            if (isValid) {
                loginForm.submit();
            }
        });

        // Clear error messages on input
        document.querySelectorAll<HTMLInputElement>('input').forEach((input) => {
            input.addEventListener("input", (event: Event) => {
                clearErrors();
            });
        });
    }

    if (registrationForm) {
        registrationForm.addEventListener("submit", (event: SubmitEvent) => {
            event.preventDefault();

            const isValid: boolean = validateRegistrationForm(true);
            if (isValid) {
                registrationForm.submit();
            }
        });

        // Clear error messages on input
        document.querySelectorAll<HTMLInputElement>('input').forEach((input) => {
            input.addEventListener("input", (event: Event) => {
                clearErrors();
            });
        });
    }

    if (editProfileForm) {
        editProfileForm.addEventListener("submit", (event: SubmitEvent) => {
            event.preventDefault();

            const isValid: boolean = validateRegistrationForm(false);
            if (isValid) {
                editProfileForm.submit();
            }
        });

        // Clear error messages on input
        document.querySelectorAll<HTMLInputElement>('input').forEach((input) => {
            input.addEventListener("input", (event: Event) => {
                clearErrors();
            });
        });
    }
});