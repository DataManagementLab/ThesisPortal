import { db } from '$lib/server/db';

export async function POST({ request }){
    let { field, query } = await request.json();
    let results = new Set();
    for(let sub of query.toLowerCase().replaceAll(/[,.-]/g, ' ').split(' ')){
        if(sub.length == 0 && query != '')
            continue;
        let result = await db.query(`SELECT * FROM topics WHERE string::lowercase($value) INSIDE string::lowercase(${field}) LIMIT 5`,{
            value: sub
        });
        if(Array.isArray(result[0].result)){
            for(let res of result[0].result){
                if(Array.isArray(res[field])){
                    res[field].forEach(item => results.add(item));
                } else {
                    results.add(res[field]);
                }
            }
        }
    }
    return new Response(JSON.stringify(Array.from(results).slice(0, 5)));
}