document.querySelectorAll('.folder .toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const parentFolder = toggle.parentNode;
        parentFolder.classList.toggle('open');
        const subFolders = parentFolder.querySelector('ul');
        if (subFolders) {
            subFolders.style.display = subFolders.style.display === 'block' ? 'none' : 'block';
        }
        
        // Deselect previously selected item
        document.querySelectorAll('.selected').forEach(selected => {
            selected.classList.remove('selected');
        });

        // Mark current item as selected
        toggle.classList.add('selected');
    });
});