import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private _HttpClient=inject(HttpClient)
 
    addnote(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseurl}api/v1/notes`,data,{headers:{
    token:"3b8ny__" + localStorage.getItem('usertoken')
  }})
    }
    getnotes():Observable<any>{
  return this._HttpClient.get(`${environment.baseurl}api/v1/notes/allNotes`)
    }
    getusernotes():Observable<any>{
  return this._HttpClient.get(`${environment.baseurl}api/v1/notes`,{headers:{
    token:"3b8ny__" + localStorage.getItem('usertoken')
  }})
    }
    updatenote(id:any,data:object):Observable<any>{
  return this._HttpClient.put(`${environment.baseurl}api/v1/notes/${id}`,data,{headers:{    token:"3b8ny__" + localStorage.getItem('usertoken')
  }})
    }
    deletenote(id:any):Observable<any>{
  return this._HttpClient.delete(`${environment.baseurl}api/v1/notes/${id}`,{headers:{    token:"3b8ny__" + localStorage.getItem('usertoken')
  }})
    }



}
