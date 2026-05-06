# Embeddable signup form

Put a signup form for the newsletter on any website: our marketing site, the blog, partner sites.

```html
<div data-broadsheet-signup></div>
<script src="https://news.weeklybrief.example/embed.js" async></script>
```

The script renders a small form and posts to `POST /api/embed/subscribe` on the Broadsheet host.
That endpoint allows any origin (it has to: it's called from other people's pages) and always
gives the same answer whether or not the email was already subscribed, so it can't be used to
check who's on the list.

Partner sites copy this snippet once and never touch it again, so the endpoint and the
response shape need to stay stable.
