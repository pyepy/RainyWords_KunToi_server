const baseAdd = [0,0,20,30,40,60,80,100,120,150,180,210,240,270,300,350]
const baseSubtract = [0,0,30,40,50,60,70,80,90,100,110,120,130,140,150,160]
const multiplier = [0,0,2,3,6,8,12,16,20,24,30,36,46,60,70]
const nWord = [0,300,600,1200,9000]

const easyMode = function (rnd) {   //assign prob. for easy mode (5.05)
  if (rnd < 0.2) {return(3)}
  else if (rnd >= 0.2 && rnd < 0.4) {return(4)}
  else if (rnd >= 0.4 && rnd < 0.6) {return(5)}
  else if (rnd >= 0.6 && rnd < 0.8) {return(6)}
  else {return(7)};
}

const mediumMode = function (rnd) {   //assign prob. for medium mode (6.75)
  if (rnd < 0.05) {return(3)}
  else if (rnd >= 0.05 && rnd < 0.20) {return(4)}
  else if (rnd >= 0.20 && rnd < 0.40) {return(5)}
  else if (rnd >= 0.40 && rnd < 0.60) {return(6)}
  else if (rnd >= 0.60 && rnd < 0.80) {return(7)}
  else if (rnd >= 0.80 && rnd < 0.90) {return(8)}
  else {return(9)};
}

const hardMode = function (rnd) {   //assign prob. for hard mode (8.4)
  if (rnd < 0.05) {return(3)}
  else if (rnd >= 0.05 && rnd < 0.10) {return(4)}
  else if (rnd >= 0.10 && rnd < 0.20) {return(5)}
  else if (rnd >= 0.20 && rnd < 0.30) {return(6)}
  else if (rnd >= 0.30 && rnd < 0.45) {return(7)}
  else if (rnd >= 0.45 && rnd < 0.60) {return(8)}
  else if (rnd >= 0.60 && rnd < 0.75) {return(9)}
  else if (rnd >= 0.75 && rnd < 0.85) {return(10)}
  else if (rnd >= 0.85 && rnd < 0.95) {return(11)}
  else {return(12)};
}

const extremeMode = function (rnd) {
  if (rnd < 0.05) {return(2)}
  else if (rnd >= 0.05 && rnd < 0.10) {return(3)}
  else if (rnd >= 0.10 && rnd < 0.15) {return(4)}
  else if (rnd >= 0.15 && rnd < 0.20) {return(5)}
  else if (rnd >= 0.20 && rnd < 0.25) {return(6)}
  else if (rnd >= 0.25 && rnd < 0.35) {return(7)}
  else if (rnd >= 0.35 && rnd < 0.45) {return(8)}
  else if (rnd >= 0.45 && rnd < 0.60) {return(9)}
  else if (rnd >= 0.60 && rnd < 0.75) {return(10)}
  else if (rnd >= 0.75 && rnd < 0.85) {return(11)}
  else if (rnd >= 0.85 && rnd < 0.90) {return(12)}
  else if (rnd >= 0.90 && rnd < 0.95) {return(13)}
  else {return(14)};
}

const selectMode = function (mode) {
  if (mode == 1) {
    return easyMode;
  } else if (mode == 2) {
    return mediumMode;
  } else if (mode == 3) {
    return hardMode;
  } else if (mode == 4) {
    return extremeMode;
  } else {
    return easyMode;
  }
} 

const easyPowerUp = function (rnd, len) {
  if (rnd < 0.1 && len < 5) {return "nword"}
  else if (rnd < 0.9) {return  "none"}
  else if (rnd >= 0.9 && rnd < 0.92) {return "freeze"}
  else if (rnd >= 0.92 && rnd < 0.94) {return "slow"}
  else if (rnd >= 0.94 && rnd < 0.96) {return "easy"}
  else if (rnd >= 0.96 && rnd < 0.98) {return "flood"}
  else {return "blind"};
}

const mediumPowerUp = function (rnd, len) {
  if (rnd > 0.5 && len < 5) {return "nword"}
  else if (rnd < 0.1 && len < 7) {return "nword"}
  else if (rnd < 0.8) {return  "none"}
  else if (rnd >= 0.8 && rnd < 0.84) {return "freeze"}
  else if (rnd >= 0.84 && rnd < 0.88) {return "slow"}
  else if (rnd >= 0.88 && rnd < 0.92) {return "easy"}
  else if (rnd >= 0.92 && rnd < 0.96) {return "flood"}
  else {return "blind"};
}

const hardPowerUp = function (rnd, len) {
  if (rnd > 0.3 && len < 6) {return "nword"}
  else if (rnd < 0.1 && len < 8) {return "nword"}
  else if (rnd < 0.8) {return  "none"}
  else if (rnd >= 0.8 && rnd < 0.82) {return "freeze"}
  else if (rnd >= 0.82 && rnd < 0.84) {return "slow"}
  else if (rnd >= 0.84 && rnd < 0.88) {return "easy"}
  else if (rnd >= 0.88 && rnd < 0.94) {return "flood"}
  else {return "blind"};
}

const selectPowerUp = function (mode) {
  if (mode == 1) {
    return easyPowerUp;
  } else if (mode == 2) {
    return mediumPowerUp;
  } else if (mode == 3) {
    return hardPowerUp;
  } else {
    return easyPowerUp;
  }
  
}

module.exports = { baseAdd, baseSubtract, multiplier, nWord, selectMode, selectPowerUp }