export function toScore(difficulty) {
  let score = 0;
  if(difficulty === 'easy'){
      score = 1;
    }else if(difficulty === 'normal'){
      score = 2;
    }else if(difficulty === 'hard'){
      score = 3;
    }
    return score;
}