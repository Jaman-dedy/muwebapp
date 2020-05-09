const translation = [
  {
    default: 'less than a second ago',
    en: 'less than a second ago',
    fr: "Il y a moins d'une seconde",
    rw: 'Munsi yisegonda ishize',
  },
  {
    default: 'second',
    fr: 'seconde',
    rw: 'Isegonda',
    rwPlural: 'Imasegonda',
  },
  {
    default: 'minute',
    fr: 'minute',
    rw: 'Umunota',
    rwPlural: 'Iminota',
  },
  {
    default: 'hour',
    fr: 'heure',
    rw: 'Isaha',
    rwPlural: 'Amasaha',
  },
  {
    default: 'day',
    fr: 'jour',
    rw: 'Umunsi',
    rwPlural: 'Iminsi',
  },
  {
    default: 'week',
    fr: 'semaine',
    rw: 'Icymweru',
    rwPlural: 'Ibyumweru',
  },
  {
    default: 'month',
    fr: 'mois',
    rw: 'Ukwezi',
    rwPlural: 'Amezi',
  },
  {
    default: 'year',
    fr: 'an',
    rw: 'Umwaka',
    rwPlural: 'Imyaka',
  },
];

const translate = (num, type, lang) => {
  if (lang === 'fr') {
    const text = translation.find(item => item.default === type);
    return `Il y a ${num} ${text && text.fr}${num > 1 ? 's' : ''}`;
  }
  if (lang === 'rw') {
    const text = translation.find(item => item.default === type);
    return `${
      num > 1 ? text && text.rwPlural : text && text.rw
    } ${num} ${num > 1 ? 'ishize' : 'ushize'}`;
  }
  return `${num} ${type}${num > 1 ? 's' : ''} ago`;
};

export default (time, lang) => {
  const now = Date.now();
  const diff = now - new Date(time).getTime();

  if (diff / 31536000000 >= 1) {
    return translate(Math.floor(diff / 31536000000), 'year', lang);
  }

  if (diff / 2678400000 >= 1) {
    return translate(Math.floor(diff / 2678400000), 'month', lang);
  }

  if (diff / 518400000 >= 1) {
    return translate(Math.floor(diff / 518400000), 'week', lang);
  }

  if (diff / 86400000 >= 1) {
    return translate(Math.floor(diff / 86400000), 'day', lang);
  }

  if (diff / 3600000 >= 1) {
    return translate(Math.floor(diff / 3600000), 'hour', lang);
  }

  if (diff / 60000 >= 1) {
    return translate(Math.floor(diff / 60000), 'minute', lang);
  }

  if (diff / 1000 >= 1) {
    return translate(Math.floor(diff / 1000), 'second', lang);
  }
  return translation[0][lang] || translation[0].default; // less than a second
};
