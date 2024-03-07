export const ago = (date: number | string | Date): string => {
    let ts: number;

    if (typeof date === 'string') {
        ts = Number(new Date(date));
    } else if (date instanceof Date) {
        ts = date.getTime();
    } else {
        ts = date;
    }

    const now = Date.now();
    const diff = now - ts;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) {
        return `${months}mo`;
    } else if (days > 0) {
        return `${days}d`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return `${seconds}s`;
    }
};