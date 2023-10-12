import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/shared/material-module/material.module';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [MaterialModule],
})
export class IconsModule {
  private path: string = '../../../assets/icons';

  constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry
      .addSvgIcon('clock', this.setPath(`${this.path}/clock.svg`))
      .addSvgIcon('file', this.setPath(`${this.path}/file.svg`))
      .addSvgIcon('points', this.setPath(`${this.path}/points.svg`))
      .addSvgIcon('check', this.setPath(`${this.path}/check.svg`));
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
