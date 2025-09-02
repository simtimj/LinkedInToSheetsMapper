
function scrapeJobs() {
  let companyClass = document.querySelectorAll("job-details-jobs-unified-top-card__company-name")
  

  // Example: scrape job titles from a page
  const jobs = [...document.querySelectorAll(".job-card-title")]
    .map(el => el.innerText.trim());
  alert(jobs);



  // Send data to the background or popup
  // chrome.runtime.sendMessage({ type: "SCRAPED_JOBS", data: jobs });
}





























