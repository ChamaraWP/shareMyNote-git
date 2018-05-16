import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadDiscussionPage } from './upload-discussion';

@NgModule({
  declarations: [
    UploadDiscussionPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadDiscussionPage),
  ],
})
export class UploadDiscussionPageModule {}
