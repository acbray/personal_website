document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("contact-form").onsubmit = async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    var json = JSON.stringify(data);

    var response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    });
    if (response.ok) {
      alert("Message sent.");
      location.reload();
    } else {
      alert("Error sending message.");
      console.error("Error:", response.statusText);
    }
  };
});
