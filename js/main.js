/* Searcy School of Dental Assisting — site scripts */

(function () {
	'use strict';

	/* ------------------------------------------------------------------
	   Form handling
	   The original WordPress site emailed form submissions via Elementor.
	   This static rebuild posts to a form backend service instead.
	   Set FORM_ENDPOINT to a Formspree/FormSubmit/Basin/etc. endpoint URL.
	   Until one is configured, submissions direct visitors to call
	   the school instead. If the client provides a destination email,
	   set FALLBACK_EMAIL to enable a mailto fallback.
	   ------------------------------------------------------------------ */
	var FORM_ENDPOINT = ''; // e.g. 'https://formspree.io/f/xxxxxxxx'
	var FALLBACK_EMAIL = ''; // client email for mailto fallback (optional)

	document.querySelectorAll('form.site-form').forEach(function (form) {
		form.addEventListener('submit', function (event) {
			event.preventDefault();
			var status = form.querySelector('.form-status');
			var data = new FormData(form);
			data.append('form_name', form.getAttribute('name') || 'Website Form');

			if (FORM_ENDPOINT) {
				status.textContent = 'Sending…';
				status.className = 'form-status';
				fetch(FORM_ENDPOINT, {
					method: 'POST',
					body: data,
					headers: { Accept: 'application/json' }
				})
					.then(function (response) {
						if (!response.ok) throw new Error('Request failed');
						form.reset();
						status.textContent = 'Thank you! Your message has been sent.';
						status.className = 'form-status success';
					})
					.catch(function () {
						status.textContent = 'Sorry, something went wrong. Please call us at (501) 203-0120.';
						status.className = 'form-status error';
					});
			} else if (FALLBACK_EMAIL) {
				var lines = [];
				data.forEach(function (value, key) {
					if (value) lines.push(key + ': ' + value);
				});
				var subject = encodeURIComponent(form.getAttribute('name') || 'Website Inquiry');
				var body = encodeURIComponent(lines.join('\n'));
				window.location.href = 'mailto:' + FALLBACK_EMAIL + '?subject=' + subject + '&body=' + body;
				status.textContent = 'Opening your email app… or call us at (501) 203-0120.';
				status.className = 'form-status success';
			} else {
				status.textContent = 'Please call us at (501) 203-0120 or visit searcyfamilydental.com to get in touch.';
				status.className = 'form-status success';
			}
		});
	});

	/* Mobile menu toggle */
	var toggle = document.querySelector('.menu-toggle');
	var nav = document.getElementById('site-nav');
	if (toggle && nav) {
		toggle.addEventListener('click', function () {
			var open = nav.classList.toggle('open');
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
		nav.addEventListener('click', function (event) {
			if (event.target.tagName === 'A') {
				nav.classList.remove('open');
				toggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	/* Typing headline (recreates the Elementor animated headline) */
	var headline = document.querySelector('.typing-headline');
	if (headline && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		var fullText = headline.getAttribute('data-text');
		var textNode = document.createTextNode('');
		var caret = document.createElement('span');
		caret.className = 'caret';
		caret.setAttribute('aria-hidden', 'true');
		headline.setAttribute('aria-label', fullText);
		headline.textContent = '';
		headline.appendChild(textNode);
		headline.appendChild(caret);

		var i = 0;
		(function type() {
			if (i <= fullText.length) {
				textNode.nodeValue = fullText.slice(0, i);
				i++;
				setTimeout(type, 45);
			} else {
				setTimeout(function () { caret.remove(); }, 2000);
			}
		})();
	}
})();
