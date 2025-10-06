function validateForm() {
    // Get values
    let username = document.getElementById('username').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let password = document.getElementById('password').value.trim();
    let confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Reset previous error messages
    document.querySelectorAll('.error-msg').forEach(el => el.innerText = "");

    let isValid = true;

    // Username validation
    if (username === "") {
        document.getElementById('usernameError').innerText = "Username cannot be empty.";
        isValid = false;
    }

    // Email validation (corrected)
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    if (email === "") {
        document.getElementById('emailError').innerText = "Email cannot be empty.";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').innerText = "Email format is invalid.";
        isValid = false;
    }

    // Phone validation
    let phoneRegex = /^[0-9]{10}$/;
    if (phone === "") {
        document.getElementById('phoneError').innerText = "Phone cannot be empty.";
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').innerText = "Phone must be 10 digits numeric.";
        isValid = false;
    }

    // Password validation
    let passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[&$#@]).{7,}$/;
    if (password === "") {
        document.getElementById('passwordError').innerText = "Password cannot be empty.";
        isValid = false;
    } else if (!passwordRegex.test(password)) {
        document.getElementById('passwordError').innerText = "Min 7 chars, 1 uppercase, 1 digit, 1 special (&,$,#,@).";
        isValid = false;
    }

    // Confirm password
    if (confirmPassword === "") {
        document.getElementById('confirmPasswordError').innerText = "Confirm your password.";
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerText = "Passwords do not match.";
        isValid = false;
    }

    if (isValid) {
        alert("Registration Successful!");
    }

    return false; // prevent actual form submission for demo
}
