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
      .addSvgIcon('check', this.setPath(`${this.path}/check.svg`))
      .addSvgIcon('no-data', this.setPath(`${this.path}/no-data.svg`))
      .addSvgIcon('points-black', this.setPath(`${this.path}/points-black.svg`))
      .addSvgIcon('points', this.setPath(`${this.path}/points.svg`))
<<<<<<< HEAD
      .addSvgIcon('span', this.setPath(`${this.path}/span.svg`));
=======
      .addSvgIcon('check', this.setPath(`${this.path}/check.svg`))
      .addSvgIcon('no-data', this.setPath(`${this.path}/no-data.svg`));
>>>>>>> 17a6d94 (feat(current-progress): create no-data view)
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
