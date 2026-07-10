async function searchVehicle() {
    const vinInput = document.getElementById('vinInput');
    const vin = vinInput.value.trim();
    const resultArea = document.getElementById('resultArea');

    if (!vin) {
        resultArea.innerHTML = '<p style="color: var(--error)" role="alert">נא להזין מספר רכב תקין</p>';
        return;
    }

    resultArea.innerHTML = '<p aria-live="polite">טוען נתונים, אנא המתן...</p>';

    try {
        // Using a CORS proxy to bypass the data.gov.il CORS restriction
        const proxyUrl = 'https://corsproxy.io/?';
        const targetUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f06774365&q=${vin}`;
        
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        const data = await response.json();

        if (data.success && data.result.records.length > 0) {
            const car = data.result.records[0];
            resultArea.innerHTML = `
                <div class="result-card" role="region">
                    <h3>דוח מפורט עבור מספר רכב: ${vin}</h3>
                    <hr>
                    <p><strong>יצרן:</strong> ${car.tozar || 'לא ידוע'}</p>
                    <p><strong>דגם:</strong> ${car.kinuy_mishari || 'לא ידוע'}</p>
                    <p><strong>שנת ייצור:</strong> ${car.shnat_yitzur || 'לא ידוע'}</p>
                    <p><strong>צבע:</strong> ${car.tzeva_rechev || 'לא ידוע'}</p>
                    <p><strong>סוג דלק:</strong> ${car.sug_delek_nm || 'לא ידוע'}</p>
                    <p><strong>סטטוס רישוי:</strong> ${car.status || 'תקין'}</p>
                </div>
            `;
        } else {
            resultArea.innerHTML = '<p style="color: var(--error)">לא נמצא מידע עבור מספר רכב זה.</p>';
        }
    } catch (error) {
        resultArea.innerHTML = '<p style="color: var(--error)">שגיאה בחיבור למאגר הנתונים (ייתכן שהשרת חסום זמנית). אנא נסה שוב מאוחר יותר.</p>';
    }
}