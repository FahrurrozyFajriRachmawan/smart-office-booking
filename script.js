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
const modalLogout = document.getElementById("modalLogout");

document.addEventListener("click", outsideClickHandler);

const timeInSelect = document.getElementById("timeIn");
const timeOutSelect = document.getElementById("timeOut");
const calculateDurationButton = document.getElementById("calculateDuration");
const resultDuration = document.getElementById("resultDuration");

// Time in and time out
timeInSelect.addEventListener("change", updateTimeOut);
calculateDurationButton.addEventListener("click", calculateDuration);

// Update time out
function updateTimeOut() {
  const selectedTimeIn = timeInSelect.value;

  // Disable options earlier than selected time in
  for (let i = 0; i < timeOutSelect.options.length; i++) {
    const option = timeOutSelect.options[i];
    option.disabled = option.value <= selectedTimeIn;
  }
}

// Calculate duration and display the result
function calculateDuration() {
  const timeIn = timeInSelect.value;
  const timeOut = timeOutSelect.value;

  const [inHour, inMinute] = timeIn.split(":");
  const [outHour, outMinute] = timeOut.split(":");

  const durationHour = outHour - inHour;
  const durationMinute = outMinute - inMinute;

  resultDuration.textContent = `Duration: ${durationHour} hours ${durationMinute} minutes`;
}
updateTimeOut();

// Section hot desk
tables.forEach((table) => {
  const bookButton = table.querySelector(".book-button");

  table.addEventListener("click", (event) => {
    // Zoom in hot desk
    event.stopPropagation();
    if (!tableContainer.classList.contains("zoomed-in")) {
      tableContainer.classList.add("zoomed-in");
      roomContainer.style.display = "none";
    }
  });

  // Book button for hot desk
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

      // Hot desk number
      confirmTableNumber.textContent =
        selectedTable.querySelector(".table-name").textContent;
      confirmationModalTable.style.display = "block";

      // Bg modal
      confirmationModalTable.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      successModalTable.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    }

    updateTableInfo();
  });

  // Main hot desk confirmation modal button
  confirmButtonTable.addEventListener("click", (event) => {
    event.stopPropagation();
    if (selectedTable) {
      selectedTable.style.backgroundColor = "#ccc";

      // Deactivate button book now
      const selectedBookButton = selectedTable.querySelector(".book-button");
      selectedBookButton.disabled = true;

      // Already booked
      selectedTable.classList.add("booked");
      confirmationModalTable.style.display = "none";

      // Open modal success
      successTableNumber.textContent =
        selectedTable.querySelector(".table-name").textContent;
      successModalTable.style.display = "block";

      // Reset the selected table
      selectedTable = null;

      // Update hot desk list
      updateTableInfo();
      populateBookedTableDropdown();
    }
  });

  // Modal cancel button booking
  cancelButtonTable.addEventListener("click", (event) => {
    event.stopPropagation();
    confirmationModalTable.style.display = "none";
  });

  // Modal done button success
  closeButtonTable.addEventListener("click", (event) => {
    event.stopPropagation();
    successModalTable.style.display = "none";
    tableContainer.style.display = "block";
    roomContainer.style.display = "block";
    tableContainer.classList.remove("zoomed-in");
    roomContainer.classList.remove("zoomed-in");
  });
});

// Button hot desk when clicked
hotDesk.addEventListener("click", (event) => {
  event.stopPropagation();
  tableContainer.style.display = "none";
  roomContainer.style.display = "none";
  modalHotDesk.style.display = "block";
  updateTableInfo();
});

// Modal hot desk
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

// bookButton inside the modal hot desk
const tableInfoBookButtons = document.querySelectorAll(
  ".table-info-book-button"
);
// Hot desk button
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

  // Hot desk confirmation modal button
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

// Section meeting room
rooms.forEach((room) => {
  const bookButton = room.querySelector(".book-button");
  room.addEventListener("click", (event) => {
    // Zoom in meeting room
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

      // Meeting room number
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
      selectedRoom.style.backgroundColor = "#ccc";

      // Deactivate button book now
      const selectedBookButton = selectedRoom.querySelector(".book-button");
      selectedBookButton.disabled = true;

      // Already booked
      selectedRoom.classList.add("booked");
      confirmationModalRoom.style.display = "none";

      // Open modal success
      successRoomNumber.textContent =
        selectedRoom.querySelector(".room-name").textContent;
      successModalRoom.style.display = "block";

      // Reset the selected meeting room
      selectedRoom = null;

      updateRoomInfo();
      populateBookedRoomDropdown();
    }
  });

  // Modal cancel button booking
  cancelButtonRoom.addEventListener("click", (event) => {
    event.stopPropagation();
    confirmationModalRoom.style.display = "none";
  });

  // Modal done button success
  closeButtonRoom.addEventListener("click", (event) => {
    event.stopPropagation();
    successModalRoom.style.display = "none";
    tableContainer.style.display = "block";
    roomContainer.style.display = "block";
    tableContainer.classList.remove("zoomed-in");
    roomContainer.classList.remove("zoomed-in");
  });
});

// Button meeting room when clicked
meetingRoom.addEventListener("click", (event) => {
  event.stopPropagation();
  tableContainer.style.display = "none";
  roomContainer.style.display = "none";
  modalMeetingRoom.style.display = "block";
  updateRoomInfo();
});

// Modal meeting room
function updateRoomInfo() {
  roomInfo.forEach((info, index) => {
    const roomElement = rooms[index];

    info.querySelector(".room-info-name").textContent;

    const roomInfoBookButton = info.querySelector(".room-info-book-button");
    if (
      roomElement.classList.contains("booked") ||
      roomElement.classList.contains("under-maintenance") ||
      roomElement.classList.contains("available-next-hour")
    ) {
      info.classList.add("booked");
      roomInfoBookButton.disabled = true;
    } else {
      info.classList.remove("booked");
      roomInfoBookButton.disabled = false;
    }
  });
}

// bookButton inside the modal meeting room
const roomInfoBookButtons = document.querySelectorAll(".room-info-book-button");
roomInfoBookButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    selectedRoom = rooms[index];

    confirmRoomNumber.textContent =
      selectedRoom.querySelector(".room-name").textContent;
    confirmationModalRoom.style.display = "block";
    confirmationModalRoom.style.backgroundColor = "rgba(0, 0, 0, 0)";
    successModalRoom.style.backgroundColor = "rgba(0, 0, 0, 0)";

    updateRoomInfo();
  });

  // Modal confirmation button
  confirmButtonRoom.addEventListener("click", (event) => {
    event.stopPropagation();

    if (selectedRoom) {
      // Deactivate button book now
      const selectedBookButton = selectedTable.querySelector(".book-button");
      selectedBookButton.disabled = true;

      // Already booked
      selectedRoom.classList.add("booked");
      updateRoomInfo();

      confirmationModalRoom.style.display = "none";
      selectedRoom = null;
    }
  });
});

// Zoom out container meeting room and hot desk
function outsideClickHandler(event) {
  if (!event.target.closest(".table-container", "room-container")) {
    roomContainer.style.display = "block";
    tableContainer.style.display = "block";
    tableContainer.classList.remove("zoomed-in");
    roomContainer.classList.remove("zoomed-in");
  }
}

// Front page, current running time
function updateCurrentTime() {
  const currentTimeElement = document.getElementById("current-time");
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  currentTimeElement.textContent = `${formattedHours}:${minutes} ${ampm}`;
}
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

// Zone Dropdown hot desk
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

// Define zone content information
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

// Show zone contents
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
  modalLogout.style.display = "block";
});

// Open modal logout hot desk
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
      openLogoutValidation(table);
    });

    bookedTableDropdown.appendChild(option);
  });
}

// Open validation Logout hot desk
function openLogoutValidation(tableElement) {
  const logoutValidation = document.getElementById("logoutValidation");
  const modalContent = logoutValidation.querySelector(".modal-content");
  const confirmLogoutBookedButton = logoutValidation.querySelector(
    "#confirmLogoutBookedButton"
  );

  const timeOut = timeOutSelect.value;
  updateTimeOut();

  const tableName = tableElement.querySelector(".table-name").textContent;
  modalContent.querySelector(
    "p"
  ).textContent = `Your Hot Desk ${tableName} is until ${timeOut} AM, are you sure you want to checkout now?`;

  logoutValidation.style.display = "block";

  // Confirm Logout from Booked Modal
  confirmLogoutBookedButton.addEventListener("click", () => {
    tableElement.classList.remove("booked");
    updateTableInfo();
    populateBookedTableDropdown();
    logoutValidation.style.display = "none";
    modalLogout.style.display = "none";

    tableElement.style.backgroundColor = "#5b9a8b";
    const bookButton = tableElement.querySelector(".book-button");
    bookButton.disabled = false;
    tableElement.classList.remove("booked");
  });

  // Close Booked Modal
  modalContent.querySelector(".close-button").addEventListener("click", () => {
    logoutValidation.style.display = "none";
  });
}

populateBookedTableDropdown();

// Open modal logout meeting room
function populateBookedRoomDropdown() {
  const bookedRooms = document.querySelectorAll(".room.booked");
  const bookedRoomDropdown = document.getElementById("bookedRoomDropdown");

  bookedRoomDropdown.innerHTML = "";

  bookedRooms.forEach((room) => {
    const roomName = room.querySelector(".room-name").textContent;
    const option = document.createElement("a");
    option.textContent = roomName;
    option.href = "#";

    // Open Logout Booked Modal when clicked
    option.addEventListener("click", () => {
      openLogoutValidationRoom(room);
    });

    bookedRoomDropdown.appendChild(option);
  });
}

// Open Logout Booked Modal room
function openLogoutValidationRoom(roomElement) {
  const logoutValidation = document.getElementById("logoutValidation");
  const modalContent = logoutValidation.querySelector(".modal-content");
  const confirmLogoutBookedButton = logoutValidation.querySelector(
    "#confirmLogoutBookedButton"
  );

  const timeOut = timeOutSelect.value;
  updateTimeOut();

  const roomName = roomElement.querySelector(".room-name").textContent;
  modalContent.querySelector(
    "p"
  ).textContent = `Your Meeting Room ${roomName} is until ${timeOut} AM, are you sure you want to checkout now?`;

  logoutValidation.style.display = "block";

  // Confirm Logout from Booked Modal
  confirmLogoutBookedButton.addEventListener("click", () => {
    roomElement.classList.remove("booked");
    updateRoomInfo();
    populateBookedRoomDropdown();
    logoutValidation.style.display = "none";
    modalLogout.style.display = "none";

    roomElement.style.backgroundColor = "#5b9a8b";
    const bookButton = roomElement.querySelector(".book-button");
    bookButton.disabled = false;
    roomElement.classList.remove("booked");
  });

  // Close Booked Modal
  modalContent.querySelector(".close-button").addEventListener("click", () => {
    logoutValidation.style.display = "none";
  });
}

populateBookedRoomDropdown();
