




// const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxYourWebAppId/exec";

// function sendToSheet() {
//   fetch(WEB_APP_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       name: "Alice",
//       score: 95
//     })
//   })
//     .then(res => res.json())
//     .then(data => console.log("Response from Apps Script:", data))
//     .catch(err => console.error("Error:", err));
// }

// // Example: run immediately
// sendToSheet();



// let sendDataToSheets = (scrapedData) => {
//   let gSheetLink = "https://script.google.com/macros/s/AKfycbws1bf8k_tRz8xuW-XDcmNlxVQNpd_t2rdMNuqgxzvHAntT1G-kOwzCQUdzmDPfIr9mIg/exec"
//   fetch(gSheetLink, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(scrapedData),
//   })
//     .then(res => res.text())
//     .then(msg => console.log(msg))
//     .catch(err => console.error(err));
// }




// document.getElementById("submit").addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript(
//     {
//       target: { tabId: tab.id },
//       func: scrapePage,
//     },
//     (results) => {
//       const output = results[0].result;
//       document.getElementById("output").textContent = JSON.stringify(output, null, 2);
//       try {
//         sendDataToSheets(output);
//         console.log("Sent data to Google Sheets successfully");
//       } catch (error) {
//         console.error("Error sending data to Google Sheets:", error);
//       }
//     }
//   );
// });


let sendDataToSheets = (payload) => {
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbws1bf8k_tRz8xuW-XDcmNlxVQNpd_t2rdMNuqgxzvHAntT1G-kOwzCQUdzmDPfIr9mIg/exec";

    fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => console.log("Response from Apps Script:", data))
      .catch(err => console.error("Error:", err));
}

// recieving data from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background got message:", message);
  if (message.type == "SEND_PAYLOAD") {
    // console.log("Received in background:", message.payload);                //! gotta check
    sendDataToSheets(message.payload.output);

    // Example: send response back
    sendResponse({ status: "ok", received: message.payload.name });
  }

  // Keep the channel open for async (optional)
  return true;
});









