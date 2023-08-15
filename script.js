document.addEventListener("DOMContentLoaded", () => {
  const tableContainer = document.querySelector(".table-container");
  const modal = document.getElementById("myModal");
  const closeModal = document.querySelector(".close");
  const enterTheRoom = document.getElementById("enterTheRoom");
  const exitTheRoom = document.getElementById("exitTheRoom");
  const submitExitTheRoom = document.getElementById("submitExitTheRoom");
  const messageButtons = {};
  const rowCount = 2;
  const colCount = 6;
  const hotDesk = document.querySelector("#hot-desk-button");
  let hotDeskAccess = false;

  hotDesk.addEventListener("click", () => {
    hotDeskAccess = true;
    hotDesk.disabled = true;
  });

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

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const table = document.createElement("div");
      table.className = "table";
      table.innerText = `${row * colCount + col + 1}`;
      tableContainer.appendChild(table);

      table.addEventListener("click", () => {
        if (!hotDeskAccess) {
          alert("If you want to book, press the hot desk button");
          return;
        }

        tableContainer.classList.add("zoomed");

        const prevTableButton = document.querySelector(".message-button");
        if (prevTableButton) {
          prevTableButton.remove();
        }

        const mejaNumber = table.innerText;

        modalTitle.innerText = `Table Booking ${mejaNumber}`;

        if (!table.querySelector(".message-button")) {
          const messageButton = document.createElement("button");
          messageButton.innerText = "Book Now";
          messageButton.className = "message-button";

          messageButton.addEventListener("click", (event) => {
            event.stopPropagation();
            selectedTable = table;

            modal.style.display = "block";

            const now = new Date();
            const formattedTime = `${now.getHours()}:${
              (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
            }`;
            enterTheRoom.value = formattedTime;
          });
          table.appendChild(messageButton);
        }
      });
    }
  }

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  let selectedTable = null;

  submitExitTheRoom.addEventListener("click", () => {
    if (selectedTable) {
      selectedTable.classList.add("booked");
      selectedTable.removeAttribute("style");
      selectedTable = null;
    }

    modal.style.display = "none";
  });

  document.body.addEventListener("click", (event) => {
    if (!tableContainer.contains(event.target)) {
      tableContainer.classList.remove("zoomed");

      const messageButtonsArray = document.querySelectorAll(".message-button");
      messageButtonsArray.forEach((button) => {
        button.remove();
      });

      messageButtons = {};
    }
  });

  tableContainer.addEventListener("click", (event) => {
    event.stopPropagation();

    if (!event.target.classList.contains("table")) {
      const messageButton = event.target.querySelector(".message-button");
      if (messageButton) {
        messageButton.remove();
        delete messageButtons[event.target.innerText];
      }
    }
  });
});
