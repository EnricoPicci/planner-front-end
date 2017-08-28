export interface GoalInterface {
    name: string;
    icon: string;
    age?: number;
    value?: number;
    cashComponent?: number;
    debtComponent?: number;
    debtInterest?: number;
    debtDuration?: number;
    investmentComponent?: number;
    investmentInterest?: number;
}
