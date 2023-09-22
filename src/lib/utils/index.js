export function getLanguageIcon(language){
    switch(language){
        case 'de':
            return '🇩🇪';
        case 'en':
            return '🇬🇧';
        case 'de_en':
            return '🇩🇪/🇬🇧';
        default:
            return language;
    }
}