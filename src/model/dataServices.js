
export function fetchExtensionData() {
  return fetch("../../data.json")
    .then(response => {
      if (!response.ok)
        console.log("Không tìm thấy file !");
      return response.json();
    })
    .catch((error) => {
      console.log("Lỗi trong quá trình xử lý");
      return (JSON.parse('[]'));
    });
}





