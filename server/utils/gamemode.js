const baseAdd = [0,0,20,30,40,60,80,100,120,150,180,210,240,270,300,350]
const baseSubtract = [0,0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75]
const multiplier = [0,0,2,4,6,10,14,20,26,34,44,56,70,84,100]
const nWord = [0,400,800,1200,2000]

const easyMode = function (rnd) {   //assign prob. for easy mode
  if (rnd < 0.20) {return(3)}
  else if (rnd >= 0.20 && rnd < 0.50) {return(4)}
  else if (rnd >= 0.50 && rnd < 0.80) {return(5)}
  else {return(6)};
}

const mediumMode = function (rnd) {   //assign prob. for medium mode 
  if (rnd < 0.05) {return(3)}
  else if (rnd >= 0.05 && rnd < 0.20) {return(4)}
  else if (rnd >= 0.20 && rnd < 0.40) {return(5)}
  else if (rnd >= 0.40 && rnd < 0.60) {return(6)}
  else if (rnd >= 0.60 && rnd < 0.80) {return(7)}
  else if (rnd >= 0.80 && rnd < 0.90) {return(8)}
  else {return(9)};
}

const hardMode = function (rnd) {   //assign prob. for hard mode 
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

const extremeMode = function (rnd) {  //assign prob. for extreme mode 
  if (rnd < 0.05) {return(3)}
  else if (rnd >= 0.05 && rnd < 0.10) {return(4)}
  else if (rnd >= 0.10 && rnd < 0.15) {return(5)}
  else if (rnd >= 0.15 && rnd < 0.20) {return(6)}
  else if (rnd >= 0.20 && rnd < 0.25) {return(7)}
  else if (rnd >= 0.25 && rnd < 0.35) {return(8)}
  else if (rnd >= 0.35 && rnd < 0.45) {return(9)}
  else if (rnd >= 0.45 && rnd < 0.60) {return(10)}
  else if (rnd >= 0.60 && rnd < 0.75) {return(11)}
  else if (rnd >= 0.75 && rnd < 0.85) {return(12)}
  else if (rnd >= 0.85 && rnd < 0.90) {return(13)}
  else if (rnd >= 0.90 && rnd < 0.95) {return(14)}
  else {return(15)};
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
  //console.log("easypowerup",rnd,len)
  if (rnd > 0.97 && len < 4) {return "nword"}
  else if (rnd < 0.8) {return  "none"}
  else if (rnd >= 0.8 && rnd < 0.85) {return "freeze"}
  else if (rnd >= 0.85 && rnd < 0.90) {return "slow"}
  else if (rnd >= 0.90 && rnd < 0.95) {return "easy"}
  else if (rnd >= 0.95 && rnd < 0.97) {return "flood_e"}
  else {return "blind"};
}

const mediumPowerUp = function (rnd, len) {
  //console.log("midpowerup",rnd,len)
  if (rnd > 0.95 && len < 5) {return "nword"}
  else if (rnd > 0.92 && len < 7) {return "nword"}
  else if (rnd < 0.8) {return  "none"}
  else if (rnd >= 0.8 && rnd < 0.84) {return "freeze"}
  else if (rnd >= 0.84 && rnd < 0.88) {return "slow"}
  else if (rnd >= 0.88 && rnd < 0.92) {return "easy"}
  else if (rnd >= 0.92 && rnd < 0.96) {return "flood_e"}
  else {return "blind"};
}

const hardPowerUp = function (rnd, len) {
  //console.log("hardpowerup",rnd,len)
  if (rnd < 0.1 && len < 6) {return "nword"}
  else if (rnd < 0.1 && len < 8) {return "nword"}
  else if (rnd < 0.8) {return  "none"}
  else if (rnd >= 0.8 && rnd < 0.82) {return "freeze"}
  else if (rnd >= 0.82 && rnd < 0.84) {return "slow"}
  else if (rnd >= 0.84 && rnd < 0.86) {return "easy"}
  else if (rnd >= 0.86 && rnd < 0.93) {return "flood_e"}
  else {return "blind"};
}

const selectPowerUp = function (mode) {
  if (mode == 1) {
    return easyPowerUp;
  } else if (mode == 2) {
    return mediumPowerUp;
  } else if (mode == 3 || mode == 4) {
    return hardPowerUp;
  } else {
    return easyPowerUp;
  }
}

const easyFlood = function (rnd) {
  return "p_none"
}

const mediumFlood = function (rnd) {
  if (rnd <= 0.15) {
    return "p_nword"
  } else  {
    return "p_none"
  }
}

const hardFlood = function (rnd) {
  if (rnd <= 0.3) {
    return "p_nword"
  } else  {
    return "p_none"
  }
}

const selectFlood = function (mode) {
  if (mode == 1) {
    return easyFlood;
  } else if (mode == 2) {
    return mediumFlood;
  } else if (mode == 3 || mode == 4) {
    return hardFlood;
  } else {
    return easyFlood
  }
}

const easyRain = function (rnd) {
  if (rnd < 0.2) {
    return "p_slow"
  } else if (rnd >= 0.2 && rnd < 0.3) {
    return "p_freeze"
  } else {
    return "p_none"
  }
}

const mediumRain = function (rnd) {
  return "p_none"
}

const hardRain = function (rnd) {
  if (rnd < 0.15) {
    return "p_nword"
  } else {
    return "p_none"
  }
}

const selectRain = function (mode) {
  if (mode == 1) {
    return easyRain;
  } else if (mode == 2) {
    return mediumRain;
  } else if (mode == 3 || mode == 4) {
    return hardRain;
  } else {
    return easyRain;
  }
}



module.exports = { baseAdd, baseSubtract, multiplier, nWord, selectMode, selectPowerUp, selectFlood, selectRain}