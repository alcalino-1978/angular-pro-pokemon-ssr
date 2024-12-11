import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About Page - Pokemon SSR');
    this.meta.updateTag({
      name: 'description',
      content: 'About page of Pokemon SSR',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'About page of Pokemon SSR',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular, pio, peneman',
    });
  }
}
