const getHumanDate = (isoDate) => {
  let myDate = new Date(isoDate);
  let pstDate = myDate.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles"
  });
  const time = pstDate.split(', ');

  return time[1].slice().replace(":00", "");

};
