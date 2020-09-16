const username = document.getElementById('username');
const saveScoreButton = document.getElementById('saveScoreButton');
const recentScore = localStorage.getItem('recentScore');
const finalScore = document.getElementById('finalScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

finalScore.innerText = recentScore;
username.value = "";
username.addEventListener('keyup', () => {
    saveScoreButton.disabled = !username.value;
});

 saveHighScore = (e) => {
    e.preventDefault();
  
    const score = {
        score: recentScore,
        name: username.value
    };
    
    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
}
    