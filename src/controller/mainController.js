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

class Solution{
    twoSum(arr,target){
        var sum = 0;
        for(var i = 0; i < arr.length - 1; i++){
            for(var j = 0; j < arr.length; j++){
                sum = arr[i] + arr[j];
                if(sum == target)
                    return true;
            }
        }
        return false;
    }
}
function main(){
    const mySolution = new Solution();
    let arr = [1, 4, 45, 6, 10, 8];
    let target = 16;
    let isSuccess = mySolution.twoSum(arr,target);
    console.log(isSuccess);
}
main();