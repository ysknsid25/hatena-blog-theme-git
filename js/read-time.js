<script>
document.addEventListener('DOMContentLoaded', function() {
    const entries = document.querySelectorAll('.entry');

    entries.forEach(function(entry) {
        const content = entry.querySelector('.entry-content');
        const entryDate = entry.querySelector('.date.entry-date.first');

        if (content && entryDate) {
            const text = content.textContent.trim();
            const length = text.length;

            let minutes;
            if(length < 5000){
                minutes = 3;
            }else if(length < 10000){
                minutes = 5;
            }else if(length < 20000){
                minutes = 10;
            }else if(length < 30000){
                minutes = 15;
            }else{
                minutes = Math.ceil(length / 500);
            }

            const readTimeDiv = document.createElement('div');
            readTimeDiv.className = 'read-time';
            readTimeDiv.innerText = minutes + '分で読めます';

            entryDate.appendChild(readTimeDiv);
        }
    });
});
</script>