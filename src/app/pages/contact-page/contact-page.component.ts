import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page - Pokemon SSR');
    this.meta.updateTag({
      name: 'description',
      content: 'Contact page of Pokemon SSR',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Contact page of Pokemon SSR',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular, pio, peneman',
    });
  }
}
