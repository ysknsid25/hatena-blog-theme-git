<script>
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.entry-content a');

    links.forEach(function(link) {
      if (link.closest('.hatena-asin-detail')) {
          return;
      }
      if(link.href.startsWith('https://d.hatena.ne.jp/keyword')){
          return
      }
      if (link.hostname && link.href.startsWith('http')) {
        const domain = link.hostname;
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;

        const img = document.createElement('img');
        img.src = faviconUrl;
        img.className = 'link-favicon';
        img.alt = '';
        
        link.prepend(img);
      }
    });
});
</script>