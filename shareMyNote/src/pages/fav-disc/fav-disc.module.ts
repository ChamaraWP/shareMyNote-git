import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavDiscPage } from './fav-disc';

@NgModule({
  declarations: [
    FavDiscPage,
  ],
  imports: [
    IonicPageModule.forChild(FavDiscPage),
  ],
})
export class FavDiscPageModule {}
