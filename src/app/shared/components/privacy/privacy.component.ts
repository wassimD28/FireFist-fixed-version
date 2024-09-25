import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [],
  templateUrl: './privacy.component.html',
})
export class PrivacyComponent {
  privacies = [
    { id: 1, name: 'All', selected: true },
    { id: 2, name: 'Public', selected: false },
    { id: 3, name: 'Private', selected: false },
    { id: 4, name: 'Friends', selected: false },
  ]

  togglePrivacy(id: number) {
    this.privacies.forEach(privacy => privacy.selected = false);
    const pressedPrivacy = this.privacies.find(privacy => privacy.id == id);
    if (pressedPrivacy) {
      pressedPrivacy.selected = true;
    } else {
      console.error('Privacy not found with id', id);
      return;
    }
  }
}
