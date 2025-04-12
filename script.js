// Tabs
const diskTab = document.getElementById("diskTab");
const jobTab = document.getElementById("jobTab");
const diskPanel = document.getElementById("diskPanel");
const jobPanel = document.getElementById("jobPanel");

diskTab.addEventListener("click", () => {
  diskTab.classList.add("active");
  jobTab.classList.remove("active");
  diskPanel.classList.remove("hidden");
  jobPanel.classList.add("hidden");
});

jobTab.addEventListener("click", () => {
  jobTab.classList.add("active");
  diskTab.classList.remove("active");
  jobPanel.classList.remove("hidden");
  diskPanel.classList.add("hidden");
});

// Job Scheduling Inputs
const jobInputs = document.getElementById("jobInputs");
const addJobBtn = document.getElementById("addJob");
const jobScheduleBtn = document.getElementById("jobSchedule");
const jobChartCanvas = document.getElementById("jobChart").getContext("2d");

let jobCount = 1;

function addJobRow() {
  const row = document.createElement("div");
  row.className = "job-row";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Job Name (e.g. J1)";
  nameInput.value = `J${jobCount++}`;

  const arrivalInput = document.createElement("input");
  arrivalInput.type = "number";
  arrivalInput.placeholder = "Arrival Time";

  const burstInput = document.createElement("input");
  burstInput.type = "number";
  burstInput.placeholder = "Burst Time";

  row.appendChild(nameInput);
  row.appendChild(arrivalInput);
  row.appendChild(burstInput);

  jobInputs.appendChild(row);
}

addJobBtn.addEventListener("click", addJobRow);

// Add one row by default
addJobRow();

// Disk Scheduling Logic
const diskAlgoSelect = document.getElementById("diskAlgo");
const requestsInput = document.getElementById("requestsInput");
const headInput = document.getElementById("headInput");
const diskScheduleBtn = document.getElementById("diskSchedule");
const diskChartCanvas = document.getElementById("diskChart").getContext("2d");

function scheduleDisk() {
  const algorithm = diskAlgoSelect.value;
  const requests = requestsInput.value.split(",").map(Number);
  const head = Number(headInput.value);

  let chartData = [];
  switch (algorithm) {
    case "fcfs":
      // FCFS Logic (example)
      chartData = requests.map((request, index) => {
        return {
          x: index,
          y: request,
          label: `Request ${index + 1}`,
        };
      });
      break;
    case "sstf":
      // SSTF Logic (example)
      chartData = requests.sort((a, b) => a - b).map((request, index) => {
        return {
          x: index,
          y: request,
          label: `Request ${index + 1}`,
        };
      });
      break;
    case "scan":
      // SCAN Logic (example)
      chartData = requests.sort((a, b) => a - b).map((request, index) => {
        return {
          x: index,
          y: request,
          label: `Request ${index + 1}`,
        };
      });
      break;
    default:
      console.log("Unknown Algorithm");
      return;
  }

  new Chart(diskChartCanvas, {
    type: "line",
    data: {
      datasets: [{
        label: "Disk Requests",
        data: chartData,
        borderColor: "blue",
        fill: false,
      }],
    },
    options: {
      scales: {
        x: { type: "linear", position: "bottom" },
        y: { beginAtZero: true },
      },
    },
  });
}

diskScheduleBtn.addEventListener("click", scheduleDisk);

// Job Scheduling Logic
function scheduleJobs() {
  // Simple Gantt chart for Job Scheduling
  const jobs = [];
  const jobAlgo = document.getElementById("jobAlgo").value;

  const jobRows = jobInputs.getElementsByClassName("job-row");
  for (let row of jobRows) {
    const name = row.children[0].value;
    const arrival = Number(row.children[1].value);
    const burst = Number(row.children[2].value);
    jobs.push({ name, arrival, burst });
  }

  let chartData = [];
  jobs.forEach((job, index) => {
    chartData.push({
      x: job.arrival,
      y: job.arrival + job.burst,
      label: `${job.name} (Burst: ${job.burst})`,
    });
  });

  new Chart(jobChartCanvas, {
    type: "bar",
    data: {
      labels: jobs.map((job) => job.name),
      datasets: [{
        label: "Job Execution Time",
        data: chartData.map((data) => data.y - data.x),
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}

jobScheduleBtn.addEventListener("click", scheduleJobs);
