import { isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    // if (!isPlatformServer(this.platformId)) {
    //   document.title = 'Pricing Page - Pokemon SSR';
    // }
    this.title.setTitle('Pricing Page - Pokemon SSR');
    this.meta.updateTag({
      name: 'description',
      content: 'Pricing page of Pokemon SSR',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Pricing page of Pokemon SSR',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular, pio, peneman',
    });
  }
}
