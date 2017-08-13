import {GoalInterface} from './goal.interface';
import {StatusInterface} from './status.interface';

export interface ProfileInterface {
    id: string;
    firstName: string;
    lastName: string;
    age: string;
    status: StatusInterface;
    initialCapital: number;
    yearlySavings: number;
    goals: Array<GoalInterface>;
}
