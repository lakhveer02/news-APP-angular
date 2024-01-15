import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    private API_KEY = '8aa30892ede74328a4743a219e12066f';
    private url = 'https://newsapi.org/v2/everything?q=';


    constructor(private http: HttpClient) {}

    getNews(query: string): Observable<any> {
        return this.http.get(`${this.url}${query}&apiKey=${this.API_KEY}`);
    }
}