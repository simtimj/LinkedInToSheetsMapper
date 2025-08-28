// document.querySelector("h1");          // first <h1>
// document.querySelectorAll("")


// steps:
// 1. add button in popup.html
// 2. add event listener in popup.js
// 3. call content.js function on button click

// document.getElementsByClassName("job-details-jobs-unified-top-card__company-name")

document.getElementById("submit").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); // get active tab

  // Inject content script to scrape the page
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const companyClass = document.querySelector(".job-details-jobs-unified-top-card__company-name").
      alert("companyClass:", JSON.stringify(companyClass));
      return companyClass;
    }
  }, (results) => {
    alert(results)
    alert("completed")
  });
});
