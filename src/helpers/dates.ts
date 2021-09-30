import { format, subDays, subYears } from 'date-fns';

type relativeDateFn = (days: number) => Date;
type formattedDateFn = (date: string | Date, pattern?: string) => string;

const dateFormats = {
  simple: 'dd.MM.yyyy.',
  verbose: 'MMMM do, yyyy',
};

export const getDateDaysAgo: relativeDateFn = (days: number) => subDays(new Date(), days);
export const getDateYearsAgo: relativeDateFn = (years: number) => subYears(new Date(), years);
export const formatDate: formattedDateFn = (date: string | Date, pattern?: string) => {
  let formatPattern: string;
  switch (pattern) {
    case 'verbose':
      formatPattern = dateFormats.verbose;
      break;
    case 'simple':
    default:
      formatPattern = dateFormats.simple;
      break;
  }
  return format(new Date(date), formatPattern);
};
