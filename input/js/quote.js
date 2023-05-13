function LoadQuote(url, node) {
	if (url === undefined || node === undefined) return;

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState !== xhr.DONE) return;
		if (xhr.status !== 200) node.insertAdjacentHTML("beforeend","Failed to load quote.");

		let items = new window.DOMParser()
			.parseFromString(xhr.responseText, "text/xml")
			.querySelectorAll("item");
		
		let el = items[Math.floor(Math.random() * items.length)];
		let quote = el.querySelector("description").textContent.split("--")
		node.insertAdjacentHTML(
			"beforeend",
			`${quote[0].replace(/['"]+/g, '')}<p><i>&#8212; <a href="${el.querySelector("link").textContent}" target="_blank">${quote[1]}</a></i></p>`
		)
	}
	xhr.open("GET", url, true);
	xhr.send();
}
