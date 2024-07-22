// prayerData.js
import narekEn from "../prayers/en/narek/narek.json";
const prayerData = {
  en: {
    narek: narekEn,
    // ... other prayer types for English
  },
};

export function getPrayerData(language, slug) {
  if (prayerData[language] && prayerData[language][slug]) {
    return prayerData[language][slug];
  }
  // Return an empty array if the language or prayer type is not found
  return [];
}
