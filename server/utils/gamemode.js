const baseAdd = [0,0,20,30,40,60,80,100,120,150,180,210,240,270,300,350]
const baseSubtract = [0,0,30,40,50,60,70,80,90,100,110,120,130,140,150,160]
const multiplier = [0,0,2,3,6,8,12,16,20,24,30,36,46,60,70]

const easyMode = function (rnd) {   //assign prob. for easy mode
  if (rnd < 0.1) {return(3)}
  else if (rnd >= 0.1 && rnd < 0.3) {return(4)}
  else if (rnd >= 0.3 && rnd < 0.7) {return(5)}
  else if (rnd >= 0.7 && rnd < 0.9) {return(6)}
  else {return(7)};
}

const mediumMode = function (rnd) {   //assign prob. for medium mode
  if (rnd < 0.1) {return(6)}
  else if (rnd >= 0.1 && rnd < 0.3) {return(7)}
  else if (rnd >= 0.3 && rnd < 0.7) {return(8)}
  else if (rnd >= 0.7 && rnd < 0.9) {return(9)}
  else {return(10)};
}

const hardMode = function (rnd) {   //assign prob. for hard mode
  if (rnd < 0.1) {return(9)}
  else if (rnd >= 0.1 && rnd < 0.3) {return(10)}
  else if (rnd >= 0.3 && rnd < 0.7) {return(11)}
  else if (rnd >= 0.7 && rnd < 0.9) {return(12)}
  else {return(13)};
}

const selectMode = function (mode) {
  if (mode == 1) {
    return easyMode;
  } else if (mode == 2) {
    return mediumMode;
  } else if (mode == 3) {
    return hardMode;
  } else {
    return easyMode;
  }
} 

const easyPowerUp = function (rnd) {
  if (rnd < 0.9) {return  "none"}
  else if (rnd >= 0.9 && rnd < 0.92) {return "freeze"}
  else if (rnd >= 0.92 && rnd < 0.94) {return "slow"}
  else if (rnd >= 0.94 && rnd < 0.96) {return "easy"}
  else if (rnd >= 0.96 && rnd < 0.98) {return "flood"}
  else {return "blind"};
}

const selectPowerUp = function (mode) {
  return easyPowerUp;
}

module.exports = { baseAdd, baseSubtract, multiplier, selectMode, selectPowerUp }