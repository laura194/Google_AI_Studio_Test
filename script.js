const API_KEY = "AIzaSyDyFj67Ay1UiJOvS_YF8cTEFvIGqmiMIP8"; // Ersetze mit deinem Google API Key
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

async function getAIResponse() {
    const prompt = document.getElementById("prompt").value.trim();
    if (!prompt) {
        alert("Bitte gib einen Text ein!");
        return;
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("output").innerText = "";

    const requestData = {
        contents: [{ parts: [{ text: prompt }] }]
    };

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        console.log("Antwort-Objekt der API:", data);
        const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "Keine Antwort erhalten.";
        document.getElementById("output").innerHTML = marked.parse(result);
    } catch (error) {
        let errorMessage = "Fehler bei der Anfrage.";
        // Fehlermeldung nur in einem Banner anzeigen, keine JSON-Ausgabe mehr.
        const errorBanner = document.createElement('div');
        errorBanner.className = 'error-banner'; // füge CSS-Klasse für Styling hinzu
        errorBanner.textContent = errorMessage;
        document.body.appendChild(errorBanner); // oder ein spezifisches Container-Element

        console.error("Fehler:", error); // Fehler weiterhin in der Konsole loggen für Debugging
    } finally {
        document.getElementById("loading").style.display = "none";
    }
}