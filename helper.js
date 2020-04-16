const API_KEY = "fb152052ccba48008b8b46af1b5753bf";
const API_ID = "68edc7bd"
const OXFORD_REST = "https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v1/entries/en/"

function myAjax(url, postMethod, body) {
  return new Promise((resolve, reject) => {
    var xmlHttpObj = new XMLHttpRequest();
    xmlHttpObj.onreadystatechange = function () {
      if (xmlHttpObj.readyState === 4) {
        if (xmlHttpObj.status === 200) {
          resolve(xmlHttpObj);
        } else {
          reject(xmlHttpObj)
        }
      }
    }
    xmlHttpObj.open(postMethod, url);
    xmlHttpObj.setRequestHeader("app_id", API_ID);
    xmlHttpObj.setRequestHeader("app_key", API_KEY);
    xmlHttpObj.setRequestHeader("Cache-Control", "no-cache");
    xmlHttpObj.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlHttpObj.send(body);
  })
}
function getDictonaryEntriesForWord(word) {
  return myAjax(OXFORD_REST + word, "GET", null)

}
export { getDictonaryEntriesForWord }
