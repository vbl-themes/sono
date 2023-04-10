function LoadPocket(url, node, limit = 10) {
	if (url === undefined || node === undefined) return;
	
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState !== xhr.DONE) return;
		if (xhr.status !== 200) node.insertAdjacentHTML("beforeend","Failed to load Pocket list.");
		
		let items = new window.DOMParser()
			.parseFromString(xhr.responseText, "text/xml")
			.querySelectorAll("item");
		
		items.forEach(el => {
			if (limit === 0) return;
			
			node.insertAdjacentHTML(
				"beforeend",
				`<li><a href="${el.querySelector('link').textContent}" target="_blank">${el.querySelector('title').textContent}</a></li>`
			)
			
			limit--;
		});
	}
	xhr.open("GET", url, true);
	xhr.send();
}
