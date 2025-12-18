const libchatHash = 'a24b10a3580f241dc2aaf29a0b97ab2f';
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