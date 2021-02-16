import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})

export class AppserviceService {  

  constructor(private http: HttpClient) { }

  fetchallusers() {
    return this.http.get(url + '/Users/fetchall');
  }

  authenticateUser(id) {
    return this.http.get(url + '/Users/fetch/'+id);
  }

  registerUser(user) {
    return this.http.post(url + '/Users/createnew/',user)
  }

  fetchUserById(id) {
    return this.http.get(url + '/Users/fetch/' + id)
  }

  fetchChallenges(){
    return this.http.get(url + '/Challenges/fetchall');
  }

  postChallenge(challenge) {
    return this.http.post(url + '/Challenges/createnew',challenge);
  }

  fetchChallengeById(id) {
    return this.http.get(url + '/Challenges/fetch/' + id);
  }

  updateChallengebyId(id,challenge) {
    return this.http.put(url + '/Challenges/update/' + id, challenge);
  }

  deleteChallengebyId(id) {
    return this.http.delete(url + '/Challenges/delete/' + id);
  }

  poll(id,userid,challenge) {
    return this.http.put(url + '/Challenges/vote/'+ id + '/' + userid, challenge);
  }

}
