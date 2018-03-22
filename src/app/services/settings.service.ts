import {Injectable} from '@angular/core';
import {AppConfig} from '../models/app-config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SettingsService {

    private appConfig: AppConfig;

    constructor(private http: HttpClient) {
        this.retrieveConfig().subscribe(data => {
            this.appConfig = data;
        });
    }

    public getConfig(): AppConfig {
        return this.appConfig;
    }

    public setConfig(config: AppConfig): void {
        this.appConfig = config;
        // In desktop app, save the value to the static file
    }

    private retrieveConfig(): Observable<any> {
        return this.http.get('../../assets/app-config.json');
    }
}
