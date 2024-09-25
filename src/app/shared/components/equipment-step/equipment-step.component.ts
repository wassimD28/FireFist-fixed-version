import { FirstLetterUppercasePipe } from './../../pipes/firstLetterUppercase/first-letter-uppercase.pipe';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass,
  faArrowLeftLong,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { EquipmentPrivacy } from '../../../core/enums/common.enum';
import { CommonModule } from '@angular/common';
import { Equipment } from '../../../core/models/interfaces/equipment.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EquipmentFormComponent } from '../../forms/equipment-form/equipment-form.component';
import { EquipmentService } from '../../../core/services/equipment/equipment.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-equipment-step',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EquipmentFormComponent,
    FirstLetterUppercasePipe
  ],
  templateUrl: './equipment-step.component.html',
  styleUrl: './equipment-step.component.css',
})
export class EquipmentStepComponent implements OnInit {
  // icons
  faMagnifyingGlass = faMagnifyingGlass;
  faArrowLeftLong = faArrowLeftLong;
  faTrashCan = faTrashCan;

  constructor(
    private equipmentService: EquipmentService,
    private authService: AuthService,
  ) {}

  // to make the html see the EquipmentPrivacy enum
  public EquipmentPrivacy = EquipmentPrivacy;

  // initialize the current equipment privacy
  currentEquipmentPrivacy = EquipmentPrivacy.All;

  // to hide and show the create equipment panel
  showCreatePanel: boolean = false;

  // standard equipment list
  standardEquipmentList: Equipment[] = [];

  // custom equipment list
  customEquipmentList: Equipment[] = [];

  // selected equipment list
  selectedEquipmentList: Equipment[] = [];

  // show alert in custom equipment list container when deleting equipment
  showDeletingAlert = false;
  // store the equipment that will be deleted and its index
  equipmentToDelete: Equipment | undefined;
  equipmentToDeleteIndex: number | undefined;

  // binding the search input
  equipmentToSearch: string = '';

  // Keep the filtered lists
  filteredStandardEquipmentList: Equipment[] = [];
  filteredCustomEquipmentList: Equipment[] = [];

  ngOnInit() {
    this.fetchCustomEquipmentList();
    //this.fetchStandardEquipmentList();
  }

  // Function that searches in the equipment list
  searchEquipment() {
    if (this.currentEquipmentPrivacy === EquipmentPrivacy.All) {
      this.filteredStandardEquipmentList = this.standardEquipmentList.filter(
        (equipment) =>
          equipment.name
            .toLowerCase()
            .includes(this.equipmentToSearch.toLowerCase()),
      );
    } else if (this.currentEquipmentPrivacy === EquipmentPrivacy.Created) {
      this.filteredCustomEquipmentList = this.customEquipmentList.filter(
        (equipment) =>
          equipment.name
            .toLowerCase()
            .includes(this.equipmentToSearch.toLowerCase()),
      );
    }
  }

  // confirm equipment deletion
  confirmDeleteEquipment(){
    if (this.equipmentToDelete && this.equipmentToDeleteIndex){
      const id = this.equipmentToDelete.id;
      const index = this.equipmentToDeleteIndex;
      // delete equipment from selected equipment list
      this.filteredCustomEquipmentList.splice(index, 1);
      const token = this.authService.getAccessToken();
      this.equipmentService
        .deleteEquipment(id ?? undefined, token ?? undefined)
        .subscribe({
          next: (res) => {
            console.log('equipment deleted successfully');
          },
          error: (error) => {
            console.error('Error fetching equipment data:', error);
          },
        });
      this.showDeletingAlert = false;
      this.equipmentToDelete = undefined;
    }
  }

  // show delete alert function
  showDeleteAlert(): void {
    this.showDeletingAlert = true;
  }
  // cancel delete alert function
  cancelDeleteAlert(): void {
    this.showDeletingAlert = false;
    this.equipmentToDelete = undefined;
  }

  // function that deletes equipment
  storeEquipmentAndIndex(equipment: Equipment , index: number): void {
    this.showDeletingAlert = true;
    this.equipmentToDelete = equipment;
    this.equipmentToDeleteIndex = index;
  }
  // function that fetches the custom equipment list
  fetchCustomEquipmentList() {
    const token = this.authService.getAccessToken();
    const user_id = this.authService.getUserId();
    this.equipmentService
      .getAllCustomEquipments(user_id ?? undefined, token ?? undefined)
      .subscribe({
        next: (data: Equipment[]) => {
          this.customEquipmentList = data;
          // update filtered equipment list
          this.filteredCustomEquipmentList = this.customEquipmentList;
          // empty selected equipment list
          this.selectedEquipmentList = [];
        },
        error: (error) => {
          console.error('Error fetching equipment data:', error);
        },
      });
  }
  // function that fetches the custom equipment list
  fetchStandardEquipmentList() {
    const token = this.authService.getAccessToken();
    this.equipmentService
      .getAllStandardEquipments(token ?? undefined)
      .subscribe({
        next: (data) => {
          this.standardEquipmentList = data;
        },
        error: (error) => {
          console.error('Error fetching equipment data:', error);
        },
      });
  }

  // function that toggles the selected status of an equipment
  toggleSelection(index: number) {
    const selectedEquipment = this.filteredCustomEquipmentList[index];
    this.removeFromSelectedList(selectedEquipment)
    if (
      !selectedEquipment.selected ||
      selectedEquipment.selected == undefined

    ) {
      // if selected equipment list length is less than 3
      if (this.selectedEquipmentList.length < 3) {
        selectedEquipment.selected = true;
        this.selectedEquipmentList.push(selectedEquipment);
        // if selected equipment list length is 3, display an alert message
      } else if (this.selectedEquipmentList.length == 3) {
        alert('You can only select a maximum of 3 equipment');
        const selectedEquipment = this.customEquipmentList[index];
        selectedEquipment.selected = false;
      }
    } else if (selectedEquipment.selected) {
      selectedEquipment.selected = false;
      const index = this.selectedEquipmentList.indexOf(selectedEquipment);
      if (index > -1) {
        this.selectedEquipmentList.splice(index, 1);
      }
    }
  }
  // function that makes sure if the removed equipment not in the selected list
  removeFromSelectedList(equipment: Equipment) {
    if (!equipment.selected) {
      const index = this.selectedEquipmentList.indexOf(equipment);
      if (index > -1) {
        this.selectedEquipmentList.splice(index, 1);
      }
    }
  }
  showAllEquipment() {
    this.currentEquipmentPrivacy = EquipmentPrivacy.All;
    this.searchEquipment(); // Apply search when switching to All
  }

  showCreatedEquipment() {
    this.currentEquipmentPrivacy = EquipmentPrivacy.Created;
    this.searchEquipment(); // Apply search when switching to Created
  }

  ToggleCreatePanel() {
    this.showCreatePanel = !this.showCreatePanel;
  }
}
