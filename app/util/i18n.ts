import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                newsVolume: 'News Volume',
                redditVolume: 'Reddit Volume',
                twitterVolume: 'Twitter Volume',
            },
        },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: true,
    },
});

export default i18n;
