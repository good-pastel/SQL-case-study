/* ==========================================================
APP.JS V2 FINAL
PART 1
Progress • Theme • Navigation • Animation
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /*=========================================================
PROGRESS BAR
=========================================================*/

  const progress = document.getElementById("progress");

  if (progress) {
    window.addEventListener("scroll", () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;

      const current = window.scrollY;

      const percent = (current / total) * 100;

      progress.style.width = percent + "%";
    });
  }

  /*=========================================================
DARK MODE
=========================================================*/

  const toggle = document.getElementById("themeToggle");

  if (toggle) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");

      toggle.innerHTML = "☀️ ";
    }

    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      const isDark = document.body.classList.contains("dark");

      localStorage.setItem(
        "theme",

        isDark ? "dark" : "light",
      );

      toggle.innerHTML = isDark ? "☀️ " : "🌙 ";
    });
  }

  /*=========================================================
SMOOTH SCROLL
=========================================================*/

  const links = document.querySelectorAll("nav a");

  links.forEach((link) => {
    link.addEventListener(
      "click",

      (e) => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      },
    );
  });

  /*=========================================================
SCROLL SPY
=========================================================*/

  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop - 150;

      const height = section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < top + height) {
        current = section.id;
      }
    });

    links.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  /*=========================================================
REVEAL ANIMATION
=========================================================*/

  const cards = document.querySelectorAll(".study-card,.hero-card");

  if (cards.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },

      {
        threshold: 0.15,
      },
    );

    cards.forEach((card) => {
      card.classList.add("fade-up");

      observer.observe(card);
    });
  }

  /*=========================================================
QUESTION PILLS
=========================================================*/

  const pills = document.querySelectorAll(".pill-wrapper button");

  pills.forEach((btn) => {
    btn.addEventListener("click", () => {
      pills.forEach((b) => {
        b.classList.remove("active");
      });

      btn.classList.add("active");
    });
  });

  console.log("PART 1 Loaded");
});

/* ==========================================================
APP.JS V2 FINAL
PART 2
Chart Helpers
========================================================== */

/*=========================================================
FORMAT CURRENCY
=========================================================*/

function formatCurrency(value) {
  return "$" + Number(value).toLocaleString();
}

/*=========================================================
DEFAULT OPTIONS
=========================================================*/

function defaultOptions() {
  return {
    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return formatCurrency(context.raw);
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          callback: function (value) {
            return "$" + value / 1000 + "K";
          },
        },

        grid: {
          color: "#E2E8F0",
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };
}

/*=========================================================
BAR CHART
=========================================================*/

function createBarChart(id, data) {
  const canvas = document.getElementById(id);

  if (!canvas) return;

  new Chart(canvas, {
    type: "bar",

    data: {
      labels: data.labels,

      datasets: [
        {
          data: data.values,

          backgroundColor: "#2563EB",

          borderRadius: 8,

          maxBarThickness: 45,
        },
      ],
    },

    options: defaultOptions(),
  });
}

/*=========================================================
HORIZONTAL BAR
=========================================================*/

function createHorizontalChart(id, data) {
  const canvas = document.getElementById(id);

  if (!canvas) return;

  new Chart(canvas, {
    type: "bar",

    data: {
      labels: data.labels,

      datasets: [
        {
          data: data.values,

          backgroundColor: "#2563EB",

          borderRadius: 8,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      indexAxis: "y",

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          callbacks: {
            label: function (context) {
              return formatCurrency(context.raw);
            },
          },
        },
      },

      scales: {
        x: {
          ticks: {
            callback: function (value) {
              return "$" + Number(value).toLocaleString();
            },
          },

          grid: {
            color: "#E2E8F0",
          },
        },

        y: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

/*=========================================================
LINE CHART
=========================================================*/

function createLineChart(id, data) {
  const canvas = document.getElementById(id);

  if (!canvas) return;

  new Chart(canvas, {
    type: "line",

    data: {
      labels: data.labels,

      datasets: [
        {
          label: "Executive",

          data: data.ex,

          borderColor: "#2563EB",

          backgroundColor: "#2563EB",

          borderWidth: 3,

          tension: 0.4,
        },

        {
          label: "Mid Level",

          data: data.mi,

          borderColor: "#06B6D4",

          backgroundColor: "#06B6D4",

          borderWidth: 3,

          tension: 0.4,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: true,
        },
      },

      scales: {
        y: {
          ticks: {
            callback: function (value) {
              return "$" + value / 1000 + "K";
            },
          },
        },
      },
    },
  });
}

/* ==========================================================
APP.JS V2 FINAL
PART 3
Chart Data
========================================================== */

/*=========================================================
Q4
=========================================================*/

const q4Data = {
  labels: [
    "Product",
    "Data",
    "Business",
    "Lead",
    "BI",
    "Marketing",
    "Financial",
    "Finance",
    "Principal",
  ],

  values: [13036, 92893, 76691, 92203, 74755, 88654, 275000, 61896, 122500],
};

createBarChart(
  "q4Chart",

  q4Data,
);

/*=========================================================
Q4.1
=========================================================*/

const q41Data = {
  labels: [
    "Financial Data Analyst (MI)",
    "Lead Data Analyst (SE)",
    "Principal Data Analyst (SE)",
    "BI Data Analyst (EX)",
    "Data Analyst (EX)",
  ],

  values: [450000, 170000, 170000, 150000, 120000],
};

createBarChart(
  "q41Chart",

  q41Data,
);

/*=========================================================
Q4.2
=========================================================*/

const q42Data = {
  labels: [
    "Financial Data Analyst (MI) FT",
    "Lead Data Analyst (SE) FT",
    "Principal Data Analyst (SE) FT",
    "BI Data Analyst (EX) FT",
    "Data Analyst (EX) FT",
  ],

  values: [450000, 170000, 170000, 150000, 120000],
};

createBarChart(
  "q42Chart",

  q42Data,
);

/*=========================================================
Q5
=========================================================*/

const q5Data = {
  labels: ["US", "DK", "CA", "DE", "LU", "FR", "GB"],

  values: [112001, 88654, 79936, 63831, 59102, 52930, 52712],
};

createHorizontalChart(
  "q5Chart",

  q5Data,
);

/*=========================================================
Q5.1
=========================================================*/

const q51Data = {
  labels: ["US(MI) FT", "CA(MI) FT", "US(EN) FT", "CA(EN) FT", "FR(EN) FT"],

  values: [111548, 76478, 74750, 59500, 59102],
};

createHorizontalChart(
  "q51Chart",

  q51Data,
);

/*=========================================================
Q6
Placeholder
=========================================================*/

const q6Data = {
  labels: [2020, 2021, 2022],

  mi: [60728, 108398, 68970],

  ex: [0, 150000, 120000, 145000],
};

createLineChart(
  "q6Chart",

  q6Data,
);

/*=========================================================
INIT
=========================================================*/

console.log("Portfolio Loaded");

/* ==========================================================
PART 4
CSV Helpers
==========================================================*/

async function loadCSV(path) {
  try {
    const response = await fetch(path);

    const text = await response.text();

    return text;
  } catch (error) {
    console.error(
      "CSV Error:",

      path,

      error,
    );
  }
}

/* ==========================================================
CSV TO TABLE
==========================================================*/

function csvToTable(csv, id) {
  const rows = csv.split("\n");

  const table = document.getElementById(id);

  if (!table) return;

  let html = "";

  rows.forEach((row, index) => {
    const cols = row.split(",");

    html += index === 0 ? "<tr>" : "<tr>";

    cols.forEach((col) => {
      html += index === 0 ? `<th>${col}</th>` : `<td>${col}</td>`;
    });

    html += "</tr>";
  });

  table.innerHTML = html;
}

/* ==========================================================
AUTO LOAD TABLES
==========================================================*/

loadCSV("result/Q2.csv").then((csv) => {
  csvToTable(
    csv,

    "q2Table",
  );
});

loadCSV("result/Q4.csv").then((csv) => {
  csvToTable(
    csv,

    "q4Table",
  );
});

loadCSV("result/Q41.csv").then((csv) => {
  csvToTable(
    csv,

    "q41Table",
  );
});

loadCSV("result/Q42.csv").then((csv) => {
  csvToTable(
    csv,

    "q42Table",
  );
});

console.log("CSV Loader Ready");
