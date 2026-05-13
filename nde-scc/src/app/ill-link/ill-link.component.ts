import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'custom-ill-link',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './ill-link.component.html',
  styleUrl: './ill-link.component.css'
})
export class IllLinkComponent{
    @Input() private hostComponent: any;

  get newLink() {
    if (this.hostComponent.request && /interlibrary loan/i.test(this.hostComponent.request.type))  {
    const baseUrl = this.hostComponent.request['link-to-service'];
    const currentURL = window.location.href;
    const encodedURL = encodeURIComponent(currentURL);
    return `${baseUrl}&url=${encodedURL}`;
    } else {    
    return '';
    }
  }



}
