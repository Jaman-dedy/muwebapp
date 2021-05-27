import validateImg from 'helpers/image/validateImg';

export default (
  img1,
  setIsImg1Correct,
  img2,
  setIsImg2Correct,
  img3,
  setIsImg3Correct,
  img4,
  setIsImg4Correct,
  img5,
  setIsImg5Correct,
) => {
  if (img1) {
    validateImg(img1).then(
      function fulfilled(img) {
        setIsImg1Correct(true);
      },

      function rejected() {
        setIsImg1Correct(false);
      },
    );
  }
  if (img2) {
    validateImg(img2).then(
      function fulfilled(img) {
        setIsImg2Correct(true);
      },

      function rejected() {
        setIsImg2Correct(false);
      },
    );
  }
  if (img3) {
    validateImg(img3).then(
      function fulfilled(img) {
        setIsImg3Correct(true);
      },

      function rejected() {
        setIsImg3Correct(false);
      },
    );
  }
  if (img4) {
    validateImg(img4).then(
      function fulfilled(img) {
        setIsImg4Correct(true);
      },

      function rejected() {
        setIsImg4Correct(false);
      },
    );
  }
  if (img5) {
    validateImg(img5).then(
      function fulfilled(img) {
        setIsImg5Correct(true);
      },

      function rejected() {
        setIsImg5Correct(false);
      },
    );
  }
};
