// מאגר הרכב הממשלתי — data.gov.il (קריאה ישירה, המאגר פתוח ל-CORS, בלי מפתח)
const RESOURCE_ID = '053cea08-09bc-40ec-8f7a-156f0677aff3';

function fmt(v) {
    return v === null || v === undefined || v === '' ? 'לא ידוע' : v;
}

async function searchVehicle() {
    const vinInput = document.getElementById('vinInput');
    const plate = vinInput.value.replace(/[^0-9]/g, '');
    const resultArea = document.getElementById('resultArea');

    if (!plate) {
        resultArea.innerHTML = '<p style="color: var(--error)" role="alert">נא להזין מספר רכב תקין (ספרות בלבד)</p>';
        return;
    }

    resultArea.innerHTML = '<p aria-live="polite">טוען נתונים מהמאגר הממשלתי, אנא המתן...</p>';

    try {
        const filters = encodeURIComponent(JSON.stringify({ mispar_rechev: Number(plate) }));
        const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=${RESOURCE_ID}&filters=${filters}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        if (data.success && data.result.records.length > 0) {
            const car = data.result.records[0];
            resultArea.innerHTML = `
                <div class="result-card" role="region">
                    <h3>דוח רכב מס' ${plate}</h3>
                    <hr>
                    <p><strong>יצרן:</strong> ${fmt(car.tozeret_nm)}</p>
                    <p><strong>דגם:</strong> ${fmt(car.kinuy_mishari)} (${fmt(car.degem_nm)})</p>
                    <p><strong>שנת ייצור:</strong> ${fmt(car.shnat_yitzur)}</p>
                    <p><strong>עלה לכביש:</strong> ${fmt(car.moed_aliya_lakvish)}</p>
                    <p><strong>צבע:</strong> ${fmt(car.tzeva_rechev)}</p>
                    <p><strong>סוג דלק:</strong> ${fmt(car.sug_delek_nm)}</p>
                    <p><strong>בעלות:</strong> ${fmt(car.baalut)}</p>
                    <p><strong>טסט אחרון:</strong> ${fmt(car.mivchan_acharon_dt)}</p>
                    <p><strong>טסט בתוקף עד:</strong> ${fmt(car.tokef_dt)}</p>
                    <p><strong>מספר שלדה:</strong> ${fmt(car.misgeret)}</p>
                    <p><strong>דגם מנוע:</strong> ${fmt(car.degem_manoa)}</p>
                    <p><strong>צמיגים:</strong> קדמי ${fmt(car.zmig_kidmi)} · אחורי ${fmt(car.zmig_ahori)}</p>
                    <p class="note">קילומטראז' והיסטוריית תאונות אינם זמינים במקורות מידע פתוחים.</p>
                </div>
            `;
        } else {
            resultArea.innerHTML = '<p style="color: var(--error)">לא נמצא מידע עבור מספר רכב זה במאגר (אופנועים ורכב כבד נמצאים במאגרים נפרדים).</p>';
        }
    } catch (error) {
        resultArea.innerHTML = '<p style="color: var(--error)">שגיאה בחיבור למאגר הנתונים. אנא נסה שוב מאוחר יותר.</p>';
    }
}

document.getElementById('vinInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchVehicle();
});
