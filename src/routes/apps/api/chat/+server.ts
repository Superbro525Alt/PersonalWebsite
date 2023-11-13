import { json } from "@sveltejs/kit";

type Message = {
    avatar: string,
    message: string,
    sender: string,
    time: number,
    read: boolean
}

type User = {
    [key: string]: Message[] | []
    avatar: string
}

type Data = {
    [key: string]: User
}

let data: Data = {
    "test": {
        "avatar": "https://avatars.githubusercontent.com/u/10000000?s=60&v=4",
        "messages": [
            {
                "avatar": "https://avatars.githubusercontent.com/u/10000000?s=60&v=4",
                "message": "Hello",
                "sender": "w",
                "time": 1631796580,
                "read": true
            },
            {
                "avatar": "https://avatars.githubusercontent.com/u/10000000?s=60&v=4",
                "message": "World",
                "sender": "w",
                "time": 1631799580,
                "read": false
            },
            {
                "avatar": "https://avatars.githubusercontent.com/u/10000000?s=60&v=4",
                "message": "World",
                "sender": "w",
                "time": 1631799580,
                "read": false
            },
            {
                "avatar": "https://avatars.githubusercontent.com/u/10000000?s=60&v=4",
                "message": "World",
                "sender": "w",
                "time": 1631799580,
                "read": false
            },
            {
                "avatar": "https://avatars.githubusercontent.com/u/10000000?s=60&v=4",
                "message": "World",
                "sender": "w",
                "time": 1631799580,
                "read": false
            },
        ]
    },
    "w": {
        "avatar": "https://avatars.githubusercontent.com/u/10000000?s=60&v=4",
        "messages": [

        ]
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
            throw new Error(`User ${reqData.user} not found. Current users: ${Object.keys(data)}`);
        } else if (reqData.query === "messages") {
            if (Object.keys(data).includes(reqData.user)) {
                return json({
                    status: 200,
                    body: data[reqData.user].messages
                });
            }
            throw new Error(`User ${reqData.user} not found. Current users: ${Object.keys(data)}`);
        } else if (reqData.query == "read_messages") {
            if (Object.keys(data).includes(reqData.other_user) && Object.keys(data).includes(reqData.user)) {
                // other user is reqData.other_user
                const otherUser = reqData.other_user;
                const messages = [];

                // get messages in user.messages but with the sender as otherUser
                for (const message of data[reqData.user].messages) {
                    if (message.sender === otherUser) {
                        messages.push(message);
                    }
                }

                // mark messages as read
                for (const message of messages) {
                    message.read = true;
                }

                // return messages
                data[reqData.user].messages = messages;


                return json({
                    status: 200,
                    body: {
                        "ok": true,
                        "read_messages": messages
                    }
                });
            }
            throw new Error(`User ${reqData.user} not found. Current users: ${Object.keys(data)}`);

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
