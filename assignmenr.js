document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const fullName = document.getElementById("fullName").value.trim();
    const aadharNumber = document.getElementById("aadharNumber").value.trim();
    const panCard = document.getElementById("panCard").value.trim();
    const mobileNumber = document.getElementById("mobileNumber").value.trim();
    const dob = document.getElementById("dob").value;
    const marksInputs = document.querySelectorAll("#marksInputs input");

    // Split full name into parts
    const nameParts = fullName.split(" ");
    if (nameParts.length < 2) {
        alert("Please enter at least first name and last name.");
        return;
    }
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    const middleName = nameParts.slice(1, -1).join(" ") || "N/A";

    // Validate Aadhar Number
    if (!/^\d{12}$/.test(aadharNumber)) {
        alert("Aadhar number must be a 12-digit numeric value.");
        return;
    }

    // Validate PAN Card Number
    if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(panCard)) {
        alert("PAN card number must follow the format: 5 letters, 4 digits, 1 letter.");
        return;
    }

    // Validate Mobile Number
    if (!/^\d{10}$/.test(mobileNumber)) {
        alert("Mobile number must be a 10-digit numeric value.");
        return;
    }

    // Validate Date of Birth
    const dobDate = new Date(dob);
    if (dobDate >= new Date()) {
        alert("Date of birth must be a valid past date.");
        return;
    }

    // Calculate percentage for best of five subjects
    const marks = Array.from(marksInputs).map((input) => parseFloat(input.value));
    if (marks.some((mark) => isNaN(mark) || mark < 0 || mark > 100)) {
        alert("Please enter valid marks between 0 and 100 for all subjects.");
        return;
    }
    marks.sort((a, b) => b - a); // Sort marks in descending order
    const bestOfFive = marks.slice(0, 5);
    const percentage = bestOfFive.reduce((sum, mark) => sum + mark, 0) / 5;

    // Display results
    alert(`Registration Successful!\n\nName: ${firstName} ${middleName} ${lastName}\nAadhar: ${aadharNumber}\nPAN: ${panCard}\nMobile: ${mobileNumber}\nDOB: ${dob}\nBest of Five Percentage: ${percentage.toFixed(2)}%`);
});