export const load = async ({ locals }) => {
	let affiliation = locals.session.cas?.attributes.eduPersonAffiliation;
	if (!affiliation) {
		return {
			isEmployee: false
		};
	}
	return {
		isEmployee: affiliation[0]._text == 'employee' || affiliation[1]._text == 'employee'
	};
};
