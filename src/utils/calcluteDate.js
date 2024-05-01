import moment from "moment";

export default function calcluteDate(month) {
    let currentDate = new Date();
    let calclutedDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - month, currentDate.getDate());
    return moment(calclutedDate).format("YYYY-MM-DD");
}
