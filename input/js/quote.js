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
		node.insertAdjacentHTML(
			"beforeend",
			`${el.querySelector("description").textContent}<i>&#8212; ${el.querySelector("author").textContent}, ${el.querySelector("title").textContent}</i>`
		)
	}
	xhr.open("GET", url, true);
	xhr.send();
}
