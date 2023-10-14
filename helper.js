function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}
  
function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function validFields(type, field) { 
    let isValid = false;
    try {
        switch (type) {
            case 1:
                isValid = (!isNaN(field)) ? true : false;
                break;
            case 2:
                isValid = (field) ? true: false;
                break;
            case 3:
                isValid = (!field && field !== null) ? true: false;
                break;
            case 4:
                isValid = (!field && field.length > 0) ? true: false;
            case 5:
                isValid = (!field && field !== null) ? true: false;
                break;
            default:
                isValid = false;
                break;
        }
        return isValid;
    } catch (e) {
        console.error(e);
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = {
    getOffset,
    emptyOrRows,
    validFields,
    formatDate
}
