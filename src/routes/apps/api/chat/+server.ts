import { json } from "@sveltejs/kit";

let data = {
    "test": {
        "messages": [

        ]
    },
    "w": {

    }
};

export async function POST({request}) {
    try {
        const reqData = await request.json();

        if (reqData.query === undefined) {
            throw new Error("No query provided");
        }

        if (reqData.query === "all") {
            if (Object.keys(data).includes(reqData.user)) {
                return json({
                    status: 200,
                    body: data[reqData.user]
                });
            }
            throw new Error("User not found");
        } else if (reqData.query === "message_count") {
            if (Object.keys(data).includes(reqData.user)) {
                return json({
                    status: 200,
                    body: {
                        "messages_count": data[reqData.user].messages.length
                    }
                });
            }
            throw new Error(`User ${reqData.user} not found.Current users: ${Object.keys(data)}`);
        }
        throw new Error("Invalid query");
    } catch (e) {

        return json({
            status: 500,
            body: {
                error: e.message
            }
        });
    }
}
