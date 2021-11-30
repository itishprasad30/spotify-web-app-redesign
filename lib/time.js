export function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);

  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// millisToMinutesAndSeconds(298999); // "4:59"
// millisToMinutesAndSeconds(60999); // "1:01"
// return seconds == 60
//   ? minutes + 1 + ":00"
//   : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
