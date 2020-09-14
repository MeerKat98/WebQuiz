const highScores = JSON.parse(localStorage.getItem('highScores'));
const scoreList = document.getElementById('scoreList');

scoreList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} -> ${score.score} <-</li>`;
});
