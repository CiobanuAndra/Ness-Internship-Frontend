import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Avatar } from 'src/app/interfaces/resources/avatar.model';
import { ResourcesService } from 'src/app/services/resources/resources.service';

@Component({
  selector: 'app-reward-multiple-task',
  templateUrl: './reward-multiple-task.component.html',
  styleUrls: ['./reward-multiple-task.component.scss']
})
export class RewardMultipleTaskComponent implements OnInit{
  @Input() thirdFormGroup!: FormGroup;
  @Input() secondFormGroup!: FormGroup;

  files: any[] = [];
  fileControl: FormControl;
  avatarsSelected: any[] = [];
  avatars: Avatar[] = [];
  rewards: any = [];
  public listAccepts = [null, '.png', 'image/*'];
  rewardTypeName: any;
  totalNoOfPoints: number = 0;
  isCalculatingPoints: boolean = false;

  rewardsSummary: any = {};

  constructor(
    private resourcesService: ResourcesService,
  ) {
    this.fileControl = new FormControl(this.files, [Validators.required]);
  }

  ngOnInit() {
    this.fetchDataAvatars();
    this.fetchDataRewards();
    this.fileControl.valueChanges.subscribe((files: any) => {
      this.files = Array.isArray(files) ? files : [files];
    });

    this.secondFormGroup.valueChanges.subscribe(() => {
      this.calculateAndUpdatePoints();
      this.updateRewardType();
    });

    this.thirdFormGroup.valueChanges.subscribe(() => {
      this.calculateAndUpdatePoints();
      this.updateRewardType();
    });
  }

  getRewardTypes() {
    return Object.keys(this.rewardsSummary);
  }

  getRewardQuantity(rewardType: string) {
    const selectedCourses = this.secondFormGroup.get('selectedCourses')?.value;
    let totalQuantity = 0;
  
    for (const course of selectedCourses) {
      const matchingReward = this.rewards.find((reward: any) => reward.id === course.rewardId);
  
      if (matchingReward && matchingReward.name === rewardType) {
        totalQuantity += course.rewardQuantity;
      }
    }
  
    // Actualizarea valorii din thirdFormGroup.rewardValue
    const rewardValueControl = this.thirdFormGroup.get('rewardValue');
    if (rewardValueControl) {
      rewardValueControl.setValue(totalQuantity);
    }
  
    return totalQuantity;
  }
  

  getRewardScore(rewardType: string) {
    const selectedCourses = this.secondFormGroup.get('selectedCourses')?.value;
    let totalScore = 0;

    for (const course of selectedCourses) {
      const matchingReward = this.rewards.find((reward: any) => reward.id === course.rewardId);

      if (matchingReward && matchingReward.name === rewardType) {
        totalScore += course.noOfPoints;
      }
    }

    return totalScore;
  }

  fetchDataAvatars(): void {
    this.resourcesService.getAvatars().subscribe((data: any) => {
      if (data && data.content && Array.isArray(data.content)) {
        this.avatars = data.content;
      }
    });
  }

  getDecodedImage(imageData: string): string {
    return 'data:image/jpeg;base64,' + imageData;
  }

  calculateTotalNoOfPoints(selectedCourses: any[]): number {
    let totalPoints = 0;
    for (const course of selectedCourses) {
      totalPoints += course.noOfPoints;
    }
    return totalPoints;
  }

  updateScoreFormControl(totalPoints: number): void {
    const scoreControl = this.thirdFormGroup.get('score');
    if (scoreControl) {
      scoreControl.setValue(totalPoints);
    }
  }

  calculateTotalPoints(): number {
    const selectedCourses = this.secondFormGroup.get('selectedCourses')?.value;
    let totalPoints = 0;

    for (const course of selectedCourses) {
      totalPoints += course.noOfPoints;
    }

    return totalPoints;
  }

  calculateAndUpdatePoints(): void {
    if (this.isCalculatingPoints) {
      return;
    }
    this.isCalculatingPoints = true;

    const selectedCourses = this.secondFormGroup.get('selectedCourses')?.value;
    this.totalNoOfPoints = this.calculateTotalNoOfPoints(selectedCourses);
    this.updateScoreFormControl(this.totalNoOfPoints);

    const totalPoints = this.calculateTotalPoints();
    const scoreControl = this.thirdFormGroup.get('score');
    if (scoreControl) {
      scoreControl.setValue(totalPoints);
    }

    this.calculateAndUpdateRewardQuantity(selectedCourses);

    this.isCalculatingPoints = false;
  }

  calculateAndUpdateRewardQuantity(selectedCourses: any[]): void {
    let totalRewardQuantity = 0;
    let totalRewardValue = 0;

    for (const course of selectedCourses) {
      totalRewardQuantity += course.rewardQuantity;
      totalRewardValue += course.rewardValue;
    }

    const rewardQuantityControl = this.thirdFormGroup.get('rewardValue');
    if (rewardQuantityControl) {
      rewardQuantityControl.setValue(totalRewardQuantity);
    }

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

  fetchDataRewards(): void {
    this.resourcesService.getRewards().subscribe(data => {
      this.rewards = data.content;
    });
  }

  updateRewardType(): void {
    const selectedCourses = this.secondFormGroup.get('selectedCourses')?.value;

    this.rewardsSummary = {};

    if (selectedCourses && selectedCourses.length > 0 && this.rewards.length > 0) {
      for (const course of selectedCourses) {
        const matchingReward = this.rewards.find((reward: any) => reward.id === course.rewardId);

        if (matchingReward) {
          if (!this.rewardsSummary[matchingReward.name]) {
            this.rewardsSummary[matchingReward.name] = course.rewardQuantity;
          } else {
            this.rewardsSummary[matchingReward.name] += course.rewardQuantity;
          }
        }
      }
    }
  }

}
