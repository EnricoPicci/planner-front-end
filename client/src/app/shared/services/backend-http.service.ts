import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

import {environment} from '../../../environments/environment';

import {AvatarInterface} from '../model/avatar.interface';
import {JobInterface} from '../model/job.interface';

@Injectable()
export class BackendHttpService {
  private apiurl = environment.apiurl;

  constructor(private http: HttpClient) { }

  getAvatarList() {
    const url = this.apiurl + 'avatarlist';
    return this.http.get<Array<AvatarInterface>>(url)
                      .map(data => data['results']);
  }

  getJobList() {
    const url = this.apiurl + 'joblist';
    return this.http.get<Array<JobInterface>>(url)
                      .map(data => data['results']);
  }

}
