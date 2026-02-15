<script>
document.addEventListener('DOMContentLoaded', function() {
    var followButtonBoxes = document.querySelectorAll('.hatena-follow-button-box.btn-subscribe.js-hatena-follow-button-box');

    followButtonBoxes.forEach(function(box) {
        if (box.querySelector('.rss-icon-link')) {
            return;
        }

        var rssLink = document.createElement('a');
        rssLink.href = '/rss';
        rssLink.className = 'rss-icon-link';
        rssLink.target = '_blank';
        
        rssLink.style.display = 'inline-flex';
        rssLink.style.alignItems = 'center';
        rssLink.style.marginLeft = '8px';
        rssLink.style.verticalAlign = 'middle';
        rssLink.style.lineHeight = '1';

        rssLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>';

        box.appendChild(rssLink);
    });
});
</script>
