# Atmospheric Temperature Profile Interactive

An educational interactive tool for Physical Science students to explore how temperature changes with altitude across different atmospheric layers.

## 🎯 Learning Objectives

This interactive supports the following course competencies:
- **CC8.1**: Identify the composition of and factors that affect the Earth's atmosphere
- **LO8.1.1**: Analyze the composition, structure, and pressure of the atmosphere

## 🌡️ Features

- **Interactive Temperature Chart**: Click on data points to explore temperature and altitude relationships
- **Authentic Scientific Data**: Based on standard atmospheric models with accurate temperature profiles
- **Atmospheric Layer Visualization**: Visual representation of troposphere, stratosphere, mesosphere, and thermosphere
- **Unit Conversion**: Toggle between Celsius and Fahrenheit
- **Full Accessibility**: Screen reader support, keyboard navigation, and WCAG compliance
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 📊 Atmospheric Layers Covered

1. **Troposphere** (0-12 km): Where weather occurs, temperature decreases with altitude
2. **Stratosphere** (12-50 km): Contains ozone layer, temperature increases with altitude
3. **Mesosphere** (50-80 km): Coldest layer where meteors burn up
4. **Thermosphere** (80-100+ km): Very hot but low density, where auroras occur

## 🚀 Getting Started

### View Online
The interactive is hosted on GitHub Pages: [Live Demo](https://[your-username].github.io/altitude-and-temperature/)

### Local Development
1. Clone this repository
2. Open `index.html` in a web browser
3. No build process required - it's a static site!

### For Canvas LMS Integration
1. Use the GitHub Pages URL as an external tool
2. Set dimensions to at least 800x700px for optimal viewing
3. Enable new window/tab opening for better user experience

## 🎮 How to Use

1. **Explore Data Points**: Click on any blue circle on the temperature curve
2. **Keyboard Navigation**: Use Tab to navigate, Arrow keys to move between points, Enter/Space to select
3. **View Layer Information**: Selected points display detailed information in the side panel
4. **Change Units**: Use the "Toggle °F/°C" button to switch temperature units
5. **Reset View**: Use the "Reset View" button to clear selections
6. **Data Table**: Scroll down to see a comprehensive table of all atmospheric layer data

## 📱 Accessibility Features

- **Screen Reader Compatible**: Full ARIA labeling and semantic HTML
- **Keyboard Navigation**: Complete keyboard accessibility
- **High Contrast Support**: Respects user's contrast preferences
- **Reduced Motion**: Respects user's motion preferences
- **Focus Management**: Clear focus indicators throughout
- **Alternative Text**: Comprehensive descriptions for visual elements

## 🔧 Technical Details

- **Frontend**: Vanilla HTML5, CSS3, and JavaScript (ES6+)
- **Visualization**: SVG-based charts for crisp rendering at any scale
- **Data**: Extracted from standard atmospheric temperature profiles
- **Hosting**: GitHub Pages compatible
- **Dependencies**: None - completely self-contained

## 🎨 Graphics Development

### Working with SVG Graphics
The project includes visual elements like mountains and clouds to help students connect atmospheric layers to real-world experience.

#### File Structure
- `raw-graphics-files/` - Source files for graphics development
  - `chart-template.svg` - Template with exact chart dimensions and coordinates for Illustrator
- `assets/` - Final SVG files used in the interactive (created after graphics are finalized)

#### Graphics Workflow
1. **Open Template**: Use `raw-graphics-files/chart-template.svg` in Adobe Illustrator
2. **Design Elements**: Add mountains, clouds, and other visual anchors
   - Ground level: y="550" (0 km altitude)
   - Troposphere area: y="490" to y="550" (0-12 km)
   - Chart width: x="100" to x="700"
3. **Export Graphics**: Save individual elements as separate SVG files
4. **Final Placement**: Place finished SVGs in `assets/` directory
   - `assets/mountains.svg` - Ground-level mountain silhouettes
   - `assets/clouds.svg` - Troposphere cloud formations
5. **Integration**: Update `script.js` to include new graphics in chart rendering

#### Design Guidelines
- Keep graphics simple and educational
- Use colors that complement the existing atmospheric layer colors
- Ensure graphics don't obscure data points or temperature curve
- Design for scalability (SVG format maintains quality at all sizes)

## 📖 Educational Use

### Discussion Points
- Why does temperature decrease in the troposphere but increase in the stratosphere?
- What causes the temperature inversion in the stratosphere?
- Why is the mesosphere the coldest layer despite being higher in the atmosphere?
- How do these temperature variations affect atmospheric phenomena?

### Extension Activities
- Compare Earth's atmospheric profile to other planets
- Research how atmospheric composition affects temperature profiles
- Investigate the role of different atmospheric layers in protecting life on Earth

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Temperature data based on the International Standard Atmosphere model
- Designed for technical college Physical Science curricula
- Built with accessibility and educational effectiveness as primary goals

---

**For technical support or educational questions, please open an issue in this repository.**