import {GoalTypeInterface} from './goal-type.interface';

export interface GoalInterface {
    name: string;
    icon: string;
    type: GoalTypeInterface;
    age?: number;
    value?: number;
    cashComponent?: number;
    debtComponent?: number;
    debtYearlyRate?: number;
    debtInterest?: number;
    debtDuration?: number;
    investmentComponent?: number;
    investmentInterest?: number;
    investmentDuration?: number;
    futureIncomeCoveragePercentage?: number;
}
