import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';

import {environment} from '../../../environments/environment';

import {AvatarInterface} from '../model/avatar.interface';
import {JobInterface} from '../model/job.interface';
import {StatusInterface} from '../model/status.interface';
import {ProfileInterface} from '../model/profile.interface';

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

  getStatusList() {
    const url = this.apiurl + 'statuslist';
    return this.http.get<Array<StatusInterface>>(url)
                      .map(data => data['results']);
  }

  saveProfile(profile: ProfileInterface) {
    const url = this.apiurl + 'saveprofile';
    return this.http.put(url, profile)
                      .map(data => data['results']);
  }
  getProfile(id: string) {
    const params = new HttpParams().set('id', id);
    const url = this.apiurl + 'getprofile';
    return this.http.get(url, {params})
                      .map(data => data['results']);
  }

}
