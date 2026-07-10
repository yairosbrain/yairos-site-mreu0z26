function searchVehicle() {
    const vinInput = document.getElementById('vinInput');
    const vin = vinInput.value.trim();
    const resultArea = document.getElementById('resultArea');

    if (!vin) {
        resultArea.innerHTML = '<p style="color: var(--error)" role="alert">נא להזין מספר רכב תקין</p>';
        return;
    }

    resultArea.innerHTML = '<p aria-live="polite">טוען נתונים...</p>';

    setTimeout(() => {
        resultArea.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" role="region" aria-labelledby="report-title">
                <h3 id="report-title">דוח רכב עבור: ${vin}</h3>
                <hr>
                <p><strong>יצרן:</strong> טויוטה</p>
                <p><strong>דגם:</strong> קורולה</p>
                <p><strong>קילומטראז':</strong> 45,000 ק"מ</p>
                <p><strong>מספר ידיים:</strong> 1</p>
                <p style="color: #28a745"><strong>סטטוס:</strong> ללא תאונות רשומות</p>
            </div>
        `;
    }, 1000);
}