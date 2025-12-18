const libchatHash = '30c067282fb40fb55e758c16d27c656d';
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