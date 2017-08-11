import { TestBed, inject } from '@angular/core/testing';
// import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

import { BackendHttpService } from './backend-http.service';

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

});
