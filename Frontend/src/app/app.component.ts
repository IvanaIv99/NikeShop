import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe';
  title = 'NikeStore';
  subtitle = 'Which one do you want?';


  onNavigate(feature: any) {
    this.loadedFeature = feature;
  }

}
