import { format, subDays, subYears } from 'date-fns';

type relativeDateFn = (days: number) => Date;
type formattedDateFn = (date: string | number | Date, pattern: string) => string;

export const getDateDaysAgo: relativeDateFn = (days: number) => subDays(new Date(), days);
export const getDateYearsAgo: relativeDateFn = (years: number) => subYears(new Date(), years);

export const formatDate: formattedDateFn = (
  date: string | number | Date,
  pattern = 'dd.MM.yyyy.',
) => {
  const dateToFormat = typeof date === 'string' ? new Date(date) : date;
  return format(dateToFormat, pattern);
};
