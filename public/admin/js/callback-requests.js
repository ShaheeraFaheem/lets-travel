//getting callback requests for database
async function getCallbackRequests() {
    return await fetch('http://localhost:3000/callback-requests')
                    .then((response) => response.json())
                    .then((data) => data);
}

let requestsBlock = document.querySelector('#v-pills-callback');

requestsBlock.addEventListener('click', function(e) {
    if(e.target.classList.contains('btn-remove')) {
        //found article tag with 1st parentNode, found input with class id, took the value of input  
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/callback-requests/' + id, {
        //specify it's delete request
        method: 'DELETE'
        }).then((resp) => resp.text())
        .then(() => window.history.go());
    }
})