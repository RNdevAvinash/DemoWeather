import { create } from 'apisauce'
const api = create({
    baseURL: `https://api.openweathermap.org/data/2.5/onecall?lat=28.7041&lon=77.1025&units=metric&
    exclude=hourly,daily&appid=e0b3e02fb25f79124173244bf7859917`, timeout: 30000
})
export default api;
