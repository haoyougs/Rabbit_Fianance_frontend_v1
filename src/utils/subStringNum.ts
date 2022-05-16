export const subStringNum = (a: any, num: any) => {
    var a_type = typeof (a);
    if (a_type == "number") {
        var aStr = a.toString();
        var aArr = aStr.split('.');
    } else if (a_type == "string") {
        var aArr = a.split('.');
    }

    if (aArr.length > 1) {
        a = aArr[0] + "." + aArr[1].substr(0, num);
    }
    return a
}