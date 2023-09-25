export function getLanguageIcon(language){
    if(Array.isArray(language)){
        language = language[0];
    }
    switch(language){
        case 'de':
            return '🇩🇪';
        case 'en':
            return '🇬🇧';
        case 'de,en':
            return '🇩🇪/🇬🇧';
        default:
            return language;
    }
}