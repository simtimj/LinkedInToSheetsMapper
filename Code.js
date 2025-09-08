
/*
1. Designate proper spreadsheet.
2. Find proper last filled row
3. How to receive data from extension click. 

*/

function doPost(e) {

  try {
    console.log("woah woah woah")
    const ss = SpreadsheetApp.openById("1l2xPwAv9hUHy1Jd5MHLXYLLnbeG4gaPl2MzieD8aYCM").getSheetByName("2nd Tech Job Search June 2024");
    let data = JSON.parse(e.postData.contents);

    // this will take up resources. Maybe just manual selection
    let findLastFilledRow = () => {
      let vals = ss.getRange(1, 4, ss.getLastRow()).getValues(); // // correctly displaying all entries of col D
      let position, rowNum;
      for (let i = 0; i < vals.length; i++) {
          rowNum = i + 1;
          position = vals[i];
          if (position == "") {
            console.log("last row:", rowNum);
            return rowNum;
          }
      }
    } 

    let insertData = (e) => {

      console.log("data:", data)
      // currently selecting row
      let row = findLastFilledRow();  // working correctly

      ss.getRange(row, 3).setValue(data.companyName);    // Column C
      ss.getRange(row, 4).setValue(data.positionName);  // Column D
      ss.getRange(row, 5).setValue(data.location);     // Column E
      ss.getRange(row, 6).setValue(data.salaryRange);     // Column F
      ss.getRange(row, 7).setValue(data.jobLink);     // Column G

      return data;
    }

    const response = { status: "success", received: data };
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    Logger.log("Error: " + error);
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}












