// Show modal after 10 seconds
setTimeout(() => {
    const modal = new bootstrap.Modal(document.getElementById('bookModal'));
    modal.show();
}, 10000);

// Handle Buy Now button (closes modal + scrolls to contact)
document.getElementById("buyNowBtn").addEventListener("click", function (e) {
    const modalEl = document.getElementById('bookModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    // Smooth scroll to contact after modal closes
    setTimeout(() => {
        document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    }, 300);
});

// Contact Form → Google Sheets
const scriptURL = "https://script.google.com/macros/s/AKfycbz9Rgesx40juhowVFsfMhXlJg4UTbg6Qnv1ttlkqPXyRpBXZMp0Uh6hFekiois3jOaoVQ/exec"; // from Apps Script
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");

form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(formData)
    })
        .then(res => res.json())
        .then(data => {
            msg.innerHTML = "<span class='text-success'>Message sent successfully!</span>";
            form.reset();
        })
        .catch(err => {
            msg.innerHTML = "<span class='text-danger'>Error sending message. Try again!</span>";
        });
});