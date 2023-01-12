export const load = async ( event ) => {
    return {
		eduPersonAffiliation: event.locals.session.cas.attributes.eduPersonAffiliation
	};
};