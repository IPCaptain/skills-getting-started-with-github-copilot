document.addEventListener("DOMContentLoaded", () => {document.addEventListener("DOMContentLoaded", () => {});  }    messageDiv.classList.remove("hidden");    messageDiv.className = `message ${type}`;    messageDiv.textContent = message;  function showMessage(message, type) {  });    signupForm.reset();    });      activitySelect.appendChild(option);      option.textContent = name;      option.value = name;      const option = document.createElement("option");      // Add option to select dropdown      activitiesList.appendChild(activityCard);      `;        </ul>          ${details.participants.map(participant => `<li>${participant}</li>`).join("")}        <ul>        <p><strong>Participants:</strong></p>        <p><strong>Availability:</strong> ${spotsLeft} spots left</p>        <p><strong>Schedule:</strong> ${details.schedule}</p>        <p>${details.description}</p>        <h4>${name}</h4>      activityCard.innerHTML = `      const spotsLeft = details.max_participants - details.participants.length;      activityCard.className = "activity-card";      const activityCard = document.createElement("div");    Object.entries(activities).forEach(([name, details]) => {    activitySelect.innerHTML = '<option value="">-- Select an activity --</option>';    activitiesList.innerHTML = "";    // Update the activities list    showMessage("You have successfully signed up for the activity!", "success");    activity.participants.push(email);    }      return;      showMessage("Sorry, this activity is full.", "error");    if (activity.participants.length >= activity.max_participants) {    const activity = activities[selectedActivity];    }      return;      showMessage("Please select an activity.", "error");    if (!selectedActivity) {    const selectedActivity = activitySelect.value;    const email = document.getElementById("email").value;    e.preventDefault();  signupForm.addEventListener("submit", (e) => {  });    activitySelect.appendChild(option);    option.textContent = name;    option.value = name;    const option = document.createElement("option");    // Add option to select dropdown    activitiesList.appendChild(activityCard);    `;      </ul>        ${details.participants.map(participant => `<li>${participant}</li>`).join("")}      <ul>      <p><strong>Participants:</strong></p>      <p><strong>Availability:</strong> ${spotsLeft} spots left</p>      <p><strong>Schedule:</strong> ${details.schedule}</p>      <p>${details.description}</p>      <h4>${name}</h4>    activityCard.innerHTML = `    const spotsLeft = details.max_participants - details.participants.length;    activityCard.className = "activity-card";    const activityCard = document.createElement("div");  Object.entries(activities).forEach(([name, details]) => {  };    }      participants: ["Alice Johnson", "Bob Brown"]      max_participants: 15,      schedule: "Fridays, 3:00 PM - 5:00 PM",      description: "Improve your chess skills and participate in chess competitions.",    "Chess Club": {    },      participants: ["John Doe", "Jane Smith"]      max_participants: 20,      schedule: "Mondays and Wednesdays, 4:00 PM - 6:00 PM",      description: "Join the basketball team and compete in local tournaments.",    "Basketball": {  const activities = {  const messageDiv = document.getElementById("message");  const signupForm = document.getElementById("signup-form");  const activitySelect = document.getElementById("activity");  const activitiesList = document.getElementById("activities-list");  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // Clear loading message
      activitiesList.innerHTML = "";

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
          <p><strong>Participants:</strong></p>
          <ul>
            ${details.participants.map(participant => `<li>${participant}</li>`).join("")}
          </ul>
        `;

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  fetchActivities();
});
