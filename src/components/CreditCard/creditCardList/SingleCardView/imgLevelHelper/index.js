import VisaYouthImg from 'assets/images/cards/cardLevel/visa-youth.svg';
import VisaSilverImg from 'assets/images/cards/cardLevel/visa-silver.svg';
import VisaGoldImg from 'assets/images/cards/cardLevel/visa-gold.svg';
import VisaPlatinumImg from 'assets/images/cards/cardLevel/visa-platinum.svg';
import VisaBlackImg from 'assets/images/cards/cardLevel/visa-black.svg';
import MasterYouthImg from 'assets/images/cards/cardLevel/master-youth.svg';
import MasterSilverImg from 'assets/images/cards/cardLevel/master-silver.svg';
import MasterGoldImg from 'assets/images/cards/cardLevel/master-gold.svg';
import MasterPlatinumImg from 'assets/images/cards/cardLevel/master-platinum.svg';
import MasterBlackImg from 'assets/images/cards/cardLevel/master-black.svg';

export default (cardType, cardLevel) => {
  if (cardType === '1' && cardLevel === '1') {
    return VisaYouthImg;
  }
  if (cardType === '1' && cardLevel === '2') {
    return VisaSilverImg;
  }
  if (cardType === '1' && cardLevel === '3') {
    return VisaGoldImg;
  }
  if (cardType === '1' && cardLevel === '4') {
    return VisaPlatinumImg;
  }
  if (cardType === '1' && cardLevel === '5') {
    return VisaBlackImg;
  }
  if (cardType === '2' && cardLevel === '1') {
    return MasterYouthImg;
  }
  if (cardType === '2' && cardLevel === '2') {
    return MasterSilverImg;
  }
  if (cardType === '2' && cardLevel === '3') {
    return MasterGoldImg;
  }
  if (cardType === '2' && cardLevel === '4') {
    return MasterPlatinumImg;
  }
  if (cardType === '2' && cardLevel === '5') {
    return MasterBlackImg;
  }
};
