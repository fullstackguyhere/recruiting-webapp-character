export const getAttrPointsAvailable = (attributes) => {
    let total = 0;
    for(const attribute in attributes) {
      total += attributes[attribute].points;
    }
    //assumption that we don't have characters with wrong attribute config
    return 70 - total;
  }
  
export const getPointsAvailable = (intelModifier) => {
    let pointsAvailable = 10 + (4 * intelModifier);
    return pointsAvailable < 0 ? 0 : pointsAvailable;
  }
  
export const calculateModifier = (attributePoints) => {
    return Math.floor((attributePoints - 10) / 2);
  };