const API_URL = "http://localhost:3000";

// Elements
const doctorSelect = document.getElementById("doctorSelect");
const appointmentForm = document.getElementById("appointment-form");
const appointmentsList = document.getElementById("appointmentsList");

// Load doctors into dropdown
async function loadDoctors() {
  const res = await fetch(`${API_URL}/doctors`);
  const doctors = await res.json();
  doctors.forEach(doc => {
    const option = document.createElement("option");
    option.value = doc.id;
    option.textContent = doc.name;
    doctorSelect.appendChild(option);
  });
}

// Load appointments
async function loadAppointments() {
  appointmentsList.innerHTML = "";
  const res = await fetch(`${API_URL}/appointments`);
  const appointments = await res.json();
  
  appointments.forEach(app => {
    const li = document.createElement("li");
    li.textContent = `${app.patientName} with ${app.doctorName} on ${new Date(app.time).toLocaleString()}`;
    appointmentsList.appendChild(li);
  });
}

// Handle new booking
appointmentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const patientName = document.getElementById("patientName").value;
  const doctorId = document.getElementById("doctorSelect").value;
  const time = document.getElementById("appointmentTime").value;

  // Get doctor details
  const docRes = await fetch(`${API_URL}/doctors/${doctorId}`);
  const doctor = await docRes.json();

  // Save appointment
  await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patientName,
      doctorId,
      doctorName: doctor.name,
      time
    })
  });

  appointmentForm.reset();
  loadAppointments();
});

// Init
loadDoctors();
loadAppointments();
