import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe';
  title = 'NikeStore';
  subtitle = 'Which one do you want?';
  subtitleAdmin = 'Welcome to Admin Panel';

  constructor() { }

  onNavigate(feature: any) {
    this.loadedFeature = feature;
  }

}
