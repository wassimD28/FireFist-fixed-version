import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertStatus } from '../../../core/enums/common.enum';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Alert } from '../../../core/models/interfaces/common.interface';

@Component({
  selector: 'app-alert-box',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './alert-box.component.html',
  styleUrl: './alert-box.component.css'
})
export class AlertBoxComponent {
  @Input() alert: Alert = { show: false};

  public AlertStatus = AlertStatus;
  faX = faX;

  turnDisplayOff(){
    this.alert.show = false;
  }
}
