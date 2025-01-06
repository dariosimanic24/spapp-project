const form = document.getElementById('register-form');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordStrength = document.getElementById('password-strength');

const validatePasswordStrength = password => {
    const criteria = [
        /[A-Z]/, /[a-z]/, /[0-9]/, /[@$!%*?&]/, /.{8,}/
    ];
    const messages = [
        '1 uppercase letter', '1 lowercase letter', '1 number', '1 special character', 'Minimum 8 characters'
    ];

    const unmet = criteria.map((regex, i) => (!regex.test(password) ? messages[i] : null)).filter(Boolean);
    return unmet.length === 0 ? 'Strong password' : `Password must include: ${unmet.join(', ')}`;
};

const showToastrMessage = (type, message) => toastr[type](message);

passwordInput.addEventListener('input', () => {
    const message = validatePasswordStrength(passwordInput.value);
    passwordStrength.textContent = message;
    passwordStrength.style.color = message === 'Strong password' ? 'green' : 'red';
});

form.addEventListener('submit', e => {
    e.preventDefault();

    const inputs = ['email', 'name', 'surname', 'username', 'dob'].map(id => document.getElementById(id).value);
    if (inputs.some(input => !input)) return showToastrMessage('error', 'All fields are required!');

    if (passwordInput.value !== confirmPasswordInput.value) return showToastrMessage('error', 'Passwords do not match!');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs[0])) return showToastrMessage('error', 'Please enter a valid email address!');

    const passwordMessage = validatePasswordStrength(passwordInput.value);
    if (passwordMessage !== 'Strong password') return showToastrMessage('error', `Password is not strong enough: ${passwordMessage}`);

    showToastrMessage('success', 'Registration Successful!');
    form.reset();
    passwordStrength.textContent = '';
});
