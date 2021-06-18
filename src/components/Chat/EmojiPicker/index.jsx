import React from 'react';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';

const EmojiPicker = ({ style, onEmojiSelected }) => {
  const emojiTranslationConfig = {
    search: global.translate('Search'),
    clear: global.translate('Clear'),
    notfound: global.translate('No Emoji Found'),
    skintext: global.translate('Choose your default skin tone'),
    categories: {
      search: global.translate('Search Results'),
      recent: global.translate('Frequently Used'),
      smileys: global.translate('Smileys & Emotion'),
      people: global.translate('People & Body'),
      nature: global.translate('Animals & Nature'),
      foods: global.translate('Food & Drink'),
      activity: global.translate('Activity'),
      places: global.translate('Travel & Places'),
      objects: global.translate('Objects'),
      symbols: global.translate('Symbols'),
      flags: global.translate('Flags'),
      custom: global.translate('Custom'),
    },
    categorieslabel: global.translate('Emoji categories'),
    skintones: {
      1: global.translate('Default Skin Tone'),
      2: global.translate('Light Skin Tone'),
      3: global.translate('Medium-Light Skin Tone'),
      4: global.translate('Medium Skin Tone'),
      5: global.translate('Medium-Dark Skin Tone'),
      6: global.translate('Dark Skin Tone'),
    },
  };

  return (
    <Picker
      style={style}
      title={global.translate('Pick an emoji')}
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
