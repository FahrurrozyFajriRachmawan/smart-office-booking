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
const meetingRoom = document.querySelector("#meeting-room-button");
const logoutButton = document.querySelector("#logout-button");
const exitTheRoom = document.getElementById("exitTheRoom");
const exitTheTable = document.getElementById("exitTheTable");
let hotDeskAccess = false;
let meetingRoomAccess = false;
const currentTimeElement = document.getElementById("currentTime");

document.addEventListener("click", outsideClickHandler);

// Button hot desk
hotDesk.addEventListener("click", () => {
  hotDeskAccess = true;
  hotDesk.disabled = true;
});

// Button meeting room
meetingRoom.addEventListener("click", () => {
  meetingRoomAccess = true;
  meetingRoom.disabled = true;
});

// Section table
tables.forEach((table) => {
  const bookButton = table.querySelector(".book-button");

  table.addEventListener("click", (event) => {
    // Alert hot desk
    if (!hotDeskAccess) {
      alert("If you want to book, press the hot desk button");
      return;
    }

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
      currentTimeTable.value = formattedTime;

      // Table number
      confirmTableNumber.textContent =
        selectedTable.querySelector(".table-name").textContent;
      confirmationModalTable.style.display = "block";
    }
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
    // Alert meeting room
    if (!meetingRoomAccess) {
      alert("If you want to book, press the meeting room button");
      return;
    }

    // Zoom in room
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
      currentTimeRoom.value = formattedTime;

      // Room number
      confirmRoomNumber.textContent =
        selectedRoom.querySelector(".room-name").textContent;
      confirmationModalRoom.style.display = "block";
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

  currentTimeElement.textContent = `${hours}:${minutes} ${ampm}`;
}

// Display current time
updateCurrentTime();

// Exit time room
for (let hours = 0; hours < 24; hours++) {
  for (let minutes = 0; minutes < 60; minutes += 30) {
    const option = document.createElement("option");
    option.value = `${hours}:${minutes}`;
    option.innerText = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    exitTheRoom.appendChild(option);
  }
}

// Exit time table
for (let hours = 0; hours < 24; hours++) {
  for (let minutes = 0; minutes < 60; minutes += 30) {
    const option = document.createElement("option");
    option.value = `${hours}:${minutes}`;
    option.innerText = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    exitTheTable.appendChild(option);
  }
}

// Button logout
logoutButton.addEventListener("click", () => {
  if (confirm("Anda yakin ingin logout?")) {
    // Reset access
    hotDeskAccess = false;
    hotDesk.disabled = false;

    // Reset access
    meetingRoomAccess = false;
    meetingRoom.disabled = false;

    // Delete all table booking data statuses
    tables.forEach((table) => {
      table.style.backgroundColor = "#5b9a8b";
      const bookButton = table.querySelector(".book-button");
      bookButton.disabled = false;
      table.classList.remove("booked");
    });

    // Delete all room booking data statuses
    rooms.forEach((room) => {
      room.style.backgroundColor = "#5b9a8b";
      const bookButton = room.querySelector(".book-button");
      bookButton.disabled = false;
      room.classList.remove("booked");
    });

    // Zoom out
    tableContainer.classList.remove("zoomed-in");
    roomContainer.classList.remove("zoomed-in");
  }
});
