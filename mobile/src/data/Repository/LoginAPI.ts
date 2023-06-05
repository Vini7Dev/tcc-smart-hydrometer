import { BaseApi } from "../../source/service/api";
import { LoginRequest } from './Entity';

// async function doLogin(loginRequest: LoginRequest): Promise<User> {
async function doLogin(loginRequest: LoginRequest) {
    let response = await BaseApi.post('/authenticate', ).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })       

    console.log(response + "response")
}    


export { doLogin }