let set = []

function fillTable() {
    console.log("Fill table initiated")
    const container = document.getElementById("container")
    container.innerHTML = '<table id="table" class="tbl"></table>'


    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", "http://localhost:8080/person", true);
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState === 4) {
            if (xmlHttpRequest.status === 200) {
                const table = document.getElementById("table")
                set = JSON.parse(xmlHttpRequest.responseText)

                for(i = 0; i < set.length; i++){
                    const row = table.insertRow(0)

                    const id_cell = row.insertCell(0)
                    const name_cell = row.insertCell(1)
                    const email_cell = row.insertCell(2)
                    const age_cell = row.insertCell(3)
                    const phone_cell = row.insertCell(4)

                    id_cell.innerHTML = set[i].id
                    id_cell.id="id" + i;
                    name_cell.innerHTML = set[i].name
                    name_cell.id="name" + i;
                    email_cell.innerHTML = set[i].email
                    email_cell.id="email" + i
                    age_cell.innerHTML = set[i].age;
                    age_cell.id="age" + i;
                    phone_cell.innerHTML = set[i].phone_number;
                    phone_cell.id="phone"+i;

                    const delete_cell = row.insertCell(5)
                    delete_cell.innerHTML = '<button id="delete_'+i+'" onclick="deleteEntry(this)" class="delete">-</button>'

                    const alter_cell = row.insertCell(6)
                    alter_cell.innerHTML = '<button id="alter_'+i+'" onclick="alterRow(this)" class="alter">#</button>'
                }
            container.innerHTML = container.innerHTML + '' +
                '<br>' +
                '<button onclick="addRow()" class="button">New</button>'

            } else {
                console.error(xmlHttpRequest.status)

            }
        }
    }
    xmlHttpRequest.send(null)
}

function alterRow(row) {
    console.log("Got " + row.id)
    console.log("Id: " + row.id.substring(6, row.id.length))
    const id = parseInt(row.id.substring(6, row.id.length))
    const container = document.getElementById("container")
    container.innerHTML =
        '       <input type="number" id="input_id" placeholder="id" class="input">\n' +
        '        <br>\n' +
        '        <input type="text" id="input_name" placeholder="name" class="input">\n' +
        '        <br>\n' +
        '        <input type="email" id="input_email" placeholder="email" class="input">\n' +
        '        <br>\n' +
        '        <input type="number" id="input_age" placeholder="age" class="input">\n' +
        '        <br>\n' +
        '        <input type="tel" id="input_phone" placeholder="phone" class="input">\n' +
        '        <br>\n' +
        '        <button id="alter_'+id+'" onclick="alterEntry(this)" class="button">Save</button>\n' +
        '        <br>\n' +
        '        <button id="input_cancel" onclick="fillTable()" class="button">Cancel</button>'
    const input_id = document.getElementById("input_id")
    const input_name = document.getElementById("input_name")
    const input_email = document.getElementById("input_email")
    const input_age = document.getElementById("input_age")
    const input_phone = document.getElementById("input_phone")
    input_id.value = set[id].id
    input_name.value = set[id].name
    input_email.value = set[id].email
    input_age.value = set[id].age
    input_phone.value = set[id].phone_number

}

function addRow(){

    const container = document.getElementById("container")
    container.innerHTML =
        '       <input type="number" id="input_id" placeholder="id" class="input">\n' +
        '        <br>\n' +
        '        <input type="text" id="input_name" placeholder="name" class="input">\n' +
        '        <br>\n' +
        '        <input type="email" id="input_email" placeholder="email" class="input">\n' +
        '        <br>\n' +
        '        <input type="number" id="input_age" placeholder="age" class="input">\n' +
        '        <br>\n' +
        '        <input type="tel" id="input_phone" placeholder="phone" class="input">\n' +
        '        <br>\n' +
        '        <button id="input_save" onclick="saveEntry()" class="button">Save</button>\n' +
        '        <br>\n' +
        '        <button id="input_cancel" onclick="fillTable()" class="button">Cancel</button>'
    const input_id = document.getElementById("input_id")
    const input_name = document.getElementById("input_name")
    const input_email = document.getElementById("input_email")
    const input_age = document.getElementById("input_age")
    const input_phone = document.getElementById("input_phone")
}

function saveEntry() {
    const object = JSON.parse('{"id":0}')
    object.id = document.getElementById("input_id").value
    object.name = document.getElementById("input_name").value;
    object.email = document.getElementById("input_email").value
    object.age = document.getElementById("input_age").value;
    object.phone_number = document.getElementById("input_phone").value

    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("POST", "http://localhost:8080/person", true);
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState === 4) {
            if (xmlHttpRequest.status === 200) {
                fillTable()
            } else {
                console.error(xmlHttpRequest.status)

            }
        }
    }
    console.log("Try to send " + JSON.stringify(object))
    xmlHttpRequest.setRequestHeader("content-type", "application/json")
    xmlHttpRequest.send(JSON.stringify(object))

}

function alterEntry(button) {
    console.log("id: " + button.id +"  Button id: " + button.id.substring(6, button.id.length) + " Length is " + button.id.length)

    const set_id = parseInt(button.id.substring(6, button.id.length))
    console.log("SET: " + JSON.stringify(set))
    console.log("SET ID: " + set_id)

    set[set_id].id = document.getElementById("input_id").value
    set[set_id].name = document.getElementById("input_name").value;
    set[set_id].email = document.getElementById("input_email").value
    set[set_id].age = document.getElementById("input_age").value;
    set[set_id].phone_number = document.getElementById("input_phone").value


    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("POST", "http://localhost:8080/person", true);
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState === 4) {
            if (xmlHttpRequest.status === 200) {
                fillTable()
            } else {
                console.error(xmlHttpRequest.status)

            }
        }
    }

    xmlHttpRequest.setRequestHeader("content-type", "application/json")
    xmlHttpRequest.send(JSON.stringify(set[set_id]))
}

function deleteEntry(button) {
    const id = parseInt(button.id.substring(7, button.id.length))
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("DELETE", "http://localhost:8080/person", true);
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState === 4) {
            if (xmlHttpRequest.status === 200) {
                fillTable()
            } else {
                console.error(xmlHttpRequest.status)

            }
        }
    }

    xmlHttpRequest.setRequestHeader("content-type", "application/json")
    xmlHttpRequest.send(JSON.stringify(set[id].id))
}