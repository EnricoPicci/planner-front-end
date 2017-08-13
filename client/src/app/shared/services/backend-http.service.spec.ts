import { TestBed, inject } from '@angular/core/testing';
// import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/switchMap';

import { BackendHttpService } from './backend-http.service';
import {ProfileInterface} from '../model/profile.interface';

describe('BackendHttpService', () => {
  let backendHttpService: BackendHttpService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [BackendHttpService]
    });
    inject([BackendHttpService], (service1: BackendHttpService) => {
        backendHttpService = service1;
    })();
  });

  it('should be created', done => {
    expect(backendHttpService).toBeTruthy();
    done();
  });
  it('should read the list of avatars', done => {
    backendHttpService.getAvatarList().subscribe(results => {
      expect(results.length).toBe(6);
    });
    done();
  });
  it('should read the list of goals of one Avatar', done => {
    backendHttpService.getAvatarList().subscribe(results => {
      expect(results[0].goals.length).toBe(2);
    });
    done();
  });
  it('should read the status of one Avatar', done => {
    backendHttpService.getAvatarList().subscribe(results => {
      expect(results[0].status.code).toBe('1');
    });
    done();
  });

  it('should read the list of jobs', done => {
    backendHttpService.getJobList().subscribe(results => {
      expect(results.length).toBe(7);
    });
    done();
  });
  it('should read the code of the first job', done => {
    backendHttpService.getJobList().subscribe(results => {
      expect(results[0].code).toBe('1');
    });
    done();
  });

  it('should read the list of statuses', done => {
    backendHttpService.getStatusList().subscribe(results => {
      expect(results.length).toBe(3);
    });
    done();
  });
  it('should read the code of the first status', done => {
    backendHttpService.getJobList().subscribe(results => {
      expect(results[0].code).toBe('1');
    });
    done();
  });

  it('should save a profile and return its ID and then read again the same profile', done => {
    const profile: ProfileInterface = {
      id: null,
      firstName: 'Enrico',
      lastName: 'Typescript',
      age: '24',
      status: null,
      initialCapital: 1000,
      yearlySavings: 10,
      goals: []
    };
    backendHttpService.saveProfile(profile)
                      .switchMap(profileId => backendHttpService.getProfile(profileId))
                      .subscribe(results => {
                        expect(results.firstName).toBe(profile.firstName);
                        done();
                      });
  });

});
