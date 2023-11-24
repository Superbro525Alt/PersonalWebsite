import { json } from "@sveltejs/kit";

type Message = {
    avatar: string,
    message: string,
    sender: string,
    time: number,
    read: boolean
}

type User = {
    avatar: string,
    password: string,
    key: string,
    [key: string]: Message[] | []
}
type UserData = {
    [key: string]: User
}

type Data = {
    users: UserData
}

let data: Data = {
    "users": {
        "test": {
            "avatar": "https://avatars.githubusercontent.com/u/10000000?s=60&v=4",
            "password": "test",
            "key": "test",
            "messages": [
                {
                    "avatar": "https://avatars.githubusercontent.com/u/10000000?s=60&v=4",
                    "message": "Hello",
                    "sender": "w",
                    "time": 1631796580,
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
            "password": "w",
            "key": "w",
            "messages": [
                {
                    "avatar": "https://avatars.githubusercontent.com/u/10000000?s=60&v=4",
                    "message": "Test",
                    "sender": "test",
                    "time": 1631796580,
                    "read": false
                },
            ]
        }
    }
};

export async function POST({request}) {
    try {
        const reqData = await request.json();

        if (reqData.query === undefined) {
            throw new Error("No query provided");
        }

        if (reqData.query === "all") {
            if (Object.keys(data.users).includes(reqData.user)) {
                let ret_data = {};

                for (const _data of Object.keys(data.users[reqData.user])) {
                    if (data !== reqData.user) {
                        ret_data[_data] = data.users[reqData.user][_data];
                    }
                }
                
                return json({
                    status: 200,
                    body: ret_data
                });
            }
            throw new Error("User not found");
        } else if (reqData.query === "message_count") {
            if (Object.keys(data.users).includes(reqData.user)) {
                return json({
                    status: 200,
                    body: {
                        "messages_count": data.users[reqData.user].messages.length
                    }
                });
            }
            throw new Error(`User ${reqData.user} not found. Current users: ${Object.keys(data.users)}`);
        } else if (reqData.query === "messages") {
            if (Object.keys(data.users).includes(reqData.user)) {
                return json({
                    status: 200,
                    body: data.users[reqData.user].messages
                });
            }
            throw new Error(`User ${reqData.user} not found. Current users: ${Object.keys(data.users)}`);
        } else if (reqData.query == "read_messages") {
            if (Object.keys(data.users).includes(reqData.other_user) && Object.keys(data.users).includes(reqData.user)) {
                // other user is reqData.other_user
                const otherUser = reqData.other_user;
                const messages = [];

                // get messages in user.messages but with the sender as otherUser
                for (const message of data.users[reqData.user].messages) {
                    if (message.sender === otherUser) {
                        messages.push(message);
                    }
                }

                // mark messages as read
                for (const message of messages) {
                    message.read = true;
                }

                // return messages
                data.users[reqData.user].messages = messages;


                return json({
                    status: 200,
                    body: {
                        "ok": true,
                        "read_messages": messages
                    }
                });
            }
            throw new Error(`User ${reqData.user} not found. Current users: ${Object.keys(data.users)}`);

        } else if (reqData.query == "avatar") {
            if (Object.keys(data.users).includes(reqData.user)) {
                return json({
                    status: 200,
                    body: {
                        "avatar": data.users[reqData.user].avatar
                    }
                });
            }
            throw new Error(`User ${reqData.user} not found. Current users: ${Object.keys(data.users)}`);
        } else if (reqData.query == "get_messages") {
            if (Object.keys(data.users).includes(reqData.user) && Object.keys(data.users).includes(reqData.other_user)) {
                // get messages in user.messages but with the sender as otherUser
                const otherUser = reqData.other_user;
                const messages = [];

                for (const message of data.users[reqData.user].messages) {
                    if (message.sender === otherUser) {
                        messages.push(message);
                    }
                }

                return json({
                    status: 200,
                    body: {
                        "messages": messages
                    }
                });
            }
            throw new Error(`User ${reqData.user} not found. Current users: ${Object.keys(data.users)}`);
        } else if (reqData.query == "send_message") {
            if (Object.keys(data.users).includes(reqData.user) && Object.keys(data.users).includes(reqData.other_user)) {
                // get messages in user.messages but with the sender as otherUser
                const otherUser = reqData.other_user;
                const message = reqData.message;

                data.users[reqData.other_user].messages.push({
                    "avatar": data.users[reqData.user].avatar,
                    "message": message,
                    "sender": reqData.user,
                    "time": Date.parse(new Date().toLocaleString()),
                    "read": false
                });

                /// wad

                return json({
                    status: 200,
                    body: {
                        "ok": true
                    }
                });
            }
            throw new Error(`User ${reqData.user} not found. Current users: ${Object.keys(data.users)}`);
        } else if (reqData.query == "register") {
            if (Object.keys(data.users).includes(reqData.user)) {
                throw new Error(`User ${reqData.user} already exists`);
            }

            let key = "";

            // generate key
            for (let i = 0; i < 10; i++) {
                key += Math.floor(Math.random() * 10);
            }

            data.users[reqData.user] = {
                "avatar": "https://avatars.githubusercontent.com/u/10000000?s=60&v=4",
                "password": reqData.password,
                "key": key,
                "messages": []
            }

            return json({
                status: 200,
                body: {
                    "ok": true
                }
            });
        } else if (reqData.query == "login") {
            if (!Object.keys(data.users).includes(reqData.user)) {
                throw new Error(`User ${reqData.user} not found`);
            }

            if (data.users[reqData.user].password !== reqData.password) {
                throw new Error(`Incorrect password: ${reqData.password} : ${JSON.stringify(data.users[reqData.user])}`);
            }

            return json({
                status: 200,
                body: {
                    "ok": true,
                    "key": data.users[reqData.user].key,
                    "password": data.users[reqData.user].password
                }
            });
        } else if (reqData.query == "validate_key") {
            if (!Object.keys(data.users).includes(reqData.user)) {
                throw new Error(`User ${reqData.user} not found`);
            }

            if (data.users[reqData.user].key !== reqData.key) {
                return json({
                    status: 200,
                    body: {
                        "ok": false
                    }
                });
            }

            return json({
                status: 200,
                body: {
                    "ok": true
                }
            });
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
