import axios from "axios";

const controller = new AbortController();

export default axios.create({
    signal: controller.signal,
    baseURL: "https://api.rawg.io/api",
    params: {
        key: 'a5cdbb9a28b844a39a938dabbba3e8cb'
    }
})

