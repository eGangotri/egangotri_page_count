import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HelperService } from './helper.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    ClipboardModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [DatePipe, HelperService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
