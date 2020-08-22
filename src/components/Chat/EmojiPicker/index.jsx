import React from 'react';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';

const EmojiPicker = ({ style, onEmojiSelected }) => {
  const emojiTranslationConfig = {
    search: global.translate('Search', 278),
    clear: global.translate('Clear', 1994),
    notfound: global.translate('No Emoji Found', 1350),
    skintext: global.translate('Choose your default skin tone', 1351),
    categories: {
      search: global.translate('Search Results', 1410),
      recent: global.translate('Frequently Used', 1352),
      smileys: global.translate('Smileys & Emotion', 1353),
      people: global.translate('People & Body', 1354),
      nature: global.translate('Animals & Nature', 1355),
      foods: global.translate('Food & Drink', 1356),
      activity: global.translate('Activity', 1357),
      places: global.translate('Travel & Places', 1358),
      objects: global.translate('Objects', 1359),
      symbols: global.translate('Symbols', 1360),
      flags: global.translate('Flags', 1361),
      custom: global.translate('Custom', 1362),
    },
    categorieslabel: global.translate('Emoji categories', 1363),
    skintones: {
      1: global.translate('Default Skin Tone', 1364),
      2: global.translate('Light Skin Tone', 1365),
      3: global.translate('Medium-Light Skin Tone', 1366),
      4: global.translate('Medium Skin Tone', 1367),
      5: global.translate('Medium-Dark Skin Tone', 1368),
      6: global.translate('Dark Skin Tone', 1369),
    },
  };

  return (
    <Picker
      style={style}
      title={global.translate('Pick an emoji', 1349)}
      emoji="point_up"
      color="#f2711c"
      onSelect={onEmojiSelected}
      i18n={emojiTranslationConfig}
    />
  );
};

EmojiPicker.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
  onEmojiSelected: PropTypes.func,
};

EmojiPicker.defaultProps = {
  style: {},
  onEmojiSelected: () => {},
};

export default EmojiPicker;
