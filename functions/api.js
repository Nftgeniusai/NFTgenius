export const getApiConfig = (auth = true, token) => {
    let config = {
        baseURL: "https://api.dememoriam.ai",
        headers: {}
    };
    if (auth == true) {
        config["headers"] = {
            'authorization': 'Bearer ' + token
        }
    }
    return config;
}