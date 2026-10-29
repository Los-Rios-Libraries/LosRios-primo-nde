const libchatHash = 'c5c1abe3b80e070681d3fa045fc19bf4';
(() => { // load libchat
		const noWidgetPattern = new RegExp(`https://caccl-lrccd.primo.exlibrisgroup.com/(delivery|researchAssistant)`);
		const host = 'answers.library.losrios.edu';
		const div = document.createElement('div');
		div.id = `libchat_${libchatHash}`;
		document.getElementsByTagName('body')[0].appendChild(div);
		const scr = document.createElement('script');
		scr.src = `https://${host}/load_chat.php?hash=${libchatHash}`;
		setTimeout(() => {
			if (noWidgetPattern.test(location.href) === false) { // don't include in Alma viewer or Primo AI tool
				document.getElementsByTagName('body')[0].appendChild(scr);
			}
		}, 2000);
	})();

(() => {
  // set the term and hours in the footer based on the current date
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const date = d.getDate();
  const summerHours = `<li>Monday to Thursday: 8:00 am - 6:00 pm</li>
<li>Friday to Sunday: closed</li>`;
  let term = '';
  if (month >= 0 && month <= 4) {
    // Jan - May
    term = 'Spring';
  } else if (month >= 5 && month <= 6) {
    // June - July
    term = 'Summer';
  } else if (month === 7 && date <= 10) {
    // August 1-10
    term = 'Summer';
  } else {
    term = 'Fall';
  }
  const termHTML = `, ${term} ${year.toString()}`;
  console.log('term-year for footer', termHTML);
  const wait = setInterval(() => {
    // wait for footer to load
    const termSpan = document.getElementById('scc-hours-term');
    console.log('waiting for footer');
    if (termSpan) {
      clearInterval(wait);
      termSpan.innerHTML = termHTML;
      if (term === 'Summer') {
        const hoursSpan = document.getElementById('scc-hours');
        if (hoursSpan) {
          hoursSpan.innerHTML = summerHours;
        }
      }
    }
  }, 500);
})();  


