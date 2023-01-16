export const load = async({locals}) => {
    let affiliation = locals.session.cas.attributes.eduPersonAffiliation
    return { 
        isEmployee: affiliation[0]._text == "employee" || affiliation[1]._text == "employee"
    }
}