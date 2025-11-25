import { Component, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonComponent } from '../../../toogle-button/toggle-button.component';
import { zoomInAnimation } from '@app/shared/animations/zoom-in.animation';
import { BasicInputComponent } from '@app/shared/components/HTMLBasics/basicInput/basicInput.component';
import { BasicTextAreaComponent } from '@app/shared/components/HTMLBasics/basic-text-area/basic-text-area.component';
import { PrimaryButtonComponent } from '@app/shared/components/HTMLBasics/primaryButton/primaryButton.component';
import { IconComponent } from '@app/shared/components/icon/IconComponent/IconComponent.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nade-creation-tooltip',
  standalone: true,
  imports: [FormsModule, ToggleButtonComponent, BasicInputComponent, BasicTextAreaComponent, PrimaryButtonComponent, IconComponent, NgIf],
  templateUrl: './nade-creation-tooltip.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  animations: [zoomInAnimation]
})
export class NadeCreationTooltipComponent {
  title = signal('');
  type = signal('smoke');
  side = signal('');
  description = signal('');
  hasDescription = signal(false);
  tags = signal<string[]>([]);
  tag = signal('');
  visibleTagInput = signal(false);
  visibleAddUsersInput = signal(false);
  isPrivate = signal<boolean>(false);
  videoUrl = signal<string>('');
  accuracyLevel = signal<'low' | 'medium' | 'high'>('low');
  hasAccuracyLevel = signal(false);
  users = signal<string[]>([]);
  user = signal('');
  techniques = signal<string[]>([]);
  techiniquesInput = signal('');
  hasTechnique = signal(false);
  visibleTechiniqueInput = signal(false);


  techiniqueCommands = [
    'Run',
    'Walk',
    'Jump',
    'Crouch',
    'Left Click',
    'Right Click',
    'Left + Right Click'
  ]

  save = output<{ title: string; type: string; description: string }>();
  cancel = output<void>();

  zoomInParams = {
    value: '',
    params: { time: '0.2s', startScale: 0.2, startOpacity: 0 }
  }

  constructor() {
    effect(() => {
      if (this.techniques())
        console.log(this.techniques())
    })
  }

  onSave() {
    if (this.title()) {
      this.save.emit({
        title: this.title(),
        type: this.type(),
        description: this.description()
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
  onConfirmNewTag() {
    if (this.tag().trim() !== '') {
      this.tags.update(tags => [...tags, this.tag().trim()]);
      this.visibleTagInput.set(false);
      this.tag.set('');
    }
  }
  onRemoveTag(tag: string) {
    this.tags.update(tags => tags.filter(t => t !== tag));
  }
  onConfirmAddNewUser() {
    if (this.user().trim() !== '') {
      this.users.update(users => [...users, this.user().trim()]);
      this.visibleAddUsersInput.set(false);
      this.user.set('');
    }
  }
  onRemoveUser(user: string) {
    this.users.update(users => users.filter(u => u !== user));
  }
  onRemoveTechnique(technique: string) {
    this.techniques.update(techniques => techniques.filter(t => t !== technique));
  }
  onConfirmAddNewTechnique() {
    if (this.techiniquesInput().trim() !== '') {
      this.techniques.update(techniques => [...techniques, this.techiniquesInput().trim()]);
      this.visibleTechiniqueInput.set(false);
      this.techiniquesInput.set('');
    }
  }
}
