import { Injectable } from '@angular/core';

import {ProfileInterface} from '../model/profile.interface';

@Injectable()
export class SessionService {
    profile: ProfileInterface;

}
