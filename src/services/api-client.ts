import axios from "axios";



export default axios.create({
  
    baseURL: "https://api.rawg.io/api",
    params: {
        key: 'a5cdbb9a28b844a39a938dabbba3e8cb'
    }
})

