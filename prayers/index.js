// prayerData.js
import narekEn from "../prayers/en/narek/narek.json";
import ephrem from "../prayers/en/ephrem/ephrem.json";

import dailyPrayersEn from "../prayers/en/daily-prayers/daily-prayers.json";

const prayerData = {
  en: {
    narek: narekEn,
    [`daily-prayers`]: dailyPrayersEn,
    ephrem: ephrem,
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
