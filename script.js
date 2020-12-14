// var date = new Date("December 10, 2020 8:35:00");
// format of cell id is (period)(day)

var date;
var day;

setInterval(doAll, 1000);

function doAll() {
    showTime();
    periodHighlight();
}

function showTime() {
    date = new Date();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    day = date.getDay();
    am_pm = "AM";

    if (hour > 12) {
        hour -= 12;
        am_pm = "PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = hour + ":"
        + min + ":" + sec + am_pm;

    document.getElementById("clock")
        .innerHTML = currentTime;
}

doAll();
dayHighlight();

function dayHighlight() {
    var x = document.getElementById("myTable").rows[0].cells;
    var y = document.getElementById("myTable").rows;
    $(`#day${day}`).toggleClass("success");
}

function periodHighlight() {
    var ClasTim = [
        ['08:30:00', '09:10:00'],//
        ['09:20:00', '10:00:00'],//small break here
        ['10:00:00', '10:20:00'],
        ['10:20:00', '11:00:00'],//
        ['11:10:00', '11:50:00'],//small break here
        ['11:50:00', '12:10:00'],
        ['12:10:00', '12:50:00'],//
        ['01:00:00', '01:40:00']//small break here
    ];

    isClass = false;
    for (let period = 0; period < ClasTim.length; period++) {
        if (checkPeriod(ClasTim[period][0], ClasTim[period][1])) {

            if (period === 2 || period === 5) {
                document.getElementById("NowPeriod").innerText = document.getElementById(`${period}0`).innerHTML;
                document.getElementById("NextPeriod").innerText = document.getElementById(`${period + 1}${day}`).innerHTML;
                isClass = true;
            } else {
                document.getElementById("NowPeriod").innerText = document.getElementById(`${period}${day}`).innerText;
                console.log("next class");
                if (period === 1 || period === 4) {
                    document.getElementById("NextPeriod").innerText = document.getElementById(`${period + 1}0`).innerText;
                } else {
                    document.getElementById("NextPeriod").innerText = document.getElementById(`${period + 1}${day}`).innerText;
                }
                isClass = true;
            }

            var e = ClasTim[period + 1][0].split(':');
            var dt3 = new Date(date.getFullYear(), date.getMonth(),
                date.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
            document.getElementById("NextInTime").innerText = Math.trunc((dt3 - date) / 60000) + " minutes";

            if (period === ClasTim.length - 2) {
                // var f = ClasTim[period][1].split(':');
                // var dt4 = new Date(date.getFullYear(), date.getMonth(),
                //     date.getDate(), parseInt(f[0]), parseInt(f[1]), parseInt(f[2]));
                // document.getElementById("NextInTime").innerText = ((dt4 - date) / 60000) + " minutes";
                // document.getElementById("NextPeriod").innerText = "School End";
                document.getElementById("NextInTime").innerText = "-";
                document.getElementById("NextPeriod").innerText = "School End";
            }
        } else if (period === ClasTim.length - 1 && isClass === false) {
            document.getElementById("NowPeriod").innerText = "no class";

            var e = ClasTim[period][1].split(':');
            var dt3 = new Date(date.getFullYear(), date.getMonth(),
                date.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
            document.getElementById("NextInTime").innerText = Math.trunc((dt3 - date) / 60000) + " minutes";
            if (date > dt3) {
                document.getElementById("NextInTime").innerText = "-";
                document.getElementById("NextPeriod").innerText = "School Ended";
            }else{
                // check time between which periods
            }
        }
    }


}

function checkPeriod(startTime, endTime) {

    var s = startTime.split(':');
    var dt1 = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
        parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));

    var e = endTime.split(':');
    var dt2 = new Date(date.getFullYear(), date.getMonth(),
        date.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));

    if (date >= dt1 && date <= dt2) {
        return true;
    }
    else {
        return false;
    }
}

