import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FIND_USER_BY_USERNAME } from "src/appConstant";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AppUser } from "./appUser";

@Injectable({
    providedIn: 'root'
})

export class AppUserService{
    private apiSeverUrl = environment.apiBaseUrl;

    constructor(private http:HttpClient){}

    public getUserByUserName(userName: String):Observable<AppUser>{
        return this.http.get<AppUser>(`${this.apiSeverUrl}` + FIND_USER_BY_USERNAME + userName);
    }

    


}