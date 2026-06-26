import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BackApi {
  // https://hms-backend-y505.onrender.com

  private urlapi = "https://hms-backend-y505.onrender.com/api/dashboard"
  private apiUrl = 'https://hms-backend-y505.onrender.com/api/hos';
  private upurl = 'https://hms-backend-y505.onrender.com/api/hos/update/';
  private Departmenturl = 'https://hms-backend-y505.onrender.com/api/department';
  private paraurl = "https://hms-backend-y505.onrender.com/api/paragraph";
  private apiUrl1 = 'https://hms-backend-y505.onrender.com/api/appointment';
  private authUrl = 'https://hms-backend-y505.onrender.com/api/auth';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, data);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.authUrl}/update-profile`, data, { headers: this.getHeaders() });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.authUrl}/forgot-password`, { email });
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.authUrl}/reset-password`, data);
  }

  // ✅ GET ALL DOCTORS
  getAllDoctors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get`);
  }

  //doctors singleview
  allDoctorsingle_view(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${id}`);
  }
  // doctor filter
  getdepartment(department: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get?department=${department}`);
  }

  // get all department
  getalldepartment(): Observable<any> {
    return this.http.get(`${this.Departmenturl}/get`);
  }

  getDepartmentById(id: string): Observable<any> {
    return this.http.get(`${this.Departmenturl}/get/${id}`);
  }
  addDepartment(data: any): Observable<any> {
    return this.http.post(`${this.Departmenturl}/add`, data, { headers: this.getHeaders() });
  }
  deleteDepartment(id: string, data: any): Observable<any> {
    return this.http.delete(
      `${this.Departmenturl}/delete/${id}`,
      { headers: this.getHeaders(), body: data }
    );
  }
  updateDepartment(id: string, data: any): Observable<any> {
    return this.http.put(`${this.Departmenturl}/update/${id}`, data, { headers: this.getHeaders() });
  }
  getpara(): Observable<any> {
    return this.http.get(`${this.paraurl}/get`);
  }
  //update
  update_doctor(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, data, { headers: this.getHeaders() });
  }
  //add doctor
  AddDoctor(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data, { headers: this.getHeaders() });
  }
  //delete
  deletedoctor(id: string, data: any) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders(), body: data });
  }
  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.urlapi, { headers: this.getHeaders() });
  }
  //booking
  createAppointment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl1}/create`, data, { headers: this.getHeaders() });
  }

  getAllAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl1}/all`, { headers: this.getHeaders() });
  }

  updateAppointmentStatus(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl1}/update/${id}`, data, { headers: this.getHeaders() });
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl1}/delete/${id}`, { headers: this.getHeaders() });
  }

  // Helper to fetch and find a specific department description
  getDepartmentDescriptionByDepartmentName(deptName: string): Observable<any> {
    return this.getpara().pipe(
      map((res: any) => {
        const paragraphs = res.data || [];
        const normalizedDept = (deptName || '').toLowerCase().trim();
        const found = paragraphs.find((p: any) =>
          (p.department || '').toLowerCase().trim() === normalizedDept
        );
        console.log(`[BackApi] Lookup for "${deptName}":`, found ? 'MATCH FOUND' : 'NO MATCH');
        return found;
      })
    );
  }
}
