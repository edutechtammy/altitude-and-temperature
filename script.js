// Atmospheric Temperature Interactive
// Data extracted from provided graph showing temperature vs altitude

class AtmosphericTemperatureChart {
    constructor() {
        this.isCelsius = true;
        this.selectedPoint = null;
        this.svg = document.getElementById('temperature-chart');
        this.tooltip = null;

        // Chart dimensions
        this.margin = { top: 50, right: 100, bottom: 80, left: 100 };
        this.width = 600;
        this.height = 500;

        // Atmospheric data extracted from the provided graph
        this.atmosphericData = {
            layers: [
                {
                    name: 'Troposphere',
                    altitudeRange: [0, 12],
                    color: 'rgba(135, 206, 250, 0.3)',
                    characteristics: 'Weather occurs here. Temperature decreases with altitude.'
                },
                {
                    name: 'Stratosphere',
                    altitudeRange: [12, 50],
                    color: 'rgba(255, 182, 193, 0.3)',
                    characteristics: 'Contains ozone layer. Temperature increases with altitude.'
                },
                {
                    name: 'Mesosphere',
                    altitudeRange: [50, 80],
                    color: 'rgba(221, 160, 221, 0.3)',
                    characteristics: 'Coldest layer. Meteors burn up here.'
                },
                {
                    name: 'Thermosphere',
                    altitudeRange: [80, 100],
                    color: 'rgba(255, 228, 181, 0.3)',
                    characteristics: 'Very hot but low density. Aurora occur here.'
                }
            ],
            // Temperature data points extracted from the graph
            temperaturePoints: [
                { altitude: 0, temperature: 15 },     // Surface
                { altitude: 5, temperature: -18 },    // Mid troposphere
                { altitude: 10, temperature: -50 },   // Tropopause
                { altitude: 12, temperature: -56 },   // Tropopause boundary
                { altitude: 20, temperature: -56 },   // Lower stratosphere
                { altitude: 30, temperature: -46 },   // Mid stratosphere
                { altitude: 40, temperature: -22 },   // Upper stratosphere
                { altitude: 50, temperature: -3 },    // Stratopause
                { altitude: 60, temperature: -17 },   // Lower mesosphere
                { altitude: 70, temperature: -53 },   // Mid mesosphere
                { altitude: 80, temperature: -86 },   // Mesopause (coldest)
                { altitude: 85, temperature: -81 },   // Lower thermosphere
                { altitude: 90, temperature: -56 },   // Mid thermosphere
                { altitude: 95, temperature: -12 },   // Upper thermosphere
                { altitude: 100, temperature: 27 }    // High thermosphere
            ]
        };

        this.init();
    }

    init() {
        this.createScales();
        this.createTooltip();
        this.drawChart();
        this.addInteractivity();
        this.populateDataTable();
        this.setupKeyboardNavigation();
        this.addEventListeners();
    }

    createScales() {
        // Scale functions for mapping data to screen coordinates
        this.xScale = (temp) => {
            const tempC = this.isCelsius ? temp : this.celsiusToFahrenheit(temp);
            const domain = this.isCelsius ? [-100, 40] : [-148, 104];
            return this.margin.left + ((tempC - domain[0]) / (domain[1] - domain[0])) * this.width;
        };

        this.yScale = (alt) => {
            return this.margin.top + this.height - ((alt / 100) * this.height);
        };
    }

    celsiusToFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }

    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tooltip';
        this.tooltip.style.opacity = '0';
        document.body.appendChild(this.tooltip);
    }

    drawChart() {
        this.clearChart();
        this.drawGrid();
        this.drawAxes();
        this.drawAtmosphericLayers();
        this.drawTemperatureCurve();
        this.drawDataPoints();
        this.drawLabels();
        this.drawGraphics();
    }

    clearChart() {
        ['grid-lines', 'axes', 'atmosphere-layers', 'temperature-curve', 'interactive-points', 'labels', 'graphics']
            .forEach(id => {
                const element = document.getElementById(id);
                if (element) element.innerHTML = '';
            });
    }

    drawGrid() {
        const gridGroup = document.getElementById('grid-lines');

        // Vertical grid lines (temperature)
        const tempRange = this.isCelsius ? [-100, -60, -20, 20, 40] : [-148, -76, -4, 68, 104];
        tempRange.forEach(temp => {
            const x = this.xScale(temp);
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('class', 'grid-line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', this.margin.top);
            line.setAttribute('x2', x);
            line.setAttribute('y2', this.margin.top + this.height);
            gridGroup.appendChild(line);
        });

        // Horizontal grid lines (altitude)
        [0, 20, 40, 60, 80, 100].forEach(alt => {
            const y = this.yScale(alt);
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('class', 'grid-line');
            line.setAttribute('x1', this.margin.left);
            line.setAttribute('y1', y);
            line.setAttribute('x2', this.margin.left + this.width);
            line.setAttribute('y2', y);
            gridGroup.appendChild(line);
        });
    }

    drawAxes() {
        const axesGroup = document.getElementById('axes');

        // X-axis
        const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxis.setAttribute('class', 'axis-line');
        xAxis.setAttribute('x1', this.margin.left);
        xAxis.setAttribute('y1', this.margin.top + this.height);
        xAxis.setAttribute('x2', this.margin.left + this.width);
        xAxis.setAttribute('y2', this.margin.top + this.height);
        axesGroup.appendChild(xAxis);

        // Y-axis
        const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxis.setAttribute('class', 'axis-line');
        yAxis.setAttribute('x1', this.margin.left);
        yAxis.setAttribute('y1', this.margin.top);
        yAxis.setAttribute('x2', this.margin.left);
        yAxis.setAttribute('y2', this.margin.top + this.height);
        axesGroup.appendChild(yAxis);

        // X-axis labels
        const tempRange = this.isCelsius ? [-100, -60, -20, 20] : [-148, -76, -4, 68];
        tempRange.forEach(temp => {
            const x = this.xScale(temp);
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('class', 'axis-text');
            text.setAttribute('x', x);
            text.setAttribute('y', this.margin.top + this.height + 20);
            text.setAttribute('text-anchor', 'middle');
            text.textContent = temp;
            axesGroup.appendChild(text);
        });

        // Y-axis labels
        [0, 20, 40, 60, 80, 100].forEach(alt => {
            const y = this.yScale(alt);
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('class', 'axis-text');
            text.setAttribute('x', this.margin.left - 15);
            text.setAttribute('y', y + 5);
            text.setAttribute('text-anchor', 'middle');
            text.textContent = alt;
            axesGroup.appendChild(text);
        });

        // Axis titles
        const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        xLabel.setAttribute('class', 'axis-label');
        xLabel.setAttribute('x', this.margin.left + this.width / 2);
        xLabel.setAttribute('y', this.margin.top + this.height + 50);
        xLabel.setAttribute('text-anchor', 'middle');
        xLabel.textContent = `Temperature (°${this.isCelsius ? 'C' : 'F'})`;
        axesGroup.appendChild(xLabel);

        const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        yLabel.setAttribute('class', 'axis-label');
        yLabel.setAttribute('x', 25);
        yLabel.setAttribute('y', this.margin.top + this.height / 2);
        yLabel.setAttribute('text-anchor', 'middle');
        yLabel.setAttribute('transform', `rotate(-90 25 ${this.margin.top + this.height / 2})`);
        yLabel.textContent = 'Altitude (km)';
        axesGroup.appendChild(yLabel);
    }

    drawAtmosphericLayers() {
        const layersGroup = document.getElementById('atmosphere-layers');

        this.atmosphericData.layers.forEach((layer, index) => {
            const y1 = this.yScale(layer.altitudeRange[1]);
            const y2 = this.yScale(layer.altitudeRange[0]);

            // Layer background
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('class', `layer-${layer.name.toLowerCase()}`);
            rect.setAttribute('x', this.margin.left);
            rect.setAttribute('y', y1);
            rect.setAttribute('width', this.width);
            rect.setAttribute('height', y2 - y1);
            rect.setAttribute('aria-label', `${layer.name} layer from ${layer.altitudeRange[0]} to ${layer.altitudeRange[1]} km`);
            layersGroup.appendChild(rect);

            // Layer label
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('class', 'axis-text');
            text.setAttribute('x', this.margin.left + this.width + 10);
            text.setAttribute('y', (y1 + y2) / 2);
            text.setAttribute('dominant-baseline', 'middle');
            text.textContent = layer.name;
            layersGroup.appendChild(text);

            // Boundary line
            if (index < this.atmosphericData.layers.length - 1) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('class', 'layer-boundary');
                line.setAttribute('x1', this.margin.left);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', this.margin.left + this.width);
                line.setAttribute('y2', y1);
                layersGroup.appendChild(line);
            }
        });
    }

    drawTemperatureCurve() {
        const curveGroup = document.getElementById('temperature-curve');

        let pathData = '';
        this.atmosphericData.temperaturePoints.forEach((point, index) => {
            const x = this.xScale(point.temperature);
            const y = this.yScale(point.altitude);

            if (index === 0) {
                pathData += `M ${x} ${y}`;
            } else {
                pathData += ` L ${x} ${y}`;
            }
        });

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'temperature-curve');
        path.setAttribute('d', pathData);
        path.setAttribute('aria-label', 'Temperature profile curve showing how temperature changes with altitude');
        curveGroup.appendChild(path);
    }

    drawDataPoints() {
        const pointsGroup = document.getElementById('interactive-points');

        this.atmosphericData.temperaturePoints.forEach((point, index) => {
            const x = this.xScale(point.temperature);
            const y = this.yScale(point.altitude);

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('class', 'data-point');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', 5);
            circle.setAttribute('tabindex', '0');
            circle.setAttribute('role', 'button');
            circle.setAttribute('aria-label',
                `Data point: ${point.altitude} km altitude, ${this.isCelsius ? point.temperature : this.celsiusToFahrenheit(point.temperature).toFixed(1)} degrees ${this.isCelsius ? 'Celsius' : 'Fahrenheit'}`);
            circle.dataset.index = index;

            pointsGroup.appendChild(circle);
        });
    }

    drawLabels() {
        const labelsGroup = document.getElementById('labels');

        // Add layer boundary labels
        const boundaries = [
            { altitude: 12, name: 'Tropopause' },
            { altitude: 50, name: 'Stratopause' },
            { altitude: 80, name: 'Mesopause' }
        ];

        boundaries.forEach(boundary => {
            const y = this.yScale(boundary.altitude);
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('class', 'axis-text');
            text.setAttribute('x', 795);
            text.setAttribute('y', y + 3);
            text.setAttribute('font-size', '10');
            text.setAttribute('fill', '#666');
            text.setAttribute('text-anchor', 'end');
            text.textContent = boundary.name;
            labelsGroup.appendChild(text);
        });
    }

    async drawGraphics() {
        const graphicsGroup = document.getElementById('graphics');

        // Load and display clouds
        try {
            const response = await fetch('./assets/clouds.svg');
            const svgText = await response.text();
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');

            // Extract the content (everything except the root svg element)
            const cloudGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            cloudGroup.setAttribute('id', 'clouds');
            cloudGroup.setAttribute('opacity', '0.6');

            // Copy all child elements from the loaded SVG
            while (svgElement.firstChild) {
                cloudGroup.appendChild(svgElement.firstChild);
            }

            // Lighten the cloud color after loading
            const cloudPaths = cloudGroup.querySelectorAll('path, polygon, ellipse, circle');
            cloudPaths.forEach(path => {
                const fill = path.getAttribute('fill');
                if (fill === '#bab9b9') {
                    path.setAttribute('fill', '#d4d4d4'); // Lighter gray
                }
            });

            graphicsGroup.appendChild(cloudGroup);
        } catch (error) {
            console.log('Could not load clouds.svg:', error);
        }

        // Load and display mountains (if available)
        try {
            const response = await fetch('./assets/mountains.svg');
            const svgText = await response.text();
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');

            const mountainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            mountainGroup.setAttribute('id', 'mountains');
            mountainGroup.setAttribute('opacity', '0.7');

            // Copy all child elements from the loaded SVG
            while (svgElement.firstChild) {
                mountainGroup.appendChild(svgElement.firstChild);
            }

            graphicsGroup.appendChild(mountainGroup);
        } catch (error) {
            console.log('Mountains.svg not found (optional):', error);
        }
    }

    addInteractivity() {
        const points = document.querySelectorAll('.data-point');

        points.forEach(point => {
            point.addEventListener('click', (e) => this.handlePointClick(e));
            point.addEventListener('mouseenter', (e) => this.showTooltip(e));
            point.addEventListener('mouseleave', () => this.hideTooltip());
            point.addEventListener('focus', (e) => this.showTooltip(e));
            point.addEventListener('blur', () => this.hideTooltip());
            point.addEventListener('keydown', (e) => this.handleKeydown(e));
        });
    }

    handlePointClick(event) {
        const index = parseInt(event.target.dataset.index);
        this.selectPoint(index);
    }

    selectPoint(index) {
        // Remove previous selection
        document.querySelectorAll('.data-point.active')
            .forEach(point => point.classList.remove('active'));

        // Add selection to new point
        const point = document.querySelector(`[data-index="${index}"]`);
        point.classList.add('active');

        this.selectedPoint = index;
        this.updateInfoPanel(index);

        // Announce to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Selected data point at ${this.atmosphericData.temperaturePoints[index].altitude} km altitude`;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }

    updateInfoPanel(index) {
        const point = this.atmosphericData.temperaturePoints[index];
        const layer = this.getLayerForAltitude(point.altitude);
        const tempDisplay = this.isCelsius ? point.temperature : this.celsiusToFahrenheit(point.temperature).toFixed(1);
        const unit = this.isCelsius ? '°C' : '°F';

        const panel = document.getElementById('layer-details');
        panel.innerHTML = `
            <div class="layer-info">
                <div class="layer-name">${layer.name}</div>
                <div class="layer-stats">
                    <div><strong>Altitude:</strong> ${point.altitude} km</div>
                    <div><strong>Temperature:</strong> ${tempDisplay}${unit}</div>
                    <div><strong>Layer Range:</strong> ${layer.altitudeRange[0]}-${layer.altitudeRange[1]} km</div>
                    <div><strong>Characteristics:</strong> ${layer.characteristics}</div>
                </div>
            </div>
        `;
    }

    getLayerForAltitude(altitude) {
        return this.atmosphericData.layers.find(layer =>
            altitude >= layer.altitudeRange[0] && altitude <= layer.altitudeRange[1]
        ) || this.atmosphericData.layers[this.atmosphericData.layers.length - 1];
    }

    showTooltip(event) {
        const index = parseInt(event.target.dataset.index);
        const point = this.atmosphericData.temperaturePoints[index];
        const layer = this.getLayerForAltitude(point.altitude);
        const tempDisplay = this.isCelsius ? point.temperature : this.celsiusToFahrenheit(point.temperature).toFixed(1);
        const unit = this.isCelsius ? '°C' : '°F';

        this.tooltip.innerHTML = `
            <strong>${layer.name}</strong><br>
            Altitude: ${point.altitude} km<br>
            Temperature: ${tempDisplay}${unit}
        `;

        const rect = event.target.getBoundingClientRect();
        this.tooltip.style.left = (rect.left + window.scrollX + 10) + 'px';
        this.tooltip.style.top = (rect.top + window.scrollY - 10) + 'px';
        this.tooltip.style.opacity = '1';
    }

    hideTooltip() {
        this.tooltip.style.opacity = '0';
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('data-point')) {
                const index = parseInt(e.target.dataset.index);
                let newIndex = index;

                switch (e.key) {
                    case 'ArrowUp':
                        newIndex = Math.min(index + 1, this.atmosphericData.temperaturePoints.length - 1);
                        break;
                    case 'ArrowDown':
                        newIndex = Math.max(index - 1, 0);
                        break;
                    case 'Enter':
                    case ' ':
                        this.selectPoint(index);
                        e.preventDefault();
                        return;
                }

                if (newIndex !== index) {
                    const newPoint = document.querySelector(`[data-index="${newIndex}"]`);
                    newPoint.focus();
                    e.preventDefault();
                }
            }
        });
    }

    addEventListeners() {
        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            document.querySelectorAll('.data-point.active')
                .forEach(point => point.classList.remove('active'));
            this.selectedPoint = null;
            document.getElementById('layer-details').innerHTML =
                '<p>Click on a point on the chart or use the keyboard to navigate and explore temperature data for different atmospheric layers.</p>';
        });

        // Toggle units button
        document.getElementById('toggle-units').addEventListener('click', () => {
            this.isCelsius = !this.isCelsius;
            this.drawChart();
            this.addInteractivity();
            if (this.selectedPoint !== null) {
                this.selectPoint(this.selectedPoint);
            }

            // Update button text
            const btn = document.getElementById('toggle-units');
            btn.textContent = this.isCelsius ? 'Show °F' : 'Show °C';
        });
    }

    populateDataTable() {
        const tbody = document.getElementById('table-body');

        this.atmosphericData.layers.forEach(layer => {
            const row = document.createElement('tr');

            // Find temperature range for this layer
            const layerPoints = this.atmosphericData.temperaturePoints.filter(point =>
                point.altitude >= layer.altitudeRange[0] && point.altitude <= layer.altitudeRange[1]
            );

            const temps = layerPoints.map(p => p.temperature);
            const minTemp = Math.min(...temps);
            const maxTemp = Math.max(...temps);

            row.innerHTML = `
                <td><strong>${layer.name}</strong></td>
                <td>${layer.altitudeRange[0]}-${layer.altitudeRange[1]} km</td>
                <td>${minTemp}°C to ${maxTemp}°C</td>
                <td>${layer.characteristics}</td>
            `;

            tbody.appendChild(row);
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AtmosphericTemperatureChart();

    // Set initial button text
    document.getElementById('toggle-units').textContent = 'Show °F';
});

// Add screen reader only class for accessibility announcements
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(style);