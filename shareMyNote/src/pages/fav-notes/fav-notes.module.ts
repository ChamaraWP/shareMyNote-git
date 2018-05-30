import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavNotesPage } from './fav-notes';

@NgModule({
  declarations: [
    FavNotesPage,
  ],
  imports: [
    IonicPageModule.forChild(FavNotesPage),
  ],
})
export class FavNotesPageModule {}
