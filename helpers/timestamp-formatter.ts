import dayjs from "dayjs";
import "dayjs/locale/id"; // Import bahasa Indonesia
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Daftarkan plugin untuk handle timezone Asia/Jakarta
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("id");

export function formatTimestamp(t: string, formatStr: string = "DD MMMM YYYY, HH:mm") {
  return dayjs(t).tz("Asia/Jakarta").format(formatStr);
}