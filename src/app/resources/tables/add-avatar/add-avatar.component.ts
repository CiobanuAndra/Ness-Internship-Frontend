import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogService } from 'src/app/services/users/dialog.service';
import { ResourcesService } from 'src/app/services/resources/resources.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Avatar } from 'src/app/interfaces/resources/avatar.model';

@Component({
  selector: 'app-add-avatar',
  templateUrl: './add-avatar.component.html',
  styleUrls: ['./add-avatar.component.scss']
})
export class AddAvatarComponent {
  @Input() showSidenav: boolean = false;
  @Output() showSidenavChange = new EventEmitter<boolean>();
  @Input() isDialogOpen = false;
  files: any[] = [];
  fileControl: FormControl;
  avatarFormGroup!: FormGroup;
  public listAccepts = [null, '.jpg', '.png', 'image/png', 'image/*'];
  avatars: Avatar[] = [];
  @Output() avatarAdded = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private resourcesService: ResourcesService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) {
    this.fileControl = new FormControl(this.files, [Validators.required]);
  }

  ngOnInit() {
    this.avatarFormGroup = this.formBuilder.group({
      name: [''],
      isDefault: [false],
      fileControl: [null],
    });
  }

  closeDialog(): void {
    if (this.isDialogOpen) {
      return;
    }

    this.isDialogOpen = true;

    this.dialogService.openConfirmationDialog().then((result) => {
      this.isDialogOpen = false;

      if (result) {
        this.showSidenav = false;
        this.showSidenavChange.emit(this.showSidenav);
        this.resourcesService.setSidenavVisibility(false);
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
      this.closeDialog();
    }
  }  

  addAvatar(avatarFormGroup: FormGroup): void {
    const file = avatarFormGroup.get('fileControl')?.value as File;
  
    if (!file) {
      console.error('No file selected');
      return;
    }
  
    const isDefault = avatarFormGroup.get('isDefault')?.value;
    const formData = new FormData();
    formData.append('avatarHash', 'something');
    formData.append('name', avatarFormGroup.get('name')?.value);
    formData.append('addedBy', 'John');
    formData.append('isDefault', isDefault);
    formData.append('mimeType', 'Task_Name');
    formData.append('content', file);
  
    this.resourcesService.addAvatar(formData).subscribe(() => {

  
      this.showSidenav = false;
      this.showSidenavChange.emit(this.showSidenav);
      this.resourcesService.setSidenavVisibility(false);
  
      this.snackBar.open('Avatar added successfully!', '', {
        duration: 3000,
        panelClass: 'green-snackbar',
        verticalPosition: 'top'
      });
  
    }, (error) => {
      console.error('Error adding avatar:', error);
      this.snackBar.open('Failed to add avatar', '', {
        duration: 3000,
        panelClass: 'red-snackbar',
        verticalPosition: 'top'
      });
    });
  }
  
}
