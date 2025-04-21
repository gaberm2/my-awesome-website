// Global variables to simulate a basic database for demonstration purposes
const users = [];
let otpStorage = {}; // Store OTPs temporarily

// Utility functions
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
}

function validateEmail(email) {
    const regex = /^[\w-\.]+@[\w-]+\.[a-z]{2,}$/i;
    return regex.test(email);
}

// Registration Page Functionality
function registerUser(email, firstName, lastName, number) {
    if (!validateEmail(email)) {
        console.error("Invalid email address.");
        return;
    }
    const otp = generateOTP();
    otpStorage[email] = otp; // Save OTP temporarily
    console.log(`OTP sent to ${email}: ${otp}`); // Simulating OTP sending
    return otp;
}

function verifyAndSaveUser(email, enteredOTP, firstName, lastName, number) {
    if (otpStorage[email] && otpStorage[email] == enteredOTP) {
        users.push({ email, firstName, lastName, number });
        delete otpStorage[email]; // Remove OTP after successful verification
        console.log("User registered successfully:", { email, firstName, lastName, number });
        return true;
    } else {
        console.error("Invalid OTP.");
        return false;
    }
}

// Login Page Functionality
function loginUser(email, password) {
    const user = users.find(u => u.email === email);
    if (!user) {
        console.error("User not found.");
        return false;
    }
    console.log(`Login successful for user: ${email}`);
    return true; // For simplicity, password validation is skipped
}

// Homepage Logic
function displayFeatures() {
    const features = [
        "إدارة الموظفين",
        "تقارير وتحليلات",
        "واجهة متجاوبة",
    ];
    features.forEach((feature, index) => {
        console.log(`Feature ${index + 1}: ${feature}`);
    });
}

function displayFeaturedEmployees() {
    const employees = [
        { name: "أحمد محمد", position: "مدير الموارد البشرية" },
        { name: "سارة عبدالله", position: "أخصائية توظيف" },
        { name: "خالد سعيد", position: "مدير التدريب" },
    ];
    employees.forEach(employee => {
        console.log(`Employee: ${employee.name}, Position: ${employee.position}`);
    });
}

// Example Simulations
console.log("--- Registration Simulation ---");
const otp = registerUser("example@example.com", "أحمد", "محمد", "0123456789");
if (otp) {
    const isRegistered = verifyAndSaveUser("example@example.com", otp, "أحمد", "محمد", "0123456789");
    if (isRegistered) {
        console.log("--- Login Simulation ---");
        loginUser("example@example.com", "password123");
    }
}

console.log("--- Homepage Simulation ---");
displayFeatures();
displayFeaturedEmployees();
