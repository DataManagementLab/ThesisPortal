import { redirect } from "@sveltejs/kit";


export const actions = {
    createTopic: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        console.log(formData.title);
    }
}