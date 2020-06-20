import axios from 'axios';

class Api {
    constructor() {
        this.cancelToken = axios.CancelToken;
        this.source = this.cancelToken.source();
    }

    async getData(URL) {
        try {
            const nationData = await axios.get(URL, {
                cancelToken: this.source.token
            });
            return nationData;
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("Request cancelled ", err);
            } else {
                console.log("Unknown API error ", err)
            }
        }
    }
}

export default Api;