import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';

import {ProfileInterface} from '../model/profile.interface';
import {GoalInterface} from '../model/goal.interface';

@Injectable()
export class SessionService {
    profile: ProfileInterface;
    private selectedGoalSubject = new BehaviorSubject<GoalInterface>(null);
    selectedGoal$ = this.selectedGoalSubject.asObservable();

    setProfile(profile: ProfileInterface) {
        this.profile = profile;
        this.goalSelectedChanged(this.profile.goals[0]);
    }
    goalSelectedChanged(goal: GoalInterface) {
        this.selectedGoalSubject.next(goal);
    }

}
