
function init() {
    const request_text = document.getElementById("request_text")
    const paramString = window.location.toString().slice(23, -1)
    request_text.innerText = paramString
    const start_num = parseInt(paramString.split(",")[0])
    const end_num = parseInt(paramString.split(",")[1])
    const xmlHttpRequest = new XMLHttpRequest();
    console.log("Sending request to " + "http://localhost:8080/divise?start=" + start_num + "&end=" + end_num)
    xmlHttpRequest.open("GET", "http://localhost:8080/divise?start=" + start_num + "&end=" + end_num, true);
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState === 4) {
            if (xmlHttpRequest.status === 200) {
                document.getElementById("result_container").innerText = xmlHttpRequest.responseText
            } else {
                console.error(xmlHttpRequest.status)

            }
        }
    }
    xmlHttpRequest.send(null)
}
function submitRequest() {
    const start_input = document.getElementById("start_input")
    const end_input = document.getElementById("end_input")

    const start = parseInt(start_input.value)
    const end = parseInt(end_input.value)
    if(!start){
        alert("Invalid start input")
        return
    }
    if(!end){
        alert("Invalid end input")
        return
    }
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", "http://localhost:8080/divise?start=" + start + "&end=" + end, true);
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState === 4) {
            if (xmlHttpRequest.status === 200) {
                document.getElementById("response_area").innerText = xmlHttpRequest.responseText
                document.getElementById("response_area").value = xmlHttpRequest.responseText
                console.log("Response is : " + xmlHttpRequest.responseText)
            } else {
                console.error(xmlHttpRequest.status)

            }
        }
    }
    xmlHttpRequest.send(null)
}