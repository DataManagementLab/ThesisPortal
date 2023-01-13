export const load = async( event ) => {
    
	console.log(event.locals.session.cas.attributes.eduPersonAffiliation);
    //console.log(event.cookies.delete);

    event.cookies.delete("SKSESSID");

    console.log(event.locals.session.cas.attributes.eduPersonAffiliation);

    //console.log(event);
}