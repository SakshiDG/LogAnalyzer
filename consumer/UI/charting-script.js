$(document).ready(function () {
    var chart, res, chart2, dChart;
    const ctx = document.getElementById('myChart');
    const ctx1 = document.getElementById('dChart');
    const ctx2 = document.getElementById('myChart2');

    const destroyCharts = () => {
        ctx.style.display = "block";
        if (dChart) {
            dChart.destroy()
        }
        if (chart) {
            chart.destroy()
        }
        if (chart2) {
            chart2.destroy()
        }
    }

    const createTable = (e) => {

        let tableBody = document.getElementById('myTable');
        if (tableBody) {
            while (tableBody.firstChild) {
                tableBody.removeChild(tableBody.firstChild);
            }
        }
        if (e) {
            let tableheading = document.getElementById('tableheading');
            tableheading.innerText = "Logs for " + e.target.id;
            console.log(e.target.id)

            let filteredResult = res.filter(item => item.applicationName === e.target.id);
            filteredResult.forEach(item => {
                let row = document.createElement('tr');
                row.innerHTML =
                    `<td>${item.id}</td>
                    <td>${item.thread}</td>
                    <td>${item.loglevel}</td>
                    <td>${item.timestamp}</td>
                    <td>${item.applicationName}</td>
                    <td>${item.logger}</td>
                    <td>${item.message}</td>`;
                tableBody.appendChild(row);
            });
        } else {
            let tableheading = document.getElementById('tableheading');
            tableheading.innerText = "Logs for All";
            res.forEach(item => {
                let row = document.createElement('tr');
                row.innerHTML =
                    `<td>${item.id}</td>
                    <td>${item.thread}</td>
                    <td>${item.loglevel}</td>
                    <td>${item.timestamp}</td>
                    <td>${item.applicationName}</td>
                    <td>${item.logger}</td>
                    <td>${item.message}</td>`;
                tableBody.appendChild(row);
            });
        }
    }


    const createDonutChart = (e) => {
        if (e) {
            filteredResult = res.filter(item => item.applicationName === e.target.id);
            const log_level_map = filteredResult.reduce((acc, val) => {
                acc[val.loglevel] = acc[val.loglevel] ?? [];
                acc[val.loglevel].push(val)
                return acc
            }, {})
            const application_level_map = filteredResult.reduce((acc, val) => {
                acc[val.applicationName] = acc[val.applicationName] ?? [];
                acc[val.applicationName].push(val)
                return acc
            }, {})
            const data1 = {
                labels: [...Object.keys(log_level_map)],
                datasets: [
                    {
                        label: "Log Level",
                        data: [...Object.keys(log_level_map).map(lg => log_level_map[lg].length)],
                        backgroundColor: [
                            "#A2C3DB",
                            "#DCB12D",
                            "#8AAF22",
                            "#dc3545",
                        ],
                        borderColor: [
                            "#000000",
                            "#000000",
                            "#000000",
                            "#000000",
                            "#000000"
                        ],
                        borderWidth: [1, 1, 1, 1, 1]
                    }
                ]
            };
            const options = {
                responsive: true,
                aspectRatio: 4,
                title: {
                    display: true,
                    position: "top",
                    text: "Doughnut Chart",
                    fontSize: 18,
                    fontColor: "#111"
                },
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        fontColor: "#333",
                        fontSize: 16
                    }
                }
            };

            dChart = new Chart(ctx1, {
                type: "doughnut",
                data: data1,
                options: options
            });

        } else {
            const log_level_map = res.reduce((acc, val) => {
                acc[val.loglevel] = acc[val.loglevel] ?? [];
                acc[val.loglevel].push(val)
                return acc
            }, {})
            const application_level_map = res.reduce((acc, val) => {
                acc[val.applicationName] = acc[val.applicationName] ?? [];
                acc[val.applicationName].push(val)
                return acc
            }, {})

            const data1 = {
                labels: [...Object.keys(log_level_map)],
                datasets: [
                    {
                        label: "Log Level",
                        data: [...Object.keys(log_level_map).map(lg => log_level_map[lg].length)],
                        backgroundColor: [
                            "#A2C3DB",
                            "#DCB12D",
                            "#8AAF22",
                            "#dc3545",
                        ],
                        borderColor: [
                            "#000000",
                            "#000000",
                            "#000000",
                            "#000000",
                            "#000000"
                        ],
                        borderWidth: [1, 1, 1, 1, 1]
                    }
                ]
            };

            const data2 = {
                labels: [...Object.keys(application_level_map)],
                datasets: [
                    {
                        label: "Log Level",
                        data: [...Object.keys(application_level_map).map(lg => application_level_map[lg].length)],
                        backgroundColor: [
                            "#003f5c",
                            "#58508d",
                            "#bc5090",
                            "#dc3545",
                        ],
                        borderColor: [
                            "#000000",
                            "#000000",
                            "#000000",
                            "#000000",
                            "#000000"
                        ],
                        borderWidth: [1, 1, 1, 1, 1]
                    }
                ]
            };

            const options = {
                responsive: true,
                aspectRatio: 4,
                title: {
                    display: true,
                    position: "top",
                    text: "Doughnut Chart",
                    fontSize: 18,
                    fontColor: "#111"
                },
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        fontColor: "#333",
                        fontSize: 16
                    }
                }
            };
            dChart = new Chart(ctx1, {
                type: "doughnut",
                data: data1,
                options: options
            });

            //create Chart class object

            chart2 = new Chart(ctx2, {
                type: "doughnut",
                data: data2,
                options: options
            });
        }
    }
    const createBarChart = (e) => {
        if (e) {
            let filteredResult = res.filter(item => item.applicationName === e.target.id);

            const log_level_map = filteredResult.reduce((acc, val) => {
                acc[val.logger] = acc[val.logger] ?? [];
                acc[val.logger].push(val)
                return acc
            }, {})
            console.log("Filtered Results: ", filteredResult);
            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [...Object.keys(log_level_map)],
                    datasets: [{
                        label: 'Number Of Logs Per Service',
                        data: [...Object.keys(log_level_map).map(lg => log_level_map[lg].length)],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            })
        } else {
            const log_level_map = res.reduce((acc, val) => {
                acc[val.logger] = acc[val.logger] ?? [];
                acc[val.logger].push(val)
                return acc
            }, {})
            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [...Object.keys(log_level_map)],
                    datasets: [{
                        label: 'Number Of Logs Per Service',
                        data: [...Object.keys(log_level_map).map(lg => log_level_map[lg].length)],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            })
        }

    }
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const about = document.getElementById("about")
    fetch("http://localhost:8085/api/serverlogs", requestOptions)
        .then(response => response.json())
        .then(result => {
            res = result
            createBarChart();
            createTable();
            const about = document.getElementById("about")
            const home = document.getElementById("home")
            const app1 = document.getElementById("my-app-1")
            const app2 = document.getElementById("my-app-2")
            const app3 = document.getElementById("my-app-3")
            app1.onclick = (e) => {
                destroyCharts();
                createTable(e);
                createBarChart(e);
                createDonutChart(e);
            }
            app2.onclick = (e) => {
                destroyCharts();
                createTable(e);
                createBarChart(e);
                createDonutChart(e);
            }
            app3.onclick = (e) => {
                destroyCharts();
                createTable(e);
                createBarChart(e);
                createDonutChart(e);
            }
            about.onclick = () => {
                destroyCharts();
                ctx.style.display = "none";
                createTable()
                createDonutChart()
            }
            home.onclick = () => {
                destroyCharts();
                createTable()
                createBarChart()
            }


        }).catch(error => console.log('error', error))

});