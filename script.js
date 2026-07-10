async function searchVehicle() {
    const vinInput = document.getElementById('vinInput');
    const vin = vinInput.value.trim();
    const resultArea = document.getElementById('resultArea');

    if (!vin) {
        resultArea.innerHTML = '<p style="color: var(--error)" role="alert">נא להזין מספר רכב תקין</p>';
        return;
    }

    resultArea.innerHTML = '<p aria-live="polite">מתחבר למאגר הנתונים הממשלתי...</p>';

    try {
        // שימוש ב-API של מאגר הנתונים הממשלתי (data.gov.il)
        const response = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f06774365&q=${vin}`);
        const data = await response.json();

        if (data.success && data.result.records.length > 0) {
            const car = data.result.records[0];
            resultArea.innerHTML = `
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" role="region">
                    <h3 id="report-title">דוח מפורט עבור מספר רכב: ${vin}</h3>
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
            resultArea.innerHTML = '<p style="color: var(--error)">לא נמצא מידע עבור מספר רכב זה במאגר הממשלתי.</p>';
        }
    } catch (error) {
        resultArea.innerHTML = '<p style="color: var(--error)">שגיאה בחיבור למאגר הנתונים. אנא נסה שוב מאוחר יותר.</p>';
    }
}