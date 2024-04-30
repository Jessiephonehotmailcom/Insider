import dayjs from 'dayjs';
export const ParseValidDate = function (date) {
    return typeof (date) === 'undefined' || date === null ? null : dayjs(date);
}

export const ReturnFullDateTimeOrString = function (data) {
    var matches = data.match(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/);
    if (!isNaN(new Date(data).getDate()) && matches) {
        try {

            return dayjs(data).format('YYYY/MM/DD h:mm:ss A');
        }
        catch {
            return data;
        }
    }
    else {
        return data;
    }
}

export const IsNullOrEmpty = function (x) {
    if (IsNull(x)) return true;
    if (x === "") return true;

    return false;
};

export const IsNull = function (x) {
    if (typeof (x) === 'undefined') return true;
    if (x === null) return true;

    return false;
}; 