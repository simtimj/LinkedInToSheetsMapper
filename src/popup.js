// document.querySelector("h1");          // first <h1>
// document.querySelectorAll("")

// steps:
// 1. add button in popup.html
// 2. add event listener in popup.js
// 3. call content.js function on button click

// document.getElementsByClassName("job-details-jobs-unified-top-card__company-name")

document.getElementById("submit").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: scrapePage,
    },
    (results) => {
      const output = results[0].result;
      document.getElementById("output").textContent = JSON.stringify(output, null, 2);
    }
  );
});

// This function runs inside the webpage
function scrapePage() {
  // Example: grab all links inside <div>
  const companyName = Array.from(document.getElementsByClassName("job-details-jobs-unified-top-card__company-name")).map(a => (a.innerText.trim()))[0];
  const positionClass = Array.from(document.getElementsByClassName("job-details-jobs-unified-top-card__job-title")).map(a => (a.innerText.trim()))[0];

  let jobDetailsFitLevelPrefs = Array.from(document.getElementsByClassName("job-details-fit-level-preferences")).map(a => (a.innerText.trim()).split("\n"));

  let salaryRangeClass = jobDetailsFitLevelPrefs[0][0];
  let locationClass = jobDetailsFitLevelPrefs[0][1].slice(1);


  let currTabUrl = window.location.href;
  let jobID = currTabUrl.split("currentJobId=")[1].split("&")[0];

  // get curent tab url
  // parse  to resemble  https://www.linkedin.com/jobs/view/4294095087
  let jobLink = `https://www.linkedin.com/jobs/view/${jobID}`;



  return { companyName, positionClass, locationClass, salaryRangeClass, jobLink };
}
