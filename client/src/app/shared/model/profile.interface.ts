import {GoalInterface} from './goal.interface';
import {StatusInterface} from './status.interface';

export interface ProfileInterface {
    id?: string;
    firstName?: string;
    lastName?: string;
    age?: number;
    status?: StatusInterface;
    initialCapital?: number;
    yearlySavings?: number;
    investmentThreashold?: number;
    valueAtRisk?: number;
    planDuration?: number;
    goals?: Array<GoalInterface>;
}
