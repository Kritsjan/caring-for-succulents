// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('wateringCalculator');
    const plantTypeSelect = document.getElementById('plantType');
    const potSizeInput = document.getElementById('potSize');
    const humiditySlider = document.getElementById('humidity');
    const humidityOutput = document.getElementById('humidityOutput');
    const resultsSection = document.getElementById('results');
    const wateringScheduleDiv = document.getElementById('wateringSchedule');
    const seasonalNoteDiv = document.getElementById('seasonalNote');
    const unitToggle = document.getElementById('unitToggle');

    console.log('Form elements loaded:', {
        form: form,
        plantTypeSelect: plantTypeSelect,
        potSizeInput: potSizeInput,
        humiditySlider: humiditySlider,
        humidityOutput: humidityOutput,
        resultsSection: resultsSection,
        wateringScheduleDiv: wateringScheduleDiv,
        seasonalNoteDiv: seasonalNoteDiv
    });

    // Function to update slider output position and value
    function updateSliderOutput() {
        const value = humiditySlider.value;
        const percent = ((value - humiditySlider.min) / (humiditySlider.max - humiditySlider.min)) * 100;
        humidityOutput.textContent = value + '%';
        humidityOutput.style.left = `calc(${percent}% - ${humidityOutput.offsetWidth / 2}px)`;
    }

    // Function to calculate base watering frequency
    function calculateBaseFrequency(plantType) {
        const baseFrequencies = {
            'desert': 14,
            'tropical': 7,
            'sempervivum': 10,
            'echeveria': 10,
            'haworthia': 12
        };
        return baseFrequencies[plantType] || 10;
    }

    // Function to adjust frequency based on factors
    function adjustForFactors(base, potSize, light, season, humidity) {
        let frequency = base;

        // Pot size adjustments
        if (potSize <= 2) frequency *= 0.8;
        else if (potSize >= 6) frequency *= 1.2;

        // Adjust for light conditions
        const lightFactors = {
            'full': 0.8,    // Full Sun
            'partial': 1,   // Partial Sun
            'shade': 1.2    // Shade
        };
        frequency *= lightFactors[light] || 1;

        // Adjust for season
        const seasonFactors = {
            'summer': 0.8,
            'spring': 1,
            'fall': 1.2,
            'winter': 1.5
        };
        frequency *= seasonFactors[season] || 1;

        // Adjust for humidity
        frequency *= (1 + (50 - humidity) / 100);

        return Math.round(frequency);
    }

    // Function to display results
    function displayResults(frequency, plantType, season, humidity) {
        console.log('Displaying results:', { frequency, plantType, season, humidity });
        
        const plantNames = {
            'desert': 'Desert Cacti',
            'tropical': 'Tropical Succulent',
            'sempervivum': 'Sempervivum (Hens and Chicks)',
            'echeveria': 'Echeveria',
            'haworthia': 'Haworthia'
        };

        const plantName = plantNames[plantType] || 'succulent';
        
        // Clear any existing content
        wateringScheduleDiv.innerHTML = '';
        seasonalNoteDiv.innerHTML = '';
        
        // Add new content
        wateringScheduleDiv.innerHTML = `
            <p class="watering-schedule">
                Water your ${plantName} every
                <strong>${frequency} days</strong>
            </p>
        `;

        // Add seasonal advice
        const seasonalAdvice = {
            'summer': 'During summer, monitor your plant closely as it may need more frequent watering due to increased evaporation.',
            'winter': 'In winter, your succulent is semi-dormant and needs less water. Always check soil dryness before watering.',
            'spring': 'Spring is the growing season - maintain consistent watering as calculated.',
            'fall': 'As temperatures drop in fall, gradually reduce watering frequency.'
        };

        seasonalNoteDiv.innerHTML = `
            <p class="seasonal-note">${seasonalAdvice[season] || ''}</p>
            <div class="watering-tips">
                <h4>Additional Tips:</h4>
                <ul>
                    <li>Always check soil dryness before watering</li>
                    <li>Water thoroughly until water drains from the bottom</li>
                    <li>Adjust frequency based on your plant's response</li>
                    <li>Current humidity (${humidity}%) may affect water needs</li>
                </ul>
            </div>
        `;

        // Show results section
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        console.log('Results displayed:', {
            wateringScheduleHTML: wateringScheduleDiv.innerHTML,
            seasonalNoteHTML: seasonalNoteDiv.innerHTML,
            resultsVisible: !resultsSection.classList.contains('hidden')
        });
    }

    // Event listener for form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            try {
                const plantType = plantTypeSelect.value;
                const potSize = parseFloat(potSizeInput.value);
                const light = document.querySelector('input[name="light"]:checked').value;
                const season = document.querySelector('input[name="season"]:checked').value;
                const humidity = parseInt(humiditySlider.value);

                console.log('Form values:', { plantType, potSize, light, season, humidity });

                if (!plantType || isNaN(potSize) || !light || !season || isNaN(humidity)) {
                    console.error('Invalid form values');
                    return;
                }

                const baseFrequency = calculateBaseFrequency(plantType);
                const adjustedFrequency = adjustForFactors(baseFrequency, potSize, light, season, humidity);

                console.log('Calculated frequency:', { baseFrequency, adjustedFrequency });

                displayResults(adjustedFrequency, plantType, season, humidity);
            } catch (error) {
                console.error('Error processing form:', error);
            }
        });
    }

    // Event listener for unit toggle
    if (unitToggle) {
        unitToggle.addEventListener('change', function() {
            const isMetric = this.checked;
            const unitText = document.querySelector('.unit-text');
            
            if (isMetric) {
                unitText.textContent = 'cm';
                potSizeInput.placeholder = 'Enter pot diameter in cm';
                if (potSizeInput.value) {
                    potSizeInput.value = (parseFloat(potSizeInput.value) * 2.54).toFixed(1);
                }
            } else {
                unitText.textContent = 'inches';
                potSizeInput.placeholder = 'Enter pot diameter in inches';
                if (potSizeInput.value) {
                    potSizeInput.value = (parseFloat(potSizeInput.value) / 2.54).toFixed(1);
                }
            }
        });
    }

    // Event listener for humidity slider
    if (humiditySlider) {
        humiditySlider.addEventListener('input', updateSliderOutput);
        updateSliderOutput(); // Initialize the output display
    }
});
