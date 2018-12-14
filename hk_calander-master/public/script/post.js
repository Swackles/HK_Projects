function addHomework() {

    let addHomework = new FormData(document.getElementById('addHomework'));

    if (addHomework.get('class') == null) {
        document.getElementById('addHomework_Select_Class').style.borderColor = "red";
    }
    /*
    $.ajax({
        url: '/add/class',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            
            password: password 
        }),
        statusCode: {
            200: () => {
                
            }
        }
    });
    */
}