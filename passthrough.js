const curl = new (require( 'curl-request' ))();
const interval = 30 * 60 * 1000; // once every 30 minutes

const ping_tt = () => {
  var date = new Date()
  var date_utc_string = date.getUTCFullYear().toString() + (date.getUTCMonth() + 1).toString().padStart(2, '0') + date.getUTCDate().toString().padStart(2, '0')
  // 00z 006z 12z 18z
  if (date.getUTCHours() > 22 || date.getUTCHours() < 4) {
    date_utc_string += "18"
  } else if (date.getUTCHours() > 16) {
    date_utc_string += "12"
  } else if (date.getUTCHours() > 10) {
    date_utc_string += "06"
  } else {
    date_utc_string += "00"
  }
  
  var sounding_link = `https://tropicaltidbits.com/analysis/models/sounding/?model=gfs&runtime=${date_utc_string}&fh=6&lat=39.93&lon=-75.17&stationID=&tc=&mode=regular`
  
  curl.setHeaders([
      'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
  ])
  .get(sounding_link)
  .then(({statusCode, body, headers}) => {
      console.log("success");
  })
  .catch((e) => {
      console.log(e);
  });
}

ping_tt(); // do it once on startup.

setInterval(() => {
  ping_tt();
}, interval);