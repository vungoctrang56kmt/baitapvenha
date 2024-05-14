// Hàm để tải dữ liệu từ URL JSON
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawCharts);
function drawCharts() {
    drawTemperatureChart();
    drawHumidityChart();
    drawPressureChart();
}
function loadData(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error loading data:', error));
}

// Hàm để vẽ biểu đồ nhiệt độ
function drawTemperatureChart() {
    loadData('http://127.0.0.1:1880/get-temp', function(data) {
        // Tạo mảng dữ liệu cho biểu đồ
        var chartData = [];
        chartData.push(['Date', 'Temperature']); // Thêm tiêu đề cột

        // Lặp qua dữ liệu JSON và thêm vào mảng dữ liệu
        data.forEach(function(entry) {
            chartData.push([new Date(entry.Date), entry.Temperature]);
        });

        // Tạo DataTable từ mảng dữ liệu
        var dataTable = google.visualization.arrayToDataTable(chartData);

        // Cấu hình tùy chọn cho biểu đồ
        var options = {
            title: 'Temperature Chart',
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        // Vẽ biểu đồ
        var chart = new google.visualization.LineChart(document.getElementById('temperature_chart'));
        chart.draw(dataTable, options);
    });
}

// Hàm để vẽ biểu đồ độ ẩm
// Hàm để vẽ biểu đồ độ ẩm
function drawHumidityChart() {
    loadData('http://127.0.0.1:1880/get-humi', function(data) {
        // Tạo mảng dữ liệu cho biểu đồ
        var chartData = [];
        chartData.push(['Time', 'Humidity']); // Thêm tiêu đề cột

        // Lặp qua dữ liệu JSON và thêm vào mảng dữ liệu
        data.forEach(function(entry) {
            chartData.push([new Date(entry.Date), entry.Humidity]);
        });

        // Tạo DataTable từ mảng dữ liệu
        var dataTable = google.visualization.arrayToDataTable(chartData);

        // Cấu hình tùy chọn cho biểu đồ
        var options = {
            title: 'Humidity Chart',
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        // Vẽ biểu đồ
        var chart = new google.visualization.LineChart(document.getElementById('humidity_chart'));
        chart.draw(dataTable, options);
    });
}

// Hàm để vẽ biểu đồ áp suất
function drawPressureChart() {
    loadData('http://127.0.0.1:1880/get-press', function (data) {
        // Tạo mảng dữ liệu cho biểu đồ
        var chartData = [];
        chartData.push(['Time', 'Pressure']); // Thêm tiêu đề cột

        // Lặp qua dữ liệu JSON và thêm vào mảng dữ liệu
        data.forEach(function (entry) {
            chartData.push([new Date(entry.Date), entry.Pressure]);
        });

        // Tạo DataTable từ mảng dữ liệu
        var dataTable = google.visualization.arrayToDataTable(chartData);

        // Cấu hình tùy chọn cho biểu đồ
        var options = {
            title: 'Pressure Chart',
            curveType: 'function',
            legend: {position: 'bottom'}
        };

        // Vẽ biểu đồ
        var chart = new google.visualization.LineChart(document.getElementById('pressure_chart'));
        chart.draw(dataTable, options);
    });
}