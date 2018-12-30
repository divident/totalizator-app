import {ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProcessHttpMsgService } from './services/process-httpmsg.service';
import { Router } from '@angular/router';

@Injectable({providedIn: "root"})
export class ErrorsHandler implements ErrorHandler {
    constructor(private injector: Injector) {}

    handleError(error: Error) {
        const notificationService = this.injector.get(ProcessHttpMsgService);
        const router = this.injector.get(Router);

        if (error instanceof HttpErrorResponse) {
            if(!navigator.onLine){
                return notificationService.handleError("Brak połączenia internetowego")
            }else {
                if(error.status == 401){
                    return notificationService.handleError("Zaloguj się aby wykonać akcję")   
                }
                return notificationService.handleError(`${error.status} - ${error.message}`)
            }
        } else {
            router.navigate(['/error'], {queryParams: {error: error}});
        }
        console.log("ERROR HANDLER")
        console.error('+++++++++', error);
    }
}