import axios from 'axios'
export const axiosClient=axios.create({
    baseURL:'http://localhost:1337/api',
    headers:{
        common:{
            Authorization:`Bearer 289c451211444a58f5338a12e7cf2b6fb8899ad8e24c19a4375cf90c8020fcab27ebae852c1e1809a5d9fc7a028a4995000cb6be0f695f379cefa13e903b1e14b1b3011cbefb076decbe880fb97e13d26c48ccc6ba5b088295c2c15c43d0c89e28e576cb7f20e0d932ae83678519e6fa2b6406190b7554c73d04c40f6a90730b`
        }
    }
})
//http://localhost:1337/api/products?populate=image&sort=${sortBy}