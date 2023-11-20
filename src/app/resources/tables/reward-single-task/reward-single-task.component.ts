import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ResourcesService } from 'src/app/services/resources/resources.service';

@Component({
  selector: 'app-reward-single-task',
  templateUrl: './reward-single-task.component.html',
  styleUrls: ['./reward-single-task.component.scss']
})
export class RewardSingleTaskComponent implements OnInit {
  @Input() thirdFormGroup!: FormGroup;
  files: any[] = [];
  fileControl: FormControl;
  avatarsSelected: any[] = [];
  avatars: any = [];
  rewards: any = [];
  public listAccepts = [
    null,
    '.png',
    'image/*',
  ];

  constructor(private resourcesService: ResourcesService) {
    this.fileControl = new FormControl(this.files, [
      Validators.required,
    ]);
  }

  ngOnInit() {
    this.fetchDataRewards();
    this.fetchDataAvatars();
    this.fileControl.valueChanges.subscribe((files: any) => {
      this.files = Array.isArray(files) ? files : [files];
    });

  }

  onRewardTypeSelected(event: Event): void {
    const selectedRewardType = (event.target as HTMLSelectElement).value;
    const selectedReward = this.rewards.find((reward: any) => reward.name === selectedRewardType);
  
    if (selectedReward) {
      this.thirdFormGroup.get('rewardId')?.setValue(selectedReward.id);
    }
  }

  fetchDataRewards(): void {
    this.resourcesService.getRewards().subscribe(data => {
      this.rewards = data.content;
    })
  }

  fetchDataAvatars(): void {
    this.resourcesService.getAvatars().subscribe(data => {
      this.avatars = data.content;
    })
  }

  getDecodedImage(imageData: string): string {
    return 'data:image/jpeg;base64,' + imageData;
  }

  onAvatarSelected(event: Event): void {

    const selectElement = event.target as HTMLSelectElement;
    const selectedOptionIndex = parseInt(selectElement.value, 10);
    const selectedAvatar = this.avatars[selectedOptionIndex];
  
    if (selectedOptionIndex >= 0 && !this.avatarsSelected.includes(selectedAvatar)) {
      this.avatarsSelected.push(selectedAvatar);
      this.updateSelectedAvatarsControl();
    }
  }

  get rewardPoints(): number {
    const rewardValue = this.thirdFormGroup.get('rewardValue')?.value;
    const rewardTypeName = this.thirdFormGroup.get('rewardType')?.value;
  
    const selectedReward = this.rewards.find((reward: any) => reward.name === rewardTypeName);
    
    const selectedRewardNoOfPoints = selectedReward ? selectedReward.noOfPoints : 0;
  
    return rewardValue ? rewardValue * selectedRewardNoOfPoints : 0;
  }

  getSelectedRewardId(): number | null {
    const selectedRewardType = this.thirdFormGroup.get('rewardType')?.value;
    const selectedReward = this.rewards.find((reward: any) => reward.name === selectedRewardType);
    return selectedReward ? selectedReward.id : null;
  }
  

  removeAvatar(index: number): void {
    
    if (index >= 0 && index < this.avatarsSelected.length) {
      this.avatarsSelected.splice(index, 1);
      this.updateSelectedAvatarsControl();
    }
  }

  private updateSelectedAvatarsControl() {
    const avatarSelectedControl = this.thirdFormGroup?.get('avatarSelected');
  
    if (avatarSelectedControl) {
      avatarSelectedControl.setValue([...this.avatarsSelected]);
    }
  }
}
