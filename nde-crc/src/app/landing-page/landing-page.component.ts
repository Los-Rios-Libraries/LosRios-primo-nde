import { Component } from '@angular/core';
import { HomepageFaqComponent } from '../homepage-faq/homepage-faq.component';
import {HomepageCollectionsWidgetComponent} from '../homepage-collections-widget/homepage-collections-widget.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'custom-landing-page',
  standalone: true,
  imports: [HomepageFaqComponent, HomepageCollectionsWidgetComponent, MatCardModule, MatIconModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
