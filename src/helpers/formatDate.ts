import dayjs, { ConfigType } from 'dayjs';

export function nowFromDate(
    date1: ConfigType,
    format: 'days' | 'hours'
): number {
    return dayjs(date1).diff(Date.now(), format);
}

export function formatDate(date: string): string {
    return dayjs(date).format('YYYY-MM-DD');
}
