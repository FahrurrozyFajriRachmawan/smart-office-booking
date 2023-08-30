const tableContainer = document.getElementById("tableContainer");
const roomContainer = document.getElementById("roomContainer");
const tables = document.querySelectorAll(".table");
const rooms = document.querySelectorAll(".room");
const modal = document.getElementById("modal");
const confirmationModalTable = document.getElementById(
  "confirmationModalTable"
);
const confirmationModalRoom = document.getElementById("confirmationModalRoom");
const confirmButtonTable = confirmationModalTable.querySelector(
  ".confirm-button-table"
);
const cancelButtonTable = confirmationModalTable.querySelector(
  ".cancel-button-table"
);
const confirmButtonRoom = confirmationModalRoom.querySelector(
  ".confirm-button-room"
);
const cancelButtonRoom = confirmationModalRoom.querySelector(
  ".cancel-button-room"
);
const closeButtonModal = document.getElementById("closeButtonModal");
const successModalTable = document.getElementById("successModalTable");
const successModalRoom = document.getElementById("successModalRoom");
const successTableNumber = document.getElementById("successTableNumber");
const confirmTableNumber = document.getElementById("confirmTableNumber");
const confirmRoomNumber = document.getElementById("confirmRoomNumber");
const successRoomNumber = document.getElementById("successRoomNumber");
const closeButtonTable = successModalTable.querySelector(".close-button");
const closeButtonRoom = successModalRoom.querySelector(".close-button");

let selectedTable = null;
let selectedRoom = null;

const hotDesk = document.querySelector("#hot-desk-button");
const modalHotDesk = document.getElementById("modalHotDesk");
const meetingRoom = document.querySelector("#meeting-room-button");
const modalMeetingRoom = document.getElementById("modalMeetingRoom");

const enterTheRoom = document.getElementById("enterTheRoom");
const exitTheRoom = document.getElementById("exitTheRoom");
const enterTheTable = document.getElementById("enterTheTable");
const exitTheTable = document.getElementById("exitTheTable");
const currentTimeElement = document.getElementById("currentTime");

const zoneDropdown = document.getElementById("zoneDropdown");
const zoneContent = document.getElementById("zoneContent");
const zones = document.querySelectorAll(".zone");

let hotDeskAccess = false;
let meetingRoomAccess = false;

const tableInfoContainer = document.querySelector(".table-info-container");
const tableInfo = document.querySelectorAll(".table-info");
const roomInfoContainer = document.querySelector(".room-info-container");
const roomInfo = document.querySelectorAll(".room-info");

const logoutButton = document.getElementById("logoutButton");
const logoutBookedModal2 = document.getElementById("logoutBookedModal2");

document.addEventListener("click", outsideClickHandler);

// Section table
tables.forEach((table) => {
  const bookButton = table.querySelector(".book-button");

  table.addEventListener("click", (event) => {
    // Zoom in table
    event.stopPropagation();
    if (!tableContainer.classList.contains("zoomed-in")) {
      tableContainer.classList.add("zoomed-in");
      roomContainer.style.display = "none";
    }
  });

  // Book button for table
  bookButton.addEventListener("click", (event) => {
    event.stopPropagation();
    selectedTable = table;

    if (selectedTable) {
      // Time you enter
      const now = new Date();
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      // Table number
      confirmTableNumber.textContent =
        selectedTable.querySelector(".table-name").textContent;
      confirmationModalTable.style.display = "block";

      confirmationModalTable.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      successModalTable.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    }

    updateTableInfo();
  });

  // Modal confirmation button
  confirmButtonTable.addEventListener("click", (event) => {
    event.stopPropagation();
    if (selectedTable) {
      selectedTable.style.backgroundColor = "#ccc";

      // Deactivate button book now
      const selectedBookButton = selectedTable.querySelector(".book-button");
      selectedBookButton.disabled = true;

      // Already booked
      selectedTable.classList.add("booked");

      // Close confirmation
      confirmationModalTable.style.display = "none";

      // Open modal success
      successTableNumber.textContent =
        selectedTable.querySelector(".table-name").textContent;
      successModalTable.style.display = "block";

      // Reset the selected table
      selectedTable = null;

      updateTableInfo(); // Update table information
      populateBookedTableDropdown(); // Update the booked table dropdown
    }
  });

  // Modal cancel button booking
  cancelButtonTable.addEventListener("click", (event) => {
    event.stopPropagation();
    confirmationModalTable.style.display = "none";
  });

  // Modal close button success
  closeButtonTable.addEventListener("click", (event) => {
    event.stopPropagation();
    successModalTable.style.display = "none";
  });
});

// Section room
rooms.forEach((room) => {
  const bookButton = room.querySelector(".book-button");

  room.addEventListener("click", (event) => {
    // Zoom in table
    event.stopPropagation();
    if (!roomContainer.classList.contains("zoomed-in")) {
      roomContainer.classList.add("zoomed-in");
      tableContainer.style.display = "none";
    }
  });

  // Book button for room
  bookButton.addEventListener("click", (event) => {
    event.stopPropagation();
    selectedRoom = room;

    // Time you enter
    if (selectedRoom) {
      const now = new Date();
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      // currentTimeRoom.value = formattedTime;

      // Room number
      confirmRoomNumber.textContent =
        selectedRoom.querySelector(".room-name").textContent;
      confirmationModalRoom.style.display = "block";

      confirmationModalTable.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      successModalTable.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    }
  });

  // Modal confirmation button
  confirmButtonRoom.addEventListener("click", (event) => {
    event.stopPropagation();
    if (selectedRoom) {
      // Change the color to gray
      selectedRoom.style.backgroundColor = "#ccc";

      // Deactivate button book now
      const selectedBookButton = selectedRoom.querySelector(".book-button");
      selectedBookButton.disabled = true;

      // Already booked
      selectedRoom.classList.add("booked");

      // Close confirmation
      confirmationModalRoom.style.display = "none";

      // Open modal success
      successRoomNumber.textContent =
        selectedRoom.querySelector(".room-name").textContent;
      successModalRoom.style.display = "block";

      // Reset the selected room
      selectedRoom = null;

      updateRoomInfo();
    }
  });

  // Modal cancel button booking
  cancelButtonRoom.addEventListener("click", (event) => {
    event.stopPropagation();
    confirmationModalRoom.style.display = "none";
  });

  // Modal close button success
  closeButtonRoom.addEventListener("click", (event) => {
    event.stopPropagation();
    successModalRoom.style.display = "none";
  });
});

// Zoom out container room, table
function outsideClickHandler(event) {
  if (!event.target.closest(".table-container", "room-container")) {
    roomContainer.style.display = "block";
    tableContainer.style.display = "block";
    tableContainer.classList.remove("zoomed-in");
    roomContainer.classList.remove("zoomed-in");
  }
}

// Front page time
function updateCurrentTime() {
  const currentTimeElement = document.getElementById("current-time");
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  currentTimeElement.textContent = `${formattedHours}:${minutes} ${ampm}`;
}

// Display current time
updateCurrentTime();

// Enter time room
for (let hours = 10; hours < 12; hours++) {
  for (let minutes = 0; minutes < 60; minutes += 30) {
    const option = document.createElement("option");
    option.value = `${hours}:${minutes}`;
    option.innerText = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    enterTheRoom.appendChild(option);
  }
}

// Exit time room
for (let hours = 10; hours < 12; hours++) {
  for (let minutes = 0; minutes < 60; minutes += 30) {
    if (hours === 10 && minutes === 0) {
      // Skip the time 10:00 AM
      continue;
    }
    const option = document.createElement("option");
    option.value = `${hours}:${minutes}`;
    option.innerText = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    exitTheRoom.appendChild(option);
  }
}

// Enter time table
for (let hours = 10; hours < 12; hours++) {
  for (let minutes = 0; minutes < 60; minutes += 30) {
    const option = document.createElement("option");
    option.value = `${hours}:${minutes}`;
    option.innerText = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    enterTheTable.appendChild(option);
  }
}

// Exit time table
for (let hours = 10; hours < 12; hours++) {
  for (let minutes = 0; minutes < 60; minutes += 30) {
    if (hours === 10 && minutes === 0) {
      // Skip the time 10:00 AM
      continue;
    }
    const option = document.createElement("option");
    option.value = `${hours}:${minutes}`;
    option.innerText = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    exitTheTable.appendChild(option);
  }
}

// Table hot desk
function updateTableInfo() {
  tableInfo.forEach((info, index) => {
    const tableElement = tables[index];

    info.querySelector(".table-info-name").textContent;

    const tableInfoBookButton = info.querySelector(".table-info-book-button");
    if (
      tableElement.classList.contains("booked") ||
      tableElement.classList.contains("under-maintenance") ||
      tableElement.classList.contains("available-next-hour")
    ) {
      info.classList.add("booked");
      tableInfoBookButton.disabled = true;
    } else {
      info.classList.remove("booked");
      tableInfoBookButton.disabled = false;
    }
  });
}

// Add event listener to table info "Book Now" button
const tableInfoBookButtons = document.querySelectorAll(
  ".table-info-book-button"
);
tableInfoBookButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    selectedTable = tables[index];

    confirmTableNumber.textContent =
      selectedTable.querySelector(".table-name").textContent;
    confirmationModalTable.style.display = "block";
    confirmationModalTable.style.backgroundColor = "rgba(0, 0, 0, 0)";
    successModalTable.style.backgroundColor = "rgba(0, 0, 0, 0)";

    updateTableInfo();
  });

  // Modal confirmation button
  confirmButtonTable.addEventListener("click", (event) => {
    event.stopPropagation();

    if (selectedTable) {
      // Deactivate button book now
      const selectedBookButton = selectedTable.querySelector(".book-button");
      selectedBookButton.disabled = true;

      // Already booked
      selectedTable.classList.add("booked");
      updateTableInfo();

      confirmationModalTable.style.display = "none";
      selectedTable = null;
    }
  });
});

function updateRoomInfo() {
  roomInfo.forEach((info, index) => {
    const roomElement = rooms[index];
    roomElement.classList.contains("booked") ? "Booked" : "Available";

    info.querySelector(".room-info-name").textContent;

    if (roomElement.classList.contains("booked")) {
      info.classList.add("booked");
    } else {
      info.classList.remove("booked");
    }
  });
}

// Button hot desk
hotDesk.addEventListener("click", (event) => {
  event.stopPropagation();
  tableContainer.style.display = "none";
  roomContainer.style.display = "none";
  modalHotDesk.style.display = "block";
  updateTableInfo();
});

// Button meeting room
meetingRoom.addEventListener("click", (event) => {
  event.stopPropagation();
  tableContainer.style.display = "none";
  roomContainer.style.display = "none";
  modalMeetingRoom.style.display = "block";
});

// Zone Dropdown
zoneDropdown.addEventListener("change", () => {
  const selectedZone = zoneDropdown.value;
  const zoneInfo = getZoneInfo(selectedZone);
  displayZoneContent(zoneInfo);
});

zoneDropdown.addEventListener("click", (event) => {
  event.stopPropagation();
  tableContainer.style.display = "none";
  roomContainer.style.display = "none";
});

// Definisikan informasi konten zona
function getZoneInfo(zone) {
  if (zone === "Zone A") {
    return {
      zoneClass: "zone-a",
    };
  } else if (zone === "Zone B") {
    return {
      zoneClass: "zone-b",
    };
  } else if (zone === "Zone C") {
    return {
      zoneClass: "zone-c",
    };
  } else if (zone === "Zone D") {
    return {
      zoneClass: "zone-d",
    };
  }
}

// Tampilkan konten zona pada elemen HTML
function displayZoneContent(zoneInfo) {
  const zones = document.querySelectorAll(".zone");
  zones.forEach((zone) => {
    zone.classList.remove("active");
  });

  const selectedZone = document.querySelector(`.${zoneInfo.zoneClass}`);
  selectedZone.classList.add("active");
}

// Open Logout modal
logoutButton.addEventListener("click", () => {
  logoutBookedModal2.style.display = "block";
});

// Close Logout modal
logoutBookedModal2
  .querySelector(".close-button")
  .addEventListener("click", () => {
    logoutBookedModal2.style.display = "none";
  });

// Function to populate booked table dropdown
function populateBookedTableDropdown() {
  const bookedTables = document.querySelectorAll(".table.booked");
  const bookedTableDropdown = document.getElementById("bookedTableDropdown");

  bookedTableDropdown.innerHTML = "";

  bookedTables.forEach((table) => {
    const tableName = table.querySelector(".table-name").textContent;
    const option = document.createElement("a");
    option.textContent = tableName;
    option.href = "#";

    // Open Logout Booked Modal when clicked
    option.addEventListener("click", () => {
      openLogoutBookedModal(table);
    });

    bookedTableDropdown.appendChild(option);
  });
}

// Open Logout Booked Modal
function openLogoutBookedModal(tableElement) {
  const logoutBookedModal = document.getElementById("logoutBookedModal");
  const modalContent = logoutBookedModal.querySelector(".modal-content");
  const confirmLogoutBookedButton = logoutBookedModal.querySelector(
    "#confirmLogoutBookedButton"
  );

  const tableName = tableElement.querySelector(".table-name").textContent;
  modalContent.querySelector(
    "p"
  ).textContent = `Your Hot Desk ${tableName} is until, are you sure you want to checkout now?`;

  logoutBookedModal.style.display = "block";

  // Confirm Logout from Booked Modal
  confirmLogoutBookedButton.addEventListener("click", () => {
    tableElement.classList.remove("booked");
    updateTableInfo();
    populateBookedTableDropdown();
    logoutBookedModal.style.display = "none";
    logoutBookedModal2.style.display = "none";

    tableElement.style.backgroundColor = "#5b9a8b";
    const bookButton = tableElement.querySelector(".book-button");
    bookButton.disabled = false;
    tableElement.classList.remove("booked");
  });

  // Close Booked Modal
  modalContent.querySelector(".close-button").addEventListener("click", () => {
    logoutBookedModal.style.display = "none";
  });
}

populateBookedTableDropdown();

// Dropdown toggle for Meja Booked
const bookedTableButton = document.getElementById("bookedTableButton");
const bookedTableDropdown = document.getElementById("bookedTableDropdown");

bookedTableButton.addEventListener("click", () => {
  bookedTableDropdown.classList.toggle("show");
});

// Close the dropdown if the user clicks outside of it
window.addEventListener("click", (event) => {
  if (!event.target.matches(".dropbtn")) {
    if (bookedTableDropdown.classList.contains("show")) {
      bookedTableDropdown.classList.remove("show");
    }
  }
});
