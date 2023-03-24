import dayjs, { ConfigType } from 'dayjs';

export function nowFromDate(date1: ConfigType): number {
    return dayjs(date1).diff(Date.now(), 'hours');
}

export function formatDate(date: string): string {
    return dayjs(date).format('YYYY-MM-DD');
}
