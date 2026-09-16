const MeasurementsManager = {
    definitions: {
        B: { label: 'Bust Circumference', default: 36.0 },
        W: { label: 'Waist Circumference', default: 28.0 },
        H: { label: 'Hip Circumference', default: 38.0 },
        BW: { label: 'Back Waist Length', default: 16.5 },
        WH: { label: 'Waist-to-Hip Length', default: 8.0 },
        BWidth: { label: 'Across Back Width', default: 14.0 },
        CWidth: { label: 'Across Chest Width', default: 13.0 },
        S: { label: 'Shoulder Length', default: 5.0 },
        A: { label: 'Arm Length', default: 23.0 },
        TA: { label: 'Top Arm Circumference', default: 11.5 }
    },

    currentUnit: 'inch',

    init() {
        this.renderInputs();
    },

    renderInputs() {
        const container = document.getElementById('measurements-inputs');
        if (!container) return;
        container.innerHTML = '';

        for (const [key, item] of Object.entries(this.definitions)) {
            const displayVal = this.currentUnit === 'cm' ? (item.default * 2.54).toFixed(1) : item.default;
            const div = document.createElement('div');
            div.className = 'form-group';
            div.innerHTML = `
                <label for="m-${key}">${item.label} (${this.currentUnit}):</label>
                <input type="number" id="m-${key}" data-key="${key}" value="${displayVal}" step="0.1">
            `;
            container.appendChild(div);
        }
    },

    getValuesInInches() {
        const values = {};
        for (const [key, item] of Object.entries(this.definitions)) {
            const input = document.querySelector(`#measurements-inputs input[data-key="${key}"]`);
            let val = input ? parseFloat(input.value) : item.default;
            if (isNaN(val) || val <= 0) val = item.default;

            if (this.currentUnit === 'cm') {
                val = val / 2.54;
            }
            values[key] = val;
        }
        return values;
    }
};
