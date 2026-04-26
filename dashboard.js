(function () {
  const defaultData = {
    parkState: [
      { label: "Operationnel", value: 70, color: "#1dd7a8" },
      { label: "En panne", value: 15, color: "#ff4c59" },
      { label: "Maintenance", value: 10, color: "#f5b23a" },
      { label: "Hors service", value: 5, color: "#91a1bf" }
    ],
    interventionsByZone: [
      { zone: "Zone A", count: 4 },
      { zone: "Zone B", count: 2 },
      { zone: "Zone C", count: 1 },
      { zone: "Zone D", count: 2 },
      { zone: "Zone E", count: 1 },
      { zone: "Zone F", count: 1 }
    ],
    stats: [
      { title: "Machines en panne", value: 3, sub: "22 machines au total" },
      { title: "Techniciens disponibles", value: 8, sub: "12 total" },
      { title: "Zones actives", value: 8, sub: "22 machines reparties" },
      { title: "Interventions en attente", value: 5, sub: "7 en attente" }
    ]
  };

  const data = window.dashboardData || defaultData;

  function buildDonut(values) {
    const donut = document.getElementById("donutChart");
    const legend = document.getElementById("parkLegend");
    if (!donut || !legend) return;

    let start = 0;
    let circles = "";
    values.forEach(function (item) {
      const arc = (item.value / 100) * 339.292;
      circles +=
        '<circle cx="64" cy="64" r="54" fill="none" stroke="' +
        item.color +
        '" stroke-width="16" stroke-linecap="butt" stroke-dasharray="' +
        arc.toFixed(2) +
        ' 339.292" stroke-dashoffset="' +
        (-start / 100 * 339.292).toFixed(2) +
        '"></circle>';
      start += item.value;
    });

    donut.innerHTML =
      '<svg viewBox="0 0 128 128" class="donut-svg" aria-hidden="true">' +
      '<g transform="rotate(-90 64 64)">' +
      '<circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="16"></circle>' +
      circles +
      "</g>" +
      "</svg>" +
      '<span class="donut-center">' + values[0].value + "%</span>";

    legend.innerHTML = values
      .map(function (item) {
        return (
          '<li><span class="left"><span class="dot" style="background:' +
          item.color +
          '"></span>' +
          item.label +
          "</span><strong>" +
          item.value +
          "%</strong></li>"
        );
      })
      .join("");
  }

  function buildZoneBars(zones) {
    const zoneBars = document.getElementById("zoneBars");
    if (!zoneBars) return;

    const max = Math.max.apply(
      null,
      zones.map(function (z) {
        return z.count;
      })
    );
    const palette = ["#27e6bf", "#20d9b4", "#1bc9a9", "#17b89b", "#13a78e", "#0f937f"];
    const yMax = Math.max(4, max);
    const yLabels = [];
    for (let i = yMax; i >= 0; i -= 1) {
      yLabels.push("<span>" + i + "</span>");
    }
    const bars = zones
      .map(function (z, i) {
        const percent = (z.count / yMax) * 100;
        return (
          '<div class="bar-col">' +
          '<div class="bar-fill" style="height:' +
          percent +
          '%; background: linear-gradient(180deg, ' +
          palette[i % palette.length] +
          ', #0e6a59)"></div>' +
          "<p>" +
          z.zone +
          "</p>" +
          "</div>"
        );
      })
      .join("");

    zoneBars.innerHTML =
      '<div class="bar-chart">' +
      '<div class="y-axis">' +
      yLabels.join("") +
      "</div>" +
      '<div class="plot-area">' +
      bars +
      "</div>" +
      "</div>";
  }

  function buildStats(stats) {
    const cards = document.getElementById("statsCards");
    if (!cards) return;

    cards.innerHTML = stats
      .map(function (s) {
        return (
          '<article class="stat-card">' +
          "<h3>" +
          s.title +
          "</h3>" +
          '<p class="stat-value">' +
          s.value +
          "</p>" +
          '<p class="stat-sub">' +
          s.sub +
          "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  buildDonut(data.parkState);
  buildZoneBars(data.interventionsByZone);
  buildStats(data.stats);
})();
