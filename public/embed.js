/*
 * Broadsheet signup form.
 *
 *   <div data-broadsheet-signup></div>
 *   <script src="https://YOUR-BROADSHEET-HOST/embed.js" async></script>
 */
(function () {
  var script = document.currentScript
  var host = new URL(script.src).origin

  document.querySelectorAll('[data-broadsheet-signup]').forEach(function (el) {
    el.innerHTML =
      '<form class="broadsheet-signup">' +
      '<input type="email" name="email" required placeholder="you@example.com">' +
      '<button type="submit">Subscribe</button>' +
      '<p class="broadsheet-signup-message" aria-live="polite"></p>' +
      '</form>'

    var form = el.querySelector('form')
    var message = el.querySelector('.broadsheet-signup-message')

    form.addEventListener('submit', function (event) {
      event.preventDefault()
      fetch(host + '/api/embed/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.value }),
      })
        .then(function (res) { return res.json() })
        .then(function (data) {
          message.textContent = data.message
          if (data.ok) form.reset()
        })
        .catch(function () {
          message.textContent = 'Something went wrong. Please try again.'
        })
    })
  })
})()
