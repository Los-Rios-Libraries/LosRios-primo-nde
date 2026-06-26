import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FaqItem } from '../shared/models/faq.model';
import { CachedHttpService } from '../services/cached-http.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatAnchor } from '@angular/material/button';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';

@Component({
  selector: 'custom-homepage-faq',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatAnchor
  ],
  providers: [CachedHttpService],
  templateUrl: './homepage-faq.component.html',
  styleUrl: './homepage-faq.component.css',
})
export class HomepageFaqComponent {
  faqSiteURL = `https://answers.library.losrios.edu/${VIEW_CONSTANTS.libraryAcronym}`;
  private cachedHttp = inject(CachedHttpService);

  // If everything fails, this signal just becomes an empty array []
  faqs = toSignal(
    this.cachedHttp.get<FaqItem[]>({
      url: `https://na-workflows.hosted.exlibrisgroup.com/60d0c170-306f-43b5-a6a4-a9d81bda2fc4/webhook/libanswers-faq-proxy?library=${VIEW_CONSTANTS.libraryAcronym}`,
      cacheKey: `faq_cache_${VIEW_CONSTANTS.libraryAcronym}`,
      emptyFallback: [],
      cacheDurationMs: 5 * 60 * 60 * 1000, // 5 hours
    }),
    { initialValue: [] },
  );
}
