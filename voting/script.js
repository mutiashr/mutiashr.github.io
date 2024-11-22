let votes = {
    A: 0,
    B: 0,
    C: 0
};

function addVote(candidate) {
    votes[candidate]++;
    document.getElementById(`vote${candidate}`).innerText = votes[candidate];
}

function subtractVote(candidate) {
    if (votes[candidate] > 0) {
        votes[candidate]--;
        document.getElementById(`vote${candidate}`).innerText = votes[candidate];
    }
}

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'a':
            addVote('A');
            break;
        case 'b':
            addVote('B');
            break;
        case 'c':
            addVote('C');
            break;
    }
});