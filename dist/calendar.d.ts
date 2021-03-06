import * as React from 'react';
import { StyledComponentProps } from '@material-ui/core/styles';
declare class Calendar extends React.Component<CalendarProps, CalendarState> {
    container: Element;
    updateHeight: {
        month: () => void;
        year: () => void;
    };
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getButtonHeight: () => number;
    resize: () => void;
    selectDate: (date: Date, event: React.MouseEvent<HTMLElement>) => void;
    confirmDate: (event: React.MouseEvent<HTMLElement>) => void;
    showYearsCalendar: () => void;
    selectCalendarYear: (year?: number) => void;
    previousYearsValid: () => boolean;
    previousYears: () => void;
    nextYearsValid: () => boolean;
    nextYears: () => void;
    changeYears: (index: any) => void;
    yearInvalid: (currentYear: number) => boolean;
    previousMonthValid: () => boolean;
    previousMonth: () => void;
    nextMonthValid: () => boolean;
    nextMonth: () => void;
    changeMonth: (index: any) => void;
    dayInvalid: (date: Date) => boolean;
    yearIndexValid: (index: number) => boolean;
    monthIndexValid: (index: number) => boolean;
    generateYearCalendar: (index: number) => number[][];
    generateMonthCalendar: (index: number) => Date[][];
    render(): JSX.Element;
}
export interface CalendarProps extends React.Props<{}>, StyledComponentProps {
    action: (actions: any) => void;
    value: Date;
    onChange: (value: Date, event?: React.MouseEvent<HTMLElement>) => void;
    closeCalendar: () => void;
    dateDisabled?: (date: Date) => boolean;
    min?: Date;
    max?: Date;
    okToConfirm?: boolean;
    classes?: {
        root?: string;
        selectedDay?: string;
        selectedDayText?: string;
        selectedYear?: string;
        selectedYearText?: string;
    };
}
export interface CalendarState {
    mode: 'year' | 'month';
    buttonHeight: number;
    selected: Date;
    month: number;
    year: number;
    yearIndex: number;
}
export default Calendar;
