import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { INote } from '../interface/INote';
import { IGetPatientNote } from '../interface/IGetPatientNote';
import { INotePatient } from '../interface/INotePatient';
import { IListOfPatientNotes } from '../interface/IListofPatientNotes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpClient: HttpClient) {

  } 
 
  AddDoctorNote(notedata: object): Observable<any> {

    return this.httpClient.post<INote>('http://localhost:5268/api/Note/AddNote', notedata);
  }
  GetDoctorNotes(dayId: number): Observable<any> {

    return this.httpClient.get<INote>(`http://localhost:5268//api/Note/GetAllNotesByDayID${dayId}`);
  }

  AddPatientNote(notedata: object): Observable<any> {

    return this.httpClient.post<INotePatient>('http://localhost:5268/api/Patient/AddPatientNote', notedata);
  }
  GetPatientNotes(getNotesData: IGetPatientNote): Observable<any[]> {

    let params = new HttpParams();
    params = params.append('patientId', getNotesData.patientId);
    params = params.append('dayId', getNotesData.dayId);

    return this.httpClient.get<any[]>('http://localhost:5268/api/Patient/GetPatientsNotes',{ params });
  }
}
