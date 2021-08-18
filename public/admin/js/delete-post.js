let articlesBlock = document.querySelector('.articles');

articlesBlock.addEventListener('click', function(e) {
    if(e.target.classList.contains('btn-remove')) {
        //found article tag with 1st parentNode, found input with class id, took the value of input  
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/posts/' + id, {
        //specify it's delete request
        method: 'DELETE'
        }).then((resp) => resp.text())
        .then(() => window.history.go());
    }
})