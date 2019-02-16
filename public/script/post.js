function addHomework() {

    let addHomework = new FormData(document.getElementById('addHomework'));

    if (addHomework.get('class') == -1) {
        document.getElementById('addHomework_Class').style.borderColor = "red";
        return;
    } else if (addHomework.get('date') == "") {
        document.getElementById('addHomework_Date').style.borderColor = "red";
        return;
    } else if (addHomework.get('text') == "") {
        document.getElementById('addHomework_Text').style.borderColor = "red";
        return;
    }

    $.ajax({
        url: '/add/class',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            id: addHomework.get('class'),
            date: addHomework.get('date'),
            text: addHomework.get('text')
        }),
        statusCode: {
            200: () => {
                
            }
        }
    });
}