import { fetchExtensionData} from "../model/dataServices.js";

function getDefaultExtensionItems(){
    return JSON.parse(`[{
        "logo": "./assets/images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries."
    }]`);
}
export function getExtensionData(){
    let extensionPromise = fetchExtensionData();
    return extensionPromise
        .then((data) => {
            console.log(data.length);
            console.log(typeof data);
            // kiểm tra data hợp lệ -> trả về promise với kiểu dữ liệu hợp lệ 
            if(data.length > 0)
                return data;
            // kiểm tra data không hợp lệ -> trả về promise với dữ liệu mặc định 
            return getDefaultExtensionItems();
        })
        // xử lý khi promise mang trạng thái rejected -> trả về promise với dự liệu mặc định
        .catch(error => {
            return getDefaultExtensionItems();
        })
}

