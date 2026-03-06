(() => {
	"use strict";

	window.wpcf7 = window.wpcf7 || {};
	window.wpcf7.cached = 1;
	window.wpcf7.api = { root: "", namespace: "" };

	document.addEventListener("DOMContentLoaded", () => {
		document.querySelectorAll(".wpcf7 > form").forEach((formElement) => {
			formElement.addEventListener("submit", (event) => {
				event.preventDefault();

				const output =
					formElement.closest(".wpcf7")?.querySelector(".wpcf7-response-output");

				if (output) {
					output.textContent =
						"Formularz jest tymczasowo niedostępny w wersji statycznej. Skontaktuj się mailowo: kffraczek@gmail.com";
					output.style.display = "block";
				}
			});
		});
	});
})();