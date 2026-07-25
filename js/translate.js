<script>
document.addEventListener('DOMContentLoaded', function() {
    if (!document.body.classList.contains('page-entry')) {
        return;
    }

    const entryTitle = document.querySelector('h1.entry-title');
    if (!entryTitle) {
        return;
    }

    const JA_HOST = 'blog.inorinrinrin.com';
    const EN_HOST = 'en.blog.inorinrinrin.com';
    const currentHost = window.location.hostname;

    let targetHost;
    let linkText;
    if (currentHost === JA_HOST) {
        targetHost = EN_HOST;
        linkText = 'go to english entry';
    } else if (currentHost === EN_HOST) {
        targetHost = JA_HOST;
        linkText = '日本語エントリはこちら';
    } else {
        return;
    }

    const targetUrl = window.location.protocol + '//' + targetHost + window.location.pathname;

    fetch(targetUrl, { method: 'HEAD', mode: 'cors' })
        .then(function(response) {
            if (!response.ok) {
                return;
            }

            const switchDiv = document.createElement('div');
            switchDiv.className = 'translate-switch';

            const link = document.createElement('a');
            link.href = targetUrl;
            link.className = 'pencil-line';
            link.innerText = linkText;

            switchDiv.appendChild(link);
            entryTitle.insertAdjacentElement('afterend', switchDiv);
        })
        .catch(function() {});
});
</script>
