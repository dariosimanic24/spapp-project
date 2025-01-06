
toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    timeOut: '3000',
};


const showToastrMessage = (type, message) =>
    toastr[type](message);


document.querySelector('#exchange-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = document.getElementById('amount').value;

    fromCurrency && toCurrency && amount > 0
        ? showToastrMessage('success', 'Exchange request submitted successfully!')
        : showToastrMessage('error', 'Please fill all fields correctly.');
});

document.querySelectorAll('.toggle-button').forEach((button) => {
    button.addEventListener('click', () => {
        const faqContent = button.nextElementSibling;
        faqContent.style.display = faqContent.style.display === 'block' ? 'none' : 'block';
    });
});
