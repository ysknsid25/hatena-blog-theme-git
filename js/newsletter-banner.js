<script>
document.addEventListener('DOMContentLoaded', function() {
    const newsletterDiv = document.createElement('div');
    newsletterDiv.className = 'newsletter-banner';

    const link = document.createElement('a');
    link.href = 'https://blog.inorinrinrin.com/entry/8372cef7-15e5-888f-88bb-1074cabf8305';
    link.textContent = 'Sponsor限定のMonthly Newsletterに興味はありませんか？';
    link.className = 'newsletter-banner-btn';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    newsletterDiv.appendChild(link);
    document.body.prepend(newsletterDiv);
});
</script>
